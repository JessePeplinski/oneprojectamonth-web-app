import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement';
import { map } from 'rxjs/operators';


@Injectable()
export class AnnouncementsService {

  announcementsCollection: AngularFirestoreCollection<Announcement>; // firestore collection reference of announcements
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

    // Map over the observable returned by snapshotChanges to extract the doucments id and data
    return this.announcements = this.announcementsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Announcement;
        data.id = action.payload.doc.id;
        return data;
      })
    }));
  }

  createAnnouncement(announcement: Announcement) {

    // BUG: Document has an ID on the front-end but isn't added to firebase.
    // TODO: Pass in ID here to the document. I want to pass in announcement and a random ID as a field. id: <don't have>, name: <do have>, etc...
    let id = this.afs.createId();

    this.announcementsCollection.add(announcement)
    .then(function(docRef) {
      console.log("Document succesfully created with ID: " + docRef.id);
    }).catch(function(error) {
      console.error("Error creating document: " + error);
    });
  }

  updateAnnouncement(announcement: Announcement) {
    console.log(`ID TO UPDATE: ${announcement.id}`);
    this.announcementDoc = this.afs.doc(`announcements/${announcement.id}`);
    this.announcementDoc.update(announcement)
    .then(function() {
      console.log("Document succesfully updated!")
    }).catch(function(error) {
      console.error("Error updating document: " + error);
    });
  }

  deleteAnnouncment(announcement: Announcement) {
    console.log(`ID TO DELETE: ${announcement.id}`);
    this.announcementDoc = this.afs.doc(`announcements/${announcement.id}`);
    this.announcementDoc.delete()
    .then(function() {
      console.log("Document succesfully deleted!")
    }).catch(function(error) {
      console.error("Error removing document: " + error);
    });
  }
}
