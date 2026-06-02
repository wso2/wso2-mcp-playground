/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses.
 * For specific language governing the permissions and limitations under
 * this license, please see the license as well as any agreement you’ve
 * entered into with WSO2 governing the purchase of this software and any
 * associated services.
 */
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
