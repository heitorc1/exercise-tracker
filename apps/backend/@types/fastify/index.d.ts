import 'fastify';
import { IJwtUser as User } from '@/domain/user/interfaces';

declare module 'fastify' {
  interface FastifyRequest {
    user?: User;
  }
}
