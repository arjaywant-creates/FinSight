package com.finsight.backend.service;

import com.opencsv.CSVReader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

@Service
public class AnalysisService {

    // Parses the uploaded CSV and returns category -> total spent
    public Map<String, Double> analyze(MultipartFile file) throws Exception {

        CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()));
        String[] row;

        Map<String, Double> totals = new HashMap<>();

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Empty file");
        }

        reader.readNext(); // skip header

        while ((row = reader.readNext()) != null) {
            if (row.length < 3) continue;

            String desc = row[1].toLowerCase().trim();
            String amtStr = row[3].trim();

            double amount;
            try {
                amount = Double.parseDouble(amtStr);
            } catch (Exception e) {
                continue;
            }

            // only expenses (negative)
            if (amount >= 0) continue;

            String category = categorize(desc);

            totals.put(category, totals.getOrDefault(category, 0.0) + Math.abs(amount));
        }

        return totals;
    }

    private String categorize(String d) {
        if (d.contains("uber") || d.contains("lyft")) return "Transport";
        if (d.contains("amazon") || d.contains("target") || d.contains("walmart")) return "Shopping";
        if (d.contains("starbucks") || d.contains("mcdonald") || d.contains("chipotle")) return "Food";
        if (d.contains("rent") || d.contains("mortgage")) return "Housing";
        return "Other";
    }
}
