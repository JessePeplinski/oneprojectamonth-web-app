import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementsService } from '../../../services/announcements.service';
import { switchMap } from 'rxjs/operators';
import { AnnouncementsComponent } from '../announcements.component';

@Component({
  selector: 'app-single-announcement',
  templateUrl: './single-announcement.component.html',
  styleUrls: ['./single-announcement.component.css']
})
export class SingleAnnouncementComponent extends AnnouncementsComponent implements OnInit {
  id: string;
  announcement$;

  constructor(private route: ActivatedRoute, announcementsService: AnnouncementsService) {
    super(announcementsService);
  }

  ngOnInit() {
    /**
     * Retreive a single announcement from firestore
     */
    this.announcement$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        this.announcement.id = id;
        return this.announcementsService.readSingleAnnouncementBasedOnId(id);
      })
    );
  }


}
