package com.denney.movie_manager;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class GeminiService {
    private final Client client;

    public GeminiService(@Value("${gemini.api.key}") String apiKey) {
        this.client = Client.builder().apiKey(apiKey).build();
    }

    public String generateDescription(String movieTitle) {
        try {
            String prompt = "Provide a concise movie description for: " + movieTitle +
                    ". Keep it under 500 characters.";

            GenerateContentResponse response = client.models.generateContent(
                    "gemini-3-flash-preview",
                    prompt,
                    null
            );

            return response.text();
        } catch (Exception e) {
            System.err.println("Gemini Error: " + e.getMessage());
            return "No description available at this time.";
        }
    }
}