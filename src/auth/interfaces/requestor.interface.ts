import { UserModel } from '../../user/user.model';

export interface IRequestor extends Pick<UserModel, 'role' | 'binIDs'> {
  _id: string;
}
