export interface Announcement {
  id: string;
  title: string;
  content: string;
  dateCreated: Date;
  isVisible: boolean;
  updatedOn?: Date;
}
