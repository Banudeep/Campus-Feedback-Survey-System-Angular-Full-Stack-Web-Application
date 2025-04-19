import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SurveyService {
  private apiUrl = 'http://localhost:8080/api/survey'; // Adjust this URL to match your Spring Boot server

  constructor(private http: HttpClient) { }

  submitSurvey(survey: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, survey);
  }

  getAllSurveys(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSurveyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateSurvey(id: number, survey: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, survey);
  }
  
  deleteSurvey(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}