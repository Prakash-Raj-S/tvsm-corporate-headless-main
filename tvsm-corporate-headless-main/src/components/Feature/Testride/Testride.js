import React, { useState } from 'react';

function TestRide() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [model, setModel] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Submit the form
      console.log(name, email, phone, model);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </>
      )}
      {step === 2 && (
        <>
          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />

          <label>Model</label>
          <input value={model} onChange={(e) => setModel(e.target.value)} />
        </>
      )}
      <button type="submit">{step === 1 ? 'Next' : 'Submit'}</button>
    </form>
  );
}

export default TestRide;
