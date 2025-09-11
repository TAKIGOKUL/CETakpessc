import React, { memo } from 'react';
import { motion } from 'framer-motion';

const Events = memo(() => {
  return (
    <section id="events" className="section_events">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="events_component"
          >
            <div className="content-wrapper">
              <div className="section-header">
                <h2 className="heading-style-h1">EVENTS</h2>
              </div>
              
              <div className="events-placeholder">
                <div className="placeholder-content">
                  <h3>Events Section</h3>
                  <p>This section will contain information about upcoming events, workshops, and activities.</p>
                  <div className="placeholder-features">
                    <div className="feature-item">
                      <span className="feature-icon">🎯</span>
                      <span>Technical Workshops</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🏆</span>
                      <span>Competitions</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">👥</span>
                      <span>Networking Events</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🎓</span>
                      <span>Educational Sessions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Events.displayName = 'Events';
export default Events;
