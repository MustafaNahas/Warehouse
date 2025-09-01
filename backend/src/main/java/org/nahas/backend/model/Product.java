package org.nahas.backend.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "products")
public class Product {
    @Id
    private String id;

    private String name;
    private String barcode;
    private double purchasePrice;   // Einkaufspreis (nur intern)
    private double salePrice;       // Verkaufspreis
    private int quantity;
    private String imageUrl;
    private String tag;
    private String categorie;

}
