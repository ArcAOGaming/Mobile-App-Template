// Mock AsyncStorage before any imports
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock other React Native modules that might cause issues in tests
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// Mock Firebase modules
jest.mock('@react-native-firebase/app', () => ({
    utils: () => ({
        FilePath: {
            PICTURES_DIRECTORY: '/tmp',
        },
    }),
}));

jest.mock('@react-native-firebase/analytics', () => ({
    logEvent: jest.fn(),
    setUserId: jest.fn(),
    setUserProperties: jest.fn(),
}));

// Mock Expo modules
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
    }),
    useLocalSearchParams: () => ({}),
    Link: ({ children }) => children,
}));

jest.mock('expo-linking', () => ({
    createURL: jest.fn(),
}));
