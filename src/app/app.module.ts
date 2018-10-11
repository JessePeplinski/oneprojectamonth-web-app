import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { routing } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
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
import { PastEventComponent } from './components/past-event/past-event.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { FooterComponent } from './components/footer/footer.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { DeliverablesComponent } from './components/deliverables/deliverables.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { PrizesComponent } from './components/prizes/prizes.component';
import { JudgesComponent } from './components/judges/judges.component';
import { HackathonsComponent } from './components/hackathons/hackathons.component';
import { ProfileComponent } from './components/profile/profile.component';
// services
import { AnnouncementsService } from './services/announcements.service';
import { SingleAnnouncementComponent } from './components/announcements/single-announcement/single-announcement.component';
import { ErrorComponent } from './components/error/error.component';
import { ParticipantService } from './components/participants/participant.service';
import { ParamDateService } from './services/param-date.service';
import { ToastService } from './services/toast.service';
// PrimeNG Modules
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { FaqComponent } from './components/faq/faq.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProjectsModule } from './components/projects/projects.module';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

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
    CoreModule,
    PanelModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    InputTextareaModule,
    InputTextModule,
    InputSwitchModule,
    CheckboxModule,
    DropdownModule,
    MultiSelectModule,
    HttpClientModule,
    ProjectsModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    AboutComponent,
    SignUpComponent,
    PastEventComponent,
    SponsorsComponent,
    FooterComponent,
    AnnouncementsComponent,
    DeliverablesComponent,
    ParticipantsComponent,
    PrizesComponent,
    JudgesComponent,
    SingleAnnouncementComponent,
    ErrorComponent,
    FaqComponent,
    HackathonsComponent,
    ProfileComponent,
    LeaderboardComponent,
  ],
  providers: [
    AnnouncementsService,
    MessageService,
    ConfirmationService,
    ParamDateService,
    ToastService,
    ParticipantService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
