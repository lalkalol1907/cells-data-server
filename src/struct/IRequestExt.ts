import User from './User';
import { Request } from 'express';

export default interface IRequestExt extends Request {
  user?: User;
}
