package com.emiratesgold.api.model;

public class GoldRateResponse {
    private double gold_24k_per_gram;
    private double gold_22k_per_gram;
    private Double silver_per_gram;
    private double gold;
    private Double silver;
    private String currency;
    private long updatedAt;
    private String updatedAt_ist;

    public GoldRateResponse() {
    }

    public GoldRateResponse(double gold_24k_per_gram, double gold_22k_per_gram, Double silver_per_gram, double gold,
            Double silver, String currency, long updatedAt, String updatedAt_ist) {
        this.gold_24k_per_gram = gold_24k_per_gram;
        this.gold_22k_per_gram = gold_22k_per_gram;
        this.silver_per_gram = silver_per_gram;
        this.gold = gold;
        this.silver = silver;
        this.currency = currency;
        this.updatedAt = updatedAt;
        this.updatedAt_ist = updatedAt_ist;
    }

    public double getGold_24k_per_gram() {
        return gold_24k_per_gram;
    }

    public void setGold_24k_per_gram(double gold_24k_per_gram) {
        this.gold_24k_per_gram = gold_24k_per_gram;
    }

    public double getGold_22k_per_gram() {
        return gold_22k_per_gram;
    }

    public void setGold_22k_per_gram(double gold_22k_per_gram) {
        this.gold_22k_per_gram = gold_22k_per_gram;
    }

    public Double getSilver_per_gram() {
        return silver_per_gram;
    }

    public void setSilver_per_gram(Double silver_per_gram) {
        this.silver_per_gram = silver_per_gram;
    }

    public double getGold() {
        return gold;
    }

    public void setGold(double gold) {
        this.gold = gold;
    }

    public Double getSilver() {
        return silver;
    }

    public void setSilver(Double silver) {
        this.silver = silver;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public long getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(long updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getUpdatedAt_ist() {
        return updatedAt_ist;
    }

    public void setUpdatedAt_ist(String updatedAt_ist) {
        this.updatedAt_ist = updatedAt_ist;
    }
}
