
// Phone and OTP form component
import React, { useState } from 'react';
import axios from 'axios';
import { BASEURL } from '@/lib/utils';
import OtpInput from 'react-otp-input';
import { Route } from 'react-router-dom';



const PhoneOtpForm = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle phone number submission
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASEURL}/api/v1/admin/resetotp`, { phoneNumber :phone });
      if(response.status === 200) {
        setShowOtp(true);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASEURL}/api/v1/admin/resetAdminPassword`, 
        { phoneNumber : phone, otp, password , confirmPassword });
      if(response.status === 200) {
        // Handle successful verification
        console.log('OTP verified successfully');
        window.alert('Password reset successfully');
        // Redirect to login page
        window.location.href = '/signin';

      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };
  return (
    <div className="form-container flex flex-col items-center justify-center h-screen">
    {!showOtp ? (
      <form onSubmit={handlePhoneSubmit} className="flex flex-col space-y-4">
        <h2>Reset Password</h2>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none">Send OTP</button>
      </form>
    ) : (
      <form onSubmit={handleOtpSubmit} className="flex flex-col space-y-4">

<OtpInput value={otp} numInputs={4} onChange={setOtp}
          inputType='number'
        placeholder='0000'
        containerStyle={
          {
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            padding: '10px'
          }
        }

          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} style={
            {
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              textAlign: 'center'
            }
          } />}
          />
  
        <input

        onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
          className="border border-gray-300 rounded-md p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
        onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none">Verify OTP</button>
      </form>
    )}
  </div>
  );
};

export default PhoneOtpForm;