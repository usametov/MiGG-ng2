import { Component, OnInit } from "@angular/core";
import {
   FormGroup,
   FormControl,
   ReactiveFormsModule,
   FormsModule,
   Validators,
   FormBuilder
   } from "@angular/forms";

@Component({
selector: "login",
templateUrl: "./login.html",
styleUrls: ["./login.css"]
})
export class Login implements OnInit{
  
  loginForm: FormGroup;
  
  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")//TODO: find something better 
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ])
    });

    
  }


}