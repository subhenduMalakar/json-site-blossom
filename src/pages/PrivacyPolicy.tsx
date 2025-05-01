import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Privacy Policy - Directory Explorer</title>
        <meta name="description" content="Learn about our privacy policy. 100" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="text-gray-800 space-y-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: "<h2>Privacy Policy</h2><p>Your privacy is very important to us. This privacy policy explains how we collect, use, and protect your personal information.</p><h3>Information We Collect</h3><p>We may collect information that you provide directly to us, such as your name, email address, and any other information you choose to provide.</p><h3>How We Use Your Information</h3><p>We may use the information we collect to operate and maintain our website, respond to your comments or inquiries, and send you technical notices, updates, security alerts, and support and administrative messages.</p><h3>Sharing Your Information</h3><p>We do not share your personal information with third parties without your consent, except in limited circumstances such as to comply with legal obligations.</p><h3>Security</h3><p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.</p><h3>Changes to This Policy</h3><p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p><h3>Contact Us</h3><p>If you have any questions about this privacy policy, please contact us at info@example.com.</p>" }} />
    </div>
  );
};

export default PrivacyPolicy;