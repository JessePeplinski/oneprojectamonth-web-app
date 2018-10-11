import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../../core/auth.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {
  display = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  openMenu() {
    this.display = !this.display;
    document.getElementsByClassName('blur-wrapper')[0].classList.toggle('open');
  }
}
