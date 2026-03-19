package com.example.arcade_system.repository;

import com.example.arcade_system.model.Score;
import com.example.arcade_system.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {

    // List<Score> findByUserId(Long userId);
    List<Score> findByUser(User user);

    List<Score> findTop10ByGameIdOrderByScoreDesc(Long gameId);
}