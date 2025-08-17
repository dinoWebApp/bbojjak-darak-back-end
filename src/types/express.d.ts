import { Request } from 'express';

declare module 'express' {
  interface Request {
    user: {
      id: number;
      email: string;
      isAdmin: boolean;
      createdAt: Date;
    };
  }
}
