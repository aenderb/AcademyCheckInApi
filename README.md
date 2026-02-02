# 🏋️ Academy Check-In API

RESTful API for managing gym check-ins, built with **SOLID principles** and **enterprise-grade architecture**. This API provides a complete authentication and user management system with professional logging, error handling, and monitoring.

## ✨ Features Implemented

### 🔐 Authentication & Authorization
- ✅ User registration with email validation
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt (salt 6)
- ✅ Token expiration control
- ✅ Secure password storage

### 👤 User Management
- ✅ Create user (POST /users/signup)
- ✅ Authenticate user (POST /users/signin)
- ✅ Get user by ID (GET /users/:id)
- ✅ Password hash hidden from responses

### 🏗️ Architecture & Best Practices
- ✅ **SOLID principles** implementation
- ✅ **Repository Pattern** for data access
- ✅ **Service Layer** for business logic
- ✅ **DTOs** (Data Transfer Objects)
- ✅ **Dependency Injection** (manual)
- ✅ **Custom Error Classes** by HTTP status
- ✅ **Global Error Handler**
- ✅ **Request/Error Logging** with Winston
- ✅ **Environment validation** with Zod
- ✅ **HTTP Status Constants** (no magic numbers)

### 📊 Monitoring & Logging
- ✅ Winston logger (request.log, error.log, combined.log)
- ✅ Health check endpoint (/health)
- ✅ Database connection monitoring
- ✅ Structured JSON logs
- ✅ Migration-ready for Elasticsearch

## 🛠️ Tech Stack

### Core
- **Node.js 18+** - JavaScript runtime
- **TypeScript 5.9** - Type safety
- **Express 5.1** - Web framework
- **Prisma 7.3** - Modern ORM
- **PostgreSQL** - Relational database

### Security & Validation
- **JWT (jsonwebtoken)** - Token-based auth
- **bcryptjs** - Password hashing
- **Zod 4.1** - Schema validation

### Logging & Monitoring
- **Winston** - Professional logging
- **express-winston** - HTTP request logging

### Development
- **tsx** - TypeScript execution
- **ESLint** - Code linting
- **Docker** - Database containerization

## 📦 Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- npm or yarn

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd AcademyCheckInApi
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:

```env
NODE_ENV=dev
PORT=3333
DATABASE_URL="postgresql://docker:docker@localhost:5432/academycheckinapidb?schema=public"
JWT_SECRET="your-super-secret-key-change-in-production"
JWT_EXPIRATION_TIME="7d"
```

⚠️ **IMPORTANT**: Change `JWT_SECRET` in production! Generate a secure key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Start PostgreSQL with Docker
```bash
docker-compose up -d
```

### 5. Run database migrations
```bash
npx prisma migrate dev
```

### 6. Start development server
```bash
npm run start:dev
```

Server will be running at `http://localhost:3333`

## 📚 API Endpoints

### Health Check
```http
GET /health
```
Returns API health status and database connection.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-02T12:00:00.000Z",
  "uptime": 123.45,
  "database": "connected"
}
```

---

### User Registration
```http
POST /users/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-02-02T12:00:00.000Z"
}
```

---

### User Authentication
```http
POST /users/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-02-02T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Get User by ID
```http
GET /users/:id
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-02-02T12:00:00.000Z"
}
```

## 🗂️ Project Structure

```
src/
├── app.ts                          # Express app configuration
├── server.ts                       # Server entry point
├── routes.ts                       # Main routes aggregator
├── env/
│   └── index.ts                    # Environment validation (Zod)
├── modules/
│   └── user/
│       ├── controller/             # HTTP layer
│       │   ├── CreateUserController.ts
│       │   ├── AuthenticateUserController.ts
│       │   └── GetUserByIdController.ts
│       ├── service/                # Business logic
│       │   ├── CreateUserService.ts
│       │   ├── AuthenticateUserService.ts
│       │   └── GetUserByIdService.ts
│       ├── repository/             # Data access
│       │   ├── IUserRepository.ts
│       │   └── PrismaUserRepository.ts
│       ├── dto/                    # Data Transfer Objects
│       │   ├── CreateUserDTO.ts
│       │   └── AuthenticateUserDTO.ts
│       └── routes.ts               # User routes
└── shared/
    ├── config/
    │   └── logger.ts               # Winston configuration
    ├── controllers/
    │   └── HealthCheckController.ts
    ├── errors/                     # Custom error classes
    │   ├── BadRequestError.ts      # 400
    │   ├── UnauthorizedError.ts    # 401
    │   ├── ForbiddenError.ts       # 403
    │   ├── NotFoundError.ts        # 404
    │   ├── ConflictError.ts        # 409
    │   └── index.ts
    ├── middlewares/
    │   ├── errorHandler.ts         # Global error handler
    │   └── logger.ts               # Request/error logger
    ├── utils/
    │   └── httpStatus.ts           # HTTP status constants
    └── infra/
        └── prisma/
            └── client.ts           # Prisma client instance
```

