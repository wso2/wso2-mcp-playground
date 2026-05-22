import React from "react";
import { Box, InputBase, MenuItem, Select, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
        IconComponent={ExpandMoreIcon}
        MenuProps={{
          disableScrollLock: true,
          BackdropProps: { sx: { backgroundColor: "transparent" } },
          MenuListProps: { sx: { py: 0 } },
        }}
        input={
          <InputBase
            classes={{
              root: classes.root,
              focused: classes.focused,
              input: classes.textInput,
            }}
            sx={{
              "& .MuiSelect-select": {
                border: "none",
                background: "transparent",
                boxShadow: "none",
                minHeight: 0,
                "&:focus": {
                  background: "transparent",
                  boxShadow: "none",
                },
              },
            }}
          />
        }
      >
        {switcher.options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ py: 1.5 }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Switcher;
