package com.db.shop.models;

import java.util.UUID;

public abstract class BaseModel {

    protected String id;

    public BaseModel() {
        this.id = UUID.randomUUID().toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}