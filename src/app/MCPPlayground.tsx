import React from 'react';
import type { ThemeOptions } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import useChoreoTheme from './theme/Theme.ts';
import Playground from '../features/playground/Playground';

interface PlaygroundProps {
    url?: string;
    token?: string;
    headerName?: string;
    shouldSetHeaderNameExternally?: boolean;
    isTokenFetching?: boolean;
    isUrlFetching?: boolean;
    handleTokenRegenerate?: () => void;
    isMcpProxyWithOperationMapping?: boolean;
    tokenPlaceholder?: string;
    theme?: ThemeOptions;
}

function MCPPlayground(props: PlaygroundProps) {
    const defaultTheme = useChoreoTheme(false);
    const theme = props.theme ? createTheme(props.theme) : defaultTheme;
    return (
        <div className="mcp-playground-root" style={{height:'100%'}}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <Playground {...props}/>
                </ThemeProvider>
            </StyledEngineProvider>
        </div>
    )
}

export default MCPPlayground
