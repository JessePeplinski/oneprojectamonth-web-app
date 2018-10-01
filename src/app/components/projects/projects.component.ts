import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Project } from './project';
import { animate, style, transition, trigger } from '@angular/animations';
import { SelectItem } from 'primeng/api';

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
    this.skills1 = [
      { label: 'Angular', value: { id: 1, name: 'Angular' } },
      { label: 'CSS', value: { id: 2, name: 'CSS' } },
      { label: 'HTML', value: { id: 3, name: 'HTML' } },
      { label: 'JS', value: { id: 4, name: 'JS' } },
      { label: 'React', value: { id: 5, name: 'React' } },
      { label: 'Design', value: { id: 5, name: 'Design' } },
      { label: 'Project Mgmt', value: { id: 5, name: 'Project Mgmt' } },
      { label: 'Full Stack', value: { id: 5, name: 'Full Stack' } },
      { label: 'SQL', value: { id: 5, name: 'SQL' } },
      { label: 'Android', value: { id: 5, name: 'Android' } },
      { label: 'iOS', value: { id: 5, name: 'iOS' } },
      { label: 'NodeJS', value: { id: 5, name: 'NodeJS' } },
      { label: 'MongoDB', value: { id: 5, name: 'MongoDB' } },
      { label: 'Blockchain', value: { id: 5, name: 'Blockchain' } },
      { label: 'Bot Development', value: { id: 5, name: 'Bot Development' } },
      { label: 'Marketing', value: { id: 5, name: 'Marketing' } }

    ];

    // An array of cities
    this.skills2 = [
      { name: 'Angular' },
      { name: 'CSS' },
      { name: 'HTML' },
      { name: 'JS' },
      { name: 'React' },
      { name: 'Design' },
      { name: 'Project Mgmt' },
      { name: 'Full Stack' },
      { name: 'SQL' },
      { name: 'Android' },
      { name: 'iOS' },
      { name: 'NodeJS' },
      { name: 'MongoDB' },
      { name: 'Blockchain' },
      { name: 'Bot Development' },
      { name: 'Marketing' },
    ];
  }

  ngOnInit() {
    this.projectsCollection = this.afs.collection('projects', ref => {
      return ref;
    });
    this.projects = this.projectsCollection.valueChanges();
  }

}
