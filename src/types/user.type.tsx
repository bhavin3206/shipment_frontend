export default interface IUser {
  id?: number;
  username?: string | null;
  email?: string;
  phone?: string;
  roles?: string;
  token?: string;
}
