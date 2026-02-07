package com.finsight.backend.controller;

import com.finsight.backend.service.AnalysisResult;
import com.finsight.backend.service.AnalysisService;
import com.finsight.backend.service.AIService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UploadController {

    @Autowired
    private AnalysisService analysisService;

    @Autowired
    private AIService aiService;

    @PostMapping("/upload")
    public Map<String, Object> upload(@RequestParam("file") MultipartFile file) throws Exception {

        // Basic validation
        if (file.isEmpty()) {
            throw new RuntimeException("Empty file");
        }

        if (!file.getOriginalFilename().endsWith(".csv")) {
            throw new RuntimeException("Not a CSV");
        }

        // Analyze CSV
        AnalysisResult analysisResult = analysisService.analyze(file);

        Map<String, Double> summary = analysisResult.getTotals();
        int transactionCount = analysisResult.getTransactionCount();
        String promptTemplate;

        if (transactionCount < 5) {
            promptTemplate = AIService.SHORT_PROMPT;
        } else if (transactionCount < 20) {
            promptTemplate = AIService.MEDIUM_PROMPT;
        } else {
            promptTemplate = AIService.DEEP_PROMPT;
        }


        // Build highlight safely
        String highlight = "No spending data found.";

        if (!summary.isEmpty()) {

            double total = summary.values()
                    .stream()
                    .mapToDouble(Double::doubleValue)
                    .sum();

            Map.Entry<String, Double> maxEntry =
                    summary.entrySet()
                            .stream()
                            .max(Map.Entry.comparingByValue())
                            .orElse(null);

            if (maxEntry != null && total > 0) {

                double percent =
                        (maxEntry.getValue() / total) * 100;

                highlight =
                        maxEntry.getKey() + " is "
                                + Math.round(percent)
                                + "% of your total spending";
            }
        }

        // Get AI advice
        String advice;

        try {

            String prompt;

            if (transactionCount < 5) {
                prompt = AIService.SHORT_PROMPT;
            } else if (transactionCount < 20) {
                prompt = AIService.MEDIUM_PROMPT;
            } else {
                prompt = AIService.DEEP_PROMPT;
            }

            advice = aiService.getAdviceWithPrompt(
                    summary.toString(),
                    promptTemplate
            );


        } catch (Exception e) {

            advice = "AI temporarily unavailable. Showing basic insights.";
        }


        // Build response
        Map<String, Object> result = new HashMap<>();
        result.put("summary", summary);
        result.put("highlight", highlight);
        result.put("advice", advice);

        return result;
    }
}
