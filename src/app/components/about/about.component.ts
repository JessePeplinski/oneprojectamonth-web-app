import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { AnnouncementsService } from '../../services/announcements.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({opacity: 0}),
        animate('.35s ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('.35s ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {

  constructor(private announcement: AnnouncementsService) {
  }

  ngOnInit() {
    this.announcement.checkIfSubCollectionExists()
      .then(exists => console.log(exists))
      .catch(doesnt => console.log(doesnt));
  }

}
