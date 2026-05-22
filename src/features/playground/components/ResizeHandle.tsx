import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface ResizeHandleProps {
  onMouseDown: (event: React.MouseEvent) => void;
  isResizing?: boolean;
}

const useStyles = makeStyles((theme: any) => ({
  resizeHandle: {
    height: theme.spacing(1.5),
    width: '100%',
    backgroundColor: '#fff',
    cursor: 'row-resize',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
    flexShrink: 0,
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.06)',
    },
    '&:hover $dragIndicator': {
      opacity: 1,
      transform: 'scaleY(1.2)',
    },
  },
  resizing: {
    backgroundColor: 'rgba(25, 118, 210, 0.12)',
    '& $dragIndicator': {
      opacity: 1,
      transform: 'scaleY(1.2)',
    },
  },
  dragIndicator: {
    width: '40px',
    height: '3px',
    backgroundColor: theme.palette.grey[500] || '#9ca3af',
    borderRadius: '2px',
    opacity: 0.6,
    transition: 'all 0.2s ease',
  },
}));

const ResizeHandle: React.FC<ResizeHandleProps> = ({ 
  onMouseDown, 
  isResizing = false 
}) => {
  const classes = useStyles();

  return (
    <Box
      className={`${classes.resizeHandle} ${isResizing ? classes.resizing : ''}`}
      onMouseDown={onMouseDown}
      role="separator"
      aria-label="Resize history panel"
      aria-orientation="horizontal"
      tabIndex={0}
      onKeyDown={(event) => {
        // Add keyboard support for accessibility
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          // You could implement keyboard-based resizing here if needed
        }
      }}
    >
      <div className={classes.dragIndicator} />
    </Box>
  );
};

export default ResizeHandle;
