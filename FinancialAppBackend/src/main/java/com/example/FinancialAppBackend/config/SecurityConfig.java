package com.example.FinancialAppBackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity in development
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/Users/signup", "Users/login").permitAll() // Allow public access to signup
                .anyRequest().authenticated() // Authenticate all other endpoints
            )
            .httpBasic(Customizer.withDefaults()); // Enable basic authentication (optional)

        return http.build();
    }
}

