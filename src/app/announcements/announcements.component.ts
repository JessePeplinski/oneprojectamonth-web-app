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
  
  announcementsCollection: AngularFirestoreCollection<Announcement>;
  announcements: Observable<Announcement[]>;
  
  // Querying single document
  // announcementDoc: AngularFirestoreDocument<Announcement>;
  // announcement: Observable<Announcement>;


  newContent: string;

  constructor(private afs: AngularFirestore) { 
    // this.announcementsCollection = this.afs.collection<Announcement>('announcements');
    // this.announcements = this.announcementsCollection.valueChanges();
  }

  ngOnInit() {
    // querying single document
    // this.announcementDoc = this.afs.doc('announcements/GJi7UWEz5xykpFrROOcQ');
    // this.announcement = this.announcementDoc.valueChanges();

    // Query the announcements
    this.announcementsCollection = this.afs.collection<Announcement>('announcements', ref => {
      return ref;
    });
    this.announcements = this.announcementsCollection.valueChanges();
  }

  readAnnouncement() {

  }

  createAnnouncementInCollection(title: string, content: string, date: string) {

    let id = this.afs.createId();

    this.afs.collection<Announcement>('announcements').add({
      id: id,
      title: title,
      content: content,
      date: date,
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  // This works, but the params aren't working.
  // createAnnouncementWithId(title: string, content: string, date: string) {
  //   let id = this.afs.createId();

  //   this.afs.collection('announcements').doc(id).set({
  //     title: 'test'
  //   })
  //   .then(function(id) {
  //     console.log("Document written with ID: ", id);
  //   })
  //   .catch(function(error) {
  //       console.error("Error adding document: ", error);
  //   });
  // }

  updateAnnouncement() {
    // this.announcementDoc.update({ content: this.newContent });
  }

  deleteAnnouncement() {

  }
}
