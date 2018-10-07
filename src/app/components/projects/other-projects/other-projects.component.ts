import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project';
import { SelectItem } from 'primeng/api';
import { Skills } from '../../../constants/skills.constant';

@Component({
  selector: 'app-other-projects',
  templateUrl: './other-projects.component.html',
  styleUrls: ['./other-projects.component.css']
})
export class OtherProjectsComponent implements OnInit {

  @Input() projects: Observable<Project[]>;
  checked: boolean;
  skills: SelectItem[] = Skills;
  selectedSkills: SelectItem[] = [];


  constructor() {
  }

  ngOnInit() {
  }

}
