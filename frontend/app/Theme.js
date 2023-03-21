/**
 * References
 *
 * NativeBase Themes:
 *  - https://docs.nativebase.io/default-theme
 *  - https://docs.nativebase.io/customizing-theme
 *
 * Color Themes:
 *  - Light:  https://www.happyhues.co/
 *  - Dark:   https://www.happyhues.co/palettes/4
 */

import {extendTheme} from 'native-base';

/* -------------------------------------------------------------------------- */
/*                                Custom Themes                               */
/* -------------------------------------------------------------------------- */

class CustomTheme {
  constructor(themeColor, presets) {
    this.color = themeColor;
    this.presets = {};
    for (const [key, value] of Object.entries(presets)) {
      this.presets[key] = themeColor[value];
    }
  }
}

/* ---------------------------------- Dark ---------------------------------- */

const DarkThemeColors = {
  white: '#fffffe',
  purple: '#7f5af0',
  purple_light: '#9274f2',
  purple_dark: '#443182',
  green: '#2cb67d',
  gray_light: '#94a1b2',
  gray_dark: '#242629',
  black_light: '#242629',
  black_dark: '#16161a',
};

const DarkTheme = new CustomTheme(
    DarkThemeColors,
    {
      txt_light: 'white',
      txt_dark: 'gray_light',
      bg_dark: 'black_dark',
      bg_light: 'black_light',
      bttn_txt: 'white',
      bttn_bg: 'purple',
      bttn_bg_press: 'purple_dark',
      bttn_bg_hover: 'purple_dark',
      bttn_bg_focus: 'purple_dark',
    },
);

/* ---------------------------------- Light --------------------------------- */

const LightThemeColors = {
  white: '#FFFFFF',
  rose: '#ff6e6c',
  purple: '#67568c',
  yellow: '#fbdd74',
  gray_light: '#f4effc',
  gray_dark: '#e2daeb',
  black_light: '#1b1425',
  black_dark: '#1f1235',
};

const LightTheme = new CustomTheme(
    LightThemeColors,
    {
      txt_light: 'black_light',
      txt_dark: 'black_dark',
      bg_dark: 'purple',
      bg_light: 'gray_light',
      bttn_txt: 'black_dark',
      bttn_bg: 'rose',
      bttn_bg_press: 'rose',
      bttn_bg_hover: 'rose',
      bttn_bg_focus: 'rose',
    },
);

/* -------------------------------------------------------------------------- */
/*                              Component Theming                             */
/* -------------------------------------------------------------------------- */

function color(colorMode, darkTag, lightTag) {
  return colorMode === 'dark' ? DarkTheme.presets[darkTag] : LightTheme.presets[lightTag];
}

/* ------------------------------ React Native ------------------------------ */

const ViewTheme = {
  baseStyle: ({colorMode}) => {
    return {
      bg: color(colorMode, 'bg_dark', 'bg_dark'),
    };
  },
  defaultProps: {
    w: '100%',
    h: '100%',
  },
};

/* --------------------------------- Layout --------------------------------- */

const BoxTheme = {
  variants: {
    rounded_25_accent: ({colorMode}) => {
      return {
        bg: color(colorMode, 'bg_light', 'bg_light'),
        rounded: '25',
      };
    },
  },
};

/* ---------------------------------- Forms --------------------------------- */

// For some reason does not work with `colorMode`.
const ButtonTheme = {
  variants: {
    link: {
      _text: {
        variant: 'paragraph',
      },
      _dark: {
        _text: {
          color: DarkTheme.presets.bttn_txt,
        },
      },
      _light: {
        _text: {
          color: LightTheme.presets.bttn_txt,
        },
      },
    },
    solid: {
      _dark: {
        bg: DarkTheme.presets.bttn_bg,
        _text: {
          color: DarkTheme.presets.bttn_txt,
        },
        _hover: {
          bg: DarkTheme.presets.bttn_bg_hover,
        },
        _pressed: {
          bg: DarkTheme.presets.bttn_bg_press,
        },
        _focus: {
          bg: DarkTheme.presets.bttn_bg_focus,
        },
      },
      _light: {
        bg: LightTheme.presets.bttn_bg,
        _text: {
          color: LightTheme.presets.bttn_txt,
        },
        _hover: {
          bg: LightTheme.presets.bttn_bg_hover,
        },
        _pressed: {
          bg: LightTheme.presets.bttn_bg_press,
        },
        _focus: {
          bg: LightTheme.presets.bttn_bg_focus,
        },
      },
    },
  },
};

// For some reason does not work with `colorMode`.
const FormControlLabelTheme = {
  baseStyle: {
    _dark: {
      _text: {
        color: DarkTheme.presets.txt_light,
      },
    },
    _light: {
      _text: {
        color: LightTheme.presets.txt_dark,
      },
    },
  },
};

/* ------------------------------- Topography ------------------------------- */

const TextTheme = {
  variants: {
    title: ({colorMode}) => {
      return {
        color: color(colorMode, 'txt_light', 'txt_l;ight'),
      };
    },
    paragraph: ({colorMode}) => {
      return {
        color: color(colorMode, 'txt_light', 'txt_light'),
      };
    },
  },
  defaultProps: {
    variant: 'title',
  },
};

/* -------------------------------------------------------------------------- */
/*                                Theme Setting                               */
/* -------------------------------------------------------------------------- */

const Theme = extendTheme({
  colors: {
    dark: DarkThemeColors,
    light: LightThemeColors,
  },
  components: {
    View: ViewTheme,
    Box: BoxTheme,
    Text: TextTheme,
    Button: ButtonTheme,
    FormControlLabel: FormControlLabelTheme,
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
});

export {Theme};
