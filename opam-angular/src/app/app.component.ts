import { Component, Injectable, OnInit  } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface Announcement {
  title: string;
  date: Date;
  content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {

  // announcementsCollection: AngularFirestoreCollection<Announcement>;
  // announcements: Observable<Announcement[]>;
  announcementDoc: AngularFirestoreDocument<Announcement>;
  announcement: Observable<Announcement>;


  newContent: string;

  constructor(private afs: AngularFirestore, private router: Router) { }

  ngOnInit() {

  }
}