package com.example.FinancialAppBackend.controller;

import com.example.FinancialAppBackend.model.User;
import com.example.FinancialAppBackend.model.dto.LoginRequest;
import com.example.FinancialAppBackend.view.UserView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserView userView;

    @PostMapping("/signup")
    public String signUp(@RequestBody User user) {
        if (userView.findByUsername(user.getUsername()) != null) {
            return "Username already taken";
        }
        userView.save(user);
        return "Sign-up successful! Redirecting to login page...";
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    System.out.println("Attempting to log in with username: " + loginRequest.getUsername());

    User user = userView.findByUsername(loginRequest.getUsername());
    if (user == null) {
        System.out.println("User not found in the database");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }

    System.out.println("User found: " + user.getUsername());
    if (!user.getPassword().equals(loginRequest.getPassword())) {
        System.out.println("Incorrect password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }

    return ResponseEntity.ok("Login successful");
}



    @GetMapping("/home")
    public String home() {
        return "Welcome to the home page!";
    }
}
