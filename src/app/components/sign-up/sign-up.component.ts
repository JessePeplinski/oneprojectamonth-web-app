import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  signUpForm: any = new FormGroup(
    {
      email: new FormControl(),
      password: new FormControl()
    });
  changeEmailForm: any = new FormGroup(
    {
      newEmail: new FormControl(),
    }
  );
  updateEmail: boolean;

  constructor(public authService: AuthService) {
  }
  ngOnInit() {
  }
  signUpWithEmail(value) {
    this.authService.signUpWithEmailAndPassword(value);
  }
  changeEmail(value) {
    console.log(value.newEmail);
    this.authService.updateEmail(value);
  }

}
