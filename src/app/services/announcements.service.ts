import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement';
import { announcementsCollectionName } from '../constants/constants';
import { formatDate } from '@angular/common';

@Injectable()
export class AnnouncementsService {

  announcementDoc : AngularFirestoreDocument<Announcement>; // single document to delete or update

  constructor(public afs: AngularFirestore) {}

  /**
   * Return the announcements from firestore filtered on the month and year in the query params
   *
   * @returns observable
   */
  readAllAnnouncements(paramDate) {

    // TODO: Figure out if we can leverage the timestamp instead of the monthCreated and yearCreated

    // return this.afs.collection(announcementsCollectionName).valueChanges();

    return this.afs.collection(announcementsCollectionName, ref => ref
      .where('monthCreated', '==', paramDate.month)
      .where('yearCreated', '==', paramDate.year) // FIXME: don't actually make this a string
    )
    .valueChanges();
  }

  /**
   * Return a single document based on an ID from firestore
   *
   * @returns observable
   */
  readSingleAnnouncementBasedOnId(id) {
    return this.afs.doc(`${announcementsCollectionName}/${id}`).valueChanges();
  }

  /**
   * Create an announcement document in the 'announcements' collection in firestore
   *
   * @param {Announcement} announcement Announcement
   */
  createAnnouncement(announcement: Announcement) {
    let id = this.afs.createId();     // Generate a random id from angular firestore
    var newDate = new Date();
    var month = newDate.toLocaleString('en-us', {month: "long"}); // get month as a string, ie January
    var year = newDate.getFullYear().toString(); // get month as a 4 digit year, ie YYYY // FIXME: don't actually make this a string

    // Consideration: Replaced set with add and randomly generated an ID. Not sure if this is the best way but resolved the firebase document not receiving an ID.
    this.afs.collection(announcementsCollectionName).doc(id).set({
      id: id,
      title: announcement.title,
      content: announcement.content,
      dateCreated: newDate,
      monthCreated: month,
      yearCreated: year,
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
    this.announcementDoc = this.afs.doc(`${announcementsCollectionName}/${announcement.id}`);
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
    this.announcementDoc = this.afs.doc(`${announcementsCollectionName}/${announcement.id}`);
    this.announcementDoc.delete()
    .then(function() {
      console.log("Document succesfully deleted!")
    }).catch(function(error) {
      console.error("Error removing document: " + error);
    });
  }
}
