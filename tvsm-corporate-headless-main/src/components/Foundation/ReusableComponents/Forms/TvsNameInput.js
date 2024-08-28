// TvsNameInput.js
import React, { useState } from 'react';

function TvsNameInput({
  onNameChange,
  onError,
  errMsg,
  errMsgNameFormat,
  errMsgNameMinLength,
  formSubmitted,
}) {
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);

  const handleChange = (event) => {
    const newName = event.target.value;

    if (/[^a-zA-Z]/.test(newName)) {
      setTouched(true);
      onError(errMsgNameFormat);
      return;
    }

    setName(newName);
    onNameChange(newName);

    if (!newName) {
      onError(errMsg);
    } else if (newName.length < 3) {
      onError(errMsgNameMinLength);
    } else {
      onError(null);
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <>
      <label>Name:</label>
      <input type="text" value={name} onChange={handleChange} onBlur={handleBlur} />
      {(formSubmitted || touched) && errMsg && <p>{errMsg}</p>}
    </>
  );
}

export default TvsNameInput;
