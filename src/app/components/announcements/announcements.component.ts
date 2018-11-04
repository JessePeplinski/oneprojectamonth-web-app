import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../models/announcement';
import { AnnouncementsService } from '../../services/announcements.service';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { ConfirmationService } from 'primeng/api';
import { ParamDateService } from '../../services/param-date.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../core/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.less'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({opacity: 0}),
        animate('.35s ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('.35s ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})

export class AnnouncementsComponent implements OnInit {

  editState: boolean = false; // Boolean for displaying edit/delete onClick of an individual announcement.
  announcementToEdit: Announcement; // Current announcement that is being modified.
  announcements$; // Observable of all announcements

  user: User;

  public announcement: Announcement; // Object to hold fields on the announcement

  constructor(protected route: ActivatedRoute,
              public paramDateService: ParamDateService,
              protected announcementsService: AnnouncementsService,
              protected router: Router,
              protected confirmationService: ConfirmationService,
              protected toastService: ToastService, public authService: AuthService) {
                
    this.announcement = new Announcement();
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      // Firestore user object
      this.user = user;
      console.log(this.user.uid);

      // Get the params from the URL
      this.paramDateService.getMonthAndYearParamsFromURL(this.route);

      // Call the announcements service
      this.announcements$ = this.announcementsService.readAllAnnouncements(this.paramDateService);

      // this.announcementsService.checkIfSubCollectionExists(); // TODO: i want to just return a boolean here but i cant because i can't read the user ID. it returns as undefined
    });
  }

  /**
   * Check if title and announcement has content, Call the announcementsService to create an announcement, and clear the form fields after creating an announcement.
   */
  createAnnouncementInCollection() {
    if (this.announcement.title != '' && this.announcement.content != '') {
      this.announcementsService.createAnnouncement(this.announcement);
      this.toastService.createToastAlert('createAnnouncementToastAlert', 'Announcement', this.announcement.title);
      this.clearForms();
    }
  }

  // TODO: This doesn't actually do anything. We need to check it within ngOnInit.
  testFlagSettingWithPromise() {
    this.announcementsService.checkIfSubCollectionExists();
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
   * Open a modal for confirmation of delete, call the delete service, and display a toast message.
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
        this.paramDateService.goToSpecifiedRoute(this.router, 'announcements'); // FIXME: Add logic to reroute only if the child route is active.
        this.toastService.deleteToastAlert('deleteAnnouncementToastAlert', 'Announcement', announcement.title);
      },
      reject: () => {
        this.toastService.rejectDeleteToastAlert('rejectDeleteAnnouncementToastAlert', 'Announcement', announcement.title);
      }
    });
  }

  canCreate(user: User): boolean {
    const allowed = ['admin'];
    return this.authService.checkAuthorization(user, allowed);
  }

  canRead(user: User): boolean {
    const allowed = ['admin', 'participant', 'sponsor', 'judge'];
    return this.authService.checkAuthorization(user, allowed);
  }

  canEdit(user: User, announcement?: Announcement): boolean {
    const allowed = ['admin', 'participant'];

    if(announcement) {
      return this.authService.checkAuthorization(user, allowed) && user.uid == announcement.ownerRef;
    }
    return this.authService.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.authService.checkAuthorization(user, allowed);
  }

}

