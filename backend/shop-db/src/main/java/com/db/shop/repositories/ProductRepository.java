package com.db.shop.repositories;

import com.db.shop.models.Product;

public class ProductRepository
        extends BaseRepository<Product> {

    public ProductRepository() {

        super(
                "products.json",
                Product[].class
        );
    }
}