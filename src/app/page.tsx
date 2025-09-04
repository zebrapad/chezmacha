'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { BookingModal } from '@/components/ui/booking-modal';
import { Carousel } from '@/components/ui/carousel';
import { getEvents, type Event, addNewsletterSubscriber } from '@/lib/google-sheets';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-4 left-0 w-full flex justify-between items-center px-4 md:px-8 z-50">
      <div className="flex items-center">
        <img 
          src="/logo.png" 
          alt="CHEZ MACHA Logo" 
          className="h-16 w-16 md:h-32 md:w-32 object-contain"
        />
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-8 text-sm uppercase tracking-wider">
        <a href="#upcoming-shows" className="hover:text-gray-300 transition-colors font-semibold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>Shows</a>
        <a href="#evenements-passes" className="hover:text-gray-300 transition-colors font-semibold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>Événements passés</a>
        <a href="#macha-de-ruyver" className="hover:text-gray-300 transition-colors font-semibold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>About</a>
      </nav>
      
      {/* Desktop Instagram Icon */}
      <div className="hidden lg:flex space-x-4 text-white">
        <a 
          href="https://www.instagram.com/chezmacha_standup/" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Instagram" 
          className="group relative hover:text-gray-300 transition-all duration-300 transform hover:scale-110 hover:rotate-3"
        >
          <svg 
            className="w-6 h-6 transition-all duration-300 group-hover:drop-shadow-lg" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </a>
      </div>

      {/* Mobile Hamburger Menu Button */}
      <button
        className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 text-white hover:text-gray-300 transition-colors"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-40 lg:hidden" onClick={toggleMobileMenu}>
          <div className="fixed top-0 right-0 h-full w-80 bg-zinc-900 shadow-xl transform transition-transform duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center p-6 border-b border-zinc-700">
                <img 
                  src="/logo.png" 
                  alt="CHEZ MACHA Logo" 
                  className="h-12 w-12 object-contain"
                />
                <button
                  onClick={toggleMobileMenu}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Close mobile menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Navigation */}
              <nav className="flex-1 px-6 py-8">
                <div className="space-y-6">
                  <a 
                    href="#upcoming-shows" 
                    className="block text-xl font-bold uppercase tracking-wider hover:text-gray-300 transition-colors"
                    style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}
                    onClick={toggleMobileMenu}
                  >
                    Shows
                  </a>
                  <a 
                    href="#evenements-passes" 
                    className="block text-xl font-bold uppercase tracking-wider hover:text-gray-300 transition-colors"
                    style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}
                    onClick={toggleMobileMenu}
                  >
                    Événements passés
                  </a>
                  <a 
                    href="#macha-de-ruyver" 
                    className="block text-xl font-bold uppercase tracking-wider hover:text-gray-300 transition-colors"
                    style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}
                    onClick={toggleMobileMenu}
                  >
                    About
                  </a>
                </div>
              </nav>

              {/* Mobile Instagram Link */}
              <div className="px-6 py-6 border-t border-zinc-700">
                <a 
                  href="https://www.instagram.com/chezmacha_standup/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-white hover:text-gray-300 transition-colors"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-lg font-semibold">Follow us on Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const HeroSection = () => (
  <div className="relative h-screen w-full">
    <div 
      className="absolute inset-0 bg-cover bg-center" 
      style={{ backgroundImage: "url('/asset/optimized_hero.jpg')" }}
    ></div>
    <div className="absolute inset-0 bg-black opacity-40"></div>
  </div>
);

