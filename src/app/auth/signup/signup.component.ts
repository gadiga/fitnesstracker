import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate;
  minDate;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 118);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    
  }

  onSubmit (form: NgForm) {
    const authData: any = {
      email: form.controls['email'].value,
      password: form.controls['password'].value
    };
    this.authService.registerUser(authData);
  }

  getEmailErrorMessage () {
    return "Enter a valid email address";
  }

}
