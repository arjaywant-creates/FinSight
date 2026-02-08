package com.finsight.backend.service;

import java.util.Arrays;
import com.opencsv.CSVReader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

@Service
public class AnalysisService {

    // Parses the uploaded CSV and returns totals + transaction count
    public AnalysisResult analyze(MultipartFile file) throws Exception {

        CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()));
        String[] row;

        Map<String, Double> totals = new HashMap<>();
        int transactionCount = 0;

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Empty file");
        }

        reader.readNext(); // skip header

        while ((row = reader.readNext()) != null) {

            System.out.println("ROW = " + Arrays.toString(row));

            if (row.length < 4) continue;

            String desc = row[3].toLowerCase().trim();
            String amtStr = row[2].trim();

            double amount;

            try {
                amount = Double.parseDouble(amtStr);
            } catch (Exception e) {
                continue;
            }

            // Skip zero values
            if (amount == 0) continue;

            transactionCount++;

            String category = categorize(desc);

            totals.put(
                    category,
                    totals.getOrDefault(category, 0.0) + Math.abs(amount)
            );
        }

        return new AnalysisResult(totals, transactionCount);
    }

    private String categorize(String d) {
        if (d.contains("uber") || d.contains("lyft")) return "Transport";
        if (d.contains("amazon") || d.contains("target") || d.contains("walmart")) return "Shopping";
        if (d.contains("starbucks") || d.contains("mcdonald") || d.contains("chipotle")) return "Food";
        if (d.contains("rent") || d.contains("mortgage")) return "Housing";
        return "Other";
    }
}
