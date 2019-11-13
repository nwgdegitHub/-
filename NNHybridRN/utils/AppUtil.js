import { DeviceInfo, Platform, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export default {
    app_theme: '#FF8c07',
    app_background: '#FFFFFF',
    app_black: '#030303',
    app_clear: 'transparent',
    app_lightGray: '#DDDDDD',
    app_gray: '#999999',

    app_dividing_line: '#EDEFF2',

    navigationBarHeight: Platform.OS === 'ios' ? 44 : 50,
    fullNavigationBarHeight: Platform.OS === 'ios' ? (DeviceInfo.isIPhoneX_deprecated ? 88 : 64) : 50,
    statusBarHeight: Platform.OS === 'ios' ? (DeviceInfo.isIPhoneX_deprecated ? 44 : 20) : 0,
    tabBarHeight: DeviceInfo.isIPhoneX_deprecated ? 83 : 49,
    windowWidth: window.width,
    windowHeight: window.height,

    navigationTitleFont: 17,

    iOS: Platform.OS === 'ios',
    android: Platform.OS === 'android',
    
    placeholderImage: require('../resource/images/placeHolder/image_placeholder.png'),

    isEmptyObject: obj => {
        for (var n in obj) { return false }
        return true;
    },
    isEmptyArray: array => {
        return !array || !array.length;
    },
    isEmptyString: string => {
        return !string || string.length < 1;
    },
    makeSureObject: obj => {
        for (var n in obj) { return obj }
        return {};
    },
    makeSureArray: array => {
        return array ? array : [];
    },
    makeSureString: string => {
        if (!string) return '';
        return `${string}`;
    }
}


