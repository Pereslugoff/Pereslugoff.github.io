import React from 'react';
require('../styles/ApplyForm.css');


const ErrorMessage = ({chatBubbleErrorMessages}) => {
  const errorMessages = [];
  for(let errorKey in chatBubbleErrorMessages) {
    if(chatBubbleErrorMessages[errorKey]) {
      errorMessages.push(
        <p 
          key={`${errorKey}Error`}
          className="applyNowBubbleErrorText"
        >
          {chatBubbleErrorMessages[errorKey]}
        </p>);
    }
  }
  return (
    <div className="applyNowBubbleErrorTextContainer">
      {errorMessages}
    </div>
  )
}

export default ErrorMessage;