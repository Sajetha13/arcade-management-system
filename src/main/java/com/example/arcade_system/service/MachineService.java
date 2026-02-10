package com.example.arcade_system.service;

import com.example.arcade_system.exception.MachineNotFoundException;
import com.example.arcade_system.model.Game;
import com.example.arcade_system.model.Machine;
import com.example.arcade_system.repository.GameRepository;
import com.example.arcade_system.repository.MachineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MachineService {

    private final MachineRepository machineRepository;
    private final GameRepository gameRepository;

    @Override
    public Machine addMachine(Long gameId, Machine machine) {

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() ->
                        new MachineNotFoundException("Game not found with id " + gameId));

        machine.setGame(game);
        machine.setInstalledAt(LocalDateTime.now());
        machine.setStatus("ACTIVE");

        return machineRepository.save(machine);
    }

    @Override
    public List<Machine> getAllMachines() {
        return machineRepository.findAll();
    }

    @Override
    public Machine updateMachineStatus(Long machineId, String status) {

        Machine machine = machineRepository.findById(machineId)
                .orElseThrow(() ->
                        new MachineNotFoundException("Machine not found with id " + machineId));

        machine.setStatus(status);
        return machineRepository.save(machine);
    }

    @Override
    public void deleteMachine(Long machineId) {

        Machine machine = machineRepository.findById(machineId)
                .orElseThrow(() ->
                        new MachineNotFoundException("Machine not found with id " + machineId));

        machineRepository.delete(machine);
    }
}
