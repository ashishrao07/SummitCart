# Summit-Cart-Full-Stack-Web-Application


# SummitCart 🛒

Full-stack E-commerce Web Application consisting of:

- **Admin Dashboard** (`/admin`) — React-based admin panel for managing products, orders, users.
- **Client App** (`/client`) — React-based customer-facing storefront.
- **Backend API Server** (`/server`) — Node.js + Express REST API with MongoDB database.

---
## 🧰 Tech Stack

- **Frontend:** React, React Router, Bootstrap/MUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **State Management:** Context API

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database (local or cloud)

### Installation & Running

```bash
# Install backend dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Install admin dependencies
cd ../admin
npm install

## 🚀 How to Run the Project

# Start backend API server
cd server
npm run dev

# Start client app
cd ../client
npm start

# Start admin dashboard
cd ../admin
npm start


Each module has its own setup instructions. See:
- [Admin README](./admin/README.md)
- [Client README](./client/README.md)
- [Server README](./server/README.md)


