import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Project } from './project';
import { animate, style, transition, trigger } from '@angular/animations';
import { SelectItem } from 'primeng/api';
import { Skills } from '../../constants/skills.constant';

interface Skill {
  name: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({opacity: 0}),
        animate('.35s ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('.35s ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {
  skills1: SelectItem[];

  skills2: Skill[];

  selectedSkill1: Skill;
  selectedSkill2: Skill;
  checked: true;
  projectsCollection: AngularFirestoreCollection<Project>;
  projects: Observable<Project[]>;

  constructor(private afs: AngularFirestore) {
    this.skills1 = Skills;

    // An array of cities
    this.skills2 = [
      {name: 'Angular'},
      {name: 'CSS'},
      {name: 'HTML'},
      {name: 'JS'},
      {name: 'React'},
      {name: 'Design'},
      {name: 'Project Mgmt'},
      {name: 'Full Stack'},
      {name: 'SQL'},
      {name: 'Android'},
      {name: 'iOS'},
      {name: 'NodeJS'},
      {name: 'MongoDB'},
      {name: 'Blockchain'},
      {name: 'Bot Development'},
      {name: 'Marketing'},
    ];
  }

  ngOnInit() {
    this.projectsCollection = this.afs.collection('projects', ref => {
      return ref;
    });
    this.projects = this.projectsCollection.valueChanges();
  }

}
