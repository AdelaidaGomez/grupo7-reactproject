//Import the colors and the Theme into UI
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  //Access to the theme and colors
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <main className="content"></main>
        </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
