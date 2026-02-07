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
    public Map<String, Object> upload(
            @RequestParam("file") MultipartFile file
    ) throws Exception {

        // 1. Analyze CSV
        Map<String, Double> summary =
                analysisService.analyze(file);

        // 2. Get AI advice
        String advice =
                aiService.getAdvice(summary.toString());

        // 3. Build response
        Map<String, Object> response = new HashMap<>();

        response.put("summary", summary);
        response.put("advice", advice);

        return response;
    }
}
