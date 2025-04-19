import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyService } from '../survey.service';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { Router } from '@angular/router';

// This component is used to edit the existing survey records
@Component({
  selector: 'app-edit-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-survey.component.html',
  styleUrl: './edit-survey.component.css'
})
export class EditSurveyComponent {
  surveyForm!: FormGroup;
  likedOptions = ['Students', 'Location', 'Campus', 'Atmosphere', 'Dorm Rooms', 'Sports'];
  interestOptions = ['Friends', 'Television', 'Internet', 'Other'];
  recommendOptions = ['Very Likely', 'Likely', 'Unlikely'];

  constructor(private route: ActivatedRoute, private routes: Router,private fb: FormBuilder, private surveyService: SurveyService) {}

  surveys: any[] = [];

  id: string | null = null; // Variable to hold the ID from the URL

  ngOnInit() {
    this.surveyForm = this.fb.group({
      id: this.route.snapshot.paramMap.get('id'),
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfSurvey: ['', Validators.required],
      // likes: this.fb.group(
      //   this.likedOptions.reduce((acc, option) => ({ ...acc, [option]: false }), {})
      // ),
      // likes: this.fb.group(this.createLikesControls()), // Dynamically create likes controls
      likes: this.fb.array([]), // Initialize as FormArray
      interestSource: ['', Validators.required],
      likelihood: ['', Validators.required],
      comments: ['']
    });
    this.loadSurvey();
  }

  loadSurvey() {
    const id = this.surveyForm.value.id;
    // Fetch survey data from the backend using the ID
    this.surveyService.getSurveyById(id).subscribe(
      (survey) => {
      //   // Process the likes array to match the checkboxes
      // const likesGroup = this.likedOptions.reduce((acc: any, option: string) => {
      //   acc[option] = survey.likes.includes(option); // Check if the option is in the likes array
      //   return acc;
      // }, {});
        // Populate the form with the retrieved data
        this.surveyForm.patchValue({
          id: survey.id,
          firstName: survey.firstName,
          lastName: survey.lastName,
          streetAddress: survey.streetAddress,
          city: survey.city,
          state: survey.state,
          zip: survey.zip,
          telephone: survey.telephone,
          email: survey.email,
          dateOfSurvey: survey.dateOfSurvey,
          // likes: likesGroup, // Initialize as FormArray
          interestSource: survey.interestSource,
          likelihood: survey.likelihood,
          comments: survey.comments,
        });
        // Populate likes FormArray
        console.log("Inside loadsurvey",this.surveyForm.value.likes)
        // survey.likes.forEach((like: string) => {
        //   this.likes.push(this.fb.control(like));
        // });
        // Load the checked likes (checkboxes) into the FormArray
        this.setLikes(survey.likes);
        this.likes.clear();
          console.log("Inside loadsurvey after changes",this.likes)
        },
      
      (error) => console.error('Error loading survey:', error)
    );
  }

  // Set the likes FormArray based on the retrieved data
  setLikes(likes: string[]) {
    const likesFormArray = this.likes;
    likesFormArray.clear(); // Clear any existing values
    
    // Populate the FormArray with the checked values
    likes.forEach(like => {
      likesFormArray.push(this.fb.control(like));
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

    // Using Set to ensure uniqueness
    // const currentLikes = new Set(this.surveyForm.value.likes); // Get current unique likes

    // if (checkbox.checked) {
    //   currentLikes.add(option); // Add selected option to Set
    // } else {
    //   currentLikes.delete(option); // Remove unchecked option from Set
    // }

    // // Update the likes FormArray with unique values
    // this.surveyForm.patchValue({
    //   likes: Array.from(currentLikes) // Convert Set back to array
    // });

    // console.log("Likes: ", this.surveyForm.value.likes);
  }

  editSurvey() {
    if (this.surveyForm.valid) {
      const id = this.surveyForm.value.id;
      console.log('ID is :', id)
      console.log("___", this.surveyForm.value)
      this.surveyService.submitSurvey(this.surveyForm.value).subscribe(
        response => {

          console.log('Survey submitted successfully', response);
          this.likes.clear();
          this.surveyForm.reset();
          this.routes.navigate(['/list']); // Navigates to the survey list page
        },
        error => console.error('Error submitting survey', error)
      );
    }
  }

  // editSurvey() {
  //   if (this.surveyForm.valid) {
  //     const id = this.surveyForm.value.id; // Get ID from form value
  //     console.log('Id is:', id);
  //     this.surveyService.updateSurvey(id, this.surveyForm.value).subscribe(
  //       () => {
  //         console.log('Survey edited successfully', id);
  //         // Optionally navigate back or show a success message
  //       },
  //       error => console.error('Error editing survey', id, error)
  //     );
  //   }
  // }

  onCancel() {
    this.likes.clear();
    this.surveyForm.reset();
    this.routes.navigate(['/list']); // Navigates to the survey list page
  }
}
