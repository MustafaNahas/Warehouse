package org.nahas.backend.security;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.List;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;



    @Test
    void whenOAuth2UserAuthenticated_thenReturnTrue() throws Exception {
        OAuth2User fakeUser = mock(OAuth2User.class);
        when(fakeUser.getAttribute("login")).thenReturn("user");
        when(fakeUser.getAttribute("id")).thenReturn("123");

        mockMvc.perform(get("/api/auth/status")
                        .with(authentication(new OAuth2AuthenticationToken(
                                fakeUser,
                                List.of(new SimpleGrantedAuthority("ROLE_USER")),
                                "github"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.authenticated").value(true))
                .andExpect(jsonPath("$.user.login").value("user"));
    }
}
