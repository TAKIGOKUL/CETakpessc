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
    <section id="contact" className="section_template">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="contact_component"
          >
            <div className="contact_top-grid">
              <div className="contact_form-wrapper">
                <div className="contact-form-header">
                  <h2 className="heading-style-h5 text-style-allcaps">get in touch</h2>
                  <p>Reach out with inquiries about tickets, partnerships, or event details. Your message will be sent to our team via email.</p>
                  <div className="email-info">
                    <p className="email-info-text">
                      <i className="bi bi-envelope"></i>
                      Emails will be sent to: <strong>aravind17@ieee.org</strong>
                    </p>
                    <p className="email-info-text">
                      <i className="bi bi-people"></i>
                      CC: Team members will be included
                    </p>
                  </div>
                </div>
                
                <form className="contact_form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name *</label>
                    <input
                      id="name"
                      className="contact-form_input"
                      maxLength="256"
                      name="name"
                      placeholder="Your full name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      id="email"
                      className="contact-form_input"
                      maxLength="256"
                      name="email"
                      placeholder="your.email@example.com"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject *</label>
                    <input
                      id="subject"
                      className="contact-form_input"
                      maxLength="256"
                      name="subject"
                      placeholder="Brief description of your inquiry"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      id="message"
                      placeholder="Please provide details about your inquiry..."
                      maxLength="5000"
                      name="message"
                      className="contact-form_input is-area"
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      rows="6"
                    ></textarea>
                    <div className="char-count">
                      {formData.message.length}/5000 characters
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className={`button is-submit ${isSubmitting ? 'is-loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="bi bi-hourglass-split"></i>
                          Opening Email Client...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send"></i>
                          Send Email
                        </>
                      )}
                    </button>
                    
                    {isSubmitting && (
                      <div className="submission-feedback">
                        <p>Your email client will open with the message ready to send.</p>
                        <p>Subject will be: <strong>AKPESSC Query_{emailCount}</strong></p>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;