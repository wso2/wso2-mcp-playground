import React from "react";
import { Box, InputBase, MenuItem, Select, Typography } from "@mui/material";
import useTextFiledStyles from "../TextInput/TextInput.styles";
import { Switcher as SwitcherType } from "../../../Playground";

interface SwitcherProps {
  switcher: SwitcherType;
  defaultLabel: string;
  testId: string;
}

const Switcher = ({ switcher, defaultLabel, testId }: SwitcherProps) => {
  const classes = useTextFiledStyles({} as any);

  return (
    <Box>
      <Box className={classes.formLabel}>
        <Typography component="h6" variant="body1">
          {switcher.label || defaultLabel}
        </Typography>
      </Box>
      <Select
        fullWidth
        data-testid={testId}
        value={switcher.value}
        onChange={(e) => switcher.onChange(e.target.value as string)}
        MenuProps={{
          disableScrollLock: true,
          BackdropProps: { sx: { backgroundColor: "transparent" } },
        }}
        input={
          <InputBase
            classes={{
              root: classes.root,
              focused: classes.focused,
              input: classes.textInput,
            }}
          />
        }
      >
        {switcher.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Switcher;
