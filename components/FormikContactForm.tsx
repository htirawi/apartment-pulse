'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { FaPaperPlane } from 'react-icons/fa';

import { contactFormSchema, initialContactValues } from '@/lib/formValidations';
import LoadingButton from '@/components/ui/LoadingButton';
import { IApartmentContactFormProps } from '@/types/components/IApartmentContact';
import { IContactFieldProps } from '@/types/forms/IContactForm';

const ContactField = ({ name, label, type = 'text', placeholder, required = false, as, rows }: IContactFieldProps) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Field name={name}>
      {({ field, meta }: { field: any; meta: any }) => (
        <div>
          {as === 'textarea' ? (
            <textarea
              {...field}
              id={name}
              placeholder={placeholder}
              rows={rows || 4}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                meta.touched && meta.error
                  ? 'border-red-500 focus:ring-red-200 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
            />
          ) : (
            <input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                meta.touched && meta.error
                  ? 'border-red-500 focus:ring-red-200 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
            />
          )}
          <ErrorMessage name={name}>
            {(msg) => <div className="text-red-600 text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span> {msg}
            </div>}
          </ErrorMessage>
        </div>
      )}
    </Field>
  </div>
);

const FormikContactForm = ({ apartment }: IApartmentContactFormProps) => {
  const { data: session } = useSession();

  const handleSubmit = async (values: typeof initialContactValues, { setSubmitting, resetForm }: any) => {
    try {
      const data = {
        ...values,
        recipient: apartment.owner,
        apartment: apartment._id,
      };

      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resJson = await res.json();

      if (res.status === 200) {
        toast.success(resJson.message || 'Message sent successfully!');
        resetForm();
      } else if (res.status === 400 || res.status === 401) {
        toast.error(resJson.message || 'Failed to send message');
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Apartment Manager</h3>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You must be logged in to send a message</p>
          <button
            onClick={() => window.location.href = '/api/auth/signin'}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Apartment Manager</h3>
      
      <Formik
        initialValues={initialContactValues}
        validationSchema={contactFormSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, isValid }) => (
          <Form method="POST">
            {/* Validation Summary */}
            {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-red-600 mr-2">⚠</span>
                  <div>
                    <p className="text-red-800 font-medium">
                      Please fix {Object.keys(errors).length} error{Object.keys(errors).length !== 1 ? 's' : ''} before sending:
                    </p>
                    <ul className="text-red-700 text-sm mt-2 list-disc list-inside">
                      {Object.entries(errors)
                        .filter(([_, error]) => error)
                        .map(([field, error]) => (
                          <li key={field}>{error as string}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <ContactField
              name="name"
              label="Your Name"
              placeholder="Enter your full name"
              required
            />

            <ContactField
              name="email"
              label="Your Email"
              type="email"
              placeholder="Enter your email address"
              required
            />

            <ContactField
              name="phone"
              label="Your Phone"
              type="tel"
              placeholder="Enter your phone number"
            />

            <ContactField
              name="message"
              label="Message"
              as="textarea"
              placeholder="Enter your message about this apartment..."
              rows={5}
              required
            />

            <div className="flex justify-end">
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                loadingText="Sending..."
                disabled={!isValid}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikContactForm;
