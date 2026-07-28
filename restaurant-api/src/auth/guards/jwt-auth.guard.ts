import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(
    private reflector: Reflector,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {

    // Lire la métadonnée @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [
        context.getHandler(),
        context.getClass(),
      ],
    );

    // Si la route est publique,
    // on laisse passer sans vérifier le JWT
    if (isPublic) {
      return true;
    }

    // Sinon on exécute le AuthGuard JWT de Passport
    return super.canActivate(context);
  }
}