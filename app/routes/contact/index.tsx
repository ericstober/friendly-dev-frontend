import type { Route } from "./+types";

// ContactPage component
// Displays a contact form that submits directly to Formspree.
// No local state is required since the form posts externally.
const ContactPage = ({ actionData }: Route.ComponentProps) => {
  return (
    <div className='max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900'>
      {/* Page heading */}
      <h2 className='text-3xl font-bold text-white mb-8 text-center'>Contact Me</h2>

      {/*
        Form submission handled by Formspree.
        Uses POST method and send form data directly to the specified Formspree endpoint.
       */}
      <form action='https://formspree.io/f/xnjbdabk' method='post' className='space-y-6'>
        {/* Name Field */}
        <div>
          <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
            Full Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor='subject' className='block text-sm font-medium text-gray-300'>
            Subject
          </label>
          <input
            type='text'
            id='subject'
            name='subject'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor='message' className='block text-sm font-medium text-gray-300'>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800
            text-gray-100'
          />
        </div>

        {/* Submit Button */}
        <button className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer'>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
