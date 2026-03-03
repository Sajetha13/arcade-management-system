package com.example.arcade_system.repository;

import com.example.arcade_system.model.Ticket;
import com.example.arcade_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByStatus(String status);

    List<Ticket> findByUser(User user);
}
