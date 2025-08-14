import { StyleSheet } from 'react-native';
import { useEffect } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { AnalyticsService, AnalyticsEvents } from '@/services/analytics';

export default function TabOneScreen() {
  useEffect(() => {
    // Log screen view when component mounts
    AnalyticsService.setCurrentScreen('TabOne', 'TabOneScreen');

    // Log a custom event
    AnalyticsService.logEvent(AnalyticsEvents.SCREEN_VIEW, {
      screen_name: 'TabOne',
      screen_class: 'TabOneScreen'
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ThemeSwitcher />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
