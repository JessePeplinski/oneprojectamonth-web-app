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
   * Return the announcements from firestore
   *
   * @returns observable
   */
  readAllAnnouncements(paramDate) {

    // TODO: Figure out if we can leverage the timestamp instead of the monthCreated and yearCreated

    // return this.afs.collection(announcementsCollectionName).valueChanges();

    // https://stackoverflow.com/questions/13571700/get-first-and-last-date-of-current-month-with-javascript-or-jquery
    var date = new Date();
    var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let start = new Date('2018-09-01');
    let end = new Date('2018-09-31');

    // console.log(paramDate.month);
    // console.log(paramDate.year);

    // TODO: Add year ref
    // https://firebase.google.com/docs/firestore/query-data/queries

    // Queries with range filters on different fields, as described in the previous section firestore
    // adding another --> .where('yearCreated', '==', paramDate.year) does not work
    // this does work --> .where('monthCreated', '==', paramDate.month)
    // https://stackoverflow.com/questions/48059941/query-firebase-data-by-timestamp-month
    return this.afs.collection(announcementsCollectionName, ref => ref
      .where('monthCreated', '==', paramDate.month)
      // .where("dateCreated", ">=", "2018-09")
      // .where("dateCreated", "<", "2018-10")
      // .where('dateCreated', '==', '2018-09') // does this expects a UNIX time (ie 123123819238912)?
      // .where('dateCreated', '>', start)
      // .where('dateCreated', '<', end)
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
    var year = newDate.getFullYear(); // get month as a 4 digit year, ie YYYY

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
