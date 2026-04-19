package com.db.shop.models;

public class SaleItem extends BaseModel {

    private String productId;
    private int quantity;
    private double price;

    // wymagany przez Jackson
    public SaleItem() {}

    public SaleItem(
            String productId,
            int quantity
    ) {
        super();
        this.productId = productId;
        this.quantity = quantity;
        this.price = 0;
    }

    // GETTERS i SETTERS

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}