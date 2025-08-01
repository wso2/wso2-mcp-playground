/*
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
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

import { InputProps } from '@mui/material/Input';
import { TooltipProps } from '@mui/material/Tooltip';
import { Variant } from '@mui/material/styles/createTypography';
import { OverridableStringUnion } from '@mui/types';
import { InputBasePropsSizeOverrides } from '@mui/material/InputBase';

export interface ITextInputProps extends Omit<InputProps, 'size'> {
  width?: string | number;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  optional?: boolean;
  size?: OverridableStringUnion<'small' | 'medium' | 'large', InputBasePropsSizeOverrides>;
  loading?: boolean;
  tooltip?: React.ReactNode;
  info?: React.ReactNode;
  tooltipPlacement?: TooltipProps['placement'];
  inputTooltip?: React.ReactNode;
  typography?: Variant;
  actions?: React.ReactNode;
  testId: string;
  variant?: 'plain' | 'default';
  rounded?: boolean;
  resizeIndicator?: boolean;
}
