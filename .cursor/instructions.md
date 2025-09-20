# Express TypeScript Boilerplate - Development Instructions

## Quick Start Commands

### Development

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Run production build
npm run clean        # Clean dist folder
```

### Code Quality

```bash
npm run commitlint   # Validate commit messages
git commit -m "feat: add user authentication"  # Conventional commit example
```

## Directory-Specific Instructions

### 📁 `/src/controllers/`

**Purpose**: Handle HTTP requests and responses

**When to create**: When you need a new API endpoint group

**Template**:

```typescript
// UserController.ts
import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private userService: UserService) {}

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export const userController = new UserController(new UserService());
```

**Best Practices**:

- Keep controllers thin - delegate business logic to services
- Always handle errors with try/catch
- Use consistent response format
- Validate input parameters

---

### 📁 `/src/routes/`

**Purpose**: Define API endpoints and route handlers

**When to create**: When adding new API endpoints

**Template**:

```typescript
// user.routes.ts
import { Router } from "express";
import { userController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateUser } from "../middlewares/validationMiddleware";

const router = Router();

// Public routes
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);

// Protected routes
router.post("/users", authMiddleware, validateUser, userController.createUser);
router.put("/users/:id", authMiddleware, userController.updateUser);
router.delete("/users/:id", authMiddleware, userController.deleteUser);

export default router;
```

**Don't forget to register in `/src/routes/index.ts`**:

```typescript
import userRoutes from "./user.routes";
router.use("/users", userRoutes);
```

**Best Practices**:

- Use RESTful conventions (GET, POST, PUT, DELETE)
- Apply middleware in correct order
- Keep routes simple and delegate to controllers
- Group related endpoints

---

### 📁 `/src/middlewares/`

**Purpose**: Reusable request processing logic

**When to create**: For authentication, validation, logging, error handling

**Templates**:

**Authentication Middleware**:

```typescript
// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res
      .status(401)
      .json({ success: false, error: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid token." });
  }
};
```

**Validation Middleware**:

```typescript
// validationMiddleware.ts
import { Request, Response, NextFunction } from "express";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: "Email and password are required",
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      error: "Invalid email format",
    });
    return;
  }

  next();
};
```

---

### 📁 `/src/services/`

**Purpose**: Business logic and data processing

**When to create**: For complex business operations, external API calls, database operations

**Template**:

```typescript
// UserService.ts
import { User, CreateUserDto, UpdateUserDto } from "../types/user.types";

export class UserService {
  async getAllUsers(): Promise<User[]> {
    // Database query or external API call
    // Business logic here
    return [];
  }

  async getUserById(id: string): Promise<User | null> {
    if (!id) {
      throw new Error("User ID is required");
    }

    // Database query
    // Validation logic
    return null;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    // Validation
    if (!userData.email) {
      throw new Error("Email is required");
    }

    // Business logic
    // Database operations
    // Return created user
    return {} as User;
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User | null> {
    // Validation and business logic
    return null;
  }

  async deleteUser(id: string): Promise<boolean> {
    // Soft delete or hard delete logic
    return false;
  }
}
```

---

### 📁 `/src/types/`

**Purpose**: TypeScript type definitions and interfaces

**When to create**: Define data structures, API contracts, DTOs

**Template**:

```typescript
// user.types.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, "password">;
  token: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

---

### 📁 `/src/utils/`

**Purpose**: Helper functions and utilities

**When to create**: For reusable pure functions

**Templates**:

**Logger Utility**:

```typescript
// logger.ts
enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  DEBUG = "debug",
}

export const logger = {
  error: (message: string, meta?: any) => {
    console.error(`[${LogLevel.ERROR}] ${message}`, meta || "");
  },
  warn: (message: string, meta?: any) => {
    console.warn(`[${LogLevel.WARN}] ${message}`, meta || "");
  },
  info: (message: string, meta?: any) => {
    console.info(`[${LogLevel.INFO}] ${message}`, meta || "");
  },
  debug: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[${LogLevel.DEBUG}] ${message}`, meta || "");
    }
  },
};
```

**Validation Utilities**:

```typescript
// validation.ts
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const sanitizeString = (str: string): string => {
  return str.trim().toLowerCase();
};
```

---

### 📁 `/src/config/`

**Purpose**: Configuration files and constants

**When to create**: For environment-specific settings, constants

**Templates**:

**Database Configuration**:

```typescript
// database.config.ts
export const databaseConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "myapp",
};
```

**App Configuration**:

```typescript
// app.config.ts
export const appConfig = {
  port: parseInt(process.env.PORT || "3000"),
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "24h",
  corsOrigin: process.env.CORS_ORIGIN || "*",
};

// Validate required environment variables
const requiredEnvVars = ["JWT_SECRET"];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
```

## Development Workflow

### Adding a New Feature (Example: Posts)

1. **Define Types** (`/src/types/post.types.ts`):

```typescript
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
}

export interface CreatePostDto {
  title: string;
  content: string;
}
```

2. **Create Service** (`/src/services/PostService.ts`):

```typescript
export class PostService {
  async createPost(postData: CreatePostDto, authorId: string): Promise<Post> {
    // Business logic
  }
}
```

3. **Create Controller** (`/src/controllers/PostController.ts`):

```typescript
export class PostController {
  constructor(private postService: PostService) {}
  // Controller methods
}
```

4. **Create Routes** (`/src/routes/post.routes.ts`):

```typescript
const router = Router();
router.post("/posts", authMiddleware, postController.createPost);
// Other routes
```

5. **Register Routes** (in `/src/routes/index.ts`):

```typescript
import postRoutes from "./post.routes";
router.use("/api", postRoutes);
```

6. **Add Middleware** (if needed) (`/src/middlewares/postValidation.ts`)

7. **Test and Commit**:

```bash
git add .
git commit -m "feat(posts): add post creation functionality"
```

## Environment Variables

Create `.env` file in root:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=myapp

# Authentication
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:3000
```

## Common Commands for Development

```bash
# Start development
npm run dev

# Add new dependency
npm install express-validator
npm install -D @types/express-validator

# Create new feature branch
git checkout -b feat/user-authentication

# Commit with conventional format
git commit -m "feat(auth): add JWT authentication middleware"

# Build and test
npm run build
npm run start
```

Remember: Follow the established patterns and conventions for consistency across the codebase!
