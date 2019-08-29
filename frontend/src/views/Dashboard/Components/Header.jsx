import React from 'react';
import { Box, Grid } from 'grommet';
import Logo from './Logo';

const Header = () => {
  return (
    <>
      <Grid
        rows={['xsmall']}
        columns={['flex']}
        areas={[
          { name: 'header', start: [0, 0], end: [1, 0] }
        ]}
      >
        <Box gridArea="header"
         background="brand" 
         >
          <Logo text='flashcards'/>
        </Box>
      </Grid>
    </>
  );
};

export default Header;