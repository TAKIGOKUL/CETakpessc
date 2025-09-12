import React, { memo } from 'react';
import { motion } from 'framer-motion';
import ReusableInfiniteScrollGallery from './InfiniteScrollGallery';

const Gallery = memo(() => {
  const galleryImages = [
    {
      id: 1,

      src: "/assets/images/panel.JPG",
      alt: "Group Photo"
    },
    {
      id: 2,
      src: "/assets/images/team.JPG",
      alt: "Team Photo"
    },
    {
      id: 3,
      src: akpessc_field_visit,
      alt: "Field Visit"
    },
    {
      id: 4,
      src: akpessc_dance,
      alt: "Cultural Event"
    },
    {
      id: 5,
      src: akpessc_rooming,
      alt: "Accommodation"
    },
    {
      id: 6,
      src: "/assets/images/social.JPG",
      alt: "Social Event"
    },
    {
      id: 7,
      src: "/assets/images/musical.JPG",
      alt: "Musical Performance"
    },
    {
      id: 8,
      src: akpessc_lab,
      alt: "Technical Session"
    },
    {
      id: 8,
      src: "/assets/images/talksession.JPG",
      alt: "Talk Session"
    }
  ];
  const galleryItems = [
    {
      title: 'Lion',
      subtitle: 'Panthera leo',
      image: 'https://images.unsplash.com/photo-1583499871880-de841d1ace2a?h=900',
      imagePosition: '47% 35%',
      alt: 'lion couple kissing on a brown rock',
      author: 'Clément Roy'
    },
    {
      title: 'Asiatic elephant',
      subtitle: 'Elephas maximus',
      image: 'https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?h=900',
      imagePosition: '75% 65%',
      alt: 'herd of Sri Lankan elephants walking away from a river',
      author: 'Alex Azabache'
    },
    {
      title: 'Red-tailed black cockatoo',
      subtitle: 'Calyptorhynchus banksii',
      image: 'https://images.unsplash.com/photo-1619664208054-41eefeab29e9?h=900',
      imagePosition: '53% 43%',
      alt: 'close-up of a black cockatoo',
      author: 'David Clode'
    },
    {
      title: 'Dromedary',
      subtitle: 'Camelus dromedarius',
      image: 'https://images.unsplash.com/photo-1662841238473-f4b137e123cb?h=900',
      imagePosition: '65% 65%',
      alt: 'camel and her new born calf walking in the Sahara desert',
      author: 'Moaz Tobok'
    },
    {
      title: 'Polar bear',
      subtitle: 'Ursus maritimus',
      image: 'https://images.unsplash.com/photo-1589648751789-c8ecb7a88bd5?h=900',
      imagePosition: '50% 25%',
      alt: 'polar bear on the snow, by the water, raised on the hind legs, front paws together',
      author: 'Hans-Jurgen Mager'
    },
    {
      title: 'Waterbuck',
      subtitle: 'Kobus ellipsiprymnus',
      image: 'https://images.unsplash.com/photo-1662187554571-f54ea9657d88?h=900',
      imagePosition: '47%',
      alt: 'waterbuck in a field, looking at the camera',
      author: 'Jonathan Gensicke'
    },
    {
      title: 'Giant panda',
      subtitle: 'Ailuropoda melanoleuca',
      image: 'https://images.unsplash.com/photo-1659540181281-1d89d6112832?h=900',
      imagePosition: '47%',
      alt: 'giant panda hanging from a tree branch',
      author: 'Jiachen Lin'
    },
    {
      title: "Grévy's zebra",
      subtitle: 'Equus grevyi',
      image: 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?h=900',
      imagePosition: '65% 35%',
      alt: 'zebra standing on wheat field, looking back towards the camera',
      author: 'Jeff Griffith'
    },
    {
      title: 'Cheetah',
      subtitle: 'Acinonyx jubatus',
      image: 'https://images.unsplash.com/photo-1541707519942-08fd2f6480ba?h=900',
      imagePosition: 'center',
      alt: 'cheetah sitting in the grass under a blue sky',
      author: 'Mike Bird'
    },
    {
      title: 'King penguin',
      subtitle: 'Aptenodytes patagonicus',
      image: 'https://images.unsplash.com/photo-1595792419466-23cec2476fa6?h=900',
      imagePosition: '35%',
      alt: 'king penguin with a fluffy brown chick on grey rocks',
      author: 'Martin Wettstein'
    },
    {
      title: 'Red panda',
      subtitle: 'Ailurus fulgens',
      image: 'https://images.unsplash.com/photo-1689799513565-44d2bc09d75b?h=900',
      imagePosition: 'center',
      alt: 'a red panda in a tree',
      author: 'Niels Baars'
    },
    {
      title: 'Leopard',
      subtitle: 'Panthera pardus',
      image: 'https://images.unsplash.com/photo-1651611136918-a8a2f8bba419?h=900',
      imagePosition: '43% 47%',
      alt: 'pensive young leopard on a rock',
      author: 'Andy Silby'
    },
    {
      title: 'Hyacinth macaw',
      subtitle: 'Anodorhynchus hyacinthinus',
      image: 'https://images.unsplash.com/photo-1624210146024-1046a266038e?h=900',
      imagePosition: '65% 35%',
      alt: 'two hyacinth macaws on a tree branch',
      author: 'Juliana e Mariana Amorim'
    },
    {
      title: 'Red kangaroo',
      subtitle: 'Osphranter rufus',
      image: 'https://images.unsplash.com/photo-1567600868213-60eb570ae39f?h=900',
      imagePosition: 'center',
      alt: 'kangaroo in the grass',
      author: 'Jordyn Montague'
    },
    {
      title: 'Snow leopard',
      subtitle: 'Panthera uncia',
      image: 'https://images.unsplash.com/photo-1639231554431-ebce02bdeacc?h=900',
      imagePosition: '50% 25%',
      alt: 'snow leopard sitting on top of a rock, its big fluffy tail hanging down',
      author: 'Simon Schwyter'
    },
    {
      title: 'Sumatran orangutan',
      subtitle: 'Pongo abelii',
      image: 'https://images.unsplash.com/photo-1723979757235-73c4767ced1d?h=900',
      imagePosition: 'center',
      alt: 'close-up of a pensive male orangutan',
      author: 'Fahrul Razi'
    },
    {
      title: 'Tiger',
      subtitle: 'Panthera tigris',
      image: 'https://images.unsplash.com/photo-1500467525088-aafe28c0a95e?h=900',
      imagePosition: '57%',
      alt: 'close-up of a pensive tiger lying on the ground',
      author: 'Frida Lannerström'
    },
    {
      title: 'Brown bear',
      subtitle: 'Ursus arctos',
      image: 'https://images.unsplash.com/photo-1692373202439-4b13694c8a68?h=900',
      imagePosition: '43% 35%',
      alt: 'brown bear in the forest, sticking tongue out',
      author: 'Alexandru-Bogdan Ghita'
    }
  ];

  // Custom configuration example
  const customConfig = {
    rotationSpeed: 2,
    rotationLimits: { min: -360, max: 0 },
    theme: {
      primary: '#09543D',
      secondary: '#FFFDF7',
      background: '#09543D'
    },
    enableHoverEffects: true,
    enableScrollRotation: true,
    enableKeyboardControls: true,
    enableMouseWheel: true
  };
  return (
    <section id="gallery" className="section_gallery">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="gallery_component"
          >
            <div className="content-wrapper">
              <div className="section-header">
                <h2 className="heading-style-h1">GALLERY</h2>
              </div>
              
              <div className="gallery-grid">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="gallery-item"
                  >
                    <div className="gallery-image-container">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="gallery-image"
                        loading="lazy"
                      />
                      <div className="gallery-overlay">
                        <div className="gallery-overlay-content">
                          <h4>{image.alt}</h4>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
});

Gallery.displayName = 'Gallery';
export default Gallery;
