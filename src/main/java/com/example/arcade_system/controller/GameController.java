package com.example.arcade_system.controller;

import com.example.arcade_system.model.Game;
import com.example.arcade_system.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game")
@AllArgsConstructor

public class GameController {

    private GameService gameService;

    @PostMapping
    public ResponseEntity<Game> addGame(@RequestBody Game game){
        return new ResponseEntity<>(gameService.addGame(game), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Game>> getAllGames(){
        return new ResponseEntity<>(gameService.getAllGames(),HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Game> getGameByName(@PathVariable String name){
        return ResponseEntity.ok(gameService.getGameByName(name));
    }

    @DeleteMapping("/{id}")
    public String deleteGame(@PathVariable Long id){
        gameService.deleteGame(id);
        return "Game deleted successfully";
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Game> updatedStatus(@PathVariable Long id,@RequestParam boolean active){
        Game updatedGame=gameService.updatedStatus(id,active);
        return ResponseEntity.ok(updatedGame);
    }
}
