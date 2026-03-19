package com.example.arcade_system.service;

import com.example.arcade_system.model.Game;
import com.example.arcade_system.model.Score;
import com.example.arcade_system.model.User;
import com.example.arcade_system.repository.GameRepository;
import com.example.arcade_system.repository.ScoreRepository;
import com.example.arcade_system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepo;
    private final UserRepository userRepo;
    private final GameRepository gameRepo;

    public ScoreService(ScoreRepository scoreRepo,
                        UserRepository userRepo,
                        GameRepository gameRepo) {
        this.scoreRepo = scoreRepo;
        this.userRepo = userRepo;
        this.gameRepo = gameRepo;
    }

    // 🔥 ADMIN submits score for player
    public Score addScore(Long userId, Long gameId, int scoreValue) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != User.Role.PLAYER) {
            throw new RuntimeException("Score can only be assigned to PLAYER");
        }

        Game game = gameRepo.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        Score score = new Score();
        score.setUser(user);
        score.setGame(game);
        score.setScore(scoreValue);
        score.setRecordedAt(LocalDateTime.now());

        return scoreRepo.save(score);
    }

    // 🔥 PLAYER → own history only
    public List<Score> getUserHistory(String username) {

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return scoreRepo.findByUser(user);
    }

    // 🔥 leaderboard
    public List<Score> getTop10Scores(Long gameId) {
        return scoreRepo.findTop10ByGameIdOrderByScoreDesc(gameId);
    }
}