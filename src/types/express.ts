/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Request {
      // user?: { id: string; email: string }; // uncomment when adding auth middleware
    }
  }
}

export {};
