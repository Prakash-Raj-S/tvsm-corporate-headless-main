// TvsVehicleSelection.js
import React, { useState } from 'react';

function TvsVehicleSelection({
  vehiclePath,
  lblVehicle,
  lblVariant,
  selectedVehicle,
  setSelectedVehicle,
  selectedVariant,
  setSelectedVariant,
  onVehicleError,
  onVariantError,
  errorMessageVehicle,
  errorMessageVariant,
  formSubmitted,
}) {
  const handleVehicleChange = (event) => {
    const selectedVehicleName = event.target.value;
    console.log('selectedVehicleName', selectedVehicleName);

    if (selectedVehicleName === '') {
      onVehicleError('vehicle is required');
      onVariantError('variant is required');
    } else {
      onVehicleError(null);
      onVariantError(null);
    }

    const selectedVehicle = vehiclePath.find(
      (vehicle) => vehicle.displayName === selectedVehicleName
    );
    setSelectedVehicle(selectedVehicle);
  };

  const handleVariantChange = (event) => {
    const selectedVariantName = event.target.value;

    const selectedVariant = selectedVehicle.fields.ActiveVariants.find(
      (variant) => variant.displayName === selectedVariantName
    );
    setSelectedVariant(selectedVariant);
  };

  return (
    <>
      <label>
        {lblVehicle}
        <select onChange={handleVehicleChange}>
          <option value="">Select</option>
          {vehiclePath.map((vehicle) => (
            <option key={vehicle.displayName} value={vehicle.displayName}>
              {vehicle.displayName}
            </option>
          ))}
        </select>
        {formSubmitted && errorMessageVehicle && <p>{errorMessageVehicle}</p>}
      </label>
      <label>
        {lblVariant}
        {selectedVehicle ? (
          <select onChange={handleVariantChange}>
            {selectedVehicle.fields.ActiveVariants.map((variant) => (
              <option key={variant.displayName} value={variant.displayName}>
                {variant.displayName}
              </option>
            ))}
          </select>
        ) : (
          <select disabled>
            <option value="">Select</option>
          </select>
        )}
        {formSubmitted && errorMessageVariant && <p>{errorMessageVariant}</p>}
      </label>
    </>
  );
}

export default TvsVehicleSelection;
