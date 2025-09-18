package org.nahas.backend.controller;

import org.nahas.backend.service.ImageService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class ImageUploadController {


    private final ImageService imageService;

    public ImageUploadController(ImageService imageService) {
        this.imageService = imageService;
    }
    @PostMapping("/api/upload")
    public String uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
      return imageService.uploadImage(file);
    }
}