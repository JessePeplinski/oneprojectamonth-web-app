import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Announcement } from '../../../models/announcement';
import { AnnouncementsService } from '../../../services/announcements.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-single-announcement',
  templateUrl: './single-announcement.component.html',
  styleUrls: ['./single-announcement.component.css']
})
export class SingleAnnouncementComponent implements OnInit {

  announcement$;

  constructor(private route: ActivatedRoute, private announcementsService: AnnouncementsService) { }

  ngOnInit() {

    /**
     * Retreive a single announcement from firestore
     */
    this.announcement$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.announcementsService.readSingleAnnouncementBasedOnId(id);
      })
    )
  }
}
