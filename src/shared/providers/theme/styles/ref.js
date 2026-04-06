const breakpoints = {
    xsmall: 375,
    small: 576,
    medium: 768,
    large: 992,
    xlarge: 1200,
    xxlarge: 1600,
    xxxlarge: 1920,
}

const color = {
    white100: '#FFFFFF',
    white90: '#FFFFFFE5',
    white80: '#FFFFFFCC',
    white70: '#FFFFFFB2',
    white60: '#FFFFFF99',
    white50: '#FFFFFF80',
    white40: '#FFFFFF66',
    white30: '#FFFFFF4D',
    white25: '#FFFFFF40',
    white20: '#FFFFFF33',
    white15: '#FFFFFF26',
    white10: '#FFFFFF1A',
    white5: '#FFFFFF0D',
    white3: '#FFFFFF08',
    white0: '#FFFFFF00',

    black100: '#000000',
    black90: '#000000E5',
    black80: '#000000CC',
    black70: '#000000B2',
    black60: '#00000099',
    black50: '#00000080',
    black40: '#00000066',
    black30: '#0000004D',
    black20: '#00000033',
    black10: '#0000001A',
    black5: '#0000000D',
    black3: '#00000008',
    black0: '#00000000',

    grey5: '#0D0D0D',
    grey10: '#141414',
    grey15: '#202021',
    grey20: '#303133',
    grey30: '#454647',
    grey40: '#6E6F70',
    grey45: '#808182',
    grey50: '#929394',
    grey55: '#ABACAD',
    grey60: '#C2C3C4',
    grey65: '#CFD0D1',
    grey70: '#DEDEDE',
    grey80: '#E8E8E8',
    grey90: '#F2F2F2',
    grey95: '#FAFAFA',

    blue5: '#001129',
    blue10: '#001B3B',
    blue15: '#00264D',
    blue20: '#003060',
    blue25: '#003B74',
    blue30: '#004788',
    blue35: '#00529D',
    blue40: '#005EB2',
    blue50: '#007BE5',
    blue60: '#0D99FF',
    blue70: '#75ADFF',
    blue80: '#A7C8FF',
    blue90: '#D5E3FF',
    blue95: '#EBF1FF',
    blue98: '#F9F9FF',
    blue99: '#FDFBFF',

    mint10: '#002019',
    mint20: '#00382C',
    mint25: '#004436',
    mint30: '#005141',
    mint35: '#005E4C',
    mint40: '#006B57',
    mint50: '#00876E',
    mint60: '#00A486',
    mint70: '#2FC09F',
    mint80: '#5BD9B9',
    mint90: '#87EDD1',
    mint95: '#B9FFE8',
    mint98: '#E6FFF5',
    mint99: '#F3FFF9',

    orange10: '#261903',
    orange20: '#4C3105',
    orange25: '#724A08',
    orange30: '#99620B',
    orange35: '#BF7B0D',
    orange40: '#E59310',
    orange50: '#F0A62D',
    orange60: '#F3B653',
    orange70: '#F8D6A0',
    orange80: '#FADEB3',
    orange90: '#FBE7C6',
    orange95: '#FCEFD9',
    orange98: '#FEF7EC',
    orange99: '#FEFBF6',

    red10: '#40000B',
    red20: '#680018',
    red25: '#7C001F',
    red30: '#920026',
    red35: '#A50E2F',
    red40: '#B61F39',
    red50: '#D93B50',
    red60: '#FC5567',
    red70: '#FF888E',
    red80: '#FFB3B5',
    red90: '#FFDADA',
    red95: '#FFEDEC',
    red98: '#FFF8F7',
    red99: '#FFFBFF',
}



export const palette = {
    primary10: color.blue10,
    primary20: color.blue20,
    primary30: color.blue30,
    primary40: color.blue40,
    primary50: color.blue50, //main
    primary60: color.blue60,
    primary70: color.blue70,
    primary80: color.blue80,
    primary90: color.blue90,
    primary95: color.blue95,
    primary98: color.blue98,

    success50: color.mint50, //main
    success60: color.mint60,
    success70: color.mint70,
    success95: color.mint95,

    warning50: color.orange50, //main
    warning60: color.orange60,
    warning70: color.orange70,
    warning95: color.orange95,

    error50: color.red50, //main
    error60: color.red60,
    error70: color.red70,
    error95: color.red95,

    black: color.black100,
    white: color.white100,
}

export const ref = {
    color: { ...color },
    palette: { ...palette },
    breakpoints: { ...breakpoints },
    spacing: {
        xsmall: '4px',
        small: '8px',
        medium: '16px',
        large: '24px',
        xlarge: '32px',
        xxlarge: '40px',
    },
    zIndex: {
        level: (n) => `${n * 100}`,
        layers: {
            base: 0,        // everything else
            baseUI: 100,    // main UI (renamed from 'content' to avoid CSS conflicts)
            floating: 200,  // panels, inspectors
            overlay: 300,   // translucent dim
            modal: 400,     // dialogs
            tooltip: 500,   // temporary info
        },
    },
    borderRadius: {
        xsmall: '4px',
        small: '8px',
        medium: '12px',
        large: '16px',
    },
    size: {
        small: '32px',
        medium: '36px',
        large: '40px',
        xlarge: '48px',
        xxlarge: '56px',
    },
    typography: {
        fontSize: {
            small: '14px',
            medium: '16px',
            large: '18px',
            xlarge: '24px',
        },
        fontWeight: {
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        lineHeight: {
            lh100: '100%',
            lh110: '110%',
            lh120: '120%',
            lh130: '130%',
            lh140: '140%',
            lh150: '150%',
            lh160: '160%',
        },
        body: {
            xsmall: {
                fontSize: '12px',
                lineHeight: '140%',
                fontWeight: '500',
            },
            small: {
                fontSize: '14px',
                lineHeight: '140%',
                fontWeight: '500',
            },
            medium: {
                fontSize: '16px',
                lineHeight: '150%',
                fontWeight: '500',
            },
        },
        heading: {
            xsmall: {
                fontSize: '14px',
                lineHeight: '140%',
                fontWeight: '700',
            },
            small: {
                fontSize: '16px',
                lineHeight: '160%',
                fontWeight: '700',
            },
            medium: {
                fontSize: '20px',
                lineHeight: '160%',
                fontWeight: '700',
            },
            large: {
                fontSize: '24px',
                lineHeight: '160%',
                fontWeight: '500',
            },
        },
    },
}