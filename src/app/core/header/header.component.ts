import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  Validators,
  FormBuilder
  } from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchForm: FormGroup;
  constructor() {
    this.searchForm = this.BuildFormGroup();
  }  

  BuildFormGroup() {
    
    return new FormGroup({
      searchTerm: new FormControl('', [Validators.required])      
    });   
  }

  ngOnInit() {
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }
}
