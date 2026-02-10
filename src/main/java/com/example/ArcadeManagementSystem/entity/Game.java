package com.example.ArcadeManagementSystem.entity;


import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title; // Added this so the game has a name
    private String genre; // Optional: helps with player search

    @OneToOne
    @JoinColumn(name = "machine_id", referencedColumnName = "id", unique = true)
    @JsonIgnore // IMPORTANT: Prevents the "Infinite Loop" when fetching data
    private Machine machine;
}