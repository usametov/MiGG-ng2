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

@Component({
selector: "login",
templateUrl: "./login.html",
styleUrls: ["./login.css"]
})
export class Login implements OnInit{

  returnUrl: string;  
  loginForm: FormGroup;
  loading = false;

  constructor(
    private route: ActivatedRoute,
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
    //TODO: call store dispatch here
    // this.authenticationService.login(this.model.username, this.model.password)
    //     .subscribe(
    //         data => {
    //             this.router.navigate([this.returnUrl]);
    //         },
    //         error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //         });
    this.router.navigate(['/']);
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