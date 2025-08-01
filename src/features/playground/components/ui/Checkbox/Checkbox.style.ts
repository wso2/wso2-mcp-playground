/*
 * Copyright (c) 2023, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
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

import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  checkboxButton: {
    margin: theme.spacing(-1, 0),
  },
  root: {
    color: theme.palette.common.black,
    '&$checked': {
      color: theme.palette.primary.main,
      '&$disabled': {
        color: theme.palette.primary.main,
        opacity: 0.5,
      },
    },
    '&$disabled': {
      color: theme.palette.grey[200],
    },
  },
  checkboxNoLabel: {
    marginRight: 0,
  },
  checked: {},
  disabled: {},
  checkboxLabelRoot: {
    marginLeft: theme.spacing(-1),
  },
  checkboxLabelDisabled: {
    color: theme.palette.grey[100],
  },
}));

export default useStyles;
