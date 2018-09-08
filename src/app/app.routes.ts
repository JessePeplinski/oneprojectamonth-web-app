import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { PastEventComponent } from './past-event/past-event.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { ProjectsComponent } from './projects/projects.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { DeliverablesComponent } from './deliverables/deliverables.component';
import { ParticipantsComponent } from './participants/participants.component';
import { PrizesComponent } from './prizes/prizes.component';
import { JudgesComponent } from './judges/judges.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'deliverables',
        component: DeliverablesComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'past-events',
        component: PastEventComponent
    },
    {
        path: 'sponsors',
        component: SponsorsComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'announcements',
        component: AnnouncementsComponent
    },
    {
        path: 'participants',
        component: ParticipantsComponent
    },
    {
        path: 'prizes',
        component: PrizesComponent
    },
    {
        path: 'judges',
        component: JudgesComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home'
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
