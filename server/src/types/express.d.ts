import { User } from "@prisma/client";

declare module 'express-serve-static-core' {
  export interface Request {
    user: User;
  }
}

declare module 'express' {
  export interface Request {
    user: User;
  }
}
