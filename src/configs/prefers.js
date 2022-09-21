module.exports = {
  dark: {
    media: 'prefers-color-scheme',
    prefers: 'dark'
  },
  light: {
    media: 'prefers-color-scheme',
    prefers: 'light'
  },
  toDark: {
    media: 'prefers-color-scheme',
    selector: '[data-mode=dark]',
    prefers: 'light'
  },
  toLight: {
    media: 'prefers-color-scheme',
    selector: '[data-mode=light]',
    prefers: 'dark'
  },
  reduce: {
    media: 'prefers-reduced-motion',
    prefers: 'reduce'
  }
}
