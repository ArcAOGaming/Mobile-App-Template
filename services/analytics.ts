import analytics from '@react-native-firebase/analytics';

export class AnalyticsService {
    /**
     * Log a custom event
     * @param eventName - Name of the event
     * @param parameters - Event parameters (optional)
     */
    static async logEvent(eventName: string, parameters?: { [key: string]: any }) {
        try {
            await analytics().logEvent(eventName, parameters);
        } catch (error) {
            console.warn('Analytics logEvent error:', error);
        }
    }

    /**
     * Set user properties
     * @param properties - User properties to set
     */
    static async setUserProperties(properties: { [key: string]: string }) {
        try {
            await analytics().setUserProperties(properties);
        } catch (error) {
            console.warn('Analytics setUserProperties error:', error);
        }
    }

    /**
     * Set user ID
     * @param userId - User ID to set
     */
    static async setUserId(userId: string) {
        try {
            await analytics().setUserId(userId);
        } catch (error) {
            console.warn('Analytics setUserId error:', error);
        }
    }

    /**
     * Set current screen name
     * @param screenName - Name of the current screen
     * @param screenClass - Class of the current screen (optional)
     */
    static async setCurrentScreen(screenName: string, screenClass?: string) {
        try {
            await analytics().logScreenView({
                screen_name: screenName,
                screen_class: screenClass || screenName,
            });
        } catch (error) {
            console.warn('Analytics setCurrentScreen error:', error);
        }
    }

    /**
     * Enable/disable analytics collection
     * @param enabled - Whether to enable analytics collection
     */
    static async setAnalyticsCollectionEnabled(enabled: boolean) {
        try {
            await analytics().setAnalyticsCollectionEnabled(enabled);
        } catch (error) {
            console.warn('Analytics setAnalyticsCollectionEnabled error:', error);
        }
    }

    /**
     * Reset analytics data
     */
    static async resetAnalyticsData() {
        try {
            await analytics().resetAnalyticsData();
        } catch (error) {
            console.warn('Analytics resetAnalyticsData error:', error);
        }
    }
}

// Common event names for consistency
export const AnalyticsEvents = {
    SCREEN_VIEW: 'screen_view',
    LOGIN: 'login',
    SIGN_UP: 'sign_up',
    PURCHASE: 'purchase',
    SEARCH: 'search',
    SHARE: 'share',
    SELECT_CONTENT: 'select_content',
    APP_OPEN: 'app_open',
    TUTORIAL_BEGIN: 'tutorial_begin',
    TUTORIAL_COMPLETE: 'tutorial_complete',
} as const;
