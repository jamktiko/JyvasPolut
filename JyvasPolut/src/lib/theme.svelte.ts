export const theme = $state({
  mode: 'ligth'
});



export function toggleTheme() {
  if (theme.mode === 'ligth') {
    theme.mode = 'dark'
  } else {
    theme.mode = 'ligth'
  }
}