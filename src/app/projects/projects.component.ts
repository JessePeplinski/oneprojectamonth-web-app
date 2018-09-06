import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Project } from './project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
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
