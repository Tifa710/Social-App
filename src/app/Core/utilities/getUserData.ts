import { User } from '../Models/Posts/post-data.interface';

export function getUserData(): User {
  return JSON.parse(localStorage.getItem('userData')!);
}
