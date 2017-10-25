import { Component, OnInit } from "@angular/core";
import {
   FormGroup,
   FormControl,
   ReactiveFormsModule,
   FormsModule,
   Validators,
   FormBuilder
   } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserStore } from "app/states/user.store";

@Component({
selector: "login",
templateUrl: "./login.html",
styleUrls: ["./login.css"]
})
export class Login implements OnInit{

  returnUrl: string;  
  loginForm: FormGroup;
  loading = false;
  email: string;
  password: string;
  errMsg: string;

  constructor(
    private route: ActivatedRoute,
    private store: UserStore,
    private router: Router) { }
    
  ngOnInit(): void {

    this.loginForm = this.BuildFormGroup();
    //TODO: call store dispatch here
    //this.authService.signoutLocally();    

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';    
  }

  login() {
    
    this.loading = true;
    this.email = this.loginForm.controls["email"].value;
    this.password = this.loginForm.controls["password"].value;    
    console.log("email - password:", `${this.email} - ${this.password}`);
    
    this.store.requestLogin(this.email, this.password);
    this.store.getAuthState().subscribe(
      state => state.data.caseOf({
        left: err => this.errMsg = err.errorMessage,
        right: gotToken => {
          this.router.navigate([this.returnUrl || '/']);
          return gotToken;}
      }));    
  }

  BuildFormGroup() {

    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });   
  }
}