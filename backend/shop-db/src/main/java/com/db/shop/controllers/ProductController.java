package com.db.shop.controllers;

import com.db.shop.models.Product;
import com.db.shop.repositories.ProductRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.io.IOException;

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

    @PostMapping("/{id}/image")
    public Product uploadImage(
            @PathVariable String id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        Optional<Product> productOpt =
                productRepo.getById(id);

        if (productOpt.isEmpty()) {
            throw new RuntimeException(
                    "Produkt nie istnieje");
        }

        Product product = productOpt.get();

        // absolutna ścieżka
        String folder =
                System.getProperty("user.dir")
                        + "/images/";

        File dir = new File(folder);

        if (!dir.exists()) {
            dir.mkdirs();
        }

        String fileName =
                id + "_" +
                        file.getOriginalFilename();

        String filePath =
                folder + fileName;

        File dest =
                new File(filePath);

        file.transferTo(dest);

        // zapis względnej ścieżki
        product.setImagePath(
                "images/" + fileName
        );

        productRepo.update(product);

        return product;
    }

    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getImage(
            @PathVariable String filename
    ) throws IOException {

        Path path = Paths.get(
                System.getProperty("user.dir"),
                "images",
                filename
        );

        Resource resource =
                new UrlResource(path.toUri());

        if (!resource.exists()) {
            throw new RuntimeException(
                    "Obraz nie istnieje"
            );
        }

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_TYPE,
                        Files.probeContentType(path)
                )
                .body(resource);
    }
}