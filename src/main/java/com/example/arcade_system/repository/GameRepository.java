package com.example.arcade_system.repository;

import com.example.arcade_system.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameRepository extends JpaRepository<Game,Long> {
    Optional<Game> findByNameIgnoreCase(String name);
}
