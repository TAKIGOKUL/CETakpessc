import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(1);

  const scheduleData = {
    day1: [
      {
        id: 1,
        eventName: "Registration",
        time: "9:00 AM - 10:00 AM",
        venue: "CETAA Hall",
        description: "Welcome and registration for all participants"
      },
      {
        id: 2,
        eventName: "Industrial Visit 1 - VSSC",
        time: "10:00 AM - 1:30 PM",
        venue: "VSSC Facility",
        description: "Visit to Vikram Sarabhai Space Centre"
      },
      {
        id: 3,
        eventName: "Industrial Visit 2 - CDAC",
        time: "10:00 AM - 1:30 PM",
        venue: "CDAC Facility",
        description: "Visit to Centre for Development of Advanced Computing"
      },
      {
        id: 4,
        eventName: "Industrial Visit 3",
        time: "10:00 AM - 1:30 PM",
        venue: "Industry Facility",
        description: "Additional industrial visit"
      },
      {
        id: 5,
        eventName: "Lunch Break + Networking Session",
        time: "1:30 PM - 2:30 PM",
        venue: "Gazebo",
        description: "Networking lunch with fellow participants"
      },
      {
        id: 6,
        eventName: "Inauguration Ceremony",
        time: "2:30 PM - 4:30 PM",
        venue: "CETAA Hall",
        description: "Official opening ceremony of AKPESSC '25"
      },
      {
        id: 7,
        eventName: "Workshop Track 1 - SolarSchools Kit Assembly",
        time: "4:30 PM - 6:30 PM",
        venue: "Mechanical Classroom",
        description: "Hands-on workshop on solar energy kit assembly",
        isWorkshop: true
      },
      {
        id: 8,
        eventName: "Workshop Track 2 - AI Tools Workshop",
        time: "4:30 PM - 6:30 PM",
        venue: "CTSE",
        description: "Introduction to AI tools and applications",
        isWorkshop: true
      },
      {
        id: 9,
        eventName: "Dinner + Culturals",
        time: "7:00 PM - 9:00 PM",
        venue: "Gazebo",
        description: "Cultural evening with dinner"
      }
    ],
    day2: [
      {
        id: 10,
        eventName: "Talk Session",
        time: "9:00 AM - 10:00 AM",
        venue: "CETAA Hall",
        description: "Expert talk session"
      },
      {
        id: 11,
        eventName: "Parallel Workshop Track 1 - PCB Designing Software Workshop",
        time: "10:00 AM - 1:00 PM",
        venue: "CTSE",
        description: "Learn PCB design software and techniques",
        isWorkshop: true
      },
      {
        id: 12,
        eventName: "Parallel Workshop Track 2 - AI Applications in Power and Energy Domain",
        time: "10:00 AM - 1:00 PM",
        venue: "CCube",
        description: "AI applications in power systems and energy management",
        isWorkshop: true
      },
      {
        id: 13,
        eventName: "Parallel Workshop Track 3 - Python Arduino Interfacing",
        time: "10:00 AM - 1:00 PM",
        venue: "CCF",
        description: "Interfacing Arduino with Python programming",
        isWorkshop: true
      },
      {
        id: 14,
        eventName: "Lunch Break + Networking Session",
        time: "1:00 PM - 2:00 PM",
        venue: "Gazebo",
        description: "Networking lunch session"
      },
      {
        id: 15,
        eventName: "Motivational Talk Session",
        time: "2:00 PM - 3:30 PM",
        venue: "CETAA Hall",
        description: "Inspirational talk by industry leaders"
      },
      {
        id: 16,
        eventName: "Closing Ceremony",
        time: "3:30 PM - 4:00 PM",
        venue: "CETAA Hall",
        description: "Official closing ceremony and awards"
      }
    ]
  };

  const currentDayData = activeDay === 1 ? scheduleData.day1 : scheduleData.day2;

  const handleCallInfo = (event) => {
    // Open WhatsApp with event information
    const message = `Hi! I'd like to get more information about this event:\n\n*Event:* ${event.eventName}\n*Time:* ${event.time}\n*Venue:* ${event.venue}\n*Description:* ${event.description}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.link/h52n83?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="schedule" className="section_schedule">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <div className="content-wrapper">
            <div className="section-header">
              <h2 className="heading-style-h1">SCHEDULE</h2>
            </div>
            
            {/* Day Selector */}
            <div className="schedule-day-selector">
              <motion.button
                className={`day-button ${activeDay === 1 ? 'active' : ''}`}
                onClick={() => setActiveDay(1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Day 1
              </motion.button>
              <motion.button
                className={`day-button ${activeDay === 2 ? 'active' : ''}`}
                onClick={() => setActiveDay(2)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Day 2
              </motion.button>
            </div>

            {/* Schedule Table */}
            <motion.div 
              className="schedule-table-container"
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="schedule-table">
                <div className="table-header">
                  <div className="header-cell">Event Name</div>
                  <div className="header-cell">Time</div>
                  <div className="header-cell">Venue</div>
                  <div className="header-cell">Info</div>
                </div>
                
                <div className="table-body">
                  {currentDayData.map((event, index) => (
                    <motion.div
                      key={event.id}
                      className={`table-row ${event.isWorkshop ? 'workshop-row' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="table-cell event-name" data-label="Event">
                        <span className="event-title">{event.eventName}</span>
                        {event.isWorkshop && <span className="workshop-badge">Workshop</span>}
                      </div>
                      <div className="table-cell time" data-label="Time">{event.time}</div>
                      <div className="table-cell venue" data-label="Venue">{event.venue}</div>
                      <div className="table-cell info" data-label="Info">
                        <motion.button
                          className="info-button"
                          onClick={() => handleCallInfo(event)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Get more info via WhatsApp"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                            <path d="M8 12h8"/>
                            <path d="M12 8v8"/>
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
