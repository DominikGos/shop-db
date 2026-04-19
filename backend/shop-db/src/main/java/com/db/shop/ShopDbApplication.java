package com.db.shop;

import com.db.shop.controllers.ProductController;
import com.db.shop.models.Product;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShopDbApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShopDbApplication.class, args);
	}

}
