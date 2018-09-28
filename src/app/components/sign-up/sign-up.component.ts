import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

import { FormControl, FormGroup } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.35s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.35s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class SignUpComponent implements OnInit {

  updateEmail: boolean;

  loginForm: any = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  signUpForm: any = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  changeEmailForm: any = new FormGroup({
    newEmail: new FormControl(),
  });

  constructor(public authService: AuthService) { }

  ngOnInit() { }

  signUpWithEmail(value) {
    this.authService.signUpWithEmailAndPassword(value);
  }

  changeEmail(value) {
    console.log(value.newEmail);
    this.authService.updateEmail(value);
  }

  loginWithEmail(value) {
    this.authService.signInWithEmailAndPassword(value);
  }
}
