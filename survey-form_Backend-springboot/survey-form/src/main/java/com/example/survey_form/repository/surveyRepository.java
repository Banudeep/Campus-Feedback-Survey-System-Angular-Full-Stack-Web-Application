package com.example.survey_form.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.survey_form.model.surveyForm;

public interface surveyRepository extends JpaRepository<surveyForm, Long> {
}
