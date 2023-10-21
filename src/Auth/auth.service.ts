import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface GetUserResponse {
  needRefresh: boolean;
  authOK: boolean;
  error?: string;
  user?: string;
}

interface AuthServiceProto {
  GetUser(data: { authToken: string }): Observable<GetUserResponse>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  @Inject('AUTH_PACKAGE') private readonly client: ClientGrpc;
  private authServiceProto: AuthServiceProto;

  onModuleInit() {
    this.authServiceProto = this.client.getService<AuthServiceProto>('Auth');
  }

  getUser(accessToken: string) {
    const res = this.authServiceProto.GetUser({ authToken: accessToken });
    return res;
  }
}
