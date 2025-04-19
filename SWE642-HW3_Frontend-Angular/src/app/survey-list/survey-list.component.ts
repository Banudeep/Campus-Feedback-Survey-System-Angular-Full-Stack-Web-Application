import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyService } from '../survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [CommonModule],
  // template: `
  //   <!-- Your existing template here -->
  //   Survey-List
  // `
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})

export class SurveyListComponent implements OnInit {
  surveys: any[] = [];

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit() {
    this.loadSurveys();
  }

  loadSurveys() {
    this.surveyService.getAllSurveys().subscribe(
      data => {
        this.surveys = data
        console.log("This is the data loaded from the database",data)
      },
      error => console.error('Error fetching surveys', error)
    );
  }

  viewMode: string = 'list'; // Initialize it with a default value

  deleteSurvey(id: number) {
    if (confirm('Are you sure you want to delete this survey?')) {
      this.surveyService.deleteSurvey(id).subscribe(
        () => {
          console.log('Survey deleted successfully', id);
          this.loadSurveys();
        },
        error => console.error('Error deleting survey', error, id)
      );
    }
  }

  editSurvey(id: number) {
    this.router.navigate(['/edit-survey', id]); // Navigate to edit route with ID
  }
}
