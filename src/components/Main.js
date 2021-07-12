import React, { useState } from 'react';
import ApplyForm from './ApplyForm';
import NavBar from './NavBar'

require('normalize.css/normalize.css');
require('../styles/Main.css');


const AppComponent = () => {
    return (
      <div className="mainContainer">
        <NavBar />
        <ApplyForm />
      </div>
    );
}

AppComponent.defaultProps = {
};

export default AppComponent;
