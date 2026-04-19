package com.db.shop.models;

public class SaleItem extends BaseModel {

    private String saleId;
    private String productId;
    private int quantity;
    private double price;

    // wymagany przez Jackson
    public SaleItem() {}

    public SaleItem(
            String saleId,
            String productId,
            int quantity,
            double price
    ) {
        super();
        this.saleId = saleId;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }

    // GETTERS i SETTERS

    public String getSaleId() {
        return saleId;
    }

    public void setSaleId(String saleId) {
        this.saleId = saleId;
    }

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