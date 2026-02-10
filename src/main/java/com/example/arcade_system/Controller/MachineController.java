package com.example.arcade_system.Controller;

import com.example.arcade_system.model.Machine;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class MachineController {
    private final MachineService MachineService;

    public MachineController(MachineService machineService) {
        MachineService = machineService;
    }

    // 6️⃣ POST - add machine
    @PostMapping("/game/{gameId}")
    public ResponseEntity<Machine> addMachine(
            @PathVariable Long gameId,
            @RequestBody Machine machine) {

        return new ResponseEntity<>(
                MachineService.addMachine(gameId, machine),
                HttpStatus.CREATED
        );
    }

    // 7️⃣ GET - list all machines
    @GetMapping
    public ResponseEntity<List<Machine>> getAllMachines() {
        return ResponseEntity.ok(MachineService.getAllMachines());
    }

    // 8️⃣ PATCH - enable/disable machine
    @PatchMapping("/{id}")
    public ResponseEntity<Machine> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(
                MachineService.updateMachineStatus(id, status)
        );
    }

    // 9️⃣ DELETE - delete machine
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMachine(@PathVariable Long id) {

        MachineService.deleteMachine(id);
        return ResponseEntity.ok("Machine deleted successfully");
    }
}
