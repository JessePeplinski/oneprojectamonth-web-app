import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherProjectsComponent } from './other-projects/other-projects.component';
import { MyProjectComponent } from './my-project/my-project.component';
import { ProjectsComponent } from './projects.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { CheckboxModule, InputSwitchModule, InputTextareaModule, InputTextModule, MultiSelectModule, TabViewModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MultiSelectModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    TabViewModule,
    InputSwitchModule,
  ],
  declarations: [
    MyProjectComponent,
    OtherProjectsComponent,
    ProjectsComponent
  ],
  providers: [AngularFirestore
  ],
  bootstrap: [
    ProjectsComponent
  ]
})
export class ProjectsModule {
}
