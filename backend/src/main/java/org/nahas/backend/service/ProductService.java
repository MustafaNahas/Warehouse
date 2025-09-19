package org.nahas.backend.service;

import org.nahas.backend.exception.ProductNotFoundException;
import org.nahas.backend.model.Product;
import org.nahas.backend.repo.ProductRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepo repository;

    public ProductService(ProductRepo repository) {
        this.repository = repository;
    }

    public List<Product> getAll() {
        return repository.findAll();
    }

    public Product getById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    public Product create(Product product) {
        return repository.save(product);
    }

    public Product update(String id, Product updated) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        product.setName(updated.getName());
        product.setBarcode(updated.getBarcode());
        product.setPurchasePrice(updated.getPurchasePrice());
        product.setSalePrice(updated.getSalePrice());
        product.setQuantity(updated.getQuantity());
        product.setImageUrl(updated.getImageUrl());
        product.setTag(updated.getTag());
        product.setCategorie(updated.getCategorie());

        return repository.save(product);
    }

    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }
        repository.deleteById(id);
    }

    public List<String> getAllCategories() {
        return repository.findAll()
                .stream()
                .map(Product::getCategorie)
                .distinct().toList();

    }
}
