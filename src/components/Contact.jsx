import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [emailCount, setEmailCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateEmailContent = useCallback(() => {
    const { name, email, subject, message } = formData;
    
    const emailBody = `
Dear AKPESSC 2025 Team,

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent through the AKPESSC 2025 contact form.
    `.trim();

    return emailBody;
  }, [formData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate email content
    const emailBody = generateEmailContent();
    const emailSubject = `AKPESSC Query_${emailCount}`;
    
    // Email recipients
    const primaryRecipient = 'aravind17@ieee.org';
    const ccRecipients = [
      'boby.philip@ieee.org',
      'rahulsatheesh21@ieee.org',
      'hari_kumarkp@yahoo.com',
      'athirarajuareekal@gmail.com',
      'anvithavinod@ieee.org',
      'deepthin@ieee.org'
    ].join(',');

    // Create mailto link
    const mailtoLink = `mailto:${primaryRecipient}?cc=${ccRecipients}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.open(mailtoLink, '_blank');
    
    // Increment email count for next submission
    setEmailCount(prev => prev + 1);
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  }, [formData, emailCount, generateEmailContent]);

  return (
    <section id="contact" className="section_contact">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <div className="content-wrapper">
            <div className="section-header">
              <h2 className="heading-style-h1">CONTACT US</h2>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="contact_component"
            >
              <div className="contact-rectangular-frame">
                <div className="contact-form-container">
                  <h3>Send us a Message</h3>
                  <p className="contact-description">
                    Have questions about AKPESSC 2025? We'd love to hear from you. 
                    Send us a message and we'll respond as soon as possible.
                  </p>
                  
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <input
                        className="form-input"
                        name="name"
                        placeholder="Your Name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                      <input
                        className="form-input"
                        name="email"
                        placeholder="Your Email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <input
                      className="form-input"
                      name="subject"
                      placeholder="Subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    
                    <textarea
                      className="form-input form-textarea"
                      name="message"
                      placeholder="Your Message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      rows="4"
                    ></textarea>
                    
                    <button 
                      type="submit" 
                      className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
