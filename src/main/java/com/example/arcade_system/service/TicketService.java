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

    public Ticket createTicket(Long userId, Ticket ticket) {

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getRole() != User.Role.PLAYER) {
        throw new RuntimeException("Only players can create tickets");
    }

    ticket.setUser(user);
    ticket.setStatus("OPEN");

    return ticketRepository.save(ticket);
}


    public List<Ticket> getTicketsByUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ticketRepository.findByUser(user);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<Ticket> getOpenTickets() {
        return ticketRepository.findByStatus("OPEN");
    }

    public Ticket updateTicketStatus(Long adminId, Long ticketId, String status) {

    User admin = userRepository.findById(adminId)
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
