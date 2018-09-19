import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
