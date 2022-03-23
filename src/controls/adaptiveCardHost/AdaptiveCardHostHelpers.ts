import { LocalizedFontFamilies } from '@fluentui/theme/lib/fonts';
import { mergeThemes } from '@fluentui/theme/lib/mergeThemes';
import { BaseComponentContext, IReadonlyTheme } from '@microsoft/sp-component-base';
import { ActionAlignment, AdaptiveCard, TextColor, TextWeight } from 'adaptivecards';
import { IEvaluationContext } from 'adaptivecards-templating/lib/template-engine';
import * as markdown from 'markdown-it';
import { IPartialTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { getDefaultFluentUITheme } from './fluentUI';
import { IAdaptiveCardHostEvaluationContext } from './models/IAdaptiveCardHostEvaluationContext';

const fluentUICSSVariablePrefix = "ach-fui";

const lightenDarkenColor = (col, amt) => {
  let usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

export const initProcessMarkdown = () => {
  if (!AdaptiveCard.onProcessMarkdown) {
    AdaptiveCard.onProcessMarkdown = (text, result) => {
      result.outputHtml = new markdown.default().render(text);
      result.didProcess = true;

      try {
        result.outputHtml = new markdown.default().render(text);
        result.didProcess = true;
      } catch (error) {
        console.error('AdaptiveCardHost: Error parsing Markdown', error);
        result.didProcess = false;
      }
    };
  }
};

export const createSharePointHostConfig = (theme: ITheme): any => {
  let hostConfig: any = {
    fontFamily: (theme.fonts.medium.fontFamily)
      ? theme.fonts.medium.fontFamily
      : LocalizedFontFamilies.WestEuropean
  };

  if (theme) {
    hostConfig = {
      fontFamily: theme.fonts.mediumPlus.fontFamily,
      separator: {
        lineThickness: 1,
        lineColor: theme.semanticColors.bodyFrameDivider
      },
      containerStyles: {
        default: {
          backgroundColor: theme.semanticColors.bodyBackground,
          foregroundColors: {
            default: {
              default: theme.semanticColors.bodyText,
              subtle: theme.semanticColors.bodySubtext
            },
            dark: {
              default: theme.palette.themeDark,
              subtle: theme.palette.themeDarkAlt
            },
            light: {
              default: theme.palette.themeLight,
              subtle: lightenDarkenColor(theme.palette.themeLight, 20)
            },
            accent: {
              default: theme.palette.accent,
              subtle: lightenDarkenColor(theme.palette.accent, 20)
            },
            attention: {
              default: theme.palette.redDark,
              subtle: theme.palette.red
            },
            good: {
              default: theme.palette.greenDark,
              subtle: theme.palette.green
            },
            warning: {
              default: theme.palette.yellowDark,
              subtle: theme.palette.yellowDark
            }
          }
        },
        emphasis: {
          backgroundColor: theme.palette.neutralLight,
          foregroundColors: {
            default: {
              default: theme.semanticColors.bodyText,
              subtle: theme.semanticColors.bodySubtext
            },
            dark: {
              default: theme.palette.themeDark,
              subtle: theme.palette.themeDarkAlt
            },
            light: {
              default: theme.palette.themeLight,
              subtle: lightenDarkenColor(theme.palette.themeLight, 20)
            },
            accent: {
              default: theme.palette.accent,
              subtle: lightenDarkenColor(theme.palette.accent, 20)
            },
            attention: {
              default: theme.palette.redDark,
              subtle: theme.palette.red
            },
            good: {
              default: theme.palette.greenDark,
              subtle: theme.palette.green
            },
            warning: {
              default: theme.palette.yellowDark,
              subtle: theme.palette.yellowDark
            }
          }
        },
        "accent": {
          "backgroundColor": "#E2E2F6",
          "foregroundColors": {
            "default": {
              "default": "#323130",
              "subtle": "#8A8886"
            },
            "dark": {
              "default": "#000000",
              "subtle": "#605E5C"
            },
            "light": {
              "default": "#F3F2F1",
              "subtle": "#E1DFDD"
            },
            "accent": {
              "default": "#6264A7",
              "subtle": "#A6A7DC"
            },
            "attention": {
              "default": "#A80000",
              "subtle": "#A3A80000"
            },
            "good": {
              "default": "#107C10",
              "subtle": "#A3107C10"
            },
            "warning": {
              "default": "#797673",
              "subtle": "#A19F9D"
            }
          }
        },
        "good": {
          "backgroundColor": "#DFF6DD",
          "foregroundColors": {
            "default": {
              "default": "#323130",
              "subtle": "#8A8886"
            },
            "dark": {
              "default": "#000000",
              "subtle": "#605E5C"
            },
            "light": {
              "default": "#F3F2F1",
              "subtle": "#E1DFDD"
            },
            "accent": {
              "default": "#6264A7",
              "subtle": "#A6A7DC"
            },
            "attention": {
              "default": "#A80000",
              "subtle": "#A3A80000"
            },
            "good": {
              "default": "#107C10",
              "subtle": "#A3107C10"
            },
            "warning": {
              "default": "#797673",
              "subtle": "#A19F9D"
            }
          }
        },
        "attention": {
          "backgroundColor": "#FED9CC",
          "foregroundColors": {
            "default": {
              "default": "#323130",
              "subtle": "#8A8886"
            },
            "dark": {
              "default": "#000000",
              "subtle": "#605E5C"
            },
            "light": {
              "default": "#F3F2F1",
              "subtle": "#E1DFDD"
            },
            "accent": {
              "default": "#6264A7",
              "subtle": "#A6A7DC"
            },
            "attention": {
              "default": "#A80000",
              "subtle": "#A3A80000"
            },
            "good": {
              "default": "#107C10",
              "subtle": "#A3107C10"
            },
            "warning": {
              "default": "#797673",
              "subtle": "#A19F9D"
            }
          }
        },
        "warning": {
          "backgroundColor": "#FFF4CE",
          "foregroundColors": {
            "default": {
              "default": "#323130",
              "subtle": "#8A8886"
            },
            "dark": {
              "default": "#000000",
              "subtle": "#605E5C"
            },
            "light": {
              "default": "#F3F2F1",
              "subtle": "#E1DFDD"
            },
            "accent": {
              "default": "#6264A7",
              "subtle": "#A6A7DC"
            },
            "attention": {
              "default": "#A80000",
              "subtle": "#A3A80000"
            },
            "good": {
              "default": "#107C10",
              "subtle": "#A3107C10"
            },
            "warning": {
              "default": "#797673",
              "subtle": "#A19F9D"
            }
          }
        }
      },
      inputs: {
        label: {
          requiredInputs: { weight: TextWeight.Bolder },
          optionalInputs: { weight: TextWeight.Bolder },
        },
        errorMessage: {
          color: TextColor.Attention,
          weight: TextWeight.Bolder
        }
      },
      actions: {
        buttonSpacing: 10,
        actionAlignment: ActionAlignment.Right
      }
    };
  }

  return hostConfig;
};

export const createDefaultTeamsHostConfig = (theme: ITheme): any => {
  let hostConfig: any = {
    fontFamily: (theme.fonts.medium.fontFamily)
      ? theme.fonts.medium.fontFamily
      : LocalizedFontFamilies.WestEuropean
  };

  if (theme) {
    hostConfig = {
      fontFamily: theme.fonts.mediumPlus.fontFamily,
      separator: {
        lineThickness: 1,
        lineColor: theme.semanticColors.bodyFrameDivider
      },
      containerStyles: {
        default: {
          backgroundColor: theme.semanticColors.bodyBackground,
          foregroundColors: {
            default: {
              default: theme.semanticColors.bodyText,
              subtle: theme.semanticColors.bodySubtext
            },
            dark: {
              default: theme.palette.themeDark,
              subtle: theme.palette.themeDarkAlt
            },
            light: {
              default: theme.palette.themeLight,
              subtle: lightenDarkenColor(theme.palette.themeLight, 20)
            },
            accent: {
              default: theme.palette.accent,
              subtle: lightenDarkenColor(theme.palette.accent, 20)
            },
            attention: {
              default: theme.palette.redDark,
              subtle: theme.palette.red
            },
            good: {
              default: theme.palette.greenDark,
              subtle: theme.palette.green
            },
            warning: {
              default: theme.palette.yellowDark,
              subtle: theme.palette.yellowDark
            }
          }
        },
        emphasis: {
          backgroundColor: theme.palette.neutralLight,
          foregroundColors: {
            default: {
              default: theme.semanticColors.bodyText,
              subtle: theme.semanticColors.bodySubtext
            },
            dark: {
              default: theme.palette.themeDark,
              subtle: theme.palette.themeDarkAlt
            },
            light: {
              default: theme.palette.themeLight,
              subtle: lightenDarkenColor(theme.palette.themeLight, 20)
            },
            accent: {
              default: theme.palette.accent,
              subtle: lightenDarkenColor(theme.palette.accent, 20)
            },
            attention: {
              default: theme.palette.redDark,
              subtle: theme.palette.red
            },
            good: {
              default: theme.palette.greenDark,
              subtle: theme.palette.green
            },
            warning: {
              default: theme.palette.yellowDark,
              subtle: theme.palette.yellowDark
            }
          }
        },
        "accent": {
          "borderColor": "#62A8F7",
          "backgroundColor": "#C7DEF9",
          "foregroundColors": {
            "default": {
              "default": "#ff252424",
              "subtle": "#bf252424"
            },
            "dark": {
              "default": "#252424",
              "subtle": "#bf252424"
            },
            "light": {
              "default": "#ffffff",
              "subtle": "#fff3f2f1"
            },
            "accent": {
              "default": "#6264a7",
              "subtle": "#8b8cc7"
            },
            "good": {
              "default": "#92c353",
              "subtle": "#e592c353"
            },
            "warning": {
              "default": "#f8d22a",
              "subtle": "#e5f8d22a"
            },
            "attention": {
              "default": "#c4314b",
              "subtle": "#e5c4314b"
            }
          }
        },
        "good": {
          "borderColor": "#69E569",
          "backgroundColor": "#CCFFCC",
          "foregroundColors": {
            "default": {
              "default": "#ff252424",
              "subtle": "#bf252424"
            },
            "dark": {
              "default": "#252424",
              "subtle": "#bf252424"
            },
            "light": {
              "default": "#ffffff",
              "subtle": "#fff3f2f1"
            },
            "accent": {
              "default": "#6264a7",
              "subtle": "#8b8cc7"
            },
            "good": {
              "default": "#92c353",
              "subtle": "#e592c353"
            },
            "warning": {
              "default": "#f8d22a",
              "subtle": "#e5f8d22a"
            },
            "attention": {
              "default": "#c4314b",
              "subtle": "#e5c4314b"
            }
          }
        },
        "attention": {
          "borderColor": "#FF764C",
          "backgroundColor": "#FFC5B2",
          "foregroundColors": {
            "default": {
              "default": "#ff252424",
              "subtle": "#bf252424"
            },
            "dark": {
              "default": "#252424",
              "subtle": "#bf252424"
            },
            "light": {
              "default": "#ffffff",
              "subtle": "#fff3f2f1"
            },
            "accent": {
              "default": "#6264a7",
              "subtle": "#8b8cc7"
            },
            "good": {
              "default": "#92c353",
              "subtle": "#e592c353"
            },
            "warning": {
              "default": "#f8d22a",
              "subtle": "#e5f8d22a"
            },
            "attention": {
              "default": "#c4314b",
              "subtle": "#e5c4314b"
            }
          }
        },
        "warning": {
          "borderColor": "#FFBC51",
          "backgroundColor": "#FFE2B2",
          "foregroundColors": {
            "default": {
              "default": "#ff252424",
              "subtle": "#bf252424"
            },
            "dark": {
              "default": "#252424",
              "subtle": "#bf252424"
            },
            "light": {
              "default": "#ffffff",
              "subtle": "#fff3f2f1"
            },
            "accent": {
              "default": "#6264a7",
              "subtle": "#8b8cc7"
            },
            "good": {
              "default": "#92c353",
              "subtle": "#e592c353"
            },
            "warning": {
              "default": "#f8d22a",
              "subtle": "#e5f8d22a"
            },
            "attention": {
              "default": "#c4314b",
              "subtle": "#e5c4314b"
            }
          }
        }
      },
      inputs: {
        label: {
          requiredInputs: { weight: TextWeight.Bolder },
          optionalInputs: { weight: TextWeight.Bolder },
        },
        errorMessage: {
          color: TextColor.Attention,
          weight: TextWeight.Bolder
        }
      },
      actions: {
        buttonSpacing: 10,
        actionAlignment: ActionAlignment.Right
      }
    };
  }

  return hostConfig;
};

export const createDarkTeamsHostConfig = (theme: ITheme): any => {
  let hostConfig: any = {
    fontFamily: (theme.fonts.medium.fontFamily)
      ? theme.fonts.medium.fontFamily
      : LocalizedFontFamilies.WestEuropean
  };

  if (theme) {
    hostConfig = {
      fontFamily: theme.fonts.mediumPlus.fontFamily,
      separator: {
        lineThickness: 1,
        lineColor: theme.semanticColors.bodyFrameDivider
      },
      containerStyles: {
        default: {
          backgroundColor: theme.semanticColors.bodyBackground,
          foregroundColors: {
            default: {
              default: theme.semanticColors.bodyText,
              subtle: theme.semanticColors.bodySubtext
            },
            dark: {
              default: theme.palette.themeDark,
              subtle: theme.palette.themeDarkAlt
            },
            light: {
              default: theme.palette.themeLight,
              subtle: lightenDarkenColor(theme.palette.themeLight, 20)
            },
            accent: {
              default: theme.palette.accent,
              subtle: lightenDarkenColor(theme.palette.accent, 20)
            },
            attention: {
              default: theme.palette.redDark,
              subtle: theme.palette.red
            },
            good: {
              default: theme.palette.greenDark,
              subtle: theme.palette.green
            },
            warning: {
              default: theme.palette.yellowDark,
              subtle: theme.palette.yellowDark
            }
          }
        },
        "emphasis": {
          "foregroundColors": {
            "default": {
              "default": "#ffffffff",
              "subtle": "#bfffffff"
            },
            "dark": {
              "default": "#ff201f1f",
              "subtle": "#ff2d2c2c"
            },
            "light": {
              "default": "#ffffffff",
              "subtle": "#bfffffff"
            },
            "accent": {
              "default": "#ffa6a7dc",
              "subtle": "#ff8b8cc7"
            },
            "good": {
              "default": "#ff92c353",
              "subtle": "#e592c353"
            },
            "warning": {
              "default": "#fff8d22a",
              "subtle": "#e5f8d22a"
            },
            "attention": {
              "default": "#ffd74654",
              "subtle": "#e5d74654"
            }
          },
          "borderColor": "#666666",
          "backgroundColor": "#ff292828"
        },
        "accent": {
          "borderColor": "#62A8F7",
          "backgroundColor": "#C7DEF9",
          "foregroundColors": {
            "default": {
              "default": "#ff201f1f",
              "subtle": "#ff2d2c2c"
            },
            "dark": {
              "default": "#ff201f1f",
              "subtle": "#ff2d2c2c"
            },
            "light": {
              "default": "#ffffffff",
              "subtle": "#bfffffff"
            },
            "accent": {
              "default": "#ffa6a7dc",
              "subtle": "#ff8b8cc7"
            },
            "good": {
              "default": "#ff92c353",
              "subtle": "#e592c353"
            },
            "warning": {
              "default": "#fff8d22a",
              "subtle": "#e5f8d22a"
            },
            "attention": {
              "default": "#ffd74654",
              "subtle": "#e5d74654"
            }
          }
        },
        "good": {
          "borderColor": "#69E569",
          "backgroundColor": "#CCFFCC",
          "foregroundColors": {
            "default": {
              "default": "#ff201f1f",
              "subtle": "#ff2d2c2c"
            },
            "dark": {
              "default": "#ff201f1f",
              "subtle": "#ff2d2c2c"
            },
            "light": {
              "default": "#ffffffff",
              "subtle": "#bfffffff"
            },
            "accent": {
              "default": "#ffa6a7dc",
              "subtle": "#ff8b8cc7"
            },
            "good": {
              "default": "#ff92c353",
              "subtle": "#e592c353"
            },
            "warning": {
              "default": "#fff8d22a",
              "subtle": "#e5f8d22a"
            },
            "attention": {
              "default": "#ffd74654",
              "subtle": "#e5d74654"
            }
          }
        },
        "attention": {
          "borderColor": "#FF764C",
          "backgroundColor": "#FFC5B2",
          "foregroundColors": {
            "default": {
              "default": "#ff201f1f",
              "subtle": "#ff2d2c2c"
            },
            "dark": {
              "default": "#ff201f1f",
              "subtle": "#ff2d2c2c"
            },
            "light": {
              "default": "#ffffffff",
              "subtle": "#bfffffff"
            },
            "accent": {
              "default": "#ffa6a7dc",
              "subtle": "#ff8b8cc7"
            },
            "good": {
              "default": "#ff92c353",
              "subtle": "#e592c353"
            },
            "warning": {
              "default": "#fff8d22a",
              "subtle": "#e5f8d22a"
            },
            "attention": {
              "default": "#ffd74654",
              "subtle": "#e5d74654"
            }
          }
        },
        "warning": {
          "borderColor": "#FFBC51",
          "backgroundColor": "#FFE2B2",
          "foregroundColors": {
            "default": {
              "default": "#ff201f1f",
              "subtle": "#ff2d2c2c"
            },
            "dark": {
              "default": "#ff201f1f",
              "subtle": "#ff2d2c2c"
            },
            "light": {
              "default": "#ffffffff",
              "subtle": "#bfffffff"
            },
            "accent": {
              "default": "#ffa6a7dc",
              "subtle": "#ff8b8cc7"
            },
            "good": {
              "default": "#ff92c353",
              "subtle": "#e592c353"
            },
            "warning": {
              "default": "#fff8d22a",
              "subtle": "#e5f8d22a"
            },
            "attention": {
              "default": "#ffd74654",
              "subtle": "#e5d74654"
            }
          }
        }
      },
      inputs: {
        label: {
          requiredInputs: { weight: TextWeight.Bolder },
          optionalInputs: { weight: TextWeight.Bolder },
        },
        errorMessage: {
          color: TextColor.Attention,
          weight: TextWeight.Bolder
        }
      },
      actions: {
        buttonSpacing: 10,
        actionAlignment: ActionAlignment.Right
      }
    };
  }

  return hostConfig;
};

export const createHighContrastTeamsHostConfig = (theme: ITheme): any => {
  let hostConfig: any = {
    fontFamily: (theme.fonts.medium.fontFamily)
      ? theme.fonts.medium.fontFamily
      : LocalizedFontFamilies.WestEuropean
  };

  if (theme) {
    hostConfig = {
      fontFamily: theme.fonts.mediumPlus.fontFamily,
      separator: {
        lineThickness: 1,
        lineColor: theme.semanticColors.bodyFrameDivider
      },
      containerStyles: {
        default: {
          backgroundColor: theme.semanticColors.bodyBackground,
          foregroundColors: {
            default: {
              default: theme.semanticColors.bodyText,
              subtle: theme.semanticColors.bodySubtext
            },
            dark: {
              default: theme.palette.themeDark,
              subtle: theme.palette.themeDarkAlt
            },
            light: {
              default: theme.palette.themeLight,
              subtle: lightenDarkenColor(theme.palette.themeLight, 20)
            },
            accent: {
              default: theme.palette.accent,
              subtle: lightenDarkenColor(theme.palette.accent, 20)
            },
            attention: {
              default: theme.palette.redDark,
              subtle: theme.palette.red
            },
            good: {
              default: theme.palette.greenDark,
              subtle: theme.palette.green
            },
            warning: {
              default: theme.palette.yellowDark,
              subtle: theme.palette.yellowDark
            }
          }
        },
        "emphasis": {
          "borderColor": "#717171",
          "backgroundColor": "#2F2F2F",
          "foregroundColors": {
            "default": {
              "default": "#FFFFFF",
              "subtle": "#D2D2D2"
            },
            "dark": {
              "default": "#000000",
              "subtle": "#737373"
            },
            "light": {
              "default": "#FFFFFF",
              "subtle": "#D2D2D2"
            },
            "accent": {
              "default": "#82C7FF",
              "subtle": "#3AA0F3"
            },
            "good": {
              "default": "#92C353",
              "subtle": "#498205"
            },
            "warning": {
              "default": "#F8D22A",
              "subtle": "#C19C00"
            },
            "attention": {
              "default": "#D74553",
              "subtle": "#D13438"
            }
          }
        },
        "accent": {
          "borderColor": "#62A8F7",
          "backgroundColor": "#1B3345",
          "foregroundColors": {
            "default": {
              "default": "#FFFFFF",
              "subtle": "#D2D2D2"
            },
            "dark": {
              "default": "#000000",
              "subtle": "#737373"
            },
            "light": {
              "default": "#FFFFFF",
              "subtle": "#D2D2D2"
            },
            "accent": {
              "default": "#82C7FF",
              "subtle": "#3AA0F3"
            },
            "good": {
              "default": "#92C353",
              "subtle": "#498205"
            },
            "warning": {
              "default": "#F8D22A",
              "subtle": "#C19C00"
            },
            "attention": {
              "default": "#D74553",
              "subtle": "#D13438"
            }
          }
        },
        "good": {
          "borderColor": "#69E569",
          "backgroundColor": "#92C353",
          "foregroundColors": {
            "default": {
              "default": "#000000",
              "subtle": "#415725"
            },
            "dark": {
              "default": "#000000",
              "subtle": "#415725"
            },
            "light": {
              "default": "#FFFFFF",
              "subtle": "#EBF4E0"
            },
            "accent": {
              "default": "#82C7FF",
              "subtle": "#3AA0F3"
            },
            "good": {
              "default": "#92C353",
              "subtle": "#498205"
            },
            "warning": {
              "default": "#F8D22A",
              "subtle": "#C19C00"
            },
            "attention": {
              "default": "#D74553",
              "subtle": "#D13438"
            }
          }
        },
        "attention": {
          "borderColor": "#FF764C",
          "backgroundColor": "#D74553",
          "foregroundColors": {
            "default": {
              "default": "#000000",
              "subtle": "#601F25"
            },
            "dark": {
              "default": "#000000",
              "subtle": "#601F25"
            },
            "light": {
              "default": "#FFFFFF",
              "subtle": "#F7DEE0"
            },
            "accent": {
              "default": "#82C7FF",
              "subtle": "#3AA0F3"
            },
            "good": {
              "default": "#92C353",
              "subtle": "#498205"
            },
            "warning": {
              "default": "#F8D22A",
              "subtle": "#C19C00"
            },
            "attention": {
              "default": "#D74553",
              "subtle": "#D13438"
            }
          }
        },
        "warning": {
          "borderColor": "#FFBC51",
          "backgroundColor": "#F8D22A",
          "foregroundColors": {
            "default": {
              "default": "#000000",
              "subtle": "#6F5E12"
            },
            "dark": {
              "default": "#000000",
              "subtle": "#6F5E12"
            },
            "light": {
              "default": "#FFFFFF",
              "subtle": "#FDF7D9"
            },
            "accent": {
              "default": "#82C7FF",
              "subtle": "#3AA0F3"
            },
            "good": {
              "default": "#92C353",
              "subtle": "#498205"
            },
            "warning": {
              "default": "#F8D22A",
              "subtle": "#C19C00"
            },
            "attention": {
              "default": "#D74553",
              "subtle": "#D13438"
            }
          }
        }
      },
      inputs: {
        label: {
          requiredInputs: { weight: TextWeight.Bolder },
          optionalInputs: { weight: TextWeight.Bolder },
        },
        errorMessage: {
          color: TextColor.Attention,
          weight: TextWeight.Bolder
        }
      },
      actions: {
        buttonSpacing: 10,
        actionAlignment: ActionAlignment.Right
      }
    };
  }

  return hostConfig;
};

export const setFluentUIThemeAsCSSVariables = (domElement: HTMLElement, theme: IReadonlyTheme) => {
  setCSSVariables(domElement, fluentUICSSVariablePrefix, theme.semanticColors);
  setCSSVariables(domElement, fluentUICSSVariablePrefix, theme.palette);
  setCSSVariables(domElement, fluentUICSSVariablePrefix, {
    fontFamily: (theme.fonts.medium.fontFamily)
      ? theme.fonts.medium.fontFamily
      : LocalizedFontFamilies.WestEuropean
  });
};

export const convertFromPartialThemeToTheme = (partialTheme: IPartialTheme): ITheme => {
  return mergeThemes(getDefaultFluentUITheme(), partialTheme);
};

const setCSSVariables = (domElement: HTMLElement, prefix: string, obj: any) => {
  let keys = Object.keys(obj);
  if (keys !== null) {
    keys.forEach(key => {
      domElement.style.setProperty(`--${prefix}-${key}`, obj[key]);
    });
  }
};

export const addSPFxContextDataToDataObject = (dataObject: { "$root": object }, theme: ITheme, spfxContext: BaseComponentContext): IEvaluationContext => {
  let evaluationContext: IEvaluationContext;

  let context: IAdaptiveCardHostEvaluationContext = {
    theme: theme,
    aadInfo: (spfxContext?.pageContext?.aadInfo) ? {
      instanceUrl: spfxContext.pageContext.aadInfo?.instanceUrl,
      tenantId: spfxContext.pageContext.aadInfo?.tenantId?._guid,
      userId: spfxContext.pageContext.aadInfo?.userId?._guid,
    } : null,
    cultureInfo: (spfxContext?.pageContext?.cultureInfo) ? {
      currentCultureName: spfxContext.pageContext.cultureInfo.currentCultureName,
      currentUICultureName: spfxContext.pageContext.cultureInfo.currentUICultureName,
      isRightToLeft: spfxContext.pageContext.cultureInfo.isRightToLeft
    } : null,
    userInfo: (spfxContext?.pageContext?.user) ? {
      displayName: spfxContext.pageContext.user.displayName,
      email: spfxContext.pageContext.user.email,
      isAnonymousGuestUser: spfxContext.pageContext.user.isAnonymousGuestUser,
      isExternalGuestUser: spfxContext.pageContext.user.isExternalGuestUser,
      loginName: spfxContext.pageContext.user.loginName,
      preferUserTimeZone: spfxContext.pageContext.user.preferUserTimeZone
    } : null,
    spListInfo: (spfxContext?.pageContext?.list) ? {
      id: spfxContext.pageContext.list.id.toString(),
      serverRelativeUrl: spfxContext.pageContext.list.serverRelativeUrl,
      title: spfxContext.pageContext.list.title
    } : null,
    spListItemInfo: (spfxContext?.pageContext?.listItem) ? {
      id: spfxContext.pageContext.listItem.id.toString(),
    } : null,
    spSiteInfo: (spfxContext?.pageContext?.site) ? {
      absoluteUrl: spfxContext.pageContext.site.absoluteUrl,
      cdnPrefix: spfxContext.pageContext.site.cdnPrefix,
      classification: spfxContext.pageContext.site.classification,
      correlationId: spfxContext.pageContext.site.correlationId.toString(),
      id: spfxContext.pageContext.site.id.toString(),
      isNoScriptEnabled: spfxContext.pageContext.site.isNoScriptEnabled,
      recycleBinItemCount: spfxContext.pageContext.site.recycleBinItemCount,
      serverRelativeUrl: spfxContext.pageContext.site.serverRelativeUrl,
      serverRequestPath: spfxContext.pageContext.site.serverRequestPath,
      sitePagesEnabled: spfxContext.pageContext.site.sitePagesEnabled
    } : null,
    spWebInfo: (spfxContext?.pageContext?.web) ? {
      absoluteUrl: spfxContext.pageContext.web.absoluteUrl,
      id: spfxContext.pageContext.web.id.toString(),
      isAppWeb: spfxContext.pageContext.web.isAppWeb,
      language: spfxContext.pageContext.web.language,
      languageName: spfxContext.pageContext.web.languageName,
      logoUrl: spfxContext.pageContext.web.logoUrl,
      serverRelativeUrl: spfxContext.pageContext.web.serverRelativeUrl,
      templateName: spfxContext.pageContext.web.templateName,
      title: spfxContext.pageContext.web.title,
      description: spfxContext.pageContext.web.description
    } : null
  };

  if (dataObject) {
    evaluationContext = { $root: { ...dataObject?.$root, "@context": context } };
  } else {
    evaluationContext = { $root: { "@context": context } };
  }

  return evaluationContext;
};
