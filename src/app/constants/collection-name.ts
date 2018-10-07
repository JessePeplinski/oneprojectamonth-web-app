export enum CollectionName {
  announcements = 'announcements',
  feedback = 'feedback',
  hackathons = 'hackathons',
  judges = 'judges',
  projects = 'projects',
  sponsors = 'sponsors',
  users = 'users',
  skills = 'skills'
}

// these are subcollections within the /users collection. ie /users/doc-id/sub-collection/doc-id
export enum SubCollectionName {
  announcementsCreated = 'announcementsCreated'
}
