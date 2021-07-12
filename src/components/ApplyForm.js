import React, { useEffect, useState } from 'react'
import ErrorMessage from './ErrorMessage';
require('../styles/ApplyForm.css');

const mrBeastHead = require('../images/mr-beast-head.png');
const chatBubble = require('../images/chat-bubble.svg');

const ApplyForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    optionalMessage: '',
    productType: ''
  });
  const [chatBubbleMessage, setChatBubbleMessage] = useState('Apply Below!');
  const [isError, setIsError] = useState(false);
  const [chatBubbleErrorMessages, setChatBubbleErrorMessages] = useState({
    fullName: '',
    email: '',
    productType: ''
  });

  const currentLocation = window.location.search;

  useEffect(() => {
    const queryParams = new URLSearchParams(currentLocation);
    const prefillFullName = queryParams.get('fullName');
    const prefillEmail = queryParams.get('email');

    if(prefillFullName?.length < 25) {
        setFormValues({
          ...formValues,
          fullName: prefillFullName
        });
    } else if(prefillEmail?.length < 25 && /\S+@\S+\.\S+/.test(prefillEmail)) {
      setFormValues({
        ...formValues,
        email: prefillEmail
      });
    } 
  }, [currentLocation]);
  

  const validate = (formKey, errorMessage, successMessage) => {
      let isValid;
      if(!formValues[formKey]) {
        isValid = false;
        setIsError(true);
        setChatBubbleErrorMessages({
          ...chatBubbleErrorMessages,
          [formKey]: errorMessage
        });
      } else if(formKey === 'email' && !/\S+@\S+\.\S+/.test(formValues.email)) {
        isValid = false;
        setIsError(true);
        setChatBubbleErrorMessages({
          ...chatBubbleErrorMessages,
          email: 'Email must be valid'
        });
      } else {
        isValid = true;
        setChatBubbleMessage(successMessage)
        if(chatBubbleErrorMessages[formKey]) {
          setIsError(false);
          setChatBubbleErrorMessages({
            ...chatBubbleErrorMessages,
            [formKey]: ''
          });
        }
    }

    return isValid
  }

  return (
    <section className="applyFormContainer">
      <div className="applyFormChatBox">
        <img 
            src={mrBeastHead} alt="Mr. Beast" 
            className="applyFormMrBeastHead"
          />
        <div className="applyFormChatBubbleContainer">
          <img 
            src={chatBubble} 
            alt="Chat Bubble" 
            className="applyFormChatBubble"
          />
          { !isError && <p className="applyFormBubbleText" key={`${chatBubbleMessage}Message`}>{chatBubbleMessage}</p> }
          { isError && <ErrorMessage chatBubbleErrorMessages={chatBubbleErrorMessages}/> }
        </div>
      </div>
      <form 
        className="applyForm"
        onSubmit={e => {
          e.preventDefault();
          if(formValues.fullName && formValues.email && formValues.productType) {
            console.log("SUBMITTING", [
              formValues.fullName,
              formValues.email,
              formValues.productType,
              formValues.optionalMessage
            ]);
          } else {
            setChatBubbleMessage("Fill out your info first!");
          }
        }}
      >
        <label htmlFor="fullName">Full Name:</label>
        <input 
          type="text" 
          name="fullName"
          maxLength={25}
          value={formValues.fullName}
          onChange={e => setFormValues({
            ...formValues,
            fullName: e.target.value
          })}
          onBlur={() => validate('fullName', 'Please enter your full name.', `Welcome ${formValues.fullName}!`)}
          placeholder="Please enter your full name."
        />
        <label htmlFor="email">Email Address:</label>
        <input 
          type="email" 
          name="email"
          value={formValues.email}
          maxLength={25}
          placeholder="Please enter your email"
          onChange={e => setFormValues({
            ...formValues,
            email: e.target.value
          })}
          onBlur={() => validate('email', 'Please enter an email', 'Email? Check!')}
        />
        <label htmlFor="optionalMessage">Tell us why you're choosing Current! (Optional)</label>
        <textarea
          name="optionalMessage"
          placeholder="Overdraft protection, getting paid early, etc..."
          value={formValues.optionalMessage}
          maxLength={140}
          onChange={e => setFormValues({
            ...formValues,
            email: e.target.value
          })}
        ></textarea>
        <label htmlFor="productType">Which product would you like to apply for?</label>
        <div className="applyFormSubmitLine">
          <select 
            name="productType"
            value={formValues.productType}
            onChange={e => setFormValues({
              ...formValues,
              productType: e.target.value
            })}
            onBlur={() => validate('productType', 'Please select a product.', `You selected ${formValues.productType}.`)}
          >
            <option value="">Please select</option>
            <option value="individual">Individual</option>
            <option value="parent">Parent</option>
            <option value="teen">Teen</option>
          </select>
          { !isError && <button className="applyFormSubmit">Submit</button> }
          { isError && <button disabled className="applyFormSubmitDisabled">Oops!</button> }
        </div>
      </form>
    </section>
  )
}

export default ApplyForm