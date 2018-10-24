import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, animate, style, group, animateChild, query, stagger, transition, state } from '@angular/animations';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less'],
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
  constructor(private authService: AuthService) {
    authService.user$.subscribe(user => {
      console.log(user);
      if (user.preferredTheme) {
        if (user.preferredTheme === 'Light Theme') {
          const el = document.getElementById('body');
          el.className = 'light-theme';
        } else if (user.preferredTheme === 'Dark Theme') {
          const el = document.getElementById('body');
          el.className = 'dark-theme';
        } else if (user.preferredTheme === 'Hack Upstate') {
          const el = document.getElementById('body');
          el.className = 'hack-upstate-theme';
        } else if (user.preferredTheme === 'Definitely Not Twitch') {
          const el = document.getElementById('body');
          el.className = 'definitely-not-twitch-theme';
        } else if (user.preferredTheme === 'Syntax Pod') {
          const el = document.getElementById('body');
          el.className = 'syntax-pod-theme';
        } else if (user.preferredTheme === 'Monochrome') {
          const el = document.getElementById('body');
          el.className = 'monochrome-theme';
        } else if (user.preferredTheme === 'Dark Neon') {
          const el = document.getElementById('body');
          el.className = 'dark-neon-theme';
        }
      }
    });
  }
  ngOnInit() {
  }
}
