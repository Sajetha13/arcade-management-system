package com.example.arcade_system.service;

import com.example.arcade_system.dto.GlobalRankDTO;
import com.example.arcade_system.model.*;
import com.example.arcade_system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepo scoreRepo;

    @Autowired
    private UserRepository userRepo; // Needed to find the User

    @Autowired
    private GameRepo gameRepo; // Needed to find the Game

    public Score addScore(Long userId, Long gameId, int scoreValue) {
        if (!userRepo.existsById(userId) || !gameRepo.existsById(gameId)) {
            throw new RuntimeExceptiKon("User or Game ID is invalid!");
        }

        Score score = new Score();

        score.setUser(userRepo.getReferenceById(userId));
        score.setGame(gameRepo.getReferenceById(gameId));

        score.setScore(scoreValue);
        score.setRecordedAt(LocalDateTime.now());

        return scoreRepo.save(score);
    }

    public List<Score> getUserHistory(Long userId) {
        return scoreRepo.findByUserId(userId);
    }

    public List<Score> getTop10Scores(Long gameId) {
        return scoreRepo.findTop10ByGameIdOrderByScoreDesc(gameId);
    }
}