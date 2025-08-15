# GitHub Secrets Configuration for App Store Deployment

This document outlines the required GitHub secrets for automated deployment to both Google Play Store and Apple App Store.

## Required Secrets

### Expo Configuration
- **`EXPO_TOKEN`**: Your Expo authentication token
  - Get this from: https://expo.dev/accounts/[username]/settings/access-tokens
  - Create a new token with appropriate permissions

### Android (Google Play Store)
- **`GOOGLE_SERVICE_ACCOUNT_KEY`**: Google Play Console service account key (JSON content)
  - Create a service account in Google Cloud Console
  - Download the JSON key file
  - Copy the entire JSON content as the secret value
- **`GOOGLE_SERVICES_JSON`**: Firebase Google Services configuration (JSON content)
  - Download from Firebase Console > Project Settings > General > Your apps > Download google-services.json
  - Copy the entire JSON content as the secret value
  - This file is created during the build process and never committed to the repository

### iOS (Apple App Store)
- **`APPLE_ID`**: Your Apple ID email address
- **`APPLE_APP_SPECIFIC_PASSWORD`**: App-specific password for your Apple ID
  - Generate at: https://appleid.apple.com/account/manage
  - Go to "Sign-In and Security" > "App-Specific Passwords"
- **`APPLE_TEAM_ID`**: Your Apple Developer Team ID
  - Find in Apple Developer Console under "Membership"
- **`ASC_APP_ID`**: App Store Connect App ID
  - Found in App Store Connect for your app
  - Required for automated submission to App Store

## Setting Up Secrets

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Add each secret with the exact name listed above

## Environment Protection

The deployment jobs use the `production` environment, which allows you to:
- Add additional protection rules
- Require manual approval before deployment
- Restrict which branches can deploy

To configure environment protection:
1. Go to Settings > Environments
2. Click on "production" environment
3. Configure protection rules as needed

## EAS Configuration

The `eas.json` file is configured to:
- Use production build profiles for both platforms
- Auto-increment version numbers
- Submit to internal tracks initially (can be changed to production)
- Reference environment variables for Apple credentials

## Notes

- Android builds will be submitted to the "internal" track initially
- iOS builds will be submitted for App Store review
- Make sure your app is properly configured in both stores before deployment
- Test the deployment process with preview builds first
