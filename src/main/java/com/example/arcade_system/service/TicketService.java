package com.example.arcade_system.service;

import com.example.arcade_system.model.Ticket;
import com.example.arcade_system.model.User;
import com.example.arcade_system.repository.TicketRepository;
import com.example.arcade_system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public TicketService(TicketRepository ticketRepository,
                         UserRepository userRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    // 🔥 create ticket (logged-in user)
    public Ticket createTicket(String username, Ticket ticket) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != User.Role.PLAYER) {
            throw new RuntimeException("Only players can create tickets");
        }

        ticket.setUser(user);
        ticket.setStatus("OPEN");

        return ticketRepository.save(ticket);
    }

    // 🔥 get tickets (player → own, admin → all)
    public List<Ticket> getTicketsForUser(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == User.Role.ADMIN) {
            return ticketRepository.findAll();
        }

        return ticketRepository.findByUser(user);
    }

    // 🔥 admin only
    public List<Ticket> getOpenTickets() {
        return ticketRepository.findByStatus("OPEN");
    }

    // 🔥 update ticket (admin only)
    public Ticket updateTicketStatus(String username, Long ticketId, String status) {

        User admin = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (admin.getRole() != User.Role.ADMIN) {
            throw new RuntimeException("Only admin can update ticket status");
        }

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setStatus(status);
        return ticketRepository.save(ticket);
    }
}