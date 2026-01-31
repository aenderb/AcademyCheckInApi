# 🏋️ Academy Check-In API

> ⚠️ **Work in Progress** - This API is under active development. Features may be incomplete or subject to change.

RESTful API for managing gym check-ins, inspired by platforms like Wellhub (formerly Gympass). The system allows users to check-in at partner gyms, offering complete control over attendance frequency and presence validation.

## 📋 Features

- **User Management**
  - User registration with secure authentication
  - Password hashing for data protection
  - User profile with check-in history

- **Gym Registration**
  - Partner gym registration
  - Detailed information (name, description, phone)
  - Geolocation for proximity search

- **Check-In System**
  - Check-in at registered gyms
  - Check-in validation
  - Complete attendance history
  - Date and time tracking for each visit

## 🛠️ Technologies

- **Node.js** - JavaScript runtime environment
- **TypeScript** - JavaScript superset with static typing
- **Express** - Minimalist web framework
- **Prisma ORM** - Modern ORM for TypeScript/Node.js
- **PostgreSQL** - Relational database
- **Docker** - Database containerization
- **Zod** - Schema and data validation
- **dotenv** - Environment variables management

## 📦 Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## 🚀 Installation and Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd AcademyCheckInApi
```

2. **Install dependencies**
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
docker-compose down

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
