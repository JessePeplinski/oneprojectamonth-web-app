import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Announcement } from './announcement';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})

export class AnnouncementsComponent implements OnInit {
  
  // announcementsCollection: AngularFirestoreCollection<Announcement>;
  // announcements: Observable<Announcement[]>;
  announcementDoc: AngularFirestoreDocument<Announcement>;
  announcement: Observable<Announcement>;


  newContent: string;
  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.announcementDoc = this.afs.doc('announcements/GJi7UWEz5xykpFrROOcQ');
    this.announcement = this.announcementDoc.valueChanges();
  }
  updateContent() {
    this.announcementDoc.update({ content: this.newContent });
  }
}
