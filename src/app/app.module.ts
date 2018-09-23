import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routing } from './app.routes';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

// required firebase module
import { AngularFireModule } from 'angularfire2';

import { CoreModule } from './core/core.module';

// optional firebase modules
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireFunctionsModule } from 'angularfire2/functions';

// custom components
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { PastEventComponent } from './components/past-event/past-event.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { DeliverablesComponent } from './components/deliverables/deliverables.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { PrizesComponent } from './components/prizes/prizes.component';
import { JudgesComponent } from './components/judges/judges.component';

// services
import { AnnouncementsService } from './services/announcements.service';
import { SingleAnnouncementComponent } from './components/announcements/single-announcement/single-announcement.component';
import { ErrorComponent } from './components/error/error.component';
// PrimeNG Modules
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { FaqComponent } from './components/faq/faq.component';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireFunctionsModule, // imports for cloud functions
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    TabViewModule,
    routing,
    CoreModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    AboutComponent,
    SignUpComponent,
    LoginComponent,
    PastEventComponent,
    SponsorsComponent,
    FooterComponent,
    ProjectsComponent,
    AnnouncementsComponent,
    DeliverablesComponent,
    ParticipantsComponent,
    PrizesComponent,
    JudgesComponent,
    SingleAnnouncementComponent,
    ErrorComponent,
    FaqComponent,
   ],
  providers: [ AnnouncementsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
