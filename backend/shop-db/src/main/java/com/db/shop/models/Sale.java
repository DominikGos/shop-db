package com.db.shop.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Sale extends BaseModel {

    private LocalDateTime date;
    private double total;

    private List<SaleItem> items;

    // wymagany przez Jackson
    public Sale() {
        this.date = LocalDateTime.now();
        this.items = new ArrayList<>();
    }

    public Sale(List<SaleItem> items) {
        super();
        this.date = LocalDateTime.now();
        this.items = items;
        calculateTotal();
    }

    // Obliczanie sumy sprzedaży
    public void calculateTotal() {

        this.total = items.stream()
                .mapToDouble(i ->
                        i.getPrice() * i.getQuantity())
                .sum();
    }

    // GETTERS i SETTERS

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public double getTotal() {
        return total;
    }

    public List<SaleItem> getItems() {
        return items;
    }

    public void setItems(List<SaleItem> items) {
        this.items = items;
        calculateTotal();
    }
}