import { User } from '../Models/post-data.interface';

export function getUserData(): User {
  return JSON.parse(localStorage.getItem('userData')!);
}
