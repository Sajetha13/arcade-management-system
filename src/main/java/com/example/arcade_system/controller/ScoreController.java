package com.example.arcade_system.controller;

import com.example.arcade_system.model.Score;
import com.example.arcade_system.service.ScoreService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/score")
@CrossOrigin("*")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    @PostMapping("/submit")
    public Score submitScore(
            @RequestParam Long userId,
            @RequestParam Long gameId,
            @RequestParam int score) {
        return scoreService.addScore(userId, gameId, score);
    }

    @GetMapping("/player/{playerId}")
    public List<Score> getUserHistory(@PathVariable Long playerId) {
        return scoreService.getUserHistory(playerId);
    }

    @GetMapping("/leaderboard/{gameId}")
    public List<Score> getGameLeaderboard(@PathVariable Long gameId) {
        return scoreService.getTop10Scores(gameId);
    }
}