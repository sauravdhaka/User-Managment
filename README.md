<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">NestJS Application</h1>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

<p align="center">
  <a href="https://circleci.com/gh/nestjs/nest">
    <img src="https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456" alt="Build Status" />
  </a>
</p>

---

## 📂 Project Structure

```
nestjs_extracted/
│── .env
│── .gitignore
│── .prettierrc
│── eslint.config.mjs
│── nest-cli.json
│── package.json
│── package-lock.json
│── README.md
│── tsconfig.build.json
│── tsconfig.json
│── src/
│   │── app.module.ts
│   │── main.ts
│   │── auth/
│   │   │── auth.controller.ts
│   │   │── auth.module.ts
│   │   │── auth.service.ts
│   │   │── dto/
│   │   │   │── login.dto.ts
|   |__ common/
|   |   |__ guards/
|   |   |   |__ jwt-auth.gaurd.ts
│   │── config/
│   │   │── database.config.ts
|   |__ types/
|   |   |__ express.d.ts
│   │── users/
│   │   │── user.entity.ts
│   │   │── users.controller.ts
│   │   │── users.module.ts
│   │   │── users.service.ts
│   │   │── dto/
│   │   │   │── user.dto.ts

```

---

## ⚡ Installation

Ensure you have [Node.js](https://nodejs.org/) installed before proceeding.

```bash
$ npm install
```

---

## 🚀 Running the Application

### Development Mode

```bash
$ npm run start
```

### Watch Mode

```bash
$ npm run start:dev
```

### Production Mode

```bash
$ npm run start:prod
```

---

## 🧪 Running Tests

### Unit Tests

```bash
$ npm run test
```

### End-to-End Tests

```bash
$ npm run test:e2e
```

### Test Coverage

```bash
$ npm run test:cov
```

---

## 🔑 Authentication & User Management

### Auth Controller (`src/auth/auth.controller.ts`)

- **POST** `/auth/login`
  - Accepts `LoginDto` payload.
  - Calls `authService.login(loginDto)`.
  - **Authentication:** No guard applied.



### User Controller (`src/users/users.controller.ts`)

- **GET** `/users`

  - Returns a list of users.
  - **Authentication:** Requires JWT (`@UseGuards(JwtAuthGuard)`).


- **POST** `/users`
  - Accepts `CreateUserDto` payload.
  - Calls `userService.create(createUserDto)`.
  - **Authentication:** No guard applied.



**Payload:**

```json
{
  "first_name": "Saurav",
  "last_name": "Dhaka",
  "email": "sauravd@gmail.com",
  "password": "test@123"
}
```

- **PATCH** `/users/:id`
  - Accepts `UpdateUserDto` payload.
  - Calls `userService.update(id, updateUserDto)`.
  - **Authentication:** Requires JWT (`@UseGuards(JwtAuthGuard)`).

**Payload:**

```json
{
  "first_name": "dummy"
}
```

- **DELETE** `/users/:id/soft`

  - Soft deletes a user.
  - Calls `userService.softDelete(id)`.
  - **Authentication:** Requires JWT (`@UseGuards(JwtAuthGuard)`).

- **DELETE** `/users/:id/hard`
  - Permanently deletes a user.
  - Calls `userService.hardDelete(id)`.
  - **Authentication:** Requires JWT (`@UseGuards(JwtAuthGuard)`).




<video src="video/Recording #3.mp4" controls width="600"></video>
