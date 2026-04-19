package com.db.shop.controllers;

import com.db.shop.models.Product;
import com.db.shop.models.Sale;
import com.db.shop.models.SaleItem;
import com.db.shop.repositories.ProductRepository;
import com.db.shop.repositories.SaleRepository;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "*")
public class SaleController {

    private SaleRepository saleRepo;
    private ProductRepository productRepo;

    public SaleController() {

        this.saleRepo = new SaleRepository();
        this.productRepo = new ProductRepository();
    }

    @GetMapping
    public List<Sale> getAllSales() {
        return saleRepo.getAll();
    }

    @GetMapping("/{id}")
    public Sale getSaleById(
            @PathVariable String id
    ) {

        Optional<Sale> sale =
                saleRepo.getById(id);

        return sale.orElse(null);
    }

    @PostMapping
    public Sale createSale(
            @RequestBody Sale saleRequest
    ) {

        List<SaleItem> processedItems =
                new ArrayList<>();

        for (SaleItem item :
                saleRequest.getItems()) {

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

            // sprawdzanie stanu magazynu
            if (product.getQuantity()
                    < item.getQuantity()) {

                throw new RuntimeException(
                        "Za mało produktu na magazynie: "
                                + product.getName());
            }

            // zmniejsz stan magazynu
            product.setQuantity(
                    product.getQuantity()
                            - item.getQuantity());

            productRepo.update(product);

            // ustaw cenę z produktu
            item.setPrice(
                    product.getPrice());

            processedItems.add(item);
        }

        // utwórz sprzedaż
        Sale sale = new Sale();
        sale.setItems(processedItems);
        sale.calculateTotal();

        saleRepo.add(sale);

        return sale;
    }

    @DeleteMapping("/{id}")
    public boolean deleteSale(
            @PathVariable String id
    ) {

        Optional<Sale> sale =
                saleRepo.getById(id);

        if (sale.isEmpty()) {
            return false;
        }

        saleRepo.delete(id);

        return true;
    }
}