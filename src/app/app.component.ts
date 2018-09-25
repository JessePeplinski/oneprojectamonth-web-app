import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, animate, style, group, animateChild, query, stagger, transition, state } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        query(':enter, :leave', style({ opacity: 1 })),
        group([
          query(':enter', [
            style({ opacity: 0, transform: 'scaleY(.75)', 'transform-origin': 'top' }),
            animate('.35s ease-in-out', style({ opacity: 1, transform: 'scaleY(1)', 'transform-origin': 'top' }))
          ]),
          query(':leave', [
            style({ opacity: 1, transform: 'scaleY(1)', 'transform-origin': 'top' }),
            animate('.35s ease-in-out', style({ opacity: 0, transform: 'scaleY(.75)', 'transform-origin': 'top' }))]),
        ])
      ])
    ])
  ]
})

export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }
}
