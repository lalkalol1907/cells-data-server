import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface AuthServiceProto {
  GetUser(data: { authToken: string }): Observable<string>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  @Inject('AUTH_PACKAGE') private readonly client: ClientGrpc;
  private authServiceProto: AuthServiceProto;

  onModuleInit() {
    this.authServiceProto = this.client.getService<AuthServiceProto>('Auth');
  }

  checkToken(accessToken: string) {
    const res = this.authServiceProto.GetUser({ authToken: accessToken });
    console.log(res);
    return res;
  }
}
