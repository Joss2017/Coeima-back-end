import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

//------------------------------------Début de la mise en place de sécurité d'un role (user, admin)-------------------//

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
