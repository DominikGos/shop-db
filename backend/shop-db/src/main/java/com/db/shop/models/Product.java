package com.db.shop.models;

public class Product extends BaseModel {

    private String name;
    private double price;
    private int quantity;
    private String imagePath;

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Product() {}

    public Product(
            String name,
            double price,
            int quantity
    ) {
        super();
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

}