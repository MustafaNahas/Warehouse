package org.nahas.backend.repo;


import org.nahas.backend.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ProductRepo extends MongoRepository<Product, String> {
    Optional<Product> findByBarcode(String barcode);
}