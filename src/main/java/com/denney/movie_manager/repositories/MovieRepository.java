package com.denney.movie_manager.repositories;

import com.denney.movie_manager.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Integer>{
}
