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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="contact_component"
          >
            <div className="section-header">
              <h2 className="heading-style-h1">CONTACT US</h2>
              <p className="contact-subtitle">Get in touch with our team for any inquiries</p>
            </div>

            <div className="contact-content">
              <div className="contact-info">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="contact-card"
                >
                  <h3>Primary Contact</h3>
                  <div className="contact-item">
                    <i className="bi bi-person"></i>
                    <div>
                      <strong>Dr. Boby Philip</strong>
                      <p>Chair, IEEE PES Kerala Chapter</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-envelope"></i>
                    <div>
                      <a href="mailto:boby.philip@ieee.org">boby.philip@ieee.org</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-phone"></i>
                    <div>
                      <a href="tel:+919495741482">+91 94957 41482</a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="contact-card"
                >
                  <h3>Student Representative</h3>
                  <div className="contact-item">
                    <i className="bi bi-person"></i>
                    <div>
                      <strong>Aravind R</strong>
                      <p>SR, IEEE PES Kerala Chapter</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-envelope"></i>
                    <div>
                      <a href="mailto:aravind17@ieee.org">aravind17@ieee.org</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-phone"></i>
                    <div>
                      <a href="tel:+919495741482">+91 94957 41482</a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="contact-card"
                >
                  <h3>Student Branch Chair</h3>
                  <div className="contact-item">
                    <i className="bi bi-person"></i>
                    <div>
                      <strong>Anvitha Vinod</strong>
                      <p>Chair, IEEE SB CET</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-envelope"></i>
                    <div>
                      <a href="mailto:anvithavinod@ieee.org">anvithavinod@ieee.org</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-phone"></i>
                    <div>
                      <a href="tel:+917736128024">+91 7736128024</a>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="contact-form-wrapper"
              >
                <div className="contact-form-card">
                  <h3>Send us a Message</h3>
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
