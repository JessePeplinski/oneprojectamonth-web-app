import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ParticipantService } from './participant.service';
import { Participant } from './participant';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.less'],
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

export class ParticipantsComponent implements OnInit {
  participants: Participant[];

  constructor(private participantService: ParticipantService) {
  }

  ngOnInit() {
    this.participantService.getParticipants().then(participants => this.participants = participants);
  }

}
