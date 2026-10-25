import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const ensurePermission = async (): Promise<boolean> => {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;

  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
};

export const notifyLocal = async (title: string, body: string, data?: Record<string, unknown>) => {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Notificaciones',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }

    if (!(await ensurePermission())) return;

    await Notifications.scheduleNotificationAsync({
      content: { title, body, data },
      trigger: null, // inmediata
    });
  } catch (error) {
    console.log('Notification error', error);
  }
};