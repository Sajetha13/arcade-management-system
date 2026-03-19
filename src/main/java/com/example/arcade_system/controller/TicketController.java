package com.example.arcade_system.controller;

import com.example.arcade_system.model.Ticket;
import com.example.arcade_system.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    // ✅ Create ticket (PLAYER only)
    @PostMapping
    public Ticket createTicket(Authentication auth, @RequestBody Ticket ticket) {
        return ticketService.createTicket(auth.getName(), ticket);
    }

    // ✅ Get tickets (PLAYER → own, ADMIN → all)
    @GetMapping
    public List<Ticket> getTickets(Authentication auth) {
        return ticketService.getTicketsForUser(auth.getName());
    }

    // ✅ Admin only: view open tickets
    @GetMapping("/open")
    public List<Ticket> getOpenTickets() {
        return ticketService.getOpenTickets();
    }

    // ✅ Admin only: update ticket status
    @PatchMapping("/{ticketId}/status")
    public Ticket updateTicketStatus(
            @PathVariable Long ticketId,
            @RequestParam String status,
            Authentication auth) {

        return ticketService.updateTicketStatus(auth.getName(), ticketId, status);
    }
}