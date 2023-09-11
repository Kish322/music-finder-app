import React, { useState } from 'react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear errors when input changes
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    // First name validation
    if (!formData.firstName.match(/^[a-zA-Z]+$/)) {
      newErrors.firstName = 'First name should only contain alphabets';
    }

    // Last name validation
    if (!formData.lastName.match(/^[a-zA-Z]+$/)) {
      newErrors.lastName = 'Last name should only contain alphabets';
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password should be at least 8 characters long';
    }

    // Password and confirm password matching validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Empty field validation
    if (formData.firstName.trim() === '') {
      newErrors.firstName = 'First name is required';
    }
    if (formData.lastName.trim() === '') {
      newErrors.lastName = 'Last name is required';
    }
    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    }
    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
    }
    if (formData.confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Confirm password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      // If there are errors, set them in the state and prevent form submission
      setErrors(newErrors);
    } else {
      // If there are no errors, handle form submission
      console.log(formData);
      // Add your logic for submitting the form here
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Charlie"
              className={`border ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              } bg-gray-200 bg-opacity-50 rounded-md w-full p-2`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Smith"
              className={`border ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              } bg-gray-200 bg-opacity-50 rounded-md w-full p-2`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@company.com"
              className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-gray-200 bg-opacity-50 rounded-md w-full p-2`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={`border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } bg-gray-200 bg-opacity-50 rounded-md w-full p-2`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className={`border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } bg-gray-200 bg-opacity-50 rounded-md w-full p-2`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
