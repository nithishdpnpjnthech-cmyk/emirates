package com.emiratesgold.api.controller;

import com.emiratesgold.api.model.Enquiry;
import com.emiratesgold.api.repository.EnquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
@CrossOrigin(origins = "*")
public class EnquiryController {

    @Autowired
    private EnquiryRepository enquiryRepository;

    @PostMapping
    public Enquiry createEnquiry(@RequestBody Enquiry enquiry) {
        return enquiryRepository.save(enquiry);
    }

    @GetMapping
    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAll();
    }
}
