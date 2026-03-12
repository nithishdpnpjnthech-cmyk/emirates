package com.emiratesgold.api.controller;

import com.emiratesgold.api.model.GoldRateResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import org.springframework.core.ParameterizedTypeReference;

@RestController
@RequestMapping("/api/gold-rate")
@CrossOrigin(origins = "*")
public class GoldRateController {

    private final String GOLD_API_KEY = "goldapi-455cy19me1rtauk-io";
    private final RestTemplate restTemplate = new RestTemplate();

    // Simple in-memory cache
    private GoldRateResponse cachedResponse = null;
    private LocalDateTime lastFetchTime = null;
    private final long CACHE_TTL_SECONDS = 6 * 60 * 60; // 6 hours

    @GetMapping
    public ResponseEntity<?> getGoldRate() {
        if (cachedResponse != null && lastFetchTime != null &&
                java.time.Duration.between(lastFetchTime, LocalDateTime.now()).getSeconds() < CACHE_TTL_SECONDS) {
            return ResponseEntity.ok(cachedResponse);
        }

        try {
            GoldRateResponse response = fetchFromApi();
            cachedResponse = response;
            lastFetchTime = LocalDateTime.now();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            if (cachedResponse != null) {
                return ResponseEntity.ok(cachedResponse);
            }
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of("error", "Gold rate unavailable. Check API keys or local configuration."));
        }
    }

    private GoldRateResponse fetchFromApi() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-access-token", GOLD_API_KEY);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Fetch Gold
        ResponseEntity<Map<String, Object>> goldResponse = restTemplate.exchange(
                "https://www.goldapi.io/api/XAU/INR",
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {
                });

        // Fetch Silver
        ResponseEntity<Map<String, Object>> silverResponse = restTemplate.exchange(
                "https://www.goldapi.io/api/XAG/INR",
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {
                });

        Map<String, Object> goldData = goldResponse.getBody();
        Map<String, Object> silverData = silverResponse.getBody();

        double gold24k = goldData != null && goldData.containsKey("price_gram_24k")
                ? ((Number) goldData.get("price_gram_24k")).doubleValue()
                : 0.0;

        // If 24k is not available, try "price" or other fields (fallback)
        if (gold24k == 0.0 && goldData != null && goldData.containsKey("price")) {
            gold24k = ((Number) goldData.get("price")).doubleValue();
        }

        double gold22k = gold24k * (22.0 / 24.0);

        Double silverGram = silverData != null && silverData.containsKey("price_gram")
                ? ((Number) silverData.get("price_gram")).doubleValue()
                : null;

        long timestamp = System.currentTimeMillis() / 1000;
        String formattedDate = LocalDateTime.now(ZoneId.of("Asia/Kolkata"))
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        return new GoldRateResponse(
                Math.round(gold24k * 100.0) / 100.0,
                Math.round(gold22k * 100.0) / 100.0,
                silverGram != null ? Math.round(silverGram * 100.0) / 100.0 : null,
                Math.round(gold22k * 100.0) / 100.0,
                silverGram != null ? Math.round(silverGram * 100.0) / 100.0 : null,
                "INR",
                timestamp,
                formattedDate);
    }
}
