package com.db.shop.controllers;

import com.db.shop.models.Product;
import com.db.shop.repositories.ProductRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // pozwala Reactowi łączyć się z backendem
public class ProductController {

    private ProductRepository productRepo;

    public ProductController() {
        this.productRepo = new ProductRepository();
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepo.getAll();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {

        Optional<Product> product =
                productRepo.getById(id);

        return product.orElse(null);
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {

        return productRepo.add(product);
    }

    @PutMapping("/{id}")
    public Product editProduct(
            @PathVariable String id,
            @RequestBody Product updatedProduct
    ) {

        Optional<Product> optionalProduct =
                productRepo.getById(id);

        if (optionalProduct.isEmpty()) {
            return null;
        }

        Product product =
                optionalProduct.get();

        product.setName(updatedProduct.getName());
        product.setPrice(updatedProduct.getPrice());
        product.setQuantity(updatedProduct.getQuantity());

        productRepo.update(product);

        return product;
    }

    @DeleteMapping("/{id}")
    public boolean deleteProduct(
            @PathVariable String id
    ) {

        Optional<Product> optionalProduct =
                productRepo.getById(id);

        if (optionalProduct.isEmpty()) {
            return false;
        }

        productRepo.delete(id);

        return true;
    }
}