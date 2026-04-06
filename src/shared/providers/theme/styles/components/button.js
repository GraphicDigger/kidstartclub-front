import { ref } from "../ref";
import { sysLight, sysDark } from "../sys";

const disabled = {
    background: ref.color.grey80,
    text: ref.color.grey40,
    icon: ref.color.grey40,
}

export const button = {
    light: {
        default: {
            filled: {
                default: {
                    background: ref.color.grey70,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                hover: {
                    background: ref.color.grey65,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                selected: {
                    background: ref.color.grey65,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                disabled: {
                    ...disabled,
                },
            },
            lite: {
                default: {
                    background: ref.color.grey90,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                hover: {
                    background: ref.color.grey65,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                selected: {
                    background: ref.color.grey65,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                disabled: {
                    ...disabled,
                },
            },
            blank: {
                default: {
                    background: 'transparent',
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                hover: {
                    background: ref.color.grey65,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                selected: {
                    background: ref.color.grey65,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                disabled: {
                    ...disabled,
                },
            },
        },
        primary: {
            filled: {
                default: {
                    background: sysLight.color.primary,
                    text: sysLight.color.onPrimary,
                    icon: sysLight.color.onPrimary,
                },
                hover: {
                    background: sysLight.color.primary,
                    text: sysLight.color.onPrimary,
                    icon: sysLight.color.onPrimary,
                },
                selected: {
                    background: sysLight.color.primary,
                    text: sysLight.color.onPrimary,
                    icon: sysLight.color.onPrimary,
                },
                disabled: {
                    ...disabled,
                },
            },
            lite: {
                default: {
                    background: sysLight.color.primaryContainer,
                    text: sysLight.color.onPrimaryContainer,
                    icon: sysLight.color.onPrimaryContainer,
                },
                hover: {
                    background: sysLight.color.primary,
                    text: sysLight.color.onPrimary,
                    icon: sysLight.color.onPrimary,
                },
                selected: {
                    background: sysLight.color.primary,
                    text: sysLight.color.onPrimary,
                    icon: sysLight.color.onPrimary,
                },
                disabled: {
                    ...disabled,
                },
            },
            blank: {
                default: {
                    background: 'transparent',
                    text: sysLight.color.onPrimaryContainer,
                    icon: sysLight.color.onPrimaryContainer,
                },
                hover: {
                    background: ref.color.blue95,
                    text: sysLight.color.onPrimaryContainer,
                    icon: sysLight.color.onPrimaryContainer,
                },
                selected: {
                    background: sysLight.color.primaryContainer,
                    text: sysLight.color.onPrimaryContainer,
                    icon: sysLight.color.onPrimaryContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
        },
        success: {
            filled: {
                default: {
                    background: sysLight.color.success,
                    text: sysLight.color.onSuccess,
                    icon: sysLight.color.onSuccess,
                },
                hover: {
                    background: sysLight.color.success,
                    text: sysLight.color.onSuccess,
                    icon: sysLight.color.onSuccess,
                },
                selected: {
                    background: sysLight.color.success,
                    text: sysLight.color.onSuccess,
                    icon: sysLight.color.onSuccess,
                },
                disabled: {
                    ...disabled,
                },
            },
            lite: {
                default: {
                    background: sysLight.color.successContainer,
                    text: sysLight.color.onSuccessContainer,
                    icon: sysLight.color.onSuccessContainer,
                },
                hover: {
                    background: sysLight.color.success,
                    text: sysLight.color.onSuccess,
                    icon: sysLight.color.onSuccess,
                },
                selected: {
                    background: sysLight.color.successContainer,
                    text: sysLight.color.onSuccessContainer,
                    icon: sysLight.color.onSuccessContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
            blank: {
                default: {
                    background: 'transparent',
                    text: sysLight.color.onSuccessContainer,
                    icon: sysLight.color.onSuccessContainer,
                },
                hover: {
                    background: sysLight.color.successContainer,
                    text: sysLight.color.onSuccessContainer,
                    icon: sysLight.color.onSuccessContainer,
                },
                selected: {
                    background: sysLight.color.successContainer,
                    text: sysLight.color.onSuccessContainer,
                    icon: sysLight.color.onSuccessContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
        },
        warning: {
            filled: {
                default: {
                    background: sysLight.color.warning,
                    text: sysLight.color.onWarning,
                    icon: sysLight.color.onWarning,
                },
                hover: {
                    background: sysLight.color.warning,
                    text: sysLight.color.onWarning,
                    icon: sysLight.color.onWarning,
                },
                selected: {
                    background: sysLight.color.warning,
                    text: sysLight.color.onWarning,
                    icon: sysLight.color.onWarning,
                },
                disabled: {
                    ...disabled,
                },
            },
            lite: {
                default: {
                    background: sysLight.color.warningContainer,
                    text: sysLight.color.onWarningContainer,
                    icon: sysLight.color.onWarningContainer,
                },
                hover: {
                    background: sysLight.color.warning,
                    text: sysLight.color.onWarning,
                    icon: sysLight.color.onWarning,
                },
                selected: {
                    background: sysLight.color.warning,
                    text: sysLight.color.onWarning,
                    icon: sysLight.color.onWarning,
                },
                disabled: {
                    ...disabled,
                },
            },
            blank: {
                default: {
                    background: 'transparent',
                    text: sysLight.color.onWarningContainer,
                    icon: sysLight.color.onWarningContainer,
                },
                hover: {
                    background: ref.color.orange95,
                    text: sysLight.color.onWarningContainer,
                    icon: sysLight.color.onWarningContainer,
                },
                selected: {
                    background: sysLight.color.warningContainer,
                    text: sysLight.color.onWarningContainer,
                    icon: sysLight.color.onWarningContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
        },
        error: {
            filled: {
                default: {
                    background: sysLight.color.error,
                    text: sysLight.color.onError,
                    icon: sysLight.color.onError,
                },
                hover: {
                    background: sysLight.color.error,
                    text: sysLight.color.onError,
                    icon: sysLight.color.onError,
                },
                selected: {
                    background: sysLight.color.errorContainer,
                    text: sysLight.color.onErrorContainer,
                    icon: sysLight.color.onErrorContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
            lite: {
                default: {
                    background: sysLight.color.errorContainer,
                    text: sysLight.color.onErrorContainer,
                    icon: sysLight.color.onErrorContainer,
                },
                hover: {
                    background: sysLight.color.error,
                    text: sysLight.color.onError,
                    icon: sysLight.color.onError,
                },
                selected: {
                    background: sysLight.color.errorContainer,
                    text: sysLight.color.onErrorContainer,
                    icon: sysLight.color.onErrorContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
            blank: {
                default: {
                    background: 'transparent',
                    text: sysLight.color.onErrorContainer,
                    icon: sysLight.color.onErrorContainer,
                },
                hover: {
                    background: sysLight.color.errorContainer,
                    text: sysLight.color.onErrorContainer,
                    icon: sysLight.color.onErrorContainer,
                },
                selected: {
                    background: sysLight.color.errorContainer,
                    text: sysLight.color.onErrorContainer,
                    icon: sysLight.color.onErrorContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
        },
    },

    dark: {
        default: {
            filled: {
                default: {
                    background: ref.color.grey70,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                hover: {
                    background: ref.color.grey65,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                selected: {
                    background: ref.color.grey65,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                disabled: {
                    ...disabled,
                },
            },
            lite: {
                default: {
                    background: ref.color.grey90,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                hover: {
                    background: ref.color.grey65,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                selected: {
                    background: ref.color.grey65,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                disabled: {
                    ...disabled,
                },
            },
            blank: {
                default: {
                    background: 'transparent',
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                hover: {
                    background: ref.color.grey65,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                selected: {
                    background: ref.color.grey65,
                    text: ref.color.grey20,
                    icon: ref.color.grey20,
                },
                disabled: {
                    ...disabled,
                },
            },
        },
        primary: {
            filled: {
                default: {
                    background: sysDark.color.primary,
                    text: sysDark.color.onPrimary,
                    icon: sysDark.color.onPrimary,
                },
                hover: {
                    background: sysDark.color.primary,
                    text: sysDark.color.onPrimary,
                    icon: sysDark.color.onPrimary,
                },
                selected: {
                    background: sysDark.color.primary,
                    text: sysDark.color.onPrimary,
                    icon: sysDark.color.onPrimary,
                },
                disabled: {
                    ...disabled,
                },
            },
            lite: {
                default: {
                    background: sysDark.color.primaryContainer,
                    text: sysDark.color.onPrimaryContainer,
                    icon: sysDark.color.onPrimaryContainer,
                },
                hover: {
                    background: sysDark.color.primary,
                    text: sysDark.color.onPrimary,
                    icon: sysDark.color.onPrimary,
                },
                selected: {
                    background: sysDark.color.primary,
                    text: sysDark.color.onPrimary,
                    icon: sysDark.color.onPrimary,
                },
                disabled: {
                    ...disabled,
                },
            },
            blank: {
                default: {
                    background: 'transparent',
                    text: sysDark.color.onPrimaryContainer,
                    icon: sysDark.color.onPrimaryContainer,
                },
                hover: {
                    background: ref.color.blue95,
                    text: sysDark.color.onPrimaryContainer,
                    icon: sysDark.color.onPrimaryContainer,
                },
                selected: {
                    background: sysDark.color.primaryContainer,
                    text: sysDark.color.onPrimaryContainer,
                    icon: sysDark.color.onPrimaryContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
        },
        success: {
            filled: {
                default: {
                    background: sysDark.color.success,
                    text: sysDark.color.onSuccess,
                    icon: sysDark.color.onSuccess,
                },
                hover: {
                    background: sysDark.color.success,
                    text: sysDark.color.onSuccess,
                    icon: sysDark.color.onSuccess,
                },
                selected: {
                    background: sysDark.color.success,
                    text: sysDark.color.onSuccess,
                    icon: sysDark.color.onSuccess,
                },
                disabled: {
                    ...disabled,
                },
            },
            lite: {
                default: {
                    background: sysDark.color.successContainer,
                    text: sysDark.color.onSuccessContainer,
                    icon: sysDark.color.onSuccessContainer,
                },
                hover: {
                    background: sysDark.color.success,
                    text: sysDark.color.onSuccess,
                    icon: sysDark.color.onSuccess,
                },
                selected: {
                    background: sysDark.color.successContainer,
                    text: sysDark.color.onSuccessContainer,
                    icon: sysDark.color.onSuccessContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
            blank: {
                default: {
                    background: 'transparent',
                    text: sysDark.color.onSuccessContainer,
                    icon: sysDark.color.onSuccessContainer,
                },
                hover: {
                    background: sysDark.color.successContainer,
                    text: sysDark.color.onSuccessContainer,
                    icon: sysDark.color.onSuccessContainer,
                },
                selected: {
                    background: sysLight.color.successContainer,
                    text: sysDark.color.onSuccessContainer,
                    icon: sysDark.color.onSuccessContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
        },
        warning: {
            filled: {
                default: {
                    background: sysDark.color.warning,
                    text: sysDark.color.onWarning,
                    icon: sysDark.color.onWarning,
                },
                hover: {
                    background: sysDark.color.warning,
                    text: sysDark.color.onWarning,
                    icon: sysDark.color.onWarning,
                },
                selected: {
                    background: sysDark.color.warning,
                    text: sysDark.color.onWarning,
                    icon: sysDark.color.onWarning,
                },
                disabled: {
                    ...disabled,
                },
            },
            lite: {
                default: {
                    background: sysDark.color.warningContainer,
                    text: sysDark.color.onWarningContainer,
                    icon: sysDark.color.onWarningContainer,
                },
                hover: {
                    background: sysDark.color.warning,
                    text: sysDark.color.onWarning,
                    icon: sysDark.color.onWarning,
                },
                selected: {
                    background: sysDark.color.warning,
                    text: sysDark.color.onWarning,
                    icon: sysDark.color.onWarning,
                },
                disabled: {
                    ...disabled,
                },
            },
            blank: {
                default: {
                    background: 'transparent',
                    text: sysDark.color.onWarningContainer,
                    icon: sysDark.color.onWarningContainer,
                },
                hover: {
                    background: ref.color.orange95,
                    text: sysDark.color.onWarningContainer,
                    icon: sysDark.color.onWarningContainer,
                },
                selected: {
                    background: sysDark.color.warningContainer,
                    text: sysDark.color.onWarningContainer,
                    icon: sysDark.color.onWarningContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
        },
        error: {
            filled: {
                default: {
                    background: sysDark.color.error,
                    text: sysDark.color.onError,
                    icon: sysDark.color.onError,
                },
                hover: {
                    background: sysDark.color.error,
                    text: sysDark.color.onError,
                    icon: sysDark.color.onError,
                },
                selected: {
                    background: sysDark.color.errorContainer,
                    text: sysDark.color.onErrorContainer,
                    icon: sysDark.color.onErrorContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
            lite: {
                default: {
                    background: sysDark.color.errorContainer,
                    text: sysDark.color.onErrorContainer,
                    icon: sysDark.color.onErrorContainer,
                },
                hover: {
                    background: sysDark.color.error,
                    text: sysDark.color.onError,
                    icon: sysDark.color.onError,
                },
                selected: {
                    background: sysDark.color.errorContainer,
                    text: sysDark.color.onErrorContainer,
                    icon: sysDark.color.onErrorContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
            blank: {
                default: {
                    background: 'transparent',
                    text: sysDark.color.onErrorContainer,
                    icon: sysDark.color.onErrorContainer,
                },
                hover: {
                    background: sysDark.color.errorContainer,
                    text: sysDark.color.onErrorContainer,
                    icon: sysDark.color.onErrorContainer,
                },
                selected: {
                    background: sysDark.color.errorContainer,
                    text: sysDark.color.onErrorContainer,
                    icon: sysDark.color.onErrorContainer,
                },
                disabled: {
                    ...disabled,
                },
            },
        },
    },

};
