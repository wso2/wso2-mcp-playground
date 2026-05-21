import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "./ui/IconButton/IconButton";
import TextInput from "./ui/TextInput/TextInput";
import Switcher from "./ui/Switcher/Switcher";
import Button from "./ui/Button/Button";
import {
  Configuration,
  Copy,
  HidePassword,
  MenuLogout,
  Refresh,
  ShowPassword,
  MenuSubAPIManagement,
} from "./ui/Icons/generated";
import { ConnectionStatus } from "../lib/constants";
import { Switcher as SwitcherType } from "../Playground";

interface SidebarProps {
  connectionStatus: ConnectionStatus;
  connectionError?: string | null;
  url?: string;
  setUrl: (url: string) => void;
  token?: string;
  setToken: (token: string) => void;
  headerName: string;
  setHeaderName: (headerName: string) => void;
  shouldSetHeaderNameExternally: boolean;
  isTokenFetching?: boolean;
  isUrlFetching?: boolean;
  handleTokenRegenerate?: () => void;
  onConnect: () => void;
  onDisconnect: () => void;
  tokenPlaceholder?: string;
  enableConfiguration?: boolean;
  onConfigurationClick?: () => void;
  disableConnectionButton?: boolean;
  endpointSwitcher?: SwitcherType;
  visibilitySwitcher?: SwitcherType;
}

