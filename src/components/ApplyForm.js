import React, { useState } from 'react'

require('../styles/ApplyForm.css');
const mrBeastHead = require('../images/mr-beast-head.png');
const chatBubble = require('../images/chat-bubble.svg');

const ApplyForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [productType, setProductType] = useState('');
  const [isError, setIsError] = useState(false);
  const [chatBubbleMessage, setChatBubbleMessage] = useState('Apply Now!');
  const [chatBubbleErrorMessages, setChatBubbleErrorMessages] = useState({
    fullName: '',
    email: '',
    productType: ''
  });

  const renderErrorMessages = () => {
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

  return (
    <section className="applyFormContainer">
      <div className="applyNowChatBox">
        <img 
            src={mrBeastHead} alt="Mr. Beast" 
            className="applyFormMrBeastHead"
          />
        <div className="applyFormChatBubbleContainer">
          <img 
            src={chatBubble} 
            alt="Chat Bubble" 
            className="applyNowImg"
          />
          { !isError && <p className="applyNowBubbleText" key={`${chatBubbleMessage}Message`}>{chatBubbleMessage}</p> }
          { isError && renderErrorMessages() }
        </div>
      </div>
      <form 
        className="applyForm"
        onSubmit={e => {
          e.preventDefault();
          console.log("SUBMITTING THIS INFO", {
            fullName,
            email,
            productType
          })
        }}
      >
        <label htmlFor="email">Full Name:</label>
        <input 
          type="name" 
          name="text"
          maxLength={20}
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          onBlur={e => {
            if(!fullName) {
              setIsError(true);
              setChatBubbleErrorMessages({
                ...chatBubbleErrorMessages,
                fullName: 'Please enter your full name.'
              });
            } else {
              setChatBubbleMessage(`Welcome ${fullName}!`)
              if(chatBubbleErrorMessages.fullName) {
                setIsError(false);
                setChatBubbleErrorMessages({
                  ...chatBubbleErrorMessages,
                  fullName: ''
                });
              }
            }
          }}
          placeholder="Please enter your full name."
          required
        />
        <label htmlFor="email">Email Address:</label>
        <input 
          type="email" 
          name="email"
          value={email}
          placeholder="Please enter your email"
          onChange={e => setEmail(e.target.value)}
          onBlur={e => {
            if(!email) {
              setIsError(true);
              setChatBubbleErrorMessages({
                ...chatBubbleErrorMessages,
                email: 'Please enter your email.'
              });
            } else if(!/\S+@\S+\.\S+/.test(email)) {
              setIsError(true);
              setChatBubbleErrorMessages({
                ...chatBubbleErrorMessages,
                email: 'Please enter a valid email.'
              });
            } else if(chatBubbleErrorMessages.email) {
              setIsError(false);
              setChatBubbleErrorMessages({
                ...chatBubbleErrorMessages,
                email: ''
              });
            }
          }}
          required
        />
        <label htmlFor="productType">Which product would you like to apply for?</label>
        <div className="applyFormSubmitLine">
          <select 
            name="productType"
            value={productType}
            onChange={e => setProductType(e.target.value)}
            onBlur={e => {
              if(!productType) {
                setIsError(true);
                setChatBubbleErrorMessages({
                  ...chatBubbleErrorMessages,
                  productType: 'Please select a product.'
                });
              } else {
                setChatBubbleMessage(`You selected ${productType}.`)
                if(chatBubbleErrorMessages.productType) {
                  setIsError(false);
                  setChatBubbleErrorMessages({
                    ...chatBubbleErrorMessages,
                    productType: ''
                  });
                }
              }
            }}
          >
            <option value="">Please select</option>
            <option value="individual">Individual</option>
            <option value="parent">Parent</option>
            <option value="teen">Teen</option>
          </select>
          <button className="applyFormSubmit">Submit</button>
        </div>
      </form>
    </section>
  )
}

export default ApplyForm