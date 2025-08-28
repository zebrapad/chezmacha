import React from 'react';

// MARKER: START HeaderComponent
const Header = () => (
  <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-10">
    <div className="flex items-center space-x-2">
      <div className="h-8 w-8 bg-white rounded-full"></div>
      <span className="text-xl font-bold font-['Inter']">STANDUP</span>
    </div>
    <nav className="hidden lg:flex space-x-8 text-sm uppercase">
      <a href="#" className="hover:text-gray-400">Shows</a>
      <a href="#" className="hover:text-gray-400">Podcast</a>
      <a href="#" className="hover:text-gray-400">About</a>
      <a href="#" className="hover:text-gray-400">Blog</a>
      <a href="#" className="hover:text-gray-400">Booking</a>
      <a href="#" className="hover:text-gray-400">Shop</a>
      <a href="#" className="hover:text-gray-400">Pages</a>
    </nav>
    <div className="flex space-x-4 text-white">
      <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
      <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
      <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
    </div>
  </header>
);
// MARKER: END HeaderComponent

// MARKER: START HeroSection
const HeroSection = () => (
  <div className="relative h-[800px] w-full">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x800/222222/cccccc?text=Live+Standup+Comedy+Show')" }}></div>
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl">
      <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
        {/* Mock Video Player */}
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-400 text-2xl">Video Player</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-gray-400 mt-4">
        <div className="flex items-center space-x-4">
          <button aria-label="Previous" className="hover:text-white"><i className="fas fa-backward"></i></button>
          <button aria-label="Play" className="hover:text-white text-3xl"><i className="fas fa-play"></i></button>
          <button aria-label="Next" className="hover:text-white"><i className="fas fa-forward"></i></button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">0:24</span>
          <div className="h-1 bg-gray-500 rounded-full w-48">
            <div className="h-full bg-red-500 w-1/4"></div>
          </div>
          <span className="text-sm">5:24</span>
          <button aria-label="Volume" className="hover:text-white"><i className="fas fa-volume-up"></i></button>
        </div>
      </div>
    </div>
  </div>
);
// MARKER: END HeroSection

