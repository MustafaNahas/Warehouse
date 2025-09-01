package org.nahas.backend.controller;



import org.nahas.backend.dto.ProductDto;
import org.nahas.backend.mapper.ProductMapper;
import org.nahas.backend.model.Product;
import org.nahas.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductDto> getAll() {
        return service.getAll()
                .stream()
                .map(ProductMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getById(@PathVariable String id) {
        Product product = service.getById(id);
        return ResponseEntity.ok(ProductMapper.toDto(product));
    }

    @PostMapping
    public ResponseEntity<ProductDto> create(@RequestBody ProductDto dto) {
        Product saved = service.create(ProductMapper.toEntity(dto));
        return ResponseEntity.ok(ProductMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> update(@PathVariable String id, @RequestBody ProductDto dto) {
        Product updated = service.update(id, ProductMapper.toEntity(dto));
        return ResponseEntity.ok(ProductMapper.toDto(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
