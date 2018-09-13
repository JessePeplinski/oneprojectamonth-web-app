import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Announcement } from '../../models/announcement';
import { AnnouncementsService } from '../../services/announcements.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})

export class AnnouncementsComponent implements OnInit {

  /**
   * Create empty Announcement object. We need to initialize this otherwise we'll throw undefined errors.
   */
  announcement: Announcement = {
    id: '',
    title: '',
    content: '',
    dateCreated: null,
    isVisible: false,
  };

  /**
   * Local array of announcements.
   */
  announcements: Announcement[];

  /**
   * Boolean for displaying edit/delete onClick of an individual announcement.
   */
  editState: boolean = false;

  /**
   * Current announcement that is being modified.
   */
  announcementToEdit: Announcement;

  constructor(private announcementsService: AnnouncementsService, private router: Router) { }

  // TODO: Can we move the stuff in onInit into readAnnouncements()?
  ngOnInit() {
    this.announcementsService.readAnnouncements().subscribe(announcements => {
      console.log(announcements);
      this.announcements = announcements;
    });
  }

  /**
   * Check if title and announcement has content, Call the announcementsService to create an announcement, and clear the form fields after creating an announcement.
   */
  createAnnouncementInCollection() {
    // Basic validation. Make sure we have a title and content filled in
    if(this.announcement.title != '' && this.announcement.content != '') {
      this.announcementsService.createAnnouncement(this.announcement);
      this.clearForms();
    }
  }

  /**
   * Clear the form fields after creating an announcement
   */
  clearForms() {
    this.announcement.title = '';
    this.announcement.content = '';
  }

  /**
   * Call the announcementsService to create an announcement.
   *
   * @param {event} event Event from the front-end
   * @param {Announcement} announcement Announcement
   */
  editAnnouncement(event, announcement: Announcement) {
    this.editState = true;
    this.announcementToEdit = announcement;
  }

  /**
   * After updating or deleting an announcement, reset edit state to false and nullify the current announcement being edited.
   */
  clearState() {
    this.editState = false;
    this.announcementToEdit = null;
  }

  /**
   * Call the update announcements service and clear the state.
   *    
   * @param {Announcement} announcement Announcement
   */
  updateAnnouncement(announcement: Announcement) {
    this.announcementsService.updateAnnouncement(announcement);
    this.clearState();
  }

  /**
   * Call the delete announcements service and clear the state.
   *    
   * @param {Announcement} announcement Announcement
   */
  deleteAnnouncement(event, announcement: Announcement) {
    this.announcementsService.deleteAnnouncment(announcement);
    this.clearState();
  }
}
