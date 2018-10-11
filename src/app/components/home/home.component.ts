import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({  transform: 'scale(0)' }),
        animate('.35s ease-in-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)' }),
        animate('.35s ease-in-out', style({ opacity: 0, transform: 'scale(0)' }))
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {

  constructor() { }


  ngOnInit() {
  }

}
