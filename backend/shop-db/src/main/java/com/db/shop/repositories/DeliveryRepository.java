package com.db.shop.repositories;

import com.db.shop.models.Delivery;

public class DeliveryRepository
        extends BaseRepository<Delivery> {

    public DeliveryRepository() {

        super(
                "deliveries.json",
                Delivery[].class
        );
    }
}