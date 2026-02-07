package com.finsight.backend.controller;

import com.finsight.backend.service.AnalysisService;
import com.finsight.backend.service.AIService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class UploadController {

    @Autowired
    private AnalysisService analysisService;

    @Autowired
    private AIService aiService;

    @PostMapping("/upload")
    public Map<String, Object> upload(@RequestParam("file") MultipartFile file) throws Exception {

        if (file.isEmpty()) {
            throw new RuntimeException("Empty file");
        }

        if (!file.getOriginalFilename().endsWith(".csv")) {
            throw new RuntimeException("Not a CSV");
        }

        Map<String, Double> summary = analysisService.analyze(file);
        // Calculate total spending
        double total = summary.values()
                .stream()
                .mapToDouble(Double::doubleValue)
                .sum();

        // Find biggest category
        String maxCategory = summary.entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .get()
                .getKey();

// Calculate percentage
        double percent =
                (summary.get(maxCategory) / total) * 100;

// Build highlight message
        String highlight =
                maxCategory + " is " + Math.round(percent)
                        + "% of your total spending";


        String advice;

        try {
            advice = aiService.getAdvice(summary.toString());
        } catch (Exception e) {
            advice = "AI temporarily unavailable. Showing basic insights.";
        }

        Map<String, Object> result = new HashMap<>();
        result.put("summary", summary);
        result.put("advice", advice);
        result.put("highlight", highlight);

        return result;
    }
}


