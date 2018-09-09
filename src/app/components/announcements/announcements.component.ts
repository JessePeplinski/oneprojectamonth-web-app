import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Announcement } from '../../models/announcement';
import { AnnouncementsService } from '../../services/announcements.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})

export class AnnouncementsComponent implements OnInit {

  // Create initial empty object. We need to initialize this otherwise we'll throw undefined errors.
  announcement: Announcement = {
    id: '',
    title: '',
    content: '',
    date: ''
  };

  announcements: Announcement[];

  constructor(private announcementsService: AnnouncementsService) { }

  ngOnInit() {
    this.announcementsService.readAnnouncements().subscribe(announcements => {
      console.log(announcements);
      this.announcements = announcements;
    });
  }

  // TODO: Can we move the stuff in onInit into readAnnouncements()?

  createAnnouncementInCollection() {
    // Basic validation. Make sure we have a title and content filled in
    if(this.announcement.title != '' && this.announcement.content != '') {
      this.announcementsService.createAnnouncement(this.announcement);
      this.announcement.title = '';
      this.announcement.content = '';
    }
  }

  updateAnnouncement() {

  }

  deleteAnnouncement(event, announcement) {
    this.announcementsService.deleteAnnouncment(announcement);
  }
}
