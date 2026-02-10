package com.example.ArcadeManagementSystem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String machineCode; // e.g., "CABINET-01"

    @OneToOne(mappedBy = "machine", cascade = CascadeType.ALL)
    private Game game;
}