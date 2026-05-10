declare global {
  namespace Express {
    interface Request {
      // user?: { id: string; email: string }; // uncomment when adding auth middleware
    }
  }
}

export {};
