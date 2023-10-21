import { Injectable, NestMiddleware } from '@nestjs/common';
import IRequestExt from '../Struct/IRequestExt';
import { NextFunction, Response } from 'express';
import IUser from '../Struct/IUser';
import { AuthService } from '../Auth/auth.service';

@Injectable()
export default class UserdataMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: IRequestExt, res: Response, next: NextFunction): any {
    const access_token = req.headers['access_token'] as string;

    if (!access_token) {
      next();
      return;
    }

    this.authService
      .getUser(access_token)
      .toPromise()
      .then((userdata) => {
        if (userdata.authOK && userdata.user) {
          req.user = JSON.parse(userdata.user) as IUser;
          next();
          return;
        }
      })
      .catch(() => {
        next();
      });
  }
}
