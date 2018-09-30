import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ParticipantService } from './participant.service';
import { Participant } from './participant';
@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css'],
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

export class ParticipantsComponent implements OnInit {
  participants: Participant[];
  constructor(private participantService: ParticipantService) { }

  ngOnInit() {
    this.participantService.getParticipants().then(participants => this.participants = participants);
  }

}
