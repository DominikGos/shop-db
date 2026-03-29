package com.db.shop;

import com.db.shop.controllers.ProductController;
import com.db.shop.models.Product;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShopDbApplication {

	public static void main(String[] args) {
		ProductController controller = new ProductController();

		Product p1 = controller.addProduct("Laptop", 3000.0, 10);
		Product p2 = controller.addProduct("Myszka", 50.0, 100);

		System.out.println("Produkty po dodaniu:");
		controller.getAllProducts().forEach(p ->
				System.out.println(p.getName() + " - " + p.getQuantity()));

		controller.editProduct(p2.getId(), "Myszka Gamingowa", 80.0, 90);

		System.out.println("\nProdukty po edycji:");
		controller.getAllProducts().forEach(p ->
				System.out.println(p.getName() + " - " + p.getQuantity()));

		controller.deleteProduct(p1.getId());

		System.out.println("\nProdukty po usunięciu:");
		controller.getAllProducts().forEach(p ->
				System.out.println(p.getName() + " - " + p.getQuantity()));

		SpringApplication.run(ShopDbApplication.class, args);
	}

}
