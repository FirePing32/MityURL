# MityURL
Run your own URL shortening service without ads

## Install dependencies
```bash
npm install
```

## Initial Setup
Setup [Firebase](https://firebase.google.com) credentials in `App.js`

```java-script
var config = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    databaseURL: "DATABASE_URL",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId: "APP_ID",
    measurementId: "MEASUREMENT_ID"
};
```

Create an app on [Vercel](https://vercel.com) and deploy firebase [backend](https://github.com/prakhargurunani/MityURL-Server). Use your app name in `<MY-APP-NAME>`

```java-script
this.state.redirect_url = "https://MY-APP-NAME.vercel.app/" + this.state.url_id;
```

## Build
The app can be built in 2 ways -
- `cd android && ./gradlew assembleRelease`
- `react-native bundle --platform android`

The `release` APK can be found in `/android/app/build/outputs/apk/release`.