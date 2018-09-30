import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Participant } from './participant';

@Injectable()

export class ParticipantService {

  constructor(private http: HttpClient) {}
    getParticipants() {
      return this.http.get('/assets/data/participants.json')
        .toPromise()
        .then(res => <Participant[]> res)
        .then(data => { return data; });
    }
}
