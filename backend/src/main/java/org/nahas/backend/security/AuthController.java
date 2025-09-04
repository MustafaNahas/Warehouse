package org.nahas.backend.security;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getAuthStatus(@AuthenticationPrincipal OAuth2User user) {
        Map<String, Object> response = new HashMap<>();
        if (user != null) {
            response.put("authenticated", true);
            response.put("user", createUserInfo(user));
        } else {
            response.put("authenticated", false);
            response.put("user", null);
        }

        return ResponseEntity.ok(response);
    }



    private Map<String, Object> createUserInfo(OAuth2User oauth2User) {
        Map<String, Object> userInfo = new HashMap<>();

        // GitHub-spezifische Attribute
        userInfo.put("login", oauth2User.getAttribute("login"));
        userInfo.put("id", oauth2User.getAttribute("id"));
        userInfo.put("avatarUrl", oauth2User.getAttribute("avatar_url"));
        userInfo.put("email", oauth2User.getAttribute("email"));
        userInfo.put("htmlUrl", oauth2User.getAttribute("html_url"));
        userInfo.put("publicRepos", oauth2User.getAttribute("public_repos"));
        userInfo.put("followers", oauth2User.getAttribute("followers"));
        userInfo.put("following", oauth2User.getAttribute("following"));
        userInfo.put("createdAt", oauth2User.getAttribute("created_at"));

        return userInfo;
    }
}