import React from 'react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Contact Us - Directory Explorer</title>
        <meta name="description" content="Get in touch with Directory Explorer. 100" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="text-gray-800 space-y-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: "<h2>Get in Touch to US</h2><p>If you have any questions, feedback, or inquiries, please feel free to contact us using the information below or the contact form.</p><h3>Contact Information</h3><p>Email: info@example.com</p><p>Phone: (123) 456-7890</p><p>Address: 123 Main Street, Anytown, USA</p><h3>Contact Form (Placeholder)</h3><p>Please note: This is a placeholder. A functional contact form would require backend implementation.</p><form><label for='name'>Name:</label><br><input type='text' id='name' name='name'><br><br><label for='email'>Email:</label><br><input type='email' id='email' name='email'><br><br><label for='message'>Message:</label><br><textarea id='message' name='message'></textarea><br><br><button type='submit'>Send Message</button></form>" }} />
    </div>
  );
};

export default Contact;