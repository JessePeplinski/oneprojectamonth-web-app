import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../models/announcement';
import { AnnouncementsService } from '../../services/announcements.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { ParamDateService } from '../../services/param-date.service';

// pipes
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.35s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.35s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class AnnouncementsComponent implements OnInit {

  editState: boolean = false; // Boolean for displaying edit/delete onClick of an individual announcement.
  announcementToEdit: Announcement; // Current announcement that is being modified.
  announcements$; // Observable of all announcements

  public announcement: Announcement; // Object to hold fields on the announcement

  constructor(protected route: ActivatedRoute, public paramDateService : ParamDateService, protected announcementsService: AnnouncementsService, protected router: Router, protected confirmationService: ConfirmationService, protected toastService: ToastService) {
    this.announcement = new Announcement();
  }

  ngOnInit() {
    // Get the params from the URL
    this.paramDateService.getMonthAndYearParamsFromURL(this.route);

    // Call the announcements service
    this.announcements$ = this.announcementsService.readAllAnnouncements(this.paramDateService);
  }

  /**
   * Check if title and announcement has content, Call the announcementsService to create an announcement, and clear the form fields after creating an announcement.
   */
  createAnnouncementInCollection() {
    // Basic validation. Make sure we have a title and content filled in
    if (this.announcement.title != '' && this.announcement.content != '') {
      this.announcementsService.createAnnouncement(this.announcement);
      this.toastService.createToastAlert('createAnnouncementToastAlert', 'Announcement', this.announcement.title);
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
    this.toastService.updateToastAlert('updateAnnouncementToastAlert', 'Announcement', announcement.title);
    this.clearState();
  }

  /**
   * Call the delete announcements service and clear the state.
   *
   * @param {Announcement} announcement Announcement
   */
  deleteAnnouncement(event, announcement: Announcement) {
    this.confirmationService.confirm({
      message: `Do you want to delete this announcement: ${announcement.title}? This action cannot be undone.`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.announcementsService.deleteAnnouncment(announcement);
        this.clearState();
        this.goToAnnouncementsRoute(); // FIXME: Add logic to reroute only if the child route is active.
        this.toastService.deleteToastAlert('deleteAnnouncementToastAlert', 'Announcement', announcement.title);
      },
      reject: () => {
        this.toastService.rejectDeleteToastAlert('rejectDeleteAnnouncementToastAlert', 'Announcement', announcement.title);
      }
    });
  }

  /**
   * Return to the announcements when a document is deleted
   */
  goToAnnouncementsRoute() {
    // FIXME: Make the router actually go the right place based on the month you are on.
    // TODO
    this.router.navigate(['/hackathons', this.paramDateService.month, this.paramDateService.year, 'announcements']).then(nav => {
      console.log(`Routed back to announcements ${nav}`); // true if navigation is successful
    }, err => {
      console.error(err) // when there's an error
    });
  }
}
