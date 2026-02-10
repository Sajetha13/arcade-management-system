package com.example.arcade_system.service;

import com.example.arcade_system.Exception.ResourceNotFoundException;
import com.example.arcade_system.model.Game;
import com.example.arcade_system.repository.GameRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor

public class GameService {

    private GameRepository gameRepository;

    public Game addGame(Game game) {
        return gameRepository.save(game);
    }


    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game getGameByName(String name) {
        return gameRepository.findByNameIgnoreCase(name).orElseThrow(()-> new ResourceNotFoundException("Game not found with name:"+name));
    }


    public void deleteGame(Long id) {
        Game game=gameRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Game Id not exists:"+id));
        gameRepository.deleteById(id);
    }

    public Game updatedStatus(Long id, boolean active) {
        Game game=gameRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Game not found with id:"+id));
        game.setActive(active);
        return gameRepository.save(game);
    }
}
