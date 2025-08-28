'use client';

import React from 'react';
import { GlareCard } from '@/components/ui/glare-card';
import ImageCarousel from '@/components/ui/image-carousel';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { getMockEvents, type Event } from '@/lib/google-sheets';

const Header = () => (
  <header className="fixed top-8 left-0 w-full flex justify-between items-center px-8 z-50">
    <div className="flex items-center space-x-3">
      <img 
        src="/LOGO.svg?v=1" 
        alt="CHEZ MACHA Logo" 
        className="h-10 w-10 rounded-full object-cover"
      />
      <span className="text-2xl font-bold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>CHEZ MACHA</span>
    </div>
    <nav className="hidden lg:flex space-x-8 text-sm uppercase tracking-wider">
      <a href="#" className="hover:text-gray-300 transition-colors font-semibold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>Shows</a>
      <a href="#" className="hover:text-gray-300 transition-colors font-semibold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>Podcast</a>
      <a href="#" className="hover:text-gray-300 transition-colors font-semibold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>About</a>
      <a href="#" className="hover:text-gray-300 transition-colors font-semibold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>Blog</a>
      <a href="#" className="hover:text-gray-300 transition-colors font-semibold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>Booking</a>
      <a href="#" className="hover:text-gray-300 transition-colors font-semibold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>Shop</a>
      <a href="#" className="hover:text-gray-300 transition-colors font-semibold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>Pages</a>
    </nav>
    <div className="flex space-x-4 text-white">
      <a href="#" aria-label="Facebook" className="hover:text-gray-300 transition-colors">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>
      <a href="#" aria-label="Twitter" className="hover:text-gray-300 transition-colors">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
      </a>
      <a href="#" aria-label="YouTube" className="hover:text-gray-300 transition-colors">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
    </div>
  </header>
);

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
    city: string;
    venue: string;
    status: string;
    link: string | undefined;
  }>>([]);

  React.useEffect(() => {
    const events = getMockEvents();
    const today = new Date();
    
    // Filter upcoming events (from today onwards)
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && event.flag_active;
    }).slice(0, 4); // Get first 4 upcoming events

    const formattedShows = upcomingEvents.map((event: Event) => {
      const eventDate = new Date(event.date);
      const day = eventDate.getDate().toString().padStart(2, '0');
      const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      const year = eventDate.getFullYear();
      
      // Extract city from place (assuming format: "Venue | City, Country")
      const placeParts = event.place.split('|');
      const city = placeParts.length > 1 ? placeParts[1].trim().split(',')[0].trim() : event.place;
      
      return {
        day,
        monthYear: `${month} ${year}`,
        city,
        venue: event.place,
        status: event.status === 'full' ? 'SOLD OUT' : 'BUY TICKETS',
        link: event.status === 'full' ? undefined : '#',
      };
    });

    setUpcomingShows(formattedShows);
  }, []);

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
          {upcomingShows.map((show, index) => (
            <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-zinc-700 last:border-b-0 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300 rounded-lg px-4 -mx-4">
              <div className="flex items-center space-x-8 w-full md:w-auto">
                <div className="flex flex-col items-center">
                  <span className="text-5xl font-light" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>{show.day}</span>
                  <span className="text-sm text-gray-400 uppercase tracking-wider">{show.monthYear}</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>{show.city}</h3>
                  <p className="text-gray-400 text-sm mt-2">{show.venue}</p>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                {show.status === 'SOLD OUT' ? (
                  <span className="bg-red-600 text-white font-bold py-3 px-8 rounded-full text-sm uppercase tracking-wider">
                    {show.status}
                  </span>
                ) : (
                  <a href={show.link} className="bg-transparent font-bold py-3 px-8 rounded-full text-sm uppercase tracking-wider border-2 transition-colors" style={{ color: '#ffda65', borderColor: '#ffda65' }}>
                    {show.status}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <button className="bg-transparent font-bold py-4 px-12 rounded-full border-2 uppercase tracking-wider transition-colors" style={{ color: '#ffda65', borderColor: '#ffda65' }}>
            ALL SHOWS
          </button>
        </div>
      </div>
    </div>
  );
};

const PodcastSection = () => {
  // Create event data for the bento grid
  const events = [
    {
      name: 'TENNIS CHURCHILL',
      description: 'Festival rire & bbq',
      background: <img src="/asset/event/optimized_Stand Up Comedy Show-251.jpg" alt="Tennis Churchill" className="h-full w-full object-cover" />,
      className: 'col-span-3',
      href: '#',
      cta: 'View Event'
    },
    {
      name: 'CÔTÉ MEUSE',
      description: 'Stand up & spaguettis',
      background: <img src="/asset/event/optimized_Stand Up Comedy Show-146.jpg" alt="Côte Meuse" className="h-full w-full object-cover" />,
      className: 'col-span-1',
      href: '#',
      cta: 'View Event'
    },
    {
      name: 'WINE CLUB',
      description: 'Stand up & cheese & wine',
      background: <img src="/asset/event/optimized_Stand Up Comedy Show-78.jpg" alt="Wine Club" className="h-full w-full object-cover" />,
      className: 'col-span-1',
      href: '#',
      cta: 'View Event'
    },
    {
      name: 'ALICE BAR',
      description: 'Stand-up & Planchas & Cocktails',
      background: <img src="/asset/event/optimized_Stand Up Comedy Show-43.jpg" alt="Alice Bar" className="h-full w-full object-cover" />,
      className: 'col-span-1',
      href: '#',
      cta: 'View Event'
    },
    {
      name: 'COMEDY NIGHT',
      description: 'Stand up & cocktails',
      background: <img src="/asset/event/optimized_Stand Up Comedy Show-251.jpg" alt="Comedy Night" className="h-full w-full object-cover" />,
      className: 'col-span-2',
      href: '#',
      cta: 'View Event'
    },
    {
      name: 'LAUGHTER CLUB',
      description: 'Comedy & wine tasting',
      background: <img src="/asset/event/optimized_Stand Up Comedy Show-146.jpg" alt="Laughter Club" className="h-full w-full object-cover" />,
      className: 'col-span-1',
      href: '#',
      cta: 'View Event'
    },
    {
      name: 'FUNNY FRIDAY',
      description: 'Stand up & tapas',
      background: <img src="/asset/event/optimized_Stand Up Comedy Show-78.jpg" alt="Funny Friday" className="h-full w-full object-cover" />,
      className: 'col-span-2',
      href: '#',
      cta: 'View Event'
    },
    {
      name: 'COMEDY CAFE',
      description: 'Stand up & coffee',
      background: <img src="/asset/event/optimized_Stand Up Comedy Show-43.jpg" alt="Comedy Cafe" className="h-full w-full object-cover" />,
      className: 'col-span-1',
      href: '#',
      cta: 'View Event'
    },
    {
      name: 'LAUGH LOUNGE',
      description: 'Comedy & cocktails',
      background: <img src="/asset/event/optimized_Stand Up Comedy Show-251.jpg" alt="Laugh Lounge" className="h-full w-full object-cover" />,
      className: 'col-span-1',
      href: '#',
      cta: 'View Event'
    },
    {
      name: 'HUMOR HAVEN',
      description: 'Stand up & desserts',
      background: <img src="/asset/event/optimized_Stand Up Comedy Show-146.jpg" alt="Humor Haven" className="h-full w-full object-cover" />,
      className: 'col-span-3',
      href: '#',
      cta: 'View Event'
    },
  ];

  // Simple icon component for the bento cards
  const EventIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className="bg-zinc-900 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-12" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', color: '#ffda65' }}>
          ÉVÉNEMENTS PASSÉS
        </h2>
        <BentoGrid className="grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event, index) => (
            <BentoCard
              key={index}
              name={event.name}
              description={event.description}
              background={event.background}
              Icon={EventIcon}
              className={event.className}
              href={event.href}
              cta={event.cta}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

const AboutSection = () => (
  <div className="bg-zinc-900 py-16 px-8">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-sm uppercase text-gray-500 mb-8 tracking-wider">BEHIND THE MIC</h2>
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
            <h3 className="text-4xl font-bold text-orange-400" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>
              MACHA DE RUYVER
            </h3>
            <img 
              src="/asset/signature/Macha.png" 
              alt="MACHA DE RUYVER Signature" 
              className="absolute -top-8 left-0 h-16 object-contain"
            />
          </div>
          
          <p className="text-lg leading-relaxed text-gray-300 mb-6">
            MACHA DE RUYVER&apos;s life has been a tale of excess and indulgence.
          </p>
          <p className="text-lg leading-relaxed text-gray-300 mb-8">
            Despite her hardships, Ms. DE RUYVER has one of the most fulfilling careers of any standup comedian, and she is always in the conversation with all the great times.
          </p>
          
          <button className="bg-transparent font-bold py-4 px-12 rounded-full border-2 uppercase tracking-wider transition-colors" style={{ color: '#ffda65', borderColor: '#ffda65' }}>
            FULL STORY
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => {
  const chezMachaLogo = '/LOGO.svg?v=1';

  return (
    <footer className="bg-zinc-800 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-3xl font-bold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>SUBSCRIBE</h3>
            <p className="text-sm uppercase text-gray-400 mt-2 tracking-wider">TO OUR NEWSLETTER</p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <input type="email" placeholder="YOUR EMAIL" className="bg-zinc-700 text-white p-3 rounded-full w-full md:w-auto" />
            <input type="text" placeholder="YOUR NAME" className="bg-zinc-700 text-white p-3 rounded-full w-full md:w-auto" />
            <button className="p-3 rounded-full transition-colors" style={{ backgroundColor: '#ffda65', color: '#000' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5M15 6.75v10.5M3.75 6.75h1.5m10.5 0h1.5m1.5 6.75h1.5m-1.5 0h-9.75m1.5-6.75h9.75M18.75 6.75v-1.5m0 12v-1.5" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <img src={chezMachaLogo} alt="CHEZ MACHA Logo" className="w-8 h-8 rounded-full" />
              <span className="text-xl font-bold" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>CHEZ MACHA</span>
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
