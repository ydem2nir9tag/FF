import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@mui/material";
import { useContext } from "react";
import PropContext from "../propContext";

export const ThemeWrapper = (props) => {    
    const context = useContext(PropContext);
    let theme = context.theme;
    if (theme.typography === undefined) {
        theme.typography = {
            fontFamily: 'JetBrains Mono', 
            button: {
                textTransform: 'none'
            }
        }
    }
    if (theme.shape === undefined) {
        theme.shape = {
            borderRadius: 10
        }
    }

    return (
        <ThemeProvider theme={createTheme(theme)}>
            {props.children}
        </ThemeProvider>
    )
}