const UpcomingShows = () => {
  const [upcomingShows, setUpcomingShows] = React.useState<Array<{
    day: string;
    monthYear: string;
    title: string;
    subtitle: string;
    place: string;
    status: string;
    link: string | undefined;
  }>>([]);
  
  const [allShows, setAllShows] = React.useState<Array<{
    day: string;
    monthYear: string;
    title: string;
    subtitle: string;
    place: string;
    status: string;
    link: string | undefined;
  }>>([]);
  
  const [showAllShows, setShowAllShows] = React.useState(false);
  
  const [selectedEvent, setSelectedEvent] = React.useState<{
    title: string;
    date: string;
    place: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleBookingClick = (show: { title: string; day: string; monthYear: string; place: string }) => {
    setSelectedEvent({
      title: show.title,
      date: `${show.day} ${show.monthYear}`,
      place: show.place,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleShowAllShows = () => {
    setShowAllShows(true);
  };

  const handleShowLessShows = () => {
    setShowAllShows(false);
  };

  React.useEffect(() => {
    const loadEvents = async () => {
      const events = await getEvents();
      
      // Filter events with status "not yet"
      const upcomingEvents = events.filter((event: Event) => {
        return event.flag_active && event.status === 'not yet';
      });

      const formattedShows = upcomingEvents.map((event: Event) => {
        const eventDate = new Date(event.date);
        const day = eventDate.getDate().toString().padStart(2, '0');
        const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        const year = eventDate.getFullYear();
        
        return {
          day,
          monthYear: `${month} ${year}`,
          title: event.title,
          subtitle: event.subtitle,
          place: event.place,
          status: event.status === 'full' ? 'SOLD OUT' : 'BUY TICKETS',
          link: event.status === 'full' ? undefined : '#',
        };
      });

      setAllShows(formattedShows);
      setUpcomingShows(formattedShows.slice(0, 4)); // Show first 4 by default
    };
    
    loadEvents();
  }, []);

  const displayedShows = showAllShows ? allShows : upcomingShows;

  return (
    <div className="bg-zinc-900 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-4" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>
            CHEZ MACHA
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>
            UPCOMING SHOWS
          </h2>
        </div>
        
        <div className="space-y-6">
          {displayedShows.map((show, index) => (
            <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-zinc-700 last:border-b-0 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300 rounded-lg px-4 -mx-4">
              <div className="flex items-center space-x-8 w-full md:w-auto">
                <div className="flex flex-col items-center">
                  <span className="text-5xl font-light" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>{show.day}</span>
                  <span className="text-sm text-gray-400 uppercase tracking-wider">{show.monthYear}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-3xl font-bold text-white" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>{show.title}</h3>
                    <span className="text-gray-400 text-lg">•</span>
                    <p className="text-gray-400 text-lg">{show.place}</p>
                  </div>
                  <p className="text-gray-300 text-lg mt-2">{show.subtitle}</p>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                {show.status === 'SOLD OUT' ? (
                  <span className="bg-red-600 text-white font-bold py-3 px-8 rounded-full text-sm uppercase tracking-wider">
                    {show.status}
                  </span>
                ) : (
                  <Button
                    onClick={() => handleBookingClick(show)}
                    variant="yellow"
                    size="lg"
                    className="font-bold uppercase tracking-wider"
                  >
                    {show.status}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          {!showAllShows ? (
            <button 
              onClick={handleShowAllShows}
              className="bg-transparent font-bold py-4 px-12 rounded-full border-2 uppercase tracking-wider transition-colors hover:bg-yellow-500 hover:text-black" 
              style={{ color: '#ffda65', borderColor: '#ffda65' }}
            >
              ALL SHOWS
            </button>
          ) : (
            <button 
              onClick={handleShowLessShows}
              className="bg-transparent font-bold py-4 px-12 rounded-full border-2 uppercase tracking-wider transition-colors hover:bg-yellow-500 hover:text-black" 
              style={{ color: '#ffda65', borderColor: '#ffda65' }}
            >
              SHOW LESS
            </button>
          )}
        </div>
      </div>
      
      {selectedEvent && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={closeModal}
          eventTitle={selectedEvent.title}
          eventDate={selectedEvent.date}
          eventPlace={selectedEvent.place}
        />
      )}
    </div>
  );
};

const PodcastSection = () => {
  // Create slides for the carousel - all 11 images
  const slides = [
    {
      title: 'Tennis Churchill',
      button: 'Festival Rire & BBQ',
      src: '/asset/event/optimized_vizorek.jpg'
    },
    {
      title: 'Stand Up Comedy',
      button: 'Event Image',
      src: '/asset/event/optimized_Stand Up Comedy Show-43.jpg'
    },
    {
      title: 'Alice Bar',
      button: 'Stand Up & Cocktail',
      src: '/asset/event/optimized_Stand Up Comedy Show-78.jpg'
    },
    {
      title: 'Stand Up Comedy',
      button: 'Event Image',
      src: '/asset/event/optimized_Stand Up Comedy Show-146.jpg'
    },
    {
      title: 'Stand Up Comedy',
      button: 'Event Image',
      src: '/asset/event/optimized_Stand Up Comedy Show-169.jpg'
    },
    {
      title: 'Stand Up Comedy',
      button: 'Event Image',
      src: '/asset/event/optimized_Stand Up Comedy Show-209.jpg'
    },
    {
      title: 'Wine Club',
      button: 'Stand Up & Cheese & Wine',
      src: '/asset/event/optimized_Stand Up Comedy Show-232.jpg'
    },
    {
      title: 'Stand Up Comedy',
      button: 'Event Image',
      src: '/asset/event/optimized_Stand Up Comedy Show-251.jpg'
    },
    {
      title: 'Côte Meuse',
      button: 'Stand Up & Spaghetti',
      src: '/asset/event/optimized_Stand Up Comedy Show-52.jpg'
    },
    {
      title: 'Stand Up Comedy',
      button: 'Event Image',
      src: '/asset/event/optimized_Stand Up Comedy Show-130.jpg'
    },
    {
      title: 'Stand Up Comedy',
      button: 'Event Image',
      src: '/asset/event/optimized_people.jpg'
    }
  ];

  return (
    <div className="bg-zinc-900 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>
            ÉVÉNEMENTS PASSÉS
          </h2>
        </div>
        <Carousel slides={slides} />
      </div>
    </div>
  );
};

const AboutSection = () => {
  const [showFullStory, setShowFullStory] = React.useState(false);

  const shortText = (
    <>
      Une nana qui a compris une chose : si la vie te donne des galères, transforme-les en vannes.
      <br /><br />
      Humoriste, animatrice radio et maman solo, Macha a choisi de faire de son micro une arme massive de bonne humeur.
      <br /><br />
      Le matin, elle réveille Bruxelles sur BXFM avec son énergie, ses blagues (et son café XXL, sans lequel rien ne serait possible).
    </>
  );

  const fullText = (
    <>
      Une nana qui a compris une chose : si la vie te donne des galères, transforme-les en vannes.
      <br /><br />
      Humoriste, animatrice radio et maman solo, Macha a choisi de faire de son micro une arme massive de bonne humeur.
      <br /><br />
      Le matin, elle réveille Bruxelles sur BXFM avec son énergie, ses blagues (et son café XXL, sans lequel rien ne serait possible). Une fois par semaine, elle ouvre son micro à La Bande à Macha : cinq humoristes qu&apos;elle met en avant, parce qu&apos;elle croit dur comme fer qu&apos;on rit plus fort ensemble que tout seul.
      <br /><br />
      Le soir, elle invente des scènes là où personne ne les attend : un club de paddle, une péniche, un bar new-yorkais… Ses soirées stand-up nomades sont devenues des rendez-vous où l&apos;on vient autant pour rigoler que pour partager un vrai moment humain.
      <br /><br />
      Macha, c&apos;est ce mélange unique : sensible mais piquante, drôle mais authentique, légère mais profonde. Bref, elle commence vos journées en sourire et les termine en éclat de rire.
    </>
  );

  const quote = "Chez moi, on rit fort, on vit vrai et on repart plus léger.";

  return (
    <div className="bg-zinc-900 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm uppercase mb-8 tracking-wider">
          <span className="text-gray-300">BEHIND THE </span>
          <span style={{ color: '#ffda65' }}>MIC</span>
        </h2>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img src="/asset/optimized_macha1.jpg" alt="MACHA DE RUYVER" className="w-full h-auto rounded-lg object-cover" />
            <img src="/asset/optimized_macha2.jpg" alt="MACHA DE RUYVER" className="w-full h-auto rounded-lg object-cover" />
            <img src="/asset/optimized_macha3.jpg" alt="MACHA DE RUYVER" className="w-full h-auto rounded-lg object-cover" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h3 className="text-5xl font-bold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>MACHA</h3>
          </div>
        </div>
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="text-left">
            <div className="relative mb-6">
                          <h3 className="text-4xl font-bold" style={{ 
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
              color: '#ffda65',
              opacity: 0.4
            }}>
                MACHA DE RUYVER
              </h3>
              <img 
                src="/asset/signature/Macha.png" 
                alt="MACHA DE RUYVER Signature" 
                className="absolute -top-8 left-0 h-16 object-contain"
              />
            </div>
            
            <p className="text-lg leading-relaxed text-gray-300 mb-6">
              {showFullStory ? fullText : shortText}
            </p>

            {showFullStory && (
              <div className="mb-6 p-6 bg-zinc-800 rounded-lg border-l-4" style={{ borderLeftColor: '#ffda65' }}>
                <p className="text-lg italic text-gray-200 text-center" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            )}
            
            <button 
              onClick={() => setShowFullStory(!showFullStory)}
              className="bg-transparent font-bold py-4 px-12 rounded-full border-2 uppercase tracking-wider transition-colors hover:bg-yellow-500 hover:text-black" 
              style={{ color: '#ffda65', borderColor: '#ffda65' }}
            >
              {showFullStory ? 'SHOW LESS' : 'FULL STORY'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const Footer = () => {
  const chezMachaLogo = '/LOGO.svg?v=1';
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState('');

  // Auto-clear message after 5 seconds
  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const success = await addNewsletterSubscriber(email, name);
      if (success) {
        setMessage('Merci ! Vous êtes maintenant inscrit à la newsletter.');
        setEmail('');
        setName('');
      } else {
        setMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    } catch {
      setMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-zinc-800 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-3xl font-bold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>SUBSCRIBE</h3>
            <p className="text-sm uppercase text-gray-400 mt-2 tracking-wider">TO OUR NEWSLETTER</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-zinc-700 text-white p-3 rounded-full w-full md:w-auto" 
            />
            <input 
              type="text" 
              placeholder="YOUR NAME" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-zinc-700 text-white p-3 rounded-full w-full md:w-auto" 
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="p-3 rounded-full transition-colors text-2xl" 
              style={{ backgroundColor: '#ffda65', color: '#000' }}
            >
              {isSubmitting ? '⏳' : '😊'}
            </button>
          </form>
        </div>
        
        {message && (
          <div className="mt-4 text-center">
            <p className={`text-sm ${message.includes('Merci') ? 'text-yellow-400' : 'text-red-400'}`}>
              {message}
            </p>
          </div>
        )}
        
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <img src={chezMachaLogo} alt="CHEZ MACHA Logo" className="w-8 h-8 rounded-full" />
            </div>
            <p className="text-sm text-gray-400 mt-4">2025 © CHEZ MACHA</p>
          </div>
          <nav className="mt-8 md:mt-0 flex flex-wrap justify-center md:justify-end space-x-4 text-sm uppercase tracking-wider">
            <a href="#" className="hover:text-gray-400">Home</a>
            <a href="#" className="hover:text-gray-400">Shows</a>
            <a href="#" className="hover:text-gray-400">Podcast</a>
            <a href="#" className="hover:text-gray-400">Blog</a>
            <a href="#" className="hover:text-gray-400">Booking</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="bg-zinc-900 text-white font-sans overflow-hidden">
      <Header />
      <HeroSection />
      <UpcomingShows />
      <PodcastSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default App;