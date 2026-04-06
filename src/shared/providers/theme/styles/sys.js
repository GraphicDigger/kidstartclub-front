import { ref } from './ref';

export const sysLight = {
    color: {
        primary: ref.palette.primary50,
        onPrimary: ref.color.white100,
        primaryContainer: ref.palette.primary95,
        onPrimaryContainer: ref.palette.primary50,

        success: ref.palette.success50,
        onSuccess: ref.color.white100,
        successContainer: ref.palette.success95,
        onSuccessContainer: ref.palette.success50,

        warning: ref.palette.warning50,
        onWarning: ref.color.white100,
        warningContainer: ref.palette.warning95,
        onWarningContainer: ref.palette.warning50,

        error: ref.palette.error50,
        onError: ref.color.white100,
        errorContainer: ref.palette.error95,
        onErrorContainer: ref.palette.error50,

        surface: ref.color.white100,
        onSurface: ref.color.grey10,
        onSurfaceVariant: ref.color.grey40,

        surfaceContainer: {
            lowest: ref.color.grey95,
            low: ref.color.grey80,
            default: ref.color.grey70,
            high: ref.color.grey60,
            highest: ref.color.grey50,
        },

        typography: {
            primary: ref.color.grey10,
            secondary: ref.color.grey40,
        },

        outline: {
            lowest: ref.color.grey90,
            low: ref.color.grey80,
            default: ref.color.grey70,
            high: ref.color.grey60,
            highest: ref.color.grey50,
        },
    },
    state: {
        hover: 0.07999999821186066,
        focus: 0.11999999731779099,
        selected: 0.11999999731779099,
        dragged: 0.1599999964237213,
    },
}

export const sysDark = {
    color: {
        primary: ref.palette.primary50,
        onPrimary: ref.color.white100,
        primaryContainer: ref.palette.primary95,
        onPrimaryContainer: ref.palette.primary50,

        success: ref.palette.success50,
        onSuccess: ref.color.white100,
        successContainer: ref.palette.success95,
        onSuccessContainer: ref.palette.success50,

        warning: ref.palette.warning50,
        onWarning: ref.color.white100,
        warningContainer: ref.palette.warning95,
        onWarningContainer: ref.palette.warning50,

        error: ref.palette.error50,
        onError: ref.color.white100,
        errorContainer: ref.palette.error95,
        onErrorContainer: ref.palette.error50,

        surface: ref.color.grey5,
        onSurface: ref.color.white100,
        onSurfaceVariant: ref.color.grey40,

        surfaceContainer: {
            lowest: ref.color.grey10,
            low: ref.color.grey15,
            default: ref.color.grey30,
            high: ref.color.grey40,
            highest: ref.color.grey50,
        },

        typography: {
            primary: ref.color.white100,
            secondary: ref.color.grey60,
        },

        outline: {
            lowest: ref.color.white5,
            low: ref.color.white10,
            default: ref.color.white15,
            high: ref.color.white20,
            highest: ref.color.white25,
        },
    },
    state: {
        hover: 0.2,
        focus: 0.11999999731779099,
        selected: 0.11999999731779099,
        dragged: 0.1599999964237213,
    },
}