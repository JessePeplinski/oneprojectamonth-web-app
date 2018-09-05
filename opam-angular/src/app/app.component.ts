import { Component, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {

  announcementsCollection: AngularFirestoreCollection<any[]>;
  announcements: Observable<any[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.announcementsCollection = this.afs.collection('announcements', ref => {
      return ref;
    });
    this.announcements = this.announcementsCollection.valueChanges();
  }
}