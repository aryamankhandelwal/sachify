# Sachify Backend API

A robust Node.js/Express backend API for the Sachify notes application, designed to work with your Render web service.

## 🚀 Features

- **RESTful API** with full CRUD operations for notes
- **MongoDB Integration** with Mongoose ODM
- **Security Features** including CORS, Helmet, and rate limiting
- **Pagination & Filtering** for efficient data retrieval
- **Search Functionality** across multiple fields
- **Input Validation** with comprehensive error handling
- **Health Check Endpoint** for monitoring

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository** (if not already done)
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/sachify
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /health
```

### Notes Endpoints

#### Get All Notes
```
GET /api/notes
```
**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `companyName` (optional): Filter by company name
- `subject` (optional): Filter by subject
- `date` (optional): Filter by date (YYYY-MM-DD)
- `participants` (optional): Filter by participants

**Response:**
```json
{
  "notes": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### Get Single Note
```
GET /api/notes/:id
```

#### Create Note
```
POST /api/notes
```
**Body:**
```json
{
  "companyName": "Acme Corp",
  "subject": "Product Development Meeting",
  "date": "2024-01-15",
  "startTime": "09:30",
  "endTime": "10:00",
  "participants": "John Doe, Jane Smith",
  "aiSummary": "Discussed Q2 feature requirements...",
  "notes": "Discussed new feature requirements..."
}
```

#### Update Note
```
PUT /api/notes/:id
```

#### Delete Note
```
DELETE /api/notes/:id
```

#### Search Notes
```
GET /api/notes/search?q=searchterm
```

## 🗄️ Database Schema

### Note Model
```javascript
{
  companyName: String (required, max 100 chars),
  subject: String (required, max 200 chars),
  date: String (required, YYYY-MM-DD format),
  startTime: String (required, HH:MM format),
  endTime: String (required, HH:MM format),
  participants: String (required, max 500 chars),
  aiSummary: String (required, max 2000 chars),
  notes: String (required, max 5000 chars),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/sachify |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## 🚀 Deployment to Render

1. **Connect your repository** to Render
2. **Set environment variables** in Render dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your frontend URL
3. **Deploy** - Render will automatically detect the Node.js app

### Render Configuration
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: Node

## 🔒 Security Features

- **CORS Protection** with configurable origins
- **Helmet.js** for security headers
- **Rate Limiting** (100 requests per 15 minutes per IP)
- **Input Validation** with comprehensive error messages
- **Error Handling** with proper HTTP status codes

## 📊 Monitoring

- **Health Check**: `GET /health`
- **Request Logging**: Morgan middleware
- **Error Logging**: Console and structured error responses

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Health check
curl http://localhost:5000/health
```

## 📝 Notes

- All timestamps are in ISO format
- Time validation uses HH:MM format
- Date validation uses YYYY-MM-DD format
- Search is case-insensitive across multiple fields
- Pagination is 1-indexed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details 