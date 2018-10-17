export interface User {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email: string;
  suffix?: string;
  roles?: Roles;
  photoURL?: string;
  uid: string;
}

export interface Roles {
  participant?: boolean;
  judge?: boolean;
  sponsor?: boolean;
  admin?: boolean;
}
