import IUser from './IUser';
import { Request } from 'express';

export default interface IRequestExt extends Request {
  user?: IUser;
}
