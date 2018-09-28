import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementsService } from '../../../services/announcements.service';
import { switchMap } from 'rxjs/operators';
import { AnnouncementsComponent } from '../announcements.component';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { ParamDateService } from '../../../services/param-date.service';

@Component({
  selector: 'app-single-announcement',
  templateUrl: './single-announcement.component.html',
  styleUrls: ['./single-announcement.component.css']
})
export class SingleAnnouncementComponent extends AnnouncementsComponent implements OnInit {
  announcement$;

  constructor(route: ActivatedRoute, paramDateService : ParamDateService, announcementsService: AnnouncementsService, router: Router, messageService: MessageService,  confirmationService: ConfirmationService) {
    super(route, paramDateService, announcementsService, router, messageService, confirmationService);
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
