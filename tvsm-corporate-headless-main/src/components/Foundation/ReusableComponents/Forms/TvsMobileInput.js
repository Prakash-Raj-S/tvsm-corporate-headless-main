// TvsMobileInput.js
import React, { useState } from 'react';

function TvsMobileInput({ onMobileChange, onError, errorMessage, formSubmitted }) {
  const [mobile, setMobile] = useState('');
  const [touched, setTouched] = useState(false);

  const handleChange = (event) => {
    const newMobile = event.target.value;

    if (!/^\d*$/.test(newMobile)) {
      onError('Mobile number should only contain digits');
      return;
    }

    setMobile(newMobile);
    onMobileChange(newMobile);

    if (!newMobile) {
      onError('Mobile number is required');
    } else if (newMobile.length !== 10) {
      onError('Mobile number must be 10 digits');
    } else {
      onError(null);
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <>
      <input type="text" value={mobile} onChange={handleChange} onBlur={handleBlur} />
      {(formSubmitted || touched) && errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default TvsMobileInput;
