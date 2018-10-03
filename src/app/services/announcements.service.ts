import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Announcement } from '../models/announcement';
import { CollectionName } from '../constants/collection-name';
import { SubCollectionName } from '../constants/collection-name';
import { CrudService } from '../services/crud.service';
import { AuthService } from '../core/auth.service';

@Injectable()
export class AnnouncementsService extends CrudService<Announcement> {

  // announcementDoc: AngularFirestoreDocument<Announcement>; // single document to delete or update

  public userInfo;

  constructor(afs: AngularFirestore, authService: AuthService) {
    super(afs);

    // TODO: instead of subscribing each time, can we just create a user object and get at those fields with this.authSerice.user.field?
    // This is an expensive operation to have to call the auth service each time the page is loaded. 
    this.userInfo = authService.user$.subscribe(user => {
        this.userInfo.uid = user.uid,
        this.userInfo.email = user.email,
        this.userInfo.displayName = user.displayName,
        this.userInfo.photoURL = user.photoURL,
        this.userInfo.roles = user.roles
    });
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
    let randomlyGeneratedId = this.afs.createId();     // Generate a random id from angular firestore // Consideration: Replaced set with add and randomly generated an ID. Not sure if this is the best way but resolved the firebase document not receiving an ID.
    let newDate = new Date();
    let month = newDate.toLocaleString('en-us', {month: "long"}); // get month as a string, ie January
    let year = newDate.getFullYear().toString(); // get month as a 4 digit year, ie YYYY // FIXME: don't actually make this a string

    let fieldsToCreate = {
      id: randomlyGeneratedId,
      title: announcement.title,
      content: announcement.content,
      dateCreated: newDate,
      monthCreated: month,
      yearCreated: year,
      createdBy: this.userInfo.displayName,
      isVisible: true
    };

    super.createDocument(CollectionName.announcements, randomlyGeneratedId, fieldsToCreate);
    super.createDocumentInSubCollection(CollectionName.users, SubCollectionName.announcementsCreated, this.userInfo.uid, randomlyGeneratedId, fieldsToCreate);
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
    super.updateDocumentInSubCollection(CollectionName.users, SubCollectionName.announcementsCreated, this.userInfo.uid, announcement.id, fieldsToUpdate);
  }

  /**
   * Delete an announcement document in the 'announcements' collection in firestore by calling the parent service
   *
   * @param {Announcement} announcement Announcement
   */
  deleteAnnouncment(announcement: Announcement) {
    super.deleteDocument(CollectionName.announcements, announcement.id);
    super.deleteDocumentInSubCollection(CollectionName.users, SubCollectionName.announcementsCreated, this.userInfo.uid, announcement.id);
  }

  /**
   * Check if the announcementsCreated subcollection exists within the user ID.
   * If it does, then the user should not be able to create anymore announcements.
   * Then add it to the announcments component create function to check before displaying the form field.
   */
  public checkIfSubCollectionExists() {
  
    console.log(`User collection name: ${CollectionName.users} // User ID: ${this.userInfo.uid} // Subcollection name: ${SubCollectionName.announcementsCreated}`);

    // https://stackoverflow.com/questions/47997748/is-possible-to-check-if-a-collection-or-sub-collection-exists
    // https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot

    // This works
    let promise = this.afs.collection(CollectionName.users).doc(this.userInfo.uid).collection(SubCollectionName.announcementsCreated).ref.get().then(query => {
      if(query.empty) {
        console.log("NO COLLECTIONS");
        return false;
      }
      else {
        console.log("FOUND COLLECTIONS");
        return true;
      }
    }).catch(function (error) {
      console.log("Error getting collection:", error);
    });

    return promise;
  }
}
