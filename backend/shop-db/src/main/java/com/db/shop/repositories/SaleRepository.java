package com.db.shop.repositories;

import com.db.shop.models.Sale;

public class SaleRepository
        extends BaseRepository<Sale> {

    public SaleRepository() {

        super(
                "sales.json",
                Sale[].class
        );
    }
}