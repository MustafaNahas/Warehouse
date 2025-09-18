package org.nahas.backend.service;
import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ImageServiceTest {

    private Cloudinary cloudinary;
    private Uploader uploader;
    private ImageService imageService;

    @BeforeEach
    void setUp() {
        cloudinary = mock(Cloudinary.class);
        uploader = mock(Uploader.class);
        when(cloudinary.uploader()).thenReturn(uploader);

        imageService = new ImageService(cloudinary);
    }

    @Test
    void uploadImage_ShouldReturnSecureUrl() throws IOException {
        // Mock MultipartFile
        MockMultipartFile file = new MockMultipartFile(
                "image",
                "test.jpg",
                "image/jpeg",
                "dummy image content".getBytes()
        );

        // Mock Cloudinary Response
        Map<String, Object> uploadResult = new HashMap<>();
        uploadResult.put("secure_url", "http://cloudinary.com/test.jpg");
        when(uploader.upload(any(byte[].class), any(Map.class))).thenReturn(uploadResult);

        // Call service
        String result = imageService.uploadImage(file);

        // Verify
        assertEquals("http://cloudinary.com/test.jpg", result);
        verify(uploader, times(1)).upload(any(byte[].class), any(Map.class));
    }
}
