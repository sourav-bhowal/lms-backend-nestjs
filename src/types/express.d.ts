import { JwtPayload } from '../auth/auth.guard';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
