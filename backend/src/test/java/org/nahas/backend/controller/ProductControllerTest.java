package org.nahas.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.nahas.backend.dto.ProductDto;
import org.nahas.backend.model.Product;
import org.nahas.backend.service.ProductService;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ProductControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ProductService service;

    private ProductController controller;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        controller = new ProductController(service);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void testGetAll() throws Exception {
        Product p1 = new Product();
        p1.setId("1");
        p1.setName("Cola");

        Product p2 = new Product();
        p2.setId("2");
        p2.setName("Chips");

        when(service.getAll()).thenReturn(List.of(p1, p2));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Cola"))
                .andExpect(jsonPath("$[1].name").value("Chips"));
    }

    @Test
    void testCreate() throws Exception {
        ProductDto dto = new ProductDto();
        dto.setName("Water");

        Product product = new Product();
        product.setId("123");
        product.setName("Water");

        when(service.create(any(Product.class))).thenReturn(product);

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("123"))
                .andExpect(jsonPath("$.name").value("Water"));
    }

    @Test
    void testGetById() throws Exception {
        Product product = new Product();
        product.setId("1");
        product.setName("Cola");

        when(service.getById("1")).thenReturn(product);

        mockMvc.perform(get("/api/products/{id}", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Cola"));
    }

    @Test
    void testUpdate() throws Exception {
        ProductDto dto = new ProductDto();
        dto.setName("Updated Cola");

        Product updated = new Product();
        updated.setId("1");
        updated.setName("Updated Cola");

        when(service.update(eq("1"), any(Product.class))).thenReturn(updated);

        mockMvc.perform(put("/api/products/{id}", "1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Updated Cola"));
    }

    @Test
    void testDelete() throws Exception {
        doNothing().when(service).delete("1");

        mockMvc.perform(delete("/api/products/{id}", "1"))
                .andExpect(status().isNoContent());

        verify(service, times(1)).delete("1");
    }
}
