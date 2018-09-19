import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
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

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
