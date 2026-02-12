package com.example.arcade_system.repository;

import com.example.arcade_system.model.Game;
import com.example.arcade_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
