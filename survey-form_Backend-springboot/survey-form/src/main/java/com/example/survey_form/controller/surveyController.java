package com.example.survey_form.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation. PostMapping; 
import org.springframework.web.bind.annotation. PutMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation. RequestMapping; 
import org.springframework.web.bind.annotation. RestController;
import com.example.survey_form.model.surveyForm;
import com.example.survey_form.repository.surveyRepository;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@RestController
@RequestMapping("/api/survey")
@CrossOrigin(origins = "*")
public class surveyController {

    private surveyRepository surveyRepository;
    
    @Configuration
    public class WebConfig implements WebMvcConfigurer {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/api/**") // Adjust this to match your API paths
                    .allowedOrigins("http://localhost:4200") // Allow requests from Angular app
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*");
        }
    }

    public surveyController(surveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }

//    @PostMapping
//    public ResponseEntity<surveyForm> createSurvey(@RequestBody surveyForm surveyForm) {
//        return ResponseEntity.ok(surveyRepository.save(surveyForm));
//    }
    
    @PostMapping
    public ResponseEntity<surveyForm> createSurvey(@RequestBody surveyForm surveyForm) {
        try {
            // Save the survey with serialized likes
           surveyForm savedSurvey = surveyRepository.save(surveyForm);
            return ResponseEntity.ok(savedSurvey);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping
    public ResponseEntity<List<surveyForm>> getAllSurveys() {
        return ResponseEntity.ok(surveyRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<surveyForm> getSurveyById(@PathVariable Long id) {
        return surveyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping
    public ResponseEntity<surveyForm> updateSurvey(@RequestBody surveyForm surveyDetails) {
        return surveyRepository.findById(surveyDetails.getId())
                .map(survey -> {
                    survey.setFirstName(surveyDetails.getFirstName());
                    survey.setLastName(surveyDetails.getLastName());
                    survey.setStreetAddress(surveyDetails.getStreetAddress());
                    survey.setCity(surveyDetails.getCity());
                    survey.setState(surveyDetails.getState());
                    survey.setZip(surveyDetails.getZip());
                    survey.setTelephone(surveyDetails.getTelephone());
                    survey.setEmail(surveyDetails.getEmail());
                    survey.setDateOfSurvey(surveyDetails.getDateOfSurvey());
                    survey.setLikelihood(surveyDetails.getLikelihood());
                    survey.setInterestSource(surveyDetails.getInterestSource());
                    survey.setLikelihood(surveyDetails.getLikelihood());
                    survey.setComments(surveyDetails.getComments());
                    return ResponseEntity.ok(surveyRepository.save(survey));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSurvey(@PathVariable Long id) {
        if (surveyRepository.existsById(id)) {
            surveyRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
