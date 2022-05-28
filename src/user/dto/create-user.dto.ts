export class CreateUserDto {
  isAdmin: boolean;
  login: string;
  password: string;
  recyclePointIDs?: string[];
  address?: string;
}
