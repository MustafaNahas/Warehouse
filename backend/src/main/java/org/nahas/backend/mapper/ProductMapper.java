package org.nahas.backend.mapper;

import org.nahas.backend.dto.ProductDto;
import org.nahas.backend.model.Product;

public final class ProductMapper {

    private ProductMapper() {}

    public static ProductDto toDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .barcode(product.getBarcode())
                .purchasePrice(product.getPurchasePrice())
                .salePrice(product.getSalePrice())
                .quantity(product.getQuantity())
                .imageUrl(product.getImageUrl())
                .tag(product.getTag())
                .categorie(product.getCategorie())
                .build();
    }

    public static Product toEntity(ProductDto dto) {
        return Product.builder()
                .id(dto.getId())
                .name(dto.getName())
                .barcode(dto.getBarcode())
                .purchasePrice(dto.getPurchasePrice())
                .salePrice(dto.getSalePrice())
                .quantity(dto.getQuantity())
                .imageUrl(dto.getImageUrl())
                .tag(dto.getTag())
                .categorie(dto.getCategorie())
                .build();
    }
}

