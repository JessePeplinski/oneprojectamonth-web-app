import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PastEventComponent } from './components/past-event/past-event.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { DeliverablesComponent } from './components/deliverables/deliverables.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { PrizesComponent } from './components/prizes/prizes.component';
import { JudgesComponent } from './components/judges/judges.component';
import { SingleAnnouncementComponent } from './components/announcements/single-announcement/single-announcement.component';
import { ErrorComponent } from './components/error/error.component';
import { FaqComponent } from './components/faq/faq.component';
import { HackathonsComponent } from './components/hackathons/hackathons.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    {
        path: 'hackathons',
        component: HackathonsComponent
    },
    {
        path: 'hackathons/:month/:year',
        component: HomeComponent
    },
    {
        path: 'hackathons/:month/:year/deliverables',
        component: DeliverablesComponent,
        data: {
            state: 'deliverables'
        }
    },
    {
        path: 'hackathons/:month/:year/sponsors',
        component: SponsorsComponent,
        data: {
            state: 'sponsors'
        }
    },
    {
        path: 'hackathons/:month/:year/projects',
        component: ProjectsComponent,
        data: {
            state: 'projects'
        }
    },
    {
        path: 'hackathons/:month/:year/announcements',
        component: AnnouncementsComponent,
        data: {
            state: 'announcements'
        }
    },
    {
        path: 'hackathons/:month/:year/announcements/:id/:title',
        component: SingleAnnouncementComponent,
        data: {
            state: 'announcements/:id/:title'
        }
    },
    {
        path: 'hackathons/:month/:year/participants',
        component: ParticipantsComponent,
        data: {
            state: 'participants'
        }
    },
    {
        path: 'hackathons/:month/:year/prizes',
        component: PrizesComponent,
        data: {
            state: 'prizes'
        }
    },
    {
        path: 'hackathons/:month/:year/judges',
        component: JudgesComponent,
        data: {
            state: 'judges'
        }
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: {
            state: 'profile'
        }
    },
    {
        path: 'home',
        component: HomeComponent,
        data: {
            state: 'home'
        }
    },
    {
        path: 'about',
        component: AboutComponent,
        data: {
            state: 'about'
        }
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        data: {
            state: 'sing-up'
        }
    },
    {
        path: 'past-events',
        component: PastEventComponent,
        data: {
            state: 'past-events'
        }
    },
    {
        path: 'faq',
        component: FaqComponent,
        data: {
            state: 'faq'
        }
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: ErrorComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
