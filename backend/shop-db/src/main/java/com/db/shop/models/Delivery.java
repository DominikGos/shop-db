package com.db.shop.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Delivery extends BaseModel {

    private String date;

    private List<DeliveryItem> items;

    // wymagany przez Jackson
    public Delivery() {

        this.date = LocalDateTime.now().toString();
        this.items = new ArrayList<>();
    }

    public Delivery(
            List<DeliveryItem> items
    ) {

        super();

        this.date = LocalDateTime.now().toString();
        this.items = items;
    }

    // GETTERS / SETTERS

    public String getDate() {
        return date;
    }

    public List<DeliveryItem> getItems() {
        return items;
    }

    public void setItems(
            List<DeliveryItem> items
    ) {
        this.items = items;
    }
}