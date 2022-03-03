import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Controller } from 'react-hook-form';

const PhoneNumberInput = ({ ref, country, name, control }) => {
  const labelId = `${name}-label`;
  return (
    <Controller
      name={name}
      control={control}
      inputRef={ref}
      render={({ field: { onChange, value } }) => (
        <PhoneInput
          value={value}
          onChange={onChange}
          country={country}
          defaultCountry="pk"
          id={name}
          inputStyle={{
            height: '45px',
            width: '100%',
            color: '#333',
            border: '1px solid #e6e6e6',
            background: 'transparent none repeat scroll 0 0',
          }}
        />
      )}
    />
  );
};
export default PhoneNumberInput;
