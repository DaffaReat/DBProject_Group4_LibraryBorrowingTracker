package com.housebartholomeow.LibraryBookTrackerAPI.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply this CORS configuration to all endpoints
            .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000") // ⬅️ Replace with your actual frontend URL(s)
            .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow common HTTP methods
            .allowedHeaders("*") // Allow all headers
            .allowCredentials(true); // Allow sending cookies (like JSESSIONID, if you were using sessions)
    }
}
