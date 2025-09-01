package org.nahas.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private String id;
    private String name;
    private String barcode;
    private double salePrice;
    private int quantity;
    private String imageUrl;
    private String tag;
    private String categorie;



}
