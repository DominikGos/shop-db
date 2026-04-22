package com.db.shop.models;

public class DeliveryItem extends BaseModel {

    private String productId;
    private int quantity;

    // wymagany przez Jackson
    public DeliveryItem() {}

    public DeliveryItem(
            String productId,
            int quantity
    ) {
        super();
        this.productId = productId;
        this.quantity = quantity;
    }

    // GETTERS / SETTERS

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
}