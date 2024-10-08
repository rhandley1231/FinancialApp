package com.example.FinancialAppBackend.view;

import com.example.FinancialAppBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserView extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
