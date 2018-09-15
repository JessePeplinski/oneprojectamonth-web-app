import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement';

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

  /**
   * Return the announcements from firestore
   *
   * @returns observable
   */
  readAllAnnouncements() {
    return this.afs.collection('announcements').valueChanges();
  }

  /**
   * Return a single document based on an ID from firestore
   *
   * @returns observable
   */
  readSingleAnnouncementBasedOnId(id) {
    return this.afs.doc(`announcements/${id}`).valueChanges();
  }

  /**
   * Create an announcement document in the 'announcements' collection in firestore
   *
   * @param {Announcement} announcement Announcement
   */
  createAnnouncement(announcement: Announcement) {
    let id = this.afs.createId();     // Generate a random id from angular firestore

    // Consideration: Replaced set with add and randomly generated an ID. Not sure if this is the best way but resolved the firebase document not receiving an ID.
    this.announcementsCollection.doc(id).set({
      id: id,
      title: announcement.title,
      content: announcement.content,
      dateCreated: new Date(),
      isVisible: true
    })
    .then(function() {
      console.log("Document succesfully created with ID: " + id);
    }).catch(function(error) {
      console.error("Error creating document: " + error);
    });
  }

  /**
   * Update an announcement document in the 'announcements' collection in firestore
   *
   * @param {Announcement} announcement Announcement
   */
  updateAnnouncement(announcement: Announcement) {
    this.announcementDoc = this.afs.doc(`announcements/${announcement.id}`);
    this.announcementDoc.update({
      title: announcement.title,
      updatedOn: new Date(),
      content: announcement.content
    })
    .then(function() {
      console.log("Document succesfully updated with id: " + announcement.id);
    }).catch(function(error) {
      console.error("Error updating document: " + error);
    });
  }

  /**
   * Delete an announcement document in the 'announcements' collection in firestore
   *
   * @param {Announcement} announcement Announcement
   */
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
