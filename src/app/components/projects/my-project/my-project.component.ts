import { Component, Input, OnInit } from '@angular/core';
import { Skills } from '../../../constants/skills.constant';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { Project } from '../project';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.css']
})
export class MyProjectComponent implements OnInit {

  @Input() myProjects: Observable<Project[]>;
  skills: SelectItem[];
  selectedSkills: SelectItem[] = [];

  constructor() {
    this.skills = Skills;
  }

  ngOnInit() {
  }

}
