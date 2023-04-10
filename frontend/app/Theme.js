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
  // eslint-disable-next-line no-shadow
  constructor(color, presets) {
    this.color = color;
    this.presets = {};
    // Remap component attributes to hex-codes
    for (const [key, value] of Object.entries(presets)) {
      this.presets[key] = color[value];
    }
  }
}

/* ---------------------------------- Dark ---------------------------------- */

// Mapping color names to hex-codes
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

// Mapping component attributes to color names
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

// Mapping color names to hex-codes
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

// Mapping component attributes to color names
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

/**
 * Gets the component attribute of {@link DarkTheme} or {@link LightTheme} depending
 * on the theme currently in use.
 *
 * @param {*} colorMode
 * @param {*} darkTag
 * @param {*} lightTag
 * @return {*}
 */
function colorPreset(colorMode, darkTag, lightTag) {
  return colorMode === 'dark' ? DarkTheme.presets[darkTag] : LightTheme.presets[lightTag];
}

function color(colorMode, darkColor, lightColor) {
  return colorMode === 'dark' ? DarkTheme.color[darkColor] : LightTheme.color[lightColor];
}

/* ------------------------------ React Native ------------------------------ */

// NativeBase.View
const ViewTheme = {
  baseStyle: ({colorMode}) => {
    return {
      bg: colorPreset(colorMode, 'bg_dark', 'bg_dark'),
    };
  },
  variants: {
    accented: ({colorMode}) => {
      return {
        bg: color(colorMode, 'gray_dark', 'rose'),
      };
    },
  },
  defaultProps: {
    w: '100%',
    h: '100%',
  },
};

/* --------------------------------- Layout --------------------------------- */

// NativeBase.Box
const BoxTheme = {
  variants: {
    rounded_25_accent: ({colorMode}) => {
      return {
        bg: colorPreset(colorMode, 'bg_light', 'bg_light'),
        rounded: '25',
      };
    },
  },
};

/* ---------------------------------- Forms --------------------------------- */

// NativeBase.Button
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

// NativeBase.FormControl.Label
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

// NativeBase.Text
const TextTheme = {
  variants: {
    title: ({colorMode}) => {
      return {
        color: colorPreset(colorMode, 'txt_light', 'txt_l;ight'),
      };
    },
    paragraph: ({colorMode}) => {
      return {
        color: colorPreset(colorMode, 'txt_light', 'txt_light'),
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

export {
  Theme,
};
