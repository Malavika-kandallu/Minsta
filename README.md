# Minsta - Social Media Application

A full-stack social media application built with Angular and FastAPI, featuring Facebook-inspired UI design.

## Features

- **User Authentication**: Login and signup with JWT tokens
- **Create Posts**: Share content with followers
- **Feed**: View posts from followed users
- **Search Users**: Find and follow/unfollow users
- **Real-time Updates**: Dynamic feed updates

## Tech Stack

### Frontend
- **Angular 18+** with standalone components
- **RxJS** for reactive programming
- **Custom Pipes**: TimeAgoPipe for relative timestamps
- **Custom Directives**: HighlightDirective for hover effects
- **HTTP Interceptors**: Automatic JWT token injection
- **Lifecycle Hooks**: OnInit, OnDestroy for proper component management
- **Facebook-inspired CSS**: Modern, clean UI design

### Backend
- **FastAPI** with Python
- **MongoDB** for data storage
- **JWT Authentication**
- **Layered Architecture**:
  - Controllers (main.py)
  - Services (services.py)
  - Repositories (repositories.py)
  - Models (models.py)

## Project Structure

```
Minsta/
├── BACKEND/
│   ├── main.py              # API endpoints
│   ├── services.py          # Business logic
│   ├── repositories.py      # Database operations
│   ├── models.py            # Data models
│   ├── auth_utils.py        # Authentication utilities
│   └── database.py          # MongoDB connection
│
└── FRONTEND/
    └── social-ui/
        └── src/
            └── app/
                ├── services/
                │   └── api.service.ts       # Centralized API service
                ├── interceptors/
                │   └── auth.interceptor.ts  # HTTP interceptor
                ├── pipes/
                │   └── time-ago.pipe.ts     # Custom pipe
                ├── directives/
                │   └── highlight.directive.ts # Custom directive
                ├── guards/
                │   └── auth.guard.ts        # Route guard
                ├── login/
                ├── signup/
                ├── dashboard/
                │   └── search-users/
                ├── feed/
                └── create-post/
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd BACKEND
```

2. Install dependencies:
```bash
pip install fastapi uvicorn pymongo passlib python-jose bcrypt
```

3. Start MongoDB:
```bash
mongod
```

4. Run FastAPI server:
```bash
uvicorn main:app --reload
```

Backend runs on: `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd FRONTEND/social-ui
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
ng serve
```

Frontend runs on: `http://localhost:4200`

## API Endpoints

### Authentication
- `POST /auth/signup` - Create new account
- `POST /auth/login` - User login

### Posts
- `POST /api/posts` - Create post
- `GET /api/posts` - Get all posts
- `GET /api/feed/{username}` - Get personalized feed

### Users
- `GET /api/users/search` - Search users
- `POST /api/follow` - Follow user
- `POST /api/unfollow` - Unfollow user

## Angular Features Used

### Lifecycle Hooks
- `ngOnInit()` - Component initialization
- `ngOnDestroy()` - Cleanup and unsubscribe

### Directives
- `appHighlight` - Hover effect directive

### Pipes
- `timeAgo` - Convert timestamps to relative time

### Interceptors
- `authInterceptor` - Add JWT token to requests

### Services
- `ApiService` - Centralized HTTP service

## Color Palette (Facebook Theme)

- Primary Blue: `#1877f2`
- Success Green: `#42b72a`
- Background: `#f0f2f5`
- White: `#ffffff`
- Text: `#050505`
- Secondary Text: `#65676b`
- Border: `#dddfe2`
- Hover: `#e4e6eb`

## Usage

1. **Sign Up**: Create a new account
2. **Login**: Access your account
3. **Create Post**: Share your thoughts
4. **Search Users**: Find people to follow
5. **View Feed**: See posts from followed users

## Architecture Highlights

### Frontend
- **Centralized API Service**: All HTTP calls in one place
- **Reactive Programming**: RxJS operators (takeUntil)
- **Memory Management**: Proper subscription cleanup
- **Type Safety**: TypeScript throughout
- **Lazy Loading**: Route-based code splitting

### Backend
- **Layered Architecture**: Separation of concerns
- **Repository Pattern**: Database abstraction
- **Service Layer**: Business logic isolation
- **Type Hints**: Python type annotations
- **CORS Enabled**: Cross-origin support

## Development

- Frontend: `ng serve --open`
- Backend: `uvicorn main:app --reload`
- MongoDB: `mongod`
