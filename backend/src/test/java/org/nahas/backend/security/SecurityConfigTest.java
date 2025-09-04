package org.nahas.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest(properties = "app.url=http://localhost")

@AutoConfigureMockMvc
class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;  // ⚠️ wichtig: @Autowired


    // -----------------------
    // Access Tests
    // -----------------------
    @Test
    void whenUnauthenticated_thenProductsRedirectToLogin() throws Exception {
        mockMvc.perform(get("/api/products"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrlPattern("**/oauth2/authorization/github"));
    }

    @Test
    @WithMockUser
    void whenAuthenticated_thenProductsReturn200() throws Exception {
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk());
    }

    @Test
    void whenUnauthenticated_thenAdminRedirectToLogin() throws Exception {
        mockMvc.perform(get("/api/admin"))
                .andExpect(status().is3xxRedirection());
    }

    @Test
    @WithMockUser(roles = "USER")
    void whenUserRole_thenAdminForbidden() throws Exception {
        mockMvc.perform(get("/api/admin"))
                .andExpect(status().isForbidden());
    }

}