const Sidebar = ({
  connectionStatus,
  connectionError,
  url,
  setUrl,
  token,
  setToken,
  headerName,
  setHeaderName,
  shouldSetHeaderNameExternally,
  isTokenFetching,
  isUrlFetching,
  handleTokenRegenerate,
  onConnect,
  onDisconnect,
  tokenPlaceholder,
  enableConfiguration,
  onConfigurationClick,
  disableConnectionButton,
  endpointSwitcher,
  visibilitySwitcher,
}: SidebarProps) => {
  const [showBearerToken, setShowBearerToken] = useState(false);
  const [showPassword, toggleInputType] = React.useState(false);
  const [copiedField, setCopiedField] = useState<"url" | "token" | null>(null);
  const handleEndButtonClick = () => {
    toggleInputType(!showPassword);
  };

  const handleCopy = (field: "url" | "token", value?: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field);
      setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 1500);
    });
  };

  const renderCopyAdornment = (field: "url" | "token", value?: string) => (
    <InputAdornment position="end">
      <IconButton
        onClick={() => handleCopy(field, value)}
        size="small"
        variant="text"
        color="primary"
        testId={`copy-${field}`}
        disabled={!value}
      >
        {copiedField === field ? <CheckIcon fontSize="small" /> : <Copy />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box>
      <Box width="100%" maxWidth={400} mx="auto">
        <Box display="flex" flexDirection="column" gap={3}>
          <Box mb={2} display="flex" flexDirection="column" gap={3}>
            {endpointSwitcher && (
              <Switcher
                switcher={endpointSwitcher}
                defaultLabel="Endpoint"
                testId="endpoint-switcher"
              />
            )}
            {visibilitySwitcher && (
              <Switcher
                switcher={visibilitySwitcher}
                defaultLabel="Visibility"
                testId="visibility-switcher"
              />
            )}
            {isUrlFetching ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="60px"
              >
                <CircularProgress size={30} />
              </Box>
            ) : (
              <TextInput
                label="URL"
                testId="sse-url-input"
                fullWidth
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                endAdornment={renderCopyAdornment("url", url)}
              />
            )}
            {shouldSetHeaderNameExternally && (
              <TextInput
                label="Header Name"
                testId="header-name-input"
                fullWidth
                value={headerName}
                onChange={(e) => setHeaderName(e.target.value)}
                placeholder="Enter Header Name"
              />
            )}
            {isTokenFetching ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="60px"
              >
                <CircularProgress size={30} />
              </Box>
            ) : (
              <TextInput
                label="Token"
                testId="Authentication-Bearer-Token"
                fullWidth
                value={token}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setToken(e.target.value)}
                placeholder={tokenPlaceholder || "Add Your Token"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleEndButtonClick}
                      size="small"
                      variant="text"
                      color="primary"
                      testId="secret"
                    >
                      {showPassword ? <ShowPassword /> : <HidePassword />}
                    </IconButton>
                    <IconButton
                      onClick={() => handleCopy("token", token)}
                      size="small"
                      variant="text"
                      color="primary"
                      testId="copy-token"
                      disabled={!token}
                    >
                      {copiedField === "token" ? <CheckIcon fontSize="small" /> : <Copy />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            )}
            {handleTokenRegenerate && (
              <Box mt={1}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleTokenRegenerate}
                  data-testid="auth-button"
                  aria-expanded={showBearerToken}
                  testId="playground-Authentication"
                >
                  Get Test Key
                </Button>
              </Box>
            )}
            {enableConfiguration && (
              <Button
                variant="subtle"
                fullWidth
                data-testid="configuration-button"
                onClick={onConfigurationClick}
                startIcon={<MenuSubAPIManagement fontSize="inherit" />}
                testId="configuration-button"
              >
                Configuration
              </Button>
            )}
          </Box>
          <Box>
            <Box display="flex" gap={2}>
              {connectionStatus === "connected" && (
                <>
                  <Button
                    variant="outlined"
                    fullWidth
                    data-testid="connect-button"
                    onClick={() => {
                      onDisconnect();
                      onConnect();
                    }}
                    startIcon={<Refresh fontSize="inherit" />}
                    testId="Reconnect-Button"
                  >
                    Reconnect
                  </Button>
                  <Button
                    onClick={onDisconnect}
                    color="warning"
                    testId="Disconnect-Button"
                    fullWidth
                    variant="outlined"
                    startIcon={<MenuLogout fontSize="inherit" />}
                  >
                    Disconnect
                  </Button>
                </>
              )}
              {connectionStatus !== "connected" && (
                <Button
                  fullWidth
                  disabled={disableConnectionButton}
                  className="w-full"
                  onClick={() => {
                    onConnect();
                  }}
                  testId="Connect-Button"
                  startIcon={<Configuration fontSize="inherit" />}
                >
                  Connect
                </Button>
              )}
            </Box>

            <Box
              mt={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={3}
            >
              {connectionStatus !== "connecting" && (
                <Box
                  width={12}
                  height={12}
                  borderRadius="50%"
                  style={{
                    backgroundColor: (() => {
                      switch (connectionStatus) {
                        case "connected":
                          return "green";
                        case "error":
                        case "error-connecting-to-proxy":
                          return "red";
                        default:
                          return "gray";
                      }
                    })(),
                  }}
                />
              )}

              {connectionStatus === "connecting" && (
                <CircularProgress size={14} style={{ color: "blue" }} />
              )}

              <span style={{ fontSize: "14px" }}>
                {connectionStatus === "connecting"
                  ? "Connecting..."
                  : (() => {
                      switch (connectionStatus) {
                        case "connected":
                          return "Connected";
                        case "error":
                          return "Connection Error!";
                        case "error-connecting-to-proxy":
                          return "Error Connecting to MCP Playground Proxy - Check Console logs";
                        default:
                          return "Disconnected";
                      }
                    })()}
              </span>
            </Box>

            {/* Error Details Section */}
            {connectionStatus === "error" && connectionError && (
              <Box
                mt={2}
                p={2}
                style={{
                  backgroundColor: "#ffebee",
                  border: "1px solid #ef5350",
                  borderRadius: "4px",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  mb={1}
                  style={{ color: "#c62828" }}
                >
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                    Connection Error Details:
                  </span>
                </Box>
                <Box
                  style={{
                    color: "#d32f2f",
                    fontSize: "12px",
                    lineHeight: "1.4",
                  }}
                >
                  {connectionError}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
