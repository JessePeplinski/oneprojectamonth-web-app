import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Project } from './project';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.35s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.35s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {

  projectsCollection: AngularFirestoreCollection<Project>;
  projects: Observable<Project[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.projectsCollection = this.afs.collection('projects', ref => {
      return ref;
    });
    this.projects = this.projectsCollection.valueChanges();
  }

}
