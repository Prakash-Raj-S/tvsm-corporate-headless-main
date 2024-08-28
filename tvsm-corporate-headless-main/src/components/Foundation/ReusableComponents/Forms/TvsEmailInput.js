// TvsEmailInput.js
import React, { useState } from 'react';

function TvsEmailInput({ onEmailChange, onError, errorMessage, formSubmitted }) {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const handleChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    onEmailChange(newEmail);

    if (!newEmail) {
      onError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(newEmail)) {
      onError('Email is not valid');
    } else {
      onError(null);
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <>
      <label>Email:</label>
      <input type="text" value={email} onChange={handleChange} onBlur={handleBlur} />
      {(formSubmitted || touched) && errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default TvsEmailInput;
