import React, { useEffect, useState } from 'react';
import './Testride.scss';
import useLatLongToken from '../../Foundation/Geolocation/useLatLongToken';
import useCurrentLocation from '../../Foundation/Geolocation/useCurrentLocation';
import fetchLocationDetails from '../../Foundation/Geolocation/fetchLocationDetails';
import fetchDealerDetails from '../../Foundation/Geolocation/fetchDealerDetails';
import useUtmParams from '../../Foundation/Utm/useUtmParams';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import TvsNameInput from '../../Foundation/ReusableComponents/Forms/TvsNameInput'; // adjust the path to match your file structure
import TvsVehicleSelection from '../../Foundation/ReusableComponents/Forms/TvsVehicleSelection'; // adjust the path to match your file structure;
import TvsMobileInput from '../../Foundation/ReusableComponents/Forms/TvsMobileInput';
import TvsLocationAndDealerSelection from '../../Foundation/ReusableComponents/Forms/TvsLocationAndDealerSelection';

const TestrideMultiStep = ({ fields }) => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    location: '',
    dealer: '',
    vehicle: '',
    variants: '',
    otp: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(fields.ErrMsgNameRequired.value);

  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState('Mobile is required');

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleError, setSelectedVehicleError] = useState('Vehicle is required');

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedVariantError, setSelectedVariantError] = useState('Variant is required');

  const [location, setLocation] = useState('');
  const [locationError, setLocationError] = useState('Location is required');

  const [dealer, setDealer] = useState(null);
  const [dealerError, setDealerError] = useState('Dealer is required');

  const [errors, setErrors] = useState({});
  const utmParams = useUtmParams();
  const [step, setStep] = useState(1);

  /* START : OTP */
  const [otp, setOtp] = useState(Array(4).fill(''));

  const handleOTPChange = (elementIndex, event) => {
    const newOtp = [...otp];
    newOtp[elementIndex] = event.target.value;
    setOtp(newOtp);

    // Auto focus to next input box
    if (elementIndex < otp.length - 1 && event.target.value !== '') {
      document.forms[0].elements[elementIndex + 1].focus();
    }
  };
  /* END : OTP */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let formErrors = {};

    // Add your validation logic here
    // if (!form.name) formErrors.name = 'Name is required';
    if (!form.mobile) formErrors.mobile = 'Mobile is required';
    if (!form.location) formErrors.location = 'Location is required';
    if (!form.dealer) formErrors.dealer = 'Dealer is required';
    if (!form.vehicle) formErrors.vehicle = 'Vehicle is required';
    if (!form.variant) formErrors.variant = 'Variant is required';
    if (!form.otp) formErrors.otp = 'otp is required';

    setErrors(formErrors);

    // If no errors, return true, else return false
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    console.log('fields');
    console.log(fields);

    if (
      nameError ||
      mobileError ||
      selectedVehicleError ||
      selectedVariantError ||
      locationError ||
      dealerError
    ) {
      return;
    }
    debugger;
    // console.log({ name: name });

    console.log({
      selectedVehicle: selectedVehicle,
      selectedVariant: selectedVariant,
      // other input values...
    });

    debugger;
    console.log({
      vehicleCode: selectedVehicle.fields.VehicleCode.value,
      brandCode: selectedVehicle.fields.VehicleCode.value,
      vehicleName: selectedVehicle.fields.VehicleName.value,
      variant: form.variant,
      name: form.name,
      mobile: form.mobile,
      location: dealer.pincode,
      dealer: dealer.id,
      otp: form.otp,
      // Add other input values as needed
      CustomerName: form.name,
      DealerId: dealer.id,
      MobileNumber: form.mobile,
      EmailId: '',
      City: dealer.City,
      UtmSource: utmParams.utm_source,
      UtmMedium: utmParams.utm_medium,
      UtmCampaign: utmParams.utm_campaign,
      UtmTerm: utmParams.utm_term,
      UtmContent: utmParams.utm_content,
      Gclid: 'string',
      LanguageCode: '1',
      Source: 'dmsapi',
      SourceId: 1,
      Area: dealer.pincode,
      BrandCode: selectedVehicle.fields.VehicleCode.value,
      ModelId: 'string',
      PartId: 'string',
      CustomerVoice: 'string',
      BranchId: 'string',
      AddressLine1: 'string',
      Parm1: 'string',
      Parm2: 'string',
      Parm3: 'string',
      Parm4: 'string',
      Parm5: 'string',
      CustomerState: 'string',
      Finance: 'string',
      Pincode: 'string',
      FinanceCompany: 'string',
      IntentforPurchase: 'string',
      Device: 'string',
      CrmInternetEnquiryId: 'string',
      TransactionId: 'string',
      Category: 'string',
      PaymentType: 'string',
      BookingAmount: 0,
      PaymentStatus: 'string',
      IsCrmRequest: 'string',
    });

    if (validateForm()) {
      if (step === 1) {
        setStep(2);
      } else {
        // Submit the form
        console.log('step 1');
      }
    }

    console.log(utmParams);
  };

  return (
    <form className="testride-form" onSubmit={handleSubmit}>
      {step === 1 && (
        <>
          <TvsNameInput
            onNameChange={setName}
            onError={setNameError}
            errMsg={nameError}
            errMsgNameFormat={fields.ErrMsgNameFormat.value}
            errMsgNameMinLength={fields.ErrMsgNameMinLength.value}
            formSubmitted={formSubmitted}
          />

          <TvsMobileInput
            onMobileChange={setMobile}
            onError={setMobileError}
            errorMessage={mobileError}
            formSubmitted={formSubmitted}
          />

          <TvsVehicleSelection
            vehiclePath={fields.VehiclePath}
            lblVehicle={fields.LabelVehicles.value}
            lblVariant={fields.LabelVariants.value}
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            onVehicleError={setSelectedVehicleError}
            onVariantError={setSelectedVariantError}
            errorMessageVehicle={selectedVehicleError}
            errorMessageVariant={selectedVariantError}
            formSubmitted={formSubmitted}
          />

          <TvsLocationAndDealerSelection
            onLocationChange={setLocation}
            onLocationError={setLocationError}
            onDealerChange={setDealer}
            onDealerError={setDealerError}
            dealer={dealer}
            setDealer={setDealer}
            location={location}
            setLocation={setLocation}
            errorMessageLocation={locationError}
            errorMessageDealer={dealerError}
            formSubmitted={formSubmitted}
          />
        </>
      )}
      {step === 2 && (
        <>
          {otp.map((value, index) => (
            <input
              key={index}
              type="number"
              name={`otp_${index}`}
              value={value}
              onChange={(event) => handleOTPChange(index, event)}
              maxLength="1"
              style={{ width: '20px', marginRight: '12px' }}
            />
          ))}
          {errors.otp && <p>{errors.otp}</p>}
        </>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default TestrideMultiStep;
