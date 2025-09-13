# Multi-Tenant Application v0.2.0 🎉

## Overview

**multi_tenant_application** is a comprehensive, full-featured multi-tenant platform with **complete CRUD functionality**. It provides robust tenant isolation, dynamic routing, content management, and secure authentication, making it ideal for SaaS platforms, content management systems, or any system requiring secure multi-client architecture with rich data operations.

- **Version**: 0.2.0 - CRUD Functionality Complete
- **Tech Stack**: Next.js, TypeScript, Prisma, PostgreSQL
- **Homepage**: [bhathiya.me](https://bhathiya.me)
- **Topics**: `multitenancy`, `nextjs`, `postgresql`, `crud`, `cms`

---

## Features

### 🎯 Complete CRUD Operations (NEW in v0.2.0)
- **CREATE**: Full blog creation with rich forms, validation, and tenant scoping
- **READ**: Comprehensive blog listing with public APIs and tenant-specific views
- **UPDATE**: In-place editing with modal dialogs and real-time updates
- **DELETE**: Secure deletion with proper tenant validation and UI feedback

### 🏢 Multi-Tenant Architecture  
- **Multi-Tenancy**: Each tenant has isolated data and routes, typically accessed via subdomains (e.g., `tenant1.bhathiya.me`).
- **Dynamic Tenant Creation**: Users can create their own tenant spaces via a simple form.
- **Tenant Isolation**: Complete data separation and security between tenants.

### 🔐 Security & Authentication
- **Secure Authentication**: User signup and login are tenant-specific, with JWT-based authentication and token management.
- **Token Management**: Secure cookie handling with HttpOnly cookies.
- **API Security**: All CRUD endpoints protected with proper authentication and tenant validation.

### 🎨 User Experience
- **Customizable Dashboards**: Each tenant has a dedicated dashboard and content area.
- **Interactive UI**: Blog cards with edit/delete actions, modal dialogs, and real-time updates.
- **Responsive Design**: Mobile-first approach with modern, clean interfaces.

### ⚡ Technical Excellence
- **Robust Data Handling**: Uses Prisma ORM and PostgreSQL for scalable backend management.
- **RESTful APIs**: Well-structured endpoints following REST principles.
- **Clean Architecture**: Built for maintainability with modern full-stack technologies.
- **Type Safety**: Full TypeScript implementation for better developer experience.

---

## Main Components

### 1. Tenant Management

- **Create Tenant**: `src/app/create-tenant/page.tsx`  
  Users can register new tenants by entering a slug and name. On success, they're redirected to the signup page for their tenant subdomain.

- **Get Tenant from Urls**: `src/middleware.ts`  
  Utility to extract the tenant slug from Request Url, ensuring all operations are contextually tenant-aware.

- **Seed Data**: `prisma/seeds.ts`  
  Seeds initial tenants in the database for testing and demonstration.

### 2. Authentication

- **Signup & Login**:
    - `src/app/api/auth/signup/route.ts`: Handles user registration, creating a tenant if it doesn't exist.
    - `src/components/login-form.tsx`: Authenticates users, retrieves a token, and redirects to the tenant dashboard, setting a secure cookie.

- **Token Handling**:
    - `src/app/(tenant)/set-token/route.ts`: Manages redirecting users and setting JWT tokens as cookies after login.

### 3. Blog Functionality

- **CRUD APIs**:
    - `src/app/api/blogs/tenant/route.ts` & `src/app/api/blogs/tenant/[id]/route.ts`: APIs for tenant-specific blog creation, retrieval, updating, and deletion. All actions are protected and scoped to the authenticated user's tenant.
    - `src/app/api/public/blogs/route.ts`: Public API for retrieving blogs (with tenant and comments included).

### 4. Dashboard & UI

- **Tenant Dashboard**:
    - `src/app/(tenant)/dashboard/page.tsx`: Main dashboard for each tenant, leveraging reusable UI components.

- **Sidebar & Navigation**:
    - `src/components/app-sidebar.tsx`: Sidebar navigation for quick access to main features.

- **About Page**:
    - `src/app/about/page.tsx`: Describes the application's value proposition and architecture.

### 5. Core Architecture

- **Dynamic Routing**:  
  Next.js routing structure enables per-tenant subdomain handling and route isolation.
- **Prisma ORM**:  
  Data models for users, tenants, blogs, and comments are managed using Prisma and PostgreSQL.

---

## 🔌 CRUD API Endpoints (v0.2.0)

### Blog Management APIs
```
POST   /api/blogs/tenant          # Create new blog post
GET    /api/blogs/tenant          # List all tenant blogs
PUT    /api/blogs/tenant/[id]     # Update specific blog post
DELETE /api/blogs/tenant/[id]     # Delete specific blog post
GET    /api/public/blogs          # Public blog access (cross-tenant)
```

### Tenant Management APIs  
```
POST   /api/tenant                # Create new tenant
GET    /api/tenant                # Get tenant information
```

### Authentication APIs
```
POST   /api/auth/signup           # User registration (tenant-specific)
POST   /api/auth/login            # User authentication
GET    /set-token                 # Token management and redirect
```

**Security Features:**
- All protected endpoints require valid JWT tokens
- Tenant-scoped operations ensure data isolation  
- Proper HTTP status codes and error handling
- Input validation on all endpoints
- CORS support for cross-origin requests

---

## Example Workflow

1. **Create a Tenant**:  
   User fills out the tenant creation form. On success, they are redirected to their tenant-specific signup page.

2. **Signup/Login**:  
   User registers or logs in. A JWT token is issued and stored in a secure cookie.

3. **Access Dashboard**:  
   After authentication, users are redirected to their tenant dashboard, where they can manage content.

4. **Blog Management**:  
   Users can create, edit, and delete blog posts within their own tenant space.

---

## Why Choose This Project?

- **Simple and Intuitive**: Suitable for both beginners and pros.
- **Strong Isolation**: Multi-tenancy keeps each client’s data private and organized.
- **Open Source & Customizable**: Built with modern frameworks, easy to extend.
- **Production-Ready**: Designed for scalability, security, and maintainability.

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/BhathiyaPrasad/multi_tenant_application.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Copy `.env.example` to `.env` and configure your database and secrets.

4. **Run database migrations & seed(for development)**
   ```bash
   npx prisma migrate dev
   npx tsx prisma/seeds.ts 
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

---

## Additional Information

- For details on specific files or implementation, see the codebase or open the [About page](https://github.com/BhathiyaPrasad/multi_tenant_application/blob/main/src/app/about/page.tsx).
- Contributions and feedback are welcome!



## Seed User Credentials(For Development)

- Tenant1

Email: admin@tenant1.com

Password: password123

- Tenant2

Email: user@tenant2.com

Password: password123

---
