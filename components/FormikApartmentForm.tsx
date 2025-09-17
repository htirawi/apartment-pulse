'use client';

import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { apartmentFormSchema, initialApartmentValues } from '@/lib/formValidations';
import { US_STATES, APARTMENT_TYPES, COMMON_AMENITIES } from '@/utils/constants';
import LoadingButton from '@/components/ui/LoadingButton';

// Custom Field Component with professional styling
import { ICustomFieldProps } from '@/types/forms/ICustomField';

const CustomField = ({ name, label, type = 'text', placeholder, required = false, children, ...props }: ICustomFieldProps) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Field name={name}>
      {({ field, meta }: any) => (
        <div>
          {children ? (
            children({ field, meta })
          ) : (
            <input
              {...field}
              {...props}
              type={type}
              id={name}
              placeholder={placeholder}
              className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                meta.touched && meta.error
                  ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              } focus:outline-none focus:ring-2`}
            />
          )}
          {meta.touched && meta.error && (
            <div className="text-red-600 text-sm mt-1 font-medium">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  </div>
);

const FormikApartmentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Clean the URL if it has form parameters
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.search) {
      router.replace('/apartments/add');
    }
  }, [router]);

  const handleSubmit = async (values: any, { setSubmitting, setFieldError }: any) => {
    try {
      setIsSubmitting(true);
      
      const formData = new FormData();
      
      // Add all form fields to FormData
      Object.keys(values).forEach(key => {
        if (key === 'location' || key === 'rates' || key === 'seller_info') {
          Object.keys(values[key]).forEach(subKey => {
            if (values[key][subKey] !== null && values[key][subKey] !== '') {
              formData.append(`${key}.${subKey}`, values[key][subKey]);
            }
          });
        } else if (key === 'amenities') {
          values[key].forEach((amenity: string) => {
            formData.append('amenities', amenity);
          });
        } else if (key !== 'images') {
          formData.append(key, values[key]);
        }
      });
      
      // Handle images separately
      const imageInput = document.getElementById('images') as HTMLInputElement;
      if (imageInput?.files) {
        Array.from(imageInput.files).forEach(file => {
          formData.append('images', file);
        });
      }

      const response = await fetch('/api/apartments', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Apartment added successfully!');
        router.push('/apartments');
      } else {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to add apartment');
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast.error(error.message || 'Failed to add apartment. Please try again.');
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
      <Formik
        initialValues={initialApartmentValues}
        validationSchema={apartmentFormSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, errors, touched, isValid, dirty, submitForm }) => (
          <form 
            className="space-y-6"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
              Add New Apartment
            </h2>

            {/* Validation Summary */}
            {dirty && (
              <div className={`p-4 rounded-lg mb-6 ${
                isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center">
                  {isValid ? (
                    <div className="flex items-center text-green-800">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Form is ready to submit!</span>
                    </div>
                  ) : (
                    <div className="flex items-start text-red-800">
                      <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">
                          {Object.keys(errors).length} field{Object.keys(errors).length !== 1 ? 's' : ''} need{Object.keys(errors).length === 1 ? 's' : ''} attention
                        </p>
                        <p className="text-sm mt-1">Please check the highlighted fields below</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Apartment Type */}
            <CustomField name="type" label="Apartment Type" required>
              {({ field, meta }: any) => (
                <div>
                  <select
                    {...field}
                    id="type"
                    className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                      meta.touched && meta.error
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    } focus:outline-none focus:ring-2`}
                  >
                    <option value="">Select Apartment Type</option>
                    {APARTMENT_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}
            </CustomField>

            {/* Apartment Name */}
            <CustomField 
              name="name" 
              label="Apartment Name" 
              placeholder="e.g., Beautiful Downtown Apartment"
              required
            />

            {/* Description */}
            <CustomField name="description" label="Description" required>
              {({ field, meta }: any) => (
                <div>
                  <textarea
                    {...field}
                    id="description"
                    rows={4}
                    placeholder="Describe your apartment in detail..."
                    className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 resize-vertical ${
                      meta.touched && meta.error
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    } focus:outline-none focus:ring-2`}
                  />
                </div>
              )}
            </CustomField>

            {/* Location Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Location Details</h3>
              
              <CustomField 
                name="location.street" 
                label="Street Address" 
                placeholder="123 Main Street"
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomField 
                  name="location.city" 
                  label="City" 
                  placeholder="Miami"
                  required
                />
                
                <CustomField name="location.state" label="State" required>
                  {({ field, meta }: any) => (
                    <div>
                      <select
                        {...field}
                        id="location.state"
                        className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                          meta.touched && meta.error
                            ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        } focus:outline-none focus:ring-2`}
                      >
                        <option value="">Select State</option>
                        {US_STATES.map((state) => (
                          <option key={state.value} value={state.value}>{state.label}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </CustomField>
              </div>
              
              <CustomField 
                name="location.zipcode" 
                label="Zipcode" 
                placeholder="12345"
                required
              />
            </div>

            {/* Property Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Property Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomField 
                  name="beds" 
                  label="Bedrooms" 
                  type="number"
                  min="0"
                  max="20"
                  placeholder="e.g., 2"
                  required
                />
                
                <CustomField 
                  name="baths" 
                  label="Bathrooms" 
                  type="number"
                  min="0"
                  max="20"
                  step="0.5"
                  placeholder="e.g., 1.5"
                  required
                />
                
                <CustomField 
                  name="square_feet" 
                  label="Square Feet" 
                  type="number"
                  min="100"
                  max="10000"
                  placeholder="e.g., 1200"
                  required
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h3>
              <FieldArray name="amenities">
                {({ push, remove }: any) => (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {COMMON_AMENITIES.map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                        <Field
                          type="checkbox"
                          name="amenities"
                          value={amenity}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Rates */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Rental Rates <span className="text-red-500">*</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">Enter at least one rate</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomField 
                  name="rates.nightly" 
                  label="Nightly Rate ($)" 
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
                
                <CustomField 
                  name="rates.weekly" 
                  label="Weekly Rate ($)" 
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
                
                <CustomField 
                  name="rates.monthly" 
                  label="Monthly Rate ($)" 
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <Field name="rates">
                {({ meta }: any) => (
                  meta.touched && meta.error && (
                    <div className="text-red-600 text-sm mt-2 font-medium bg-red-50 p-2 rounded">
                      {meta.error}
                    </div>
                  )
                )}
              </Field>
            </div>

            {/* Seller Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
              
              <CustomField 
                name="seller_info.name" 
                label="Your Name" 
                placeholder="John Doe"
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomField 
                  name="seller_info.email" 
                  label="Email Address" 
                  type="email"
                  placeholder="john@example.com"
                  required
                />
                
                <CustomField 
                  name="seller_info.phone" 
                  label="Phone Number" 
                  type="tel"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>

            {/* Images */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Property Images <span className="text-red-500">*</span>
              </h3>
              <div>
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      // Validate file size and type
                      const maxSize = 5 * 1024 * 1024; // 5MB
                      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                      
                      for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        if (file.size > maxSize) {
                          toast.error(`Image "${file.name}" is too large. Maximum size is 5MB.`);
                          return;
                        }
                        if (!allowedTypes.includes(file.type)) {
                          toast.error(`Image "${file.name}" has invalid format. Use JPEG, PNG, or WebP.`);
                          return;
                        }
                      }
                      toast.success(`${files.length} image(s) selected successfully!`);
                    }
                  }}
                />
                <p className="text-sm text-gray-600 mt-2">
                  Upload multiple images (JPEG, PNG, WebP). Maximum 5MB per image.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                loadingText="Adding Apartment..."
                disabled={!isValid || isSubmitting}
                className="w-full py-4 px-6 text-lg font-semibold rounded-lg transition-all duration-200"
                variant="primary"
              >
                Add Apartment
              </LoadingButton>
              
              {!isValid && dirty && (
                <p className="text-red-600 text-sm text-center mt-2">
                  Please fix the errors above to submit the form
                </p>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormikApartmentForm;
