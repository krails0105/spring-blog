package com.example.blog.controller;

import com.example.blog.dto.LoginRequest;
import com.example.blog.dto.LoginResponse;
import com.example.blog.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Value("${blog.admin.username}")
    private String adminUsername;

    @Value("${blog.admin.password}")
    private String adminPassword;

    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        if (username == null || username.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        if (adminUsername.equals(username) && adminPassword.equals(password)) {
            String token = jwtTokenProvider.generateToken(username);
            return ResponseEntity.ok(new LoginResponse(username, "Login Success", token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<LoginResponse> logout() {
        return ResponseEntity.ok(new LoginResponse(null, "Logout Success", null));
    }

    @GetMapping("/status")
    public ResponseEntity<LoginResponse> status() {
        SecurityContext context= SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.ok(new LoginResponse(null, "Not Login", null));
        }

        String username = authentication.getName();
        return ResponseEntity.ok(new LoginResponse(username, "Login", null));
    }
}
