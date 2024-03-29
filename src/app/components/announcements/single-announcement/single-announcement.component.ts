import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementsService } from '../../../services/announcements.service';
import { switchMap } from 'rxjs/operators';
import { AnnouncementsComponent } from '../announcements.component';
import { ConfirmationService } from 'primeng/api';
import { ParamDateService } from '../../../services/param-date.service';
import { ToastService } from '../../../services/toast.service';
import {AuthService} from '../../../core/auth.service';

@Component({
  selector: 'app-single-announcement',
  templateUrl: './single-announcement.component.html',
  styleUrls: ['./single-announcement.component.less']
})
export class SingleAnnouncementComponent extends AnnouncementsComponent implements OnInit {
  announcement$;

  constructor(route: ActivatedRoute, paramDateService: ParamDateService, announcementsService: AnnouncementsService, router: Router, confirmationService: ConfirmationService, toastService: ToastService, authService: AuthService) {
    super(route, paramDateService, announcementsService, router, confirmationService, toastService, authService);
  }

  ngOnInit() {
    this.getTitleAndIDParamsFromURL();
  }

  getTitleAndIDParamsFromURL() {
    /**
     * Get the params in the url (announcements/:id/:title) and retreive the single announcement from firestore
     * CONSIDER: We could also call a function to append the title and ID together and split it if we need to.
     */
    this.announcement$ = this.route.paramMap.pipe(
      switchMap(params => {

        const title = params.get('title');
        const id = params.get('id');

        this.announcement.id = id;
        this.announcement.title = title;
        return this.announcementsService.readSingleAnnouncementBasedOnId(id);
      })
    );
  }

  subscribeToStuff() {
    // We need to subscribe to the announcement to get the values from the ngModel to display
    // TODO: Is there a better way to do this? Like put them above somewhere? Or get them from the view?
    // FIXME: Moved this outside of ngOnInit // it fixed an undefined error in teh title. Do we need to unsubscribe from this upon deletion?
    this.announcement$.subscribe(announcement => {
      this.announcement.title = announcement.title;
      this.announcement.content = announcement.content;
    });
  }
}
