# 🌤️ Docker Weather App

A simple weather application demonstrating Docker fundamentals with Nginx and static frontend.

## 📁 Project Structure

```
docker-weather-app/
├── index.html          # Main HTML file
├── style.css           # Styles with dynamic weather themes
├── app.js              # Weather API logic
├── Dockerfile          # Docker image configuration
├── docker-compose.yml  # Multi-container orchestration
├── nginx.conf          # Nginx web server configuration
├── .dockerignore       # Files to exclude from Docker image
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites

- **Docker Desktop** installed ([Download here](https://www.docker.com/products/docker-desktop))
- **OpenWeatherMap API key** (free, get it [here](https://openweathermap.org/api))

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/docker-weather-app.git
cd docker-weather-app
```

### Step 2: Add Your API Key

Open `app.js` and replace the API key on line 2:

```javascript
const API_KEY = "your_actual_api_key_here";
```

### Step 3: Build and Run with Docker

```bash
# Build and start the container
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d
```

### Step 4: Open Your Browser

Visit: **http://localhost:8080**

That's it! 🎉

## 🐳 Docker Commands Cheat Sheet

### Basic Operations

```bash
# Build and start
docker-compose up --build

# Start in background
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs

# View running containers
docker ps

# Stop and remove everything (including volumes)
docker-compose down -v
```

### Docker Image Management

```bash
# List all images
docker images

# Remove image
docker rmi weather-app-web

# Build image only (without running)
docker-compose build
```

### Container Management

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Access container shell
docker exec -it weather-app sh

# View container logs
docker logs weather-app

# Restart container
docker restart weather-app
```

## 🔧 How It Works

### Docker Architecture

```
┌─────────────────────────────────┐
│     Docker Container            │
│  ┌──────────────────────────┐  │
│  │   Nginx Web Server       │  │
│  │   (Port 80)              │  │
│  └──────────────────────────┘  │
│              │                   │
│              ↓                   │
│  ┌──────────────────────────┐  │
│  │   Static Files:          │  │
│  │   - index.html           │  │
│  │   - style.css            │  │
│  │   - app.js               │  │
│  └──────────────────────────┘  │
└─────────────────────────────────┘
         │
         ↓ Port 8080
    Your Browser
```

### Key Docker Concepts Demonstrated

1. **Dockerfile**: Defines the Docker image

   - Uses `nginx:alpine` base image (lightweight)
   - Copies static files to nginx directory
   - Configures health checks
   - Exposes port 80

2. **docker-compose.yml**: Orchestrates containers

   - Defines services
   - Maps ports (8080:80)
   - Sets up networks
   - Configures restart policies

3. **nginx.conf**: Web server configuration

   - Serves static files
   - Enables gzip compression
   - Adds caching headers
   - Security headers

4. **.dockerignore**: Excludes unnecessary files
   - Reduces image size
   - Improves build speed

## ✨ Features

- 🌡️ **Real-time Weather**: Current temperature, conditions, humidity, wind speed
- 🎨 **Dynamic Themes**: Background changes based on weather (sunny, rainy, cloudy, etc.)
- ⭐ **Favorites**: Save your favorite cities for quick access
- 📱 **Responsive Design**: Works on desktop and mobile
- 🐳 **Fully Dockerized**: Easy deployment anywhere

## 🌈 Weather Themes

The app automatically changes its appearance:

- ☀️ **Clear/Sunny** → Bright orange/yellow gradient
- ☁️ **Cloudy** → Gray tones
- 🌧️ **Rainy/Drizzle** → Dark blue
- ⛈️ **Thunderstorm** → Deep purple/gray
- 🌨️ **Snow** → Light blue/white
- 🌫️ **Fog/Mist/Haze** → Muted gray

## 🚂 Deploying to Railway

### Option 1: Using Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Option 2: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway will auto-detect the Dockerfile
7. Click "Deploy"

Railway will automatically:

- Build your Docker image
- Deploy the container
- Provide a public URL

**Note**: Railway automatically assigns a port, so the app will be accessible at their provided URL (not :8080).

## 🔍 Testing Your Docker Setup

### 1. Check if Container is Running

```bash
docker ps
```

You should see `weather-app` in the list.

### 2. Test the Application

```bash
# From your terminal
curl http://localhost:8080

# Or open in browser
# http://localhost:8080
```

### 3. View Container Logs

```bash
docker-compose logs -f
```

### 4. Access Container Shell

```bash
docker exec -it weather-app sh

# Inside container, you can explore:
ls /usr/share/nginx/html
cat /etc/nginx/conf.d/default.conf
exit
```

## 🐛 Troubleshooting

### Port 8080 Already in Use

```bash
# Change port in docker-compose.yml
ports:
  - "3000:80"  # Use port 3000 instead

# Or find and kill process using port 8080
lsof -i :8080
kill -9 <PID>
```

### Container Won't Start

```bash
# Check logs
docker-compose logs

# Rebuild without cache
docker-compose build --no-cache
docker-compose up
```

### API Key Not Working

1. Make sure you've activated your API key in OpenWeatherMap
2. Wait 10 minutes after creation (keys take time to activate)
3. Check the key is correctly pasted in `app.js`

### Changes Not Reflecting

```bash
# Rebuild the container
docker-compose down
docker-compose up --build
```

## 📚 What You'll Learn

This project demonstrates essential Docker concepts:

- ✅ Creating Dockerfiles
- ✅ Using base images (nginx:alpine)
- ✅ Building Docker images
- ✅ Running containers
- ✅ Port mapping
- ✅ Docker Compose orchestration
- ✅ Container networking
- ✅ Health checks
- ✅ Volume management (implicit)
- ✅ Multi-stage builds (can be extended)
- ✅ Production-ready configurations

## 🎓 Next Steps to Learn More

1. **Add a backend**: Create a Python/Node.js API container
2. **Add a database**: Include PostgreSQL or Redis container
3. **Multi-stage builds**: Optimize the Dockerfile
4. **Environment variables**: Use .env files for configuration
5. **Docker networks**: Create custom networks
6. **Volumes**: Persist data between container restarts

## 🤝 Contributing

This is a learning project! Feel free to:

- Report bugs
- Suggest improvements
- Add new features
- Use it as a template

## 📄 License

MIT License - Free to use for learning and portfolio projects

## 🔗 Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Guide](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Railway Documentation](https://docs.railway.app/)

---

**Made with ❤️ for learning Docker** 🐳
