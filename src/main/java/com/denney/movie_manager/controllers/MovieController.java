package com.denney.movie_manager.controllers;


import com.denney.movie_manager.GeminiService;
import com.denney.movie_manager.models.Movie;
import com.denney.movie_manager.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:5173") //React Connection
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private GeminiService geminiService;

    @GetMapping("")
    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    @PostMapping("")
    public Movie createMovie(@RequestBody Movie movie) {
        String title = movie.getTitle();
        String aiDesc = geminiService.generateDescription(title);
        movie.setDescription(aiDesc);
        return movieRepository.save(movie);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable int id, @RequestBody Movie movie) {
        movie.setId(id);
        return movieRepository.save(movie);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable int id) {
        movieRepository.deleteById(id);
    }
}
