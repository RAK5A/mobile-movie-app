## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)

- [Node.js](https://nodejs.org/en)

- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/RAK5A/mobile-movie-app.git

cd mobile-movie-app
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

```bash
npm i react-native-webview
```

```bash
npm i react-native-youtube-iframe
```

```bash
npm i expo-linear-gradient
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env

EXPO_PUBLIC_MOVIE_API_KEY=
```

Replace the placeholder values with your actual TMDB API key. You can obtain these credentials by signing up on the [TMDB](https://www.themoviedb.org/login).

**Running the Project**

```bash

npx expo start

```

**Start on web**

```bash
npm run web
```

**Start on Android**

```bash
npm run android
```

**Start on IOS**

```bash
npm run ios
```
