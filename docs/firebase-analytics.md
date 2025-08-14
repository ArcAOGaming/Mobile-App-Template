# Firebase Analytics Setup Guide

This guide explains how to set up and use Firebase Analytics in your React Native Expo app.

## Prerequisites

The following packages have been installed:
- `@react-native-firebase/app` - Core Firebase SDK
- `@react-native-firebase/analytics` - Firebase Analytics module

## Configuration

### 1. Firebase Project Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Add your iOS and Android apps to the project
4. Download the configuration files:
   - `google-services.json` for Android (place in `android/app/`)
   - `GoogleService-Info.plist` for iOS (place in `ios/YourAppName/`)

### 2. Update Firebase Configuration

Edit `firebase.config.js` with your actual Firebase project configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id",
  measurementId: "your-actual-measurement-id"
};
```

### 3. App Configuration

The `app.json` has been updated to include the Firebase plugin:

```json
{
  "plugins": [
    "expo-router",
    "@react-native-firebase/app"
  ]
}
```

## Usage

### Analytics Service

Use the `AnalyticsService` class from `services/analytics.ts` for all analytics operations:

```typescript
import { AnalyticsService, AnalyticsEvents } from '@/services/analytics';

// Log a custom event
AnalyticsService.logEvent('button_click', {
  button_name: 'login_button',
  screen_name: 'login_screen'
});

// Log screen views
AnalyticsService.setCurrentScreen('HomeScreen', 'HomeScreen');

// Set user properties
AnalyticsService.setUserProperties({
  user_type: 'premium',
  preferred_language: 'en'
});

// Set user ID
AnalyticsService.setUserId('user123');
```

### Predefined Events

Use the `AnalyticsEvents` constants for common events:

```typescript
// Available events
AnalyticsEvents.SCREEN_VIEW
AnalyticsEvents.LOGIN
AnalyticsEvents.SIGN_UP
AnalyticsEvents.PURCHASE
AnalyticsEvents.SEARCH
AnalyticsEvents.SHARE
AnalyticsEvents.SELECT_CONTENT
AnalyticsEvents.APP_OPEN
AnalyticsEvents.TUTORIAL_BEGIN
AnalyticsEvents.TUTORIAL_COMPLETE
```

### Example Implementation

See `app/(tabs)/index.tsx` for an example of how to implement analytics in a screen:

```typescript
import { useEffect } from 'react';
import { AnalyticsService, AnalyticsEvents } from '@/services/analytics';

export default function MyScreen() {
  useEffect(() => {
    // Log screen view
    AnalyticsService.setCurrentScreen('MyScreen', 'MyScreen');
    
    // Log custom event
    AnalyticsService.logEvent(AnalyticsEvents.SCREEN_VIEW, {
      screen_name: 'MyScreen',
      screen_class: 'MyScreen'
    });
  }, []);

  // Component JSX...
}
```

## Building and Testing

### Development Build

For development builds with Firebase Analytics:

```bash
# Create development build
expo build:android --type apk
expo build:ios --type simulator
```

### Production Build

For production builds:

```bash
# Android
expo build:android --type app-bundle

# iOS
expo build:ios --type archive
```

## Privacy and Compliance

### Analytics Collection Control

You can enable/disable analytics collection:

```typescript
// Disable analytics collection
AnalyticsService.setAnalyticsCollectionEnabled(false);

// Enable analytics collection
AnalyticsService.setAnalyticsCollectionEnabled(true);
```

### Reset Analytics Data

To reset all analytics data:

```typescript
AnalyticsService.resetAnalyticsData();
```

## Debugging

### Debug Mode

To enable debug mode for analytics (development only):

```bash
# Android
adb shell setprop debug.firebase.analytics.app your.package.name

# iOS - Add to your app's arguments in Xcode:
-FIRAnalyticsDebugEnabled
```

### Viewing Events

- Events appear in the Firebase Console under Analytics > Events
- Real-time events can be viewed in Analytics > DebugView (when debug mode is enabled)
- Custom events may take up to 24 hours to appear in standard reports

## Best Practices

1. **Event Naming**: Use descriptive, consistent event names
2. **Parameter Limits**: Keep event parameters under 25 per event
3. **Privacy**: Always respect user privacy and comply with regulations
4. **Performance**: Analytics calls are asynchronous and won't block UI
5. **Testing**: Test analytics in development builds before production

## Troubleshooting

### Common Issues

1. **Events not appearing**: Check Firebase configuration and ensure app is properly connected
2. **Build errors**: Ensure all Firebase configuration files are in the correct locations
3. **iOS build issues**: Verify `GoogleService-Info.plist` is added to the Xcode project

### Support

- [Firebase Analytics Documentation](https://firebase.google.com/docs/analytics)
- [React Native Firebase Documentation](https://rnfirebase.io/analytics/usage)
- [Expo Firebase Integration](https://docs.expo.dev/guides/using-firebase/)
