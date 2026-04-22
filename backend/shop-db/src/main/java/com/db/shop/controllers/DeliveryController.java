package com.db.shop.controllers;

import com.db.shop.models.Delivery;
import com.db.shop.models.DeliveryItem;
import com.db.shop.models.Product;
import com.db.shop.repositories.DeliveryRepository;
import com.db.shop.repositories.ProductRepository;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/deliveries")
@CrossOrigin(origins = "*")
public class DeliveryController {

    private DeliveryRepository deliveryRepo;
    private ProductRepository productRepo;

    public DeliveryController() {

        this.deliveryRepo =
                new DeliveryRepository();

        this.productRepo =
                new ProductRepository();
    }

    // GET wszystkie dostawy
    @GetMapping
    public List<Delivery> getAllDeliveries() {

        return deliveryRepo.getAll();
    }

    // POST nowa dostawa
    @PostMapping
    public Delivery createDelivery(
            @RequestBody Delivery deliveryRequest
    ) {

        List<DeliveryItem> processedItems =
                new ArrayList<>();

        for (DeliveryItem item :
                deliveryRequest.getItems()) {

            Optional<Product> productOpt =
                    productRepo.getById(
                            item.getProductId());

            if (productOpt.isEmpty()) {

                throw new RuntimeException(
                        "Produkt nie istnieje: "
                                + item.getProductId());
            }

            Product product =
                    productOpt.get();

            // zwiększ stan magazynu
            product.setQuantity(
                    product.getQuantity()
                            + item.getQuantity()
            );

            productRepo.update(product);

            processedItems.add(item);
        }

        Delivery delivery = new Delivery();
        delivery.setItems(processedItems);

        deliveryRepo.add(delivery);

        return delivery;
    }

    // DELETE dostawy
    @DeleteMapping("/{id}")
    public boolean deleteDelivery(
            @PathVariable String id
    ) {

        Optional<Delivery> delivery =
                deliveryRepo.getById(id);

        if (delivery.isEmpty()) {

            return false;
        }

        deliveryRepo.delete(id);

        return true;
    }
}