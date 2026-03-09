# 🗺️ Geospatial Dashboard

A web-based geospatial dashboard built with **React** and **Leaflet.js** to visualize location-based events including incidents, assets, and IoT devices.

## 🚀 Features

- **Interactive Map** with multiple tile layers (OpenStreetMap, Satellite, Dark Mode)
- **Custom Markers** color-coded by severity and typed by event category
- **Interactive Popups** with full event details on marker click
- **Real-time Filtering** by type, severity, status, and text search
- **Auto-fit Bounds** — map adjusts to show all filtered events
- **List View** toggle to browse events in a sidebar panel
- **REST API Integration** — structured to swap mock data for a live API
- **Fully Responsive** — works on mobile and desktop
- **Cross-browser** compatible

## 🛠️ Tech Stack

| Layer       | Technology                     |
|-------------|-------------------------------|
| Frontend    | React 18, JSX, CSS3            |
| Maps        | Leaflet.js, React-Leaflet      |
| HTTP Client | Axios                          |
| Tooling     | Create React App               |

## 📁 Project Structure

```
geospatial-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── MapView.jsx        # Leaflet map container
│   │   ├── FilterPanel.jsx    # Sidebar filters
│   │   ├── EventPopup.jsx     # Map marker popup
│   │   └── EventList.jsx      # List view
│   ├── hooks/
│   │   └── useEvents.js       # Data fetching & filtering logic
│   ├── utils/
│   │   └── mapUtils.js        # Icon creation, color helpers
│   ├── data/
│   │   └── mockEvents.js      # Sample event data
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 16
- npm >= 7

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/geospatial-dashboard.git
cd geospatial-dashboard

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## 🔌 Connecting to a Real API

In `src/hooks/useEvents.js`, replace the mock data fetch with:

```js
import axios from "axios";

const { data } = await axios.get("https://your-api.com/api/v1/events");
setAllEvents(data);
```

Ensure your API returns events in the following shape:
```json
{
  "id": 1,
  "type": "incident",
  "severity": "high",
  "title": "Event Title",
  "description": "Details...",
  "lat": 40.7128,
  "lng": -74.006,
  "timestamp": "2024-01-15T08:23:00Z",
  "status": "active",
  "assignee": "Team Name"
}
```

## 🐳 Docker

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t geospatial-dashboard .
docker run -p 80:80 geospatial-dashboard
```