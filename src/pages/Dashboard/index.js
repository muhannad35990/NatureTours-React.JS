import React from 'react';
import { withRouter } from 'react-router-dom';
import SideBar from '../../components/sideBar/index.js';
function Dashboard() {
  return (
    <div className="home">
      <SideBar />
    </div>
  );
}

export default withRouter(Dashboard);
