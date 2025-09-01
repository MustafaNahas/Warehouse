package org.nahas.backend.service;


import org.nahas.backend.exception.ProductNotFoundException;
import org.nahas.backend.model.Product;
import org.nahas.backend.repo.ProductRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    private ProductRepo repository;
    private ProductService service;

    @BeforeEach
    void setUp() {
        repository = mock(ProductRepo.class);
        service = new ProductService(repository);
    }

    @Test
    void testGetById_found() {
        Product product = new Product();
        product.setId("123");
        when(repository.findById("123")).thenReturn(Optional.of(product));

        Product result = service.getById("123");

        assertEquals("123", result.getId());
        verify(repository).findById("123");
    }

    @Test
    void testGetById_notFound() {
        when(repository.findById("999")).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> service.getById("999"));
    }

    @Test
    void testCreate() {
        Product product = new Product();
        product.setName("Test");

        when(repository.save(product)).thenReturn(product);

        Product result = service.create(product);

        assertEquals("Test", result.getName());
        verify(repository).save(product);
    }

    @Test
    void testUpdate_existingProduct() {
        Product existing = new Product();
        existing.setId("1");
        existing.setName("Old");

        Product updated = new Product();
        updated.setName("New");

        when(repository.findById("1")).thenReturn(Optional.of(existing));
        when(repository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Product result = service.update("1", updated);

        assertEquals("New", result.getName());
        verify(repository).save(existing);
    }

    @Test
    void testUpdate_notFound() {
        Product updated = new Product();
        updated.setName("New");

        when(repository.findById("1")).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> service.update("1", updated));
    }

    @Test
    void testDelete_existing() {
        when(repository.existsById("1")).thenReturn(true);

        service.delete("1");

        verify(repository).deleteById("1");
    }

    @Test
    void testDelete_notFound() {
        when(repository.existsById("1")).thenReturn(false);

        assertThrows(ProductNotFoundException.class, () -> service.delete("1"));
    }
}
