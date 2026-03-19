package com.example.arcade_system.controller;

import com.example.arcade_system.model.Score;
import com.example.arcade_system.service.ScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/score")
@RequiredArgsConstructor
public class ScoreController {

    private final ScoreService scoreService;

    // 🔥 ADMIN submits score for any player
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/submit")
    public Score submitScore(
            @RequestParam Long userId,
            @RequestParam Long gameId,
            @RequestParam int score) {

        return scoreService.addScore(userId, gameId, score);
    }

    // 🔥 PLAYER views own scores
    @GetMapping("/me")
    public List<Score> getMyScores(Authentication auth) {
        return scoreService.getUserHistory(auth.getName());
    }

    // 🔥 Leaderboard (any logged-in user)
    @GetMapping("/leaderboard/{gameId}")
    public List<Score> getGameLeaderboard(@PathVariable Long gameId) {
        return scoreService.getTop10Scores(gameId);
    }
}