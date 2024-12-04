import { Box, Typography } from '@mui/material';
import React from 'react';
import Theme from '../../theme/Theme';

const Footer = () => {
  return (
    <Box
      className="p-4 footer-css"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography className="font18">Efficient Task Management for You ...</Typography>
      <Box>
        <Theme />
      </Box>
    </Box>
  );
};

export default Footer;
