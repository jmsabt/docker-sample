# 🌤️ Manila Weather - Docker Demo

A simple weather app displaying Manila, Philippines weather. Built to demonstrate Docker fundamentals.

## 📁 Project Structure

```
docker-weather-app/
├── index.html
├── style.css
├── app.js
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── .dockerignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Docker Desktop installed
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### Steps

1. **Clone and setup**

```bash
git clone https://github.com/yourusername/docker-weather-app.git
cd docker-weather-app
```

2. **Add your API key**

   Open `app.js` and replace line 2:

   ```javascript
   const API_KEY = "your_actual_api_key_here";
   ```

3. **Run with Docker**

```bash
docker-compose up --build
```

4. **Open browser**

   Visit: http://localhost:8080

Done! 🎉

## 🐳 Common Docker Commands

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Rebuild
docker-compose up --build

# List containers
docker ps

# Access container
docker exec -it weather-app sh
```

## ✨ Features

- Real-time Manila weather
- **5-day weather forecast**
- Dynamic background based on weather conditions
- Responsive design
- Lightweight (~50MB Docker image)

## 🚂 Deploy to Railway

1. Push code to GitHub
2. Go to Railway.app → New Project → Deploy from GitHub
3. Select your repo
4. Railway auto-detects Dockerfile and deploys

## 🐛 Troubleshooting

**Port 8080 in use?**

```bash
# Change port in docker-compose.yml
ports:
  - "3000:80"
```

**Changes not showing?**

```bash
docker-compose down
docker-compose up --build
```

**API key not working?**

- Wait 10 minutes after creating key
- Verify key is pasted correctly in app.js

## 📚 Docker Concepts Covered

- Dockerfile creation
- Docker Compose orchestration
- Port mapping
- Nginx web server
- Container health checks
- Lightweight Alpine images

## 🔗 Resources

- [Docker Docs](https://docs.docker.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Railway Docs](https://docs.railway.app/)

---

**Built for learning Docker 🐳 | Manila, Philippines 🇵🇭**
