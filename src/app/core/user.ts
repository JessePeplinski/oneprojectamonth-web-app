export interface Roles {
  participant?: boolean;
  judge?: boolean;
  sponsor?: boolean;
  admin?: boolean;
}
export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  roles: Roles;
}
