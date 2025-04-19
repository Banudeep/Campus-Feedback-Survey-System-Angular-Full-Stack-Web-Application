# Campus-Feedback-Survey-System-Angular-Full-Stack-Web-Application
# 🏫 Campus Feedback Survey System

This project is developed as part of SWE 642: Software Engineering Course Assignment 3 at George Mason University. The goal is to gain full-stack development experience by building a Student Survey Management System using Angular (frontend) and Spring Boot with JPA/Hibernate (backend).

## 📌 Overview

The Campus Feedback Survey System allows prospective students to fill out a detailed survey form after visiting the campus. It also provides administrative functionalities to view, update, and delete survey entries.

## 🛠️ Technologies Used

- **Frontend**: Angular 2+
- **Backend**: Spring Boot, RESTful APIs
- **Database**: MySQL
- **ORM**: JPA with Hibernate
- **Build Tools**: Maven (for backend), Angular CLI (for frontend)

## 📋 Features

### Student Survey Form
- Collects personal details: name, address, email, phone, and date of survey
- Checkboxes for favorite aspects: students, campus, dorms, etc.
- Radio buttons for source of interest: friends, TV, Internet, other
- Dropdown for recommendation likelihood: Very Likely, Likely, Unlikely
- Additional comments section
- Submit and cancel functionality

### Survey Management
- View all submitted surveys
- Update existing survey entries
- Delete individual surveys

## 🗂️ Project Structure

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js & npm
- Angular CLI (`npm install -g @angular/cli`)
- MySQL Server

### Backend Setup
1. Navigate to `backend/` directory.
2. Configure `application.properties` with your MySQL DB credentials.
3. Run:
   ```bash
   mvn clean install
   mvn spring-boot:run

