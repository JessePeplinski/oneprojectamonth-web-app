import { User } from './user';

export interface Project {
  title?: string;
  description?: string;
  createDate?: Date;
  event?: string;
  members?: User[];
  owner?: User;
  placements?: any[];
  social?: any[];
  seekingSkills?: any[];
  seekingMembers?: boolean;
}
