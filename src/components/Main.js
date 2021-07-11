import React, { useState } from 'react';
import NavBar from './NavBar'

require('normalize.css/normalize.css');
require('../styles/App.css');


const AppComponent = () => {
    return (
      <div className="index">
        <NavBar />
      </div>
    );
}

AppComponent.defaultProps = {
};

export default AppComponent;
