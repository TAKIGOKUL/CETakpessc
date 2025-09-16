import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Email validation function
  const validateEmail = (email) => {
    // More comprehensive email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // Additional checks
    if (!email || email.trim() === '') {
      return false;
    }
    
    // Check for basic structure
    if (email.length < 5 || email.length > 254) {
      return false;
    }
    
    return emailRegex.test(email.trim());
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Clear previous error messages
    setSubmitStatus(null);
    setErrorMessage('');
    
    // Validate email
    console.log('Validating email:', formData.email);
    console.log('Email validation result:', validateEmail(formData.email));
    
    if (!validateEmail(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage('');
      }, 3000);
      return;
    }
    
    setIsSubmitting(true);

    try {
      // EmailJS template parameters
      const templateParams = {
        name: formData.name,
        email: formData.email,
        cc_email: 'boby.philip@ieee.org,aravind.r@ieee.org,anvithavinod@ieee.org',
        title: formData.subject,
        message: formData.message
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        'service_uhq8nbn', //service id
        'template_87gh8l4',   // Template key
        templateParams,
        '9xVq9mopMpyvlClDv', // Public key
      );

      console.log('Email sent successfully:', response);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage('');
      }, 3000);
    }
  }, [formData]);

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
                    {/* Hidden input for cc_email */}
                    <input
                      type="hidden"
                      name="cc_email"
                      value="boby.philip@ieee.org,aravind.r@ieee.org,anvithavinod@ieee.org"
                    />
                    
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
                    
                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="status-message success">
                        <i className="fa fa-check-circle"></i>
                        Message sent successfully! We'll get back to you soon.
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="status-message error">
                        <i className="fa fa-exclamation-circle"></i>
                        {errorMessage || 'Failed to send message. Please check your email and try again.'}
                      </div>
                    )}
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
