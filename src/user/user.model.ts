export class UserModel {
  _id: string;
  isAdmin: boolean;
  login: string;
  passwordHash: string;
  bins: string[];
  address: string;
}