## 🔑 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment (dev/test/production) | dev | No |
| `PORT` | Server port | 3333 | No |
| `DATABASE_URL` | PostgreSQL connection string | - | Yes |
| `JWT_SECRET` | Secret key for JWT signing | - | Yes |
| `JWT_EXPIRATION_TIME` | Token expiration time | 7d | No |
| `LOG_LEVEL` | Winston log level (info/warn/error) | info | No |

## 📝 Available Scripts

```bash
# Development with hot reload
npm run start:dev

# Build for production
npm run build

# Start production server
npm start

# Run Prisma Studio (DB viewer)
npx prisma studio

# Create migration
npx prisma migrate dev --name migration_name

# Generate Prisma Client
npx prisma generate
```

## 🔒 Security Best Practices

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens with expiration
- ✅ Environment variables validation
- ✅ Input validation with Zod
- ✅ SQL injection prevention (Prisma ORM)
- ⚠️ **TODO**: Add rate limiting
- ⚠️ **TODO**: Add CORS configuration
- ⚠️ **TODO**: Add Helmet.js for security headers
- ⚠️ **TODO**: Increase bcrypt salt to 10 in production

## 📊 Logging

Logs are stored in the `logs/` directory:

- **request.log** - All HTTP requests
- **error.log** - Application errors
- **combined.log** - Everything

Logs are in JSON format for easy parsing and can be migrated to Elasticsearch. See [LOGGING_MIGRATION.md](LOGGING_MIGRATION.md) for details.

## 🧪 Testing

```bash
# Coming soon
npm test
```

## 🚀 Deployment

### Production Checklist

- [ ] Change `JWT_SECRET` to a secure random value
- [ ] Set `NODE_ENV=production`
- [ ] Configure production `DATABASE_URL`
- [ ] Increase bcrypt salt to 10
- [ ] Add rate limiting
- [ ] Configure CORS
- [ ] Add Helmet.js
- [ ] Set up log rotation
- [ ] Configure monitoring (Sentry, New Relic)
- [ ] Run migrations: `npx prisma migrate deploy`

## 📈 Roadmap

### Next Features
- [ ] Refresh tokens
- [ ] Email verification
- [ ] Password reset
- [ ] User profile update/delete
- [ ] Role-based authorization
- [ ] Gym management (CRUD)
- [ ] Check-in system
- [ ] Geolocation features
- [ ] Pagination
- [ ] API documentation (Swagger)

### Future Improvements
- [ ] Unit tests (Jest)
- [ ] Integration tests
- [ ] CI/CD pipeline
- [ ] Redis caching
- [ ] DI Container (tsyringe)
- [ ] GraphQL API
- [ ] WebSocket notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

---

**Made with ❤️ using SOLID principles and enterprise-grade architecture**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit the `.env` file with your settings:
```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/academycheckinapidb"
PORT=3000
```

4. **Start the database with Docker**
```bash
docker-compose up -d
```

5. **Run Prisma migrations**
```bash
npx prisma migrate dev
```

6. **Start the development server**
```bash
npm run start:dev
```

The server will be available at `http://localhost:3000`

## 🗄️ Database Structure

### User
- `id` - Unique user UUID
- `name` - Full name
- `email` - Unique email
- `password_hash` - Encrypted password
- `created_at` - Creation date
- `checkIns` - Relationship with performed check-ins

### Gym
- `id` - Unique gym UUID
- `title` - Gym name
- `description` - Description (optional)
- `phone` - Contact phone (optional)
- `latitude` - Latitude coordinate
- `longitude` - Longitude coordinate
- `checkIns` - Relationship with received check-ins

### CheckIn
- `id` - Unique check-in UUID
- `created_at` - Check-in date/time
- `validated_at` - Validation date/time (optional)
- `user_id` - User reference
- `gym_id` - Gym reference

## 📝 Available Scripts

```bash
# Development with hot reload
npm run start:dev

# Build for production
npm run build

# Start in production
npm run start

# Prisma Studio (visual database interface)
npx prisma studio

# Generate Prisma Client
npx prisma generate
```

## 🐳 Docker

The project uses Docker Compose to manage the PostgreSQL database:

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose stop

# View logs
docker-compose logs -f
```

## 🏗️ Directory Structure

```
AcademyCheckInApi/
├── src/
│   ├── app.ts           # Express configuration
│   ├── server.ts        # Server initialization
│   └── env/             # Environment variables validation
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Migration history
├── generated/           # Generated Prisma Client
├── docker-compose.yml   # Docker configuration
└── package.json         # Dependencies and scripts
```

## 🔒 Security

- Passwords are stored with secure hashing
- Input data validation with Zod
- Environment variables for sensitive data
- UUID for unique identifiers

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/MyFeature`)
3. Commit your changes (`git commit -m 'Add MyFeature'`)
4. Push to the branch (`git push origin feature/MyFeature`)
5. Open a Pull Request

## 📄 License

This project is under the ISC license.

## 👨‍💻 Author

Developed by Aender Binoto

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
