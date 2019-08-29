import React from 'react'
import Header from './Components/Header'
import Routes from './Components/Routes'
import {Grommet} from 'grommet'
import globalTheme from './../../styles/themes/globalTheme'

const Dashboard = () => {
  return (
    <>
      <Grommet theme={globalTheme}>
        <Header />
        <Routes />
      </Grommet>
    </>
  );
};

export default Dashboard;