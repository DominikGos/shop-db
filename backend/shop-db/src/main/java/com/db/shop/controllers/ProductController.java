package com.db.shop.controllers;

import com.db.shop.models.Product;
import com.db.shop.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;

public class ProductController {

    private ProductRepository productRepo;

    public ProductController() {
        this.productRepo = new ProductRepository();
    }

    public Product addProduct(String name, double price, int quantity) {
        Product product = new Product(name, price, quantity);
        return productRepo.add(product);
    }

    public boolean editProduct(String productId, String newName, double newPrice, int newQuantity) {
        Optional<Product> optionalProduct = productRepo.getById(productId);

        if (optionalProduct.isEmpty()) {
            System.out.println("Produkt nie znaleziony");
            return false;
        }

        Product product = optionalProduct.get();
        product.setName(newName);
        product.setPrice(newPrice);
        product.setQuantity(newQuantity);

        productRepo.update(product);
        return true;
    }

    public boolean deleteProduct(String productId) {
        Optional<Product> optionalProduct = productRepo.getById(productId);

        if (optionalProduct.isEmpty()) {
            System.out.println("Produkt nie znaleziony");
            return false;
        }

        productRepo.delete(productId);
        return true;
    }

    public List<Product> getAllProducts() {
        return productRepo.getAll();
    }
}