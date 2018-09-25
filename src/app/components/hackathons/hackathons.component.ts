import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-hackathons',
  templateUrl: './hackathons.component.html',
  styleUrls: ['./hackathons.component.css']
})
export class HackathonsComponent implements OnInit {

  dateParams$;

  constructor(private route: ActivatedRoute, private router: Router, public afs: AngularFirestore) { }

  ngOnInit() {
    this.dateParams$ = this.route.paramMap.pipe(
      switchMap(params => {

        const month = params.get('month');
        const year = params.get('year');

        this.dateParams$.month = month;
        this.dateParams$.year = year;

        return this.afs.collection('hackathons').valueChanges();
      })
    );
  }
}
