# Finance Data Processing and Access Control System

[![Live Demo](https://img.shields.io/badge/Live_API_Docs-Swagger_UI-85ea2d?style=for-the-badge&logo=swagger)](https://fintech-dashboard-wixc.onrender.com/api-docs)  
**Live API Link:** [https://fintech-dashboard-wixc.onrender.com/api-docs](https://fintech-dashboard-wixc.onrender.com/api-docs)

A complete production-quality REST API for a Fintech dashboard built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: Built with JWT. Includes Role-Based Access Control (RBAC) with `admin`, `analyst`, and `viewer` roles.
- **Financial Records Management**: Full CRUD capabilities for tracking incomes and expenses.
- **Dashboard APIs**: Analytical endpoints providing insights like total income, category breakdowns, and monthly trends.
- **Validation**: Joi schema validations on all API inputs.
- **Error Handling**: Centralized global error handling middleware.
- **API Documentation**: Interactive Swagger UI documented interface.

## Project Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Ensure `.env` file exists in the root with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/fintech
   JWT_SECRET=supersecretkey
   JWT_EXPIRES_IN=1d
   ```

3. **Seed Database (Optional)**
   A script to populate initial users and records.
   ```bash
   npm run seed
   ```
   *Seed Users generated:*
   - `admin@fintech.com` (password: `password123`)
   - `analyst@fintech.com` (password: `password123`)
   - `viewer@fintech.com` (password: `password123`)

4. **Start the Server**
   ```bash
   npm run dev
   ```

## Folder Structure
We follow a standard Controller-Service-Route layout:
- `src/models`: Mongoose DB Models (User, Record)
- `src/controllers`: Request handlers
- `src/services`: Core business logic & database interactions
- `src/routes`: API endpoint routing definition
- `src/middleware`: Auth, validation, error handler
- `src/validations`: Joi validation schemas
- `scripts/`: Data seeding tools

## API Documentation

Once the server is running, navigate to:
**[http://localhost:5000/api-docs](http://localhost:5000/api-docs)** 
to test endpoints via the Swagger UI.

Alternatively, import the included `postman_collection.json` into Postman.

## Deployment

The project is fully configured to be instantly deployed on [Render.com](https://render.com). It comes with a `render.yaml` blueprint.

### 1. Database Setup (MongoDB Atlas)
Render requires a cloud database. 
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Go to **Network Access** and configure it to **ALLOW ACCESS FROM ANYWHERE** (`0.0.0.0/0`). *(Crucial for Render!)*
3. Go to **Database Access** and create a user. Copy your connection string matching:  
   `mongodb+srv://<username>:<password>@clusterX.XXXX.mongodb.net/?appName=ClusterX`
4. Make sure to replace `<password>` with the actual database user password you created, ensuring you remove the `<` and `>` arrow markers.

### 2. Live Hosting (Render)
1. Go to your [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Blueprint**.
2. Connect this GitHub repository.
3. Render will auto-detect the configuration and ask you to submit your `MONGODB_URI`. Paste the complete Atlas connection string constructed above.
4. Click **Apply**. Render will install dependencies and start your live server natively!
