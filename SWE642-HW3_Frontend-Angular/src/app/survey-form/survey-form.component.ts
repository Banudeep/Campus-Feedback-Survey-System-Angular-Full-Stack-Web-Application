import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
  surveyForm!: FormGroup;
  likedOptions = ['Students', 'Location', 'Campus', 'Atmosphere', 'Dorm Rooms', 'Sports'];
  interestOptions = ['Friends', 'Television', 'Internet', 'Other'];
  recommendOptions = ['Very Likely', 'Likely', 'Unlikely'];

  constructor(private fb: FormBuilder, private surveyService: SurveyService) {}

  ngOnInit() {
    this.surveyForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfSurvey: ['', Validators.required],
      // likes: this.fb.group(this.createLikesControls()),
      likes: this.fb.array([]), // Initialize as FormArray
      interestSource: ['', Validators.required],
      likelihood: ['', Validators.required],
      comments: ['']
    });
  }

  // Getter for likes FormArray
  get likes(): FormArray {
    return this.surveyForm.get('likes') as FormArray;
  }

  // Handle checkbox change
  onCheckboxChange(event: Event, option: string) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.likes.push(this.fb.control(option)); // Add selected option to FormArray
    } else {
      const index = this.likes.controls.findIndex(ctrl => ctrl.value === option);
      if (index >= 0) {
        this.likes.removeAt(index); // Remove unchecked option
      }
    }
    console.log("Likes :",  this.surveyForm.value.likes)
  }

   // Function to create controls for liked options
   createLikesControls(): { [key: string]: boolean } {
    return this.likedOptions.reduce((acc, option) => {
      acc[option] = false; // Initialize each checkbox as unchecked
      return acc;
    }, {} as { [key: string]: boolean });
  }

  onSubmit() {
    if (this.surveyForm.valid) {
      this.surveyService.submitSurvey(this.surveyForm.value).subscribe(
        response => {
          console.log("Likes: ",this.surveyForm.value)
          console.log('Survey submitted successfully', response);
          this.surveyForm.reset();
          this.likes.clear();
        },
        error => console.error('Error submitting survey', error)
      );
    }
  }

  onCancel() {
    this.likes.clear();
    this.surveyForm.reset();
  }
}