// MARKER: START UpcomingShows
const UpcomingShows = () => {
  const upcomingShows = [
    {
      date: '08',
      city: 'Montreal',
      venue: 'Club Soda, Metropolis, L\'Astral | Montreal, Canada',
      status: 'SOLD OUT',
    },
    {
      date: '14',
      city: 'Amsterdam',
      venue: 'De Kleine Komedie, Theater Amsterdam | Amsterdam, The Netherlands',
      status: 'SOLD OUT',
    },
    {
      date: '16',
      city: 'New York City',
      venue: 'Carnegie Hall, Apollo Theater | New York, USA',
      status: 'BUY TICKETS',
      link: '#',
    },
    {
      date: '17',
      city: 'Paris',
      venue: 'Olympia, Le Divan du Monde, Le Trianon | Paris, France',
      status: 'BUY TICKETS',
      link: '#',
    },
  ];

  return (
    <div className="bg-zinc-900 py-16 px-4 md:px-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center md:text-left">
        JAMES MADDISSON
        <span className="block text-red-500 text-base md:text-xl font-normal mt-2">UPCOMING SHOWS</span>
      </h2>
      <div className="mt-8">
        {upcomingShows.map((show, index) => (
          <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-zinc-700 last:border-b-0">
            <div className="flex items-center space-x-6 w-full md:w-auto">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-light text-red-500">{show.date}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{show.city}</h3>
                <p className="text-gray-400 text-sm mt-1">{show.venue}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:w-auto">
              {show.status === 'SOLD OUT' ? (
                <span className="bg-red-500 text-white font-bold py-2 px-6 rounded-full text-sm">
                  {show.status}
                </span>
              ) : (
                <a href={show.link} className="bg-black text-white font-bold py-2 px-6 rounded-full text-sm border-2 border-white hover:bg-white hover:text-black transition-colors">
                  {show.status}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center md:text-left">
        <button className="bg-black text-white font-bold py-4 px-12 rounded-full border-2 border-white hover:bg-white hover:text-black transition-colors">
          ALL SHOWS
        </button>
      </div>
    </div>
  );
};
// MARKER: END UpcomingShows

// MARKER: START PodcastSection
const PodcastSection = () => {
  const podcastEpisodes = [
    {
      title: 'Podcast 127 - Conspiracy Theories Pt. 2',
      views: '7.8k views',
      duration: '4:39',
      thumbnailUrl: 'https://placehold.co/400x225/333333/ffffff?text=Video+1',
      podcastName: 'Conspiracy Theories Pt. 2',
    },
    {
      title: 'Podcast 129 - Logan Paul',
      views: '3.4k views',
      duration: '7:46',
      thumbnailUrl: 'https://placehold.co/400x225/444444/ffffff?text=Video+2',
      podcastName: 'Logan Paul',
    },
    {
      title: 'Podcast 132 - When a Celebrity, Lil Wayne, Sucks At standup',
      views: '7.8k views',
      duration: '8:42',
      thumbnailUrl: 'https://placehold.co/400x225/555555/ffffff?text=Video+3',
      podcastName: 'Celebrity',
    },
    {
      title: 'Podcast 140 - 5 Steps To How To Start A Podcast',
      views: '390.4k views',
      duration: '3:58',
      thumbnailUrl: 'https://placehold.co/400x225/666666/ffffff?text=Video+4',
      podcastName: 'Start A Podcast',
    },
    {
      title: 'Show & Tell 109 - A Good Show & Tell',
      views: '320k views',
      duration: '11:3k',
      thumbnailUrl: 'https://placehold.co/400x225/777777/ffffff?text=Video+5',
      podcastName: 'Show & Tell',
    },
    {
      title: 'Talk Show 101 - 3 YouTube Networks',
      views: '280.3k views',
      duration: '5:4k',
      thumbnailUrl: 'https://placehold.co/400x225/888888/ffffff?text=Video+6',
      podcastName: 'YouTube Networks',
    },
  ];

  const podcastLogo = 'https://placehold.co/60x60/000000/ffffff?text=PODCAST';

  return (
    <div className="bg-zinc-900 py-16 px-4 md:px-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center md:text-left">
          WATCH PODCAST
        </h2>
        <button className="mt-4 md:mt-0 bg-red-500 text-white font-bold py-3 px-6 rounded-full">
          <i className="fab fa-youtube mr-2"></i> SUBSCRIBE TO OUR CHANNEL
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {podcastEpisodes.map((episode, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg">
            <img src={episode.thumbnailUrl} alt={episode.title} className="w-full h-auto rounded-lg" />
            <div className="absolute top-0 right-0 p-2 m-2 bg-black bg-opacity-70 text-sm rounded-md">
              {episode.duration}
            </div>
            <div className="absolute top-0 left-0 p-2 m-2">
              <img src={podcastLogo} alt="Podcast Logo" className="w-8 h-8 rounded-full" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{episode.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{episode.views}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center md:text-left">
        <button className="bg-black text-white font-bold py-4 px-12 rounded-full border-2 border-white hover:bg-white hover:text-black transition-colors">
          MORE EPISODES
        </button>
      </div>
    </div>
  );
};
// MARKER: END PodcastSection

// MARKER: START AboutSection
const AboutSection = () => (
  <div className="bg-zinc-900 py-16 px-4 md:px-16">
    <h2 className="text-sm uppercase text-gray-500 mb-8">BEHIND THE MIC</h2>
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <img src="https://placehold.co/600x600/1e1e1e/333333?text=James+Maddisson" alt="James Maddisson" className="w-full h-auto rounded-lg" />
        <img src="https://placehold.co/600x600/2e2e2e/444444?text=James+Maddisson" alt="James Maddisson" className="w-full h-auto rounded-lg" />
        <img src="https://placehold.co/600x600/3e3e3e/555555?text=James+Maddisson" alt="James Maddisson" className="w-full h-auto rounded-lg" />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h3 className="text-5xl font-bold">JAMES</h3>
      </div>
    </div>
    <div className="mt-8 max-w-2xl mx-auto text-center">
      <p className="text-lg leading-relaxed">
        James's life has been a tale of excess and indulgence. Despite his hardships, Mr. Maddisson has one of the most fulfilling careers of any standup comedian, and he is always in the conversation with all the great times.
      </p>
      <button className="mt-8 bg-black text-white font-bold py-4 px-12 rounded-full border-2 border-white hover:bg-white hover:text-black transition-colors">
        FULL STORY
      </button>
    </div>
  </div>
);
// MARKER: END AboutSection

// MARKER: START FooterComponent
const Footer = () => {
  const standupLogo = 'https://placehold.co/60x60/000000/ffffff?text=STANDUP';

  return (
    <footer className="bg-zinc-800 py-16 px-4 md:px-16">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-3xl font-bold font-['Inter']">SUBSCRIBE</h3>
          <p className="text-sm uppercase text-gray-400 mt-2">TO OUR NEWSLETTER</p>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <input type="email" placeholder="YOUR EMAIL" className="bg-zinc-700 text-white p-3 rounded-full w-full md:w-auto" />
          <input type="text" placeholder="YOUR NAME" className="bg-zinc-700 text-white p-3 rounded-full w-full md:w-auto" />
          <button className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5M15 6.75v10.5M3.75 6.75h1.5m10.5 0h1.5m1.5 6.75h1.5m-1.5 0h-9.75m1.5-6.75h9.75M18.75 6.75v-1.5m0 12v-1.5" />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div className="flex items-center space-x-2">
            <img src={standupLogo} alt="Standup Logo" className="w-8 h-8 rounded-full" />
            <span className="text-xl font-bold">STANDUP</span>
          </div>
          <p className="text-sm text-gray-400 mt-4">2024 © YOUR COMPANY. WORDPRESS THEME BY SONAAR.IO</p>
        </div>
        <nav className="mt-8 md:mt-0 flex flex-wrap justify-center md:justify-end space-x-4 text-sm uppercase">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">Shows</a>
          <a href="#" className="hover:text-gray-400">Podcast</a>
          <a href="#" className="hover:text-gray-400">Blog</a>
          <a href="#" className="hover:text-gray-400">Booking</a>
        </nav>
      </div>
    </footer>
  );
};
// MARKER: END FooterComponent

// MARKER: START HomePageComponent
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
// MARKER: END HomePageComponent
