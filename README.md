# 🎵 MusicNerds

> A social platform for music enthusiasts to rate albums, track listening stats, join communities, and discover new music together.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://github.com/MatheusMarques13/musicnerds)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## ✨ Features

### Currently Implemented (MVP)
- 🏠 **Home Dashboard** - Personalized stats and trending albums
- ⭐ **Rating System** - 5-star rating system for albums
- 📊 **Listening Stats** - Track your scrobbles, top artists, albums, and genres
- 🔍 **Explore & Charts** - Discover top-rated albums of all time
- 📰 **Activity Feed** - See what friends are listening to and rating
- 👥 **Communities** - Join genre-specific groups (Synthwave, Taylor Swift fans, Indie Rock, etc.)
- 📋 **Collaborative Lists** - Create and contribute to community playlists
- 💿 **Personal Collection** - Manage your albums with favorites and want-to-listen lists
- 🎨 **Dark/Light Mode** - Automatic theme switching based on system preferences

### Planned Features (Roadmap)
- [ ] **Real Backend Integration**
  - [ ] Supabase for data persistence
  - [ ] User authentication (email/social login)
  - [ ] Real-time updates with Supabase subscriptions
- [ ] **Music API Integration**
  - [ ] Last.fm API for scrobbling
  - [ ] Spotify API for album data and streaming
  - [ ] MusicBrainz for comprehensive album info
- [ ] **Advanced Social Features**
  - [ ] Follow/unfollow users
  - [ ] Comments on reviews
  - [ ] Share to social media
  - [ ] Notifications system
- [ ] **Enhanced Discovery**
  - [ ] Personalized recommendations
  - [ ] Similar albums suggestions
  - [ ] Genre deep-dive pages
- [ ] **Mobile Experience**
  - [ ] Progressive Web App (PWA)
  - [ ] Mobile-optimized UI
  - [ ] Offline support

## 🛠️ Tech Stack

### Current (Frontend Only)
- **HTML5** - Semantic structure
- **CSS3** - Custom design system with CSS variables
- **Vanilla JavaScript** - No framework dependencies
- **Responsive Design** - Mobile-first approach

### Planned Migration
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Backend (PostgreSQL + Auth + Storage)
- **Vercel** - Deployment and hosting

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/MatheusMarques13/musicnerds.git

# Navigate to project directory
cd musicnerds

# Open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

## 📝 Project Structure

```
musicnerds/
├── index.html          # Main application file
├── README.md           # Project documentation
├── LICENSE             # MIT License
└── assets/             # Future: images, icons, etc.
```

## 🎨 Design System

MusicNerds uses a custom design system with:
- **CSS Variables** for theming
- **Automatic Dark/Light Mode** based on system preferences
- **Teal Primary Color** (#21808d light, #32b8c6 dark)
- **Consistent Spacing** (4px base unit)
- **Typography Scale** (11px - 30px)
- **Responsive Grid Layouts**

## 🛣️ Roadmap

### Phase 1: MVP Polish (Current)
- [x] Core UI/UX implementation
- [x] All main views and navigation
- [x] Responsive design
- [ ] Add more realistic sample data
- [ ] Improve animations and transitions
- [ ] Add loading states

### Phase 2: Next.js Migration
- [ ] Set up Next.js 14 project
- [ ] Component architecture
- [ ] TypeScript integration
- [ ] Tailwind CSS setup
- [ ] Route structure

### Phase 3: Backend Integration
- [ ] Supabase setup
- [ ] Database schema design
- [ ] Authentication flow
- [ ] API routes
- [ ] Data fetching with React Query

### Phase 4: External APIs
- [ ] Last.fm integration
- [ ] Spotify integration
- [ ] Album cover images
- [ ] Real scrobbling data

### Phase 5: Advanced Features
- [ ] Real-time features
- [ ] Search functionality
- [ ] Notifications
- [ ] PWA capabilities
- [ ] Performance optimization

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Matheus Marques** (@mathmarques)
- GitHub: [@MatheusMarques13](https://github.com/MatheusMarques13)
- Currently: Educational Coordinator at CNA
- Working on: RetroMynd (life's work project)

## 🙏 Acknowledgments

- Inspired by [RateYourMusic](https://rateyourmusic.com/) and [Last.fm](https://www.last.fm/)
- Design influenced by modern music platforms
- Built with love for the music nerd community 🎶

---

**Status**: 🚧 In Development | **Version**: 0.1.0 (MVP) | **Last Updated**: March 2026