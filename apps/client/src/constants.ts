import { deepMerge } from 'grommet/utils';
import { base, ThemeType } from 'grommet/themes';
import { FormDown, FormUp } from 'grommet-icons';

export const theme: ThemeType = deepMerge(base, {
  global: {
    colors: {
      background: '#001932',
      brand: '#003B64',
      'accent-1': '#00639B',
      'accent-2': '#0087CA',
      'accent-3': '#00ABE7',
      success: '#4caf50',
      focus: '#64A3CE',
      critical: '#C08B80',
      warning: '#D3BF40',
    },
    font: {
      family: 'Open Sans, sans-serif',
      size: '14px',
    },
  },
  button: {
    border: {
      radius: '4px',
    },
    size: {
      small: {
        border: {
          radius: '4px',
        },
      },
      medium: {
        border: {
          radius: '4px',
        },
      },
      large: {
        border: {
          radius: '4px',
        },
      },
    },
  },
  meter: {
    color: 'brand',
  },
  menu: {
    icons: {
      down: FormDown,
      up: FormUp,
    },
    color: 'white',
  },
  formField: {
    label: {
      color: 'dark-3',
      size: 'xsmall',
      margin: { vertical: '0', bottom: 'small', horizontal: '0' },
      weight: 600,
    },
  },
  heading: {
    font: {
      family: 'Varela Round, sans-serif',
      size: '4em',
    },
    level: {
      2: {
        font: {
          family: 'Varela Round, sans-serif',
        },
      },
      3: {
        font: {
          family: 'Open Sans, sans-serif',
        },
      },
      4: {
        font: {
          family: 'Open Sans, sans-serif',
        },
      },
    },
  },
  text: {
    medium: {
      size: '14px',
    },
  },
});

export const REDIRECT_URL = 'session_redirect_url';
export const API_URL = process.env.API_URL ? process.env.API_URL : 'http://localhost:8000/api/qb/v1';
