# 🚀 Deploying to Render

This guide will help you deploy your Sachify backend to Render.

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **MongoDB Database**: Set up a MongoDB instance (MongoDB Atlas recommended)
3. **Git Repository**: Your code should be in a Git repository

## 🛠️ Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your backend code is in a Git repository with the following structure:
```
backend/
├── server.js
├── package.json
├── routes/
├── models/
├── config/
└── scripts/
```

### 2. Set Up MongoDB

1. **Create MongoDB Atlas Account** (recommended)
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string

2. **Or Use Local MongoDB** (for development)
   - Install MongoDB locally
   - Use connection string: `mongodb://localhost:27017/sachify`

### 3. Deploy to Render

1. **Log in to Render Dashboard**
   - Go to [dashboard.render.com](https://dashboard.render.com)

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Select the repository containing your backend code

3. **Configure the Service**
   - **Name**: `sachify-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend` (if your backend is in a subdirectory)

4. **Set Environment Variables**
   Click "Environment" tab and add:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=your_frontend_url
   PORT=10000
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app

### 4. Verify Deployment

1. **Check Health Endpoint**
   ```
   GET https://your-app-name.onrender.com/health
   ```

2. **Test API Endpoints**
   ```
   GET https://your-app-name.onrender.com/api/notes
   ```

## 🔧 Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment mode | `production` |
| `MONGODB_URI` | Yes | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/sachify` |
| `FRONTEND_URL` | No | Frontend URL for CORS | `https://your-frontend.onrender.com` |
| `PORT` | No | Server port (Render sets this) | `10000` |

## 📊 Monitoring Your Deployment

### Render Dashboard
- **Logs**: View real-time logs in Render dashboard
- **Metrics**: Monitor CPU, memory, and response times
- **Events**: Track deployments and errors

### Health Checks
- **Endpoint**: `/health`
- **Expected Response**: `{"status":"OK","message":"Sachify Backend is running"}`

### API Testing
```bash
# Test health endpoint
curl https://your-app-name.onrender.com/health

# Test notes endpoint
curl https://your-app-name.onrender.com/api/notes
```

## 🔄 Continuous Deployment

Render automatically deploys when you push to your main branch:
1. Push changes to your repository
2. Render detects the changes
3. Automatic build and deployment
4. Zero-downtime deployments

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check `package.json` has correct dependencies
   - Verify `start` script exists
   - Check build logs in Render dashboard

2. **Database Connection Fails**
   - Verify `MONGODB_URI` is correct
   - Check MongoDB network access
   - Ensure database exists

3. **CORS Errors**
   - Set `FRONTEND_URL` environment variable
   - Check frontend URL is correct

4. **Port Issues**
   - Render sets `PORT` automatically
   - Don't hardcode port in code

### Debug Commands

```bash
# Check environment variables
echo $MONGODB_URI
echo $NODE_ENV

# Test database connection
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('Connected')).catch(console.error)"
```

## 📈 Scaling

### Free Tier
- 750 hours/month
- 512 MB RAM
- Shared CPU

### Paid Plans
- More resources
- Custom domains
- SSL certificates
- Better performance

## 🔒 Security

- **HTTPS**: Automatically enabled
- **Environment Variables**: Securely stored
- **CORS**: Configured for your frontend
- **Rate Limiting**: Built-in protection

## 📞 Support

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **Render Support**: Available in dashboard
- **Community**: Render Discord/Forums

## 🎉 Next Steps

After successful deployment:
1. Update your frontend to use the new API URL
2. Set up monitoring and alerts
3. Configure custom domain (optional)
4. Set up CI/CD pipeline (optional) 