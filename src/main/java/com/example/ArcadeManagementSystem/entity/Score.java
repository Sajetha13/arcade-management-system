package com.example.ArcadeManagementSystem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer points;

    @ManyToOne
    private User player;

    @ManyToOne
    private Game game;
}