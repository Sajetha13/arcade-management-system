package com.example.arcade_system.controller;

import com.example.arcade_system.model.Ticket;
import com.example.arcade_system.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // Create ticket
    @PostMapping("/user/{userId}")
    public Ticket createTicket(
            @PathVariable Long userId,
            @RequestBody Ticket ticket
    ) {
        return ticketService.createTicket(userId, ticket);
    }

    // View tickets of a user
    @GetMapping("/user/{userId}")
    public List<Ticket> getUserTickets(@PathVariable Long userId) {
        return ticketService.getTicketsByUser(userId);
    }

    // View all tickets
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    // View open tickets
    @GetMapping("/open")
    public List<Ticket> getOpenTickets() {
        return ticketService.getOpenTickets();
    }

    // Update ticket status
    @PatchMapping("/{ticketId}/status")
    public Ticket updateTicketStatus(
        @PathVariable Long ticketId,
        @RequestParam Long adminId,
        @RequestParam String status
) {
    return ticketService.updateTicketStatus(adminId, ticketId, status);
}

}
