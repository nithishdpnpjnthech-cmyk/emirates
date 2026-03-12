package com.emiratesgold.api.controller;

import com.emiratesgold.api.model.Product;
import com.emiratesgold.api.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public List<Product> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String metalType) {

        if (category != null && metalType != null) {
            return productService.getAllProducts().stream()
                    .filter(p -> p.getCategory().equalsIgnoreCase(category)
                            && p.getMetalType().equalsIgnoreCase(metalType))
                    .toList();
        } else if (category != null) {
            return productService.getProductsByCategory(category);
        } else if (metalType != null) {
            return productService.getProductsByMetalType(metalType);
        }
        return productService.getAllProducts();
    }

    @GetMapping("/{metalType:gold|diamond}/{category}")
    public List<Product> getProductsByPath(
            @PathVariable String metalType,
            @PathVariable String category) {
        return productService.getAllProducts().stream()
                .filter(p -> p.getCategory().equalsIgnoreCase(category)
                        && p.getMetalType().equalsIgnoreCase(metalType))
                .toList();
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }
}
