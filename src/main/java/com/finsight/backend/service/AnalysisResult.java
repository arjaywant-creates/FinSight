package com.finsight.backend.service;

import java.util.Map;

public class AnalysisResult {

    private Map<String, Double> totals;
    private int transactionCount;

    public AnalysisResult(Map<String, Double> totals, int transactionCount) {
        this.totals = totals;
        this.transactionCount = transactionCount;
    }

    public Map<String, Double> getTotals() {
        return totals;
    }

    public int getTransactionCount() {
        return transactionCount;
    }
}
