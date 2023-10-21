import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { AuthService } from '../service/auth.service';
import IRequestExt from '../struct/IRequestExt';
import User from '../struct/User';

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: IRequestExt, res: Response, next: NextFunction): any {
    const access_token = req.headers['access_token'] as string;

    if (!access_token) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ refresh: false, error: 'No access token' });
      return;
    }

    this.authService
      .checkToken(access_token)
      .toPromise()
      .then((userdata) => {
        if (userdata.authOK && userdata.user) {
          req.user = JSON.parse(userdata.user) as User;
          next();
          return;
        }

        if (userdata.needRefresh) {
          res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ refresh: true, error: 'Need refresh token' });
          return;
        }

        if (userdata.error) {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: userdata.error });
        }
      })
      .catch((error) => {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: error['details'] ?? error });
      });
  }
}
