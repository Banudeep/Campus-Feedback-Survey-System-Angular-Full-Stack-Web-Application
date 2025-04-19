package com.example.survey_form.model;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class surveyForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "First_Name")
    private String firstName;
    @Column(name = "Last_Name")
    private String lastName;
    @Column(name = "streetAddress")
    private String streetAddress;
    @Column(name = "city")
    private String city;
    @Column(name = "state")
    private String state;
    @Column(name = "zip")
    private String zip;
    @Column(name = "telephone")
    private String telephone;
    @Column(name = "email")
    private String email;
    
    @Column(name = "date_of_survey")
    private LocalDate dateOfSurvey;

//    @ElementCollection
//    @CollectionTable(name = "survey_likes", joinColumns = @JoinColumn(name = "survey_id"))
//    @Column(name = "liked_item")
//    private java.util.List<String> likes;
    
    @Column(name = "interestSource")
    private String interestSource; // Friends, TV, Internet, Other
    @Column(name = "likelihood")
    private String likelihood; // Very Likely, Likely, Unlikely
    @Column(name = "comments")
    private String comments;
    
    @Column(columnDefinition = "TEXT")
    private String likes;
    
 // Getter and Setter for `likes` with JSON serialization/deserialization
    public List<String> getLikes() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(this.likes, new TypeReference<List<String>>() {});
    }

    public void setLikes(List<String> likes) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        this.likes = mapper.writeValueAsString(likes);
    }
    
    public Long getId() {
		return id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getStreetAddress() {
		return streetAddress;
	}
	public void setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getZip() {
		return zip;
	}
	public void setZip(String zip) {
		this.zip = zip;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getInterestSource() {
		return interestSource;
	}
	public void setInterestSource(String interestSource) {
		this.interestSource = interestSource;
	}
	public String getLikelihood() {
		return likelihood;
	}
	public void setLikelihood(String likelihood) {
		this.likelihood = likelihood;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public LocalDate getDateOfSurvey() {
		return dateOfSurvey;
	}
	public void setDateOfSurvey(LocalDate dateOfSurvey) {
		this.dateOfSurvey = dateOfSurvey;
	}
}
