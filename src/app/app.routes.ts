import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { PastEventComponent } from './past-event/past-event.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { ProjectsComponent } from './projects/projects.component';
import { AnnouncementsComponent } from './announcements/announcements.component';

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
        path: 'faq',
        component: FaqComponent
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
