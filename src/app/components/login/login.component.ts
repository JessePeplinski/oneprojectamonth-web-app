import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any = new FormGroup(
    {
      email: new FormControl(),
      password: new FormControl()
    });
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  loginWithEmail(value) {
    this.authService.signInWithEmailAndPassword(value);
  }

}
