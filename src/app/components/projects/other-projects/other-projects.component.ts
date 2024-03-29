import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project';
import { SelectItem } from 'primeng/api';
import { Skills } from '../../../constants/skills.constant';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-other-projects',
  templateUrl: './other-projects.component.html',
  styleUrls: ['./other-projects.component.less']
})
export class OtherProjectsComponent implements OnInit {

  checked: boolean;
  skills: SelectItem[] = Skills;
  selectedSkills: SelectItem[] = [];
  projects: Observable<Project[]>;


  constructor(private afs: AngularFirestore) {
  }

  ngOnInit() {
    this.projects = this.afs.collection<Project>('projects').valueChanges();
  }

}
