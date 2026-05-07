export const theme = $state({
  mode: 'dark'
});



export function toggleTheme() {
  if (theme.mode === 'dark') {
    theme.mode = 'ligth'
  } else {
    theme.mode = 'dark'
  }
}