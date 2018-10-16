import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {
  themeValue = 'Light Theme';
  constructor() { }

  ngOnInit() {
    this.setAppTheme();
  }

  setAppTheme() {
    if (this.themeValue === 'Light Theme') {
      const el = document.getElementById('body');
      el.className = 'light-theme';
    } else if (this.themeValue === 'Dark Theme') {
      const el = document.getElementById('body');
      el.className = 'dark-theme';
    } else if (this.themeValue === 'Hack Upstate') {
      const el = document.getElementById('body');
      el.className = 'hack-upstate-theme';
    } else if (this.themeValue === 'Definitely Not Twitch') {
      const el = document.getElementById('body');
      el.className = 'definitely-not-twitch-theme';
    } else if (this.themeValue === 'Syntax Pod') {
      const el = document.getElementById('body');
      el.className = 'syntax-pod-theme';
    } else if (this.themeValue === 'Monochrome') {
      const el = document.getElementById('body');
      el.className = 'monochrome-theme';
    } else if (this.themeValue === 'Dark Neon') {
      const el = document.getElementById('body');
      el.className = 'dark-neon-theme';
    }
    console.log(this.themeValue);
  }
}
