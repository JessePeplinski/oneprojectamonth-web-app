import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Announcement } from '../models/announcement';
import { CollectionName } from '../constants/collection-name';
import { CrudService } from '../services/crud.service';

@Injectable()
export class AnnouncementsService extends CrudService<Announcement> {

  // announcementDoc: AngularFirestoreDocument<Announcement>; // single document to delete or update

  constructor(afs: AngularFirestore) {
    super(afs);
  }

  /**
   * Return the announcements from firestore filtered on the month and year in the query params
   *
   * @returns observable
   */
  readAllAnnouncements(paramDate) {

    // TODO: Figure out if we can leverage the timestamp instead of the monthCreated and yearCreated
    // TODO: Can we call this function from the Crud Service somehow? Not sure how we would pass the .where() clauses

    // return this.afs.collection(announcementsCollectionName).valueChanges();

    return this.afs.collection(CollectionName.announcements, ref => ref
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
    return super.readDocument(CollectionName.announcements, id);
  }

  /**
   * Create an announcement document in the 'announcements' collection in firestore
   *
   * @param {Announcement} announcement Announcement
   */
  createAnnouncement(announcement: Announcement) {
    let id = this.afs.createId();     // Generate a random id from angular firestore // Consideration: Replaced set with add and randomly generated an ID. Not sure if this is the best way but resolved the firebase document not receiving an ID.
    let newDate = new Date();
    let month = newDate.toLocaleString('en-us', {month: "long"}); // get month as a string, ie January
    let year = newDate.getFullYear().toString(); // get month as a 4 digit year, ie YYYY // FIXME: don't actually make this a string

    let fieldsToCreate = {
      id: id,
      title: announcement.title,
      content: announcement.content,
      dateCreated: newDate,
      monthCreated: month,
      yearCreated: year,
      isVisible: true
    };

    super.createDocument(CollectionName.announcements, id, fieldsToCreate);
  }

  /**
   * Update an announcement document in the 'announcements' collection in firestore by calling the parent service
   *
   * @param {Announcement} announcement Announcement
   */
  updateAnnouncement(announcement: Announcement) {
    let fieldsToUpdate = { 
      title: announcement.title,
      updatedOn: new Date(),
      content: announcement.content
    }
    
    super.updateDocument(CollectionName.announcements, announcement.id, fieldsToUpdate);
  }

  /**
   * Delete an announcement document in the 'announcements' collection in firestore by calling the parent service
   *
   * @param {Announcement} announcement Announcement
   */
  deleteAnnouncment(announcement: Announcement) {
    super.deleteDocument(CollectionName.announcements, announcement.id);
  }
}
