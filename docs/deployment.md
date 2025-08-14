# Deployment

This mobile app template uses automated deployment through GitHub Actions and Expo Application Services (EAS) to deploy to both Android and iOS app stores.

## Overview

The deployment process is fully automated and triggered when code is pushed to the `main` branch. The workflow:

1. **Builds** both Android and iOS versions of the app
2. **Tests** the code and runs quality checks
3. **Deploys** automatically to both app stores if builds succeed

## Deployment Platforms

### Android (Google Play Store)
- Builds using EAS Build service
- Submits to Google Play Console
- Initially deployed to "internal" track for testing
- Can be promoted to production through Google Play Console

### iOS (Apple App Store)
- Builds using EAS Build service  
- Submits to App Store Connect
- Goes through Apple's review process
- Released automatically after approval (or manually if configured)

## Prerequisites

Before automated deployment works, you need to:

1. **Set up GitHub Secrets** - See [GitHub Secrets Configuration](./github-secrets.md) for detailed instructions
2. **Configure app store accounts**:
   - Google Play Console developer account
   - Apple Developer Program membership
   - App Store Connect access
3. **Create your apps** in both stores (initial setup)
4. **Configure EAS** - The `eas.json` file is already configured

## Deployment Workflow

### Automatic Deployment
When you push to the `main` branch:

```bash
git push origin main
```

The GitHub Actions workflow automatically:
1. Runs PR validation checks
2. Builds Android and iOS versions
3. Submits to both app stores
4. Notifies you of success/failure

### Manual Deployment
You can also deploy manually using EAS CLI:

```bash
# Build and submit Android
eas build --platform android --auto-submit

# Build and submit iOS  
eas build --platform ios --auto-submit
```

## Configuration Files

- **`eas.json`** - EAS Build and Submit configuration
- **`.github/workflows/build-main.yml`** - Main deployment workflow
- **`.github/workflows/pr-validation.yml`** - PR validation workflow
- **`.github/workflows/build-mobile.yml`** - Reusable build workflow

## Environment Protection

The deployment uses a `production` environment in GitHub Actions, which allows you to:
- Add manual approval requirements
- Restrict deployments to specific branches
- Add additional security checks

To configure: Go to your repository Settings > Environments > production

## Monitoring Deployments

### GitHub Actions
- View workflow runs in the "Actions" tab of your repository
- Check logs for build and deployment status
- Receive notifications on failures

### App Store Consoles
- **Google Play Console**: Monitor Android app status and releases
- **App Store Connect**: Track iOS app review and release status

## Troubleshooting

### Common Issues
1. **Authentication failures**: Check that all GitHub secrets are correctly set
2. **Build failures**: Review the GitHub Actions logs for specific errors
3. **Store submission failures**: Verify app store configurations and credentials

### Getting Help
- Check the GitHub Actions logs for detailed error messages
- Review the [GitHub Secrets Configuration](./github-secrets.md) guide
- Consult Expo EAS documentation for build-specific issues

## Security Notes

- All sensitive credentials are stored as GitHub secrets
- The production environment provides additional security layers
- Secrets are never exposed in logs or code
- Access is controlled through GitHub repository permissions

## Next Steps

1. Follow the [GitHub Secrets Configuration](./github-secrets.md) guide to set up your credentials
2. Push code to `main` branch to trigger your first automated deployment
3. Monitor the deployment in GitHub Actions and app store consoles
4. Configure environment protection rules as needed for your team
