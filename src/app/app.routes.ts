import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { PastEventComponent } from './components/past-event/past-event.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { DeliverablesComponent } from './components/deliverables/deliverables.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { PrizesComponent } from './components/prizes/prizes.component';
import { JudgesComponent } from './components/judges/judges.component';

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
