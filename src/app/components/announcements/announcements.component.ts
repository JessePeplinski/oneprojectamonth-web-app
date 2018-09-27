import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../models/announcement';
import { AnnouncementsService } from '../../services/announcements.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

// pipes
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

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
   * Boolean for displaying edit/delete onClick of an individual announcement.
   */
  editState: boolean = false;

  /**
   * Current announcement that is being modified.
   */
  announcementToEdit: Announcement;

  /**
   * Observable of all announcements
   */
  announcements$;

  // TODO: Abstract the date handling into a service to be reused accross all components
  paramDate = {
    month: '',
    year: ''
  }

  constructor(protected route: ActivatedRoute, protected announcementsService: AnnouncementsService, protected router: Router, protected messageService: MessageService, protected confirmationService: ConfirmationService) { }

  ngOnInit() {
    // Call the announcements service
    this.announcements$ = this.announcementsService.readAllAnnouncements();

    // Get the params from the URL
    this.route.paramMap.subscribe(params => {

      const month = params.get('month');
      const year = params.get('year');

      this.paramDate.month = month;
      this.paramDate.year = year;
    });
  }

  /**
   * Check if title and announcement has content, Call the announcementsService to create an announcement, and clear the form fields after creating an announcement.
   */
  createAnnouncementInCollection() {
    // Basic validation. Make sure we have a title and content filled in
    if (this.announcement.title != '' && this.announcement.content != '') {
      this.announcementsService.createAnnouncement(this.announcement);
      this.createAnnouncementToastAlert(this.announcement);
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
    this.updateAnnouncementToastAlert(announcement);
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
        this.deleteAnnouncementToastAlert(announcement);
      },
      reject: () => {
        this.rejectDeleteAnnouncementToastAlert(announcement);
      }
    });
  }

  /**
   * Display a toast alert in the top center of the page confirming the deletion
   */
  createAnnouncementToastAlert(announcement: Announcement) {
    this.messageService.add({
      key: 'createAnnouncementToastAlert',
      severity: 'success',
      summary: 'Announcement Created',
      detail: `${announcement.title} has been created successfully`,
      sticky: false,
      life: 3000
    });
  }

  /**
   * Display a toast alert in the top center of the page confirming the deletion
   */
  updateAnnouncementToastAlert(announcement: Announcement) {
    setTimeout(() => {
      this.messageService.add({
        key: 'updateAnnouncementToastAlert',
        severity: 'success',
        summary: 'Announcement Updated',
        detail: `${announcement.title} has been updated successfully`,
        sticky: false,
        life: 3000
      });
    }, 100);
  }

  rejectDeleteAnnouncementToastAlert(announcement: Announcement) {
    setTimeout(() => {
      this.messageService.add({
        key: 'rejectDeleteAnnouncementToastAlert',
        severity: 'warn',
        summary: 'Announcement Not Deleted',
        detail: `${announcement.title} has not been deleted`,
        sticky: false,
        life: 3000
      });
    }, 100);
  }

  /**
   * Display a toast alert in the top center of the page confirming the deletion
   */
  deleteAnnouncementToastAlert(announcement: Announcement) {
    setTimeout(() => {
      this.messageService.add({
        key: 'deleteAnnouncementToastAlert',
        severity: 'success',
        summary: 'Announcement Deleted',
        detail: `${announcement.title} has been deleted successfully`,
        sticky: false,
        life: 3000
      });
    }, 100);
  }

  /**
   * Return to the announcements when a document is deleted
   */
  goToAnnouncementsRoute() {
    this.router.navigate(['/hackathons/october/2018/announcements']).then(nav => {
      console.log(`Routed back to announcements ${nav}`); // true if navigation is successful
    }, err => {
      console.error(err) // when there's an error
    });
  }
}
