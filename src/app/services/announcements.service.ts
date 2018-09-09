import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement';
import { map } from 'rxjs/operators';


@Injectable()
export class AnnouncementsService {

  announcementsCollection: AngularFirestoreCollection<Announcement>; // firestore collection reference
  announcements: Observable<Announcement[]>; // array of announcements
  announcementDoc : AngularFirestoreDocument<Announcement>; // single document to delete or update 

  constructor(public afs: AngularFirestore) {
    // return collection as observable
    this.announcementsCollection = this.afs.collection<Announcement>('announcements', ref => {
      return ref;
    });
  }

  readAnnouncements() {
    // this.announcements = this.announcementsCollection.valueChanges();
    return this.announcements = this.afs.collection('announcements').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Announcement;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  createAnnouncement(announcement: Announcement) {
    this.announcementsCollection.add(announcement);
  }

  deleteAnnouncment(announcement: Announcement) {
    this.announcementDoc = this.afs.doc(`announcements/${announcement.id}`);
    this.announcementDoc.delete();
  }
}
