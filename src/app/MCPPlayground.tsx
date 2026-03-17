import React, { useMemo } from 'react';
import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';
import type { ThemeOptions } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { StylesProvider, createGenerateClassName } from '@mui/styles';
import useChoreoTheme from './theme/Theme.ts';
import Playground from '../features/playground/Playground';

const mcpGenerateClassName = createGenerateClassName({
    productionPrefix: 'mcp',
    seed: 'mcp-playground'
});

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
    injectStylesFirst?: boolean;
    emotionCache?: EmotionCache;
}

function MCPPlayground(props: PlaygroundProps) {
    const defaultTheme = useChoreoTheme(false);
    const {
        injectStylesFirst = false,
        emotionCache,
        ...playgroundProps
    } = props;

    const theme = useMemo(
        () => (playgroundProps.theme ? createTheme(defaultTheme, playgroundProps.theme) : defaultTheme),
        [defaultTheme, playgroundProps.theme]
    );

    const content = (
        <ThemeProvider theme={theme}>
            <Playground {...playgroundProps}/>
        </ThemeProvider>
    );

    const maybeWithStyledEngine = injectStylesFirst ? (
        <StyledEngineProvider injectFirst>
            {content}
        </StyledEngineProvider>
    ) : (
        content
    );

    const withJssIsolation = (
        <StylesProvider generateClassName={mcpGenerateClassName}>
            {maybeWithStyledEngine}
        </StylesProvider>
    );

    return (
        <div className="mcp-playground-root" style={{height:'100%'}}>
            {emotionCache ? (
                <CacheProvider value={emotionCache}>
                    {withJssIsolation}
                </CacheProvider>
            ) : (
                withJssIsolation
            )}
        </div>
    )
}

export default MCPPlayground
