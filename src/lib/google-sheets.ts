// Google Sheets API configuration
const GOOGLE_SHEETS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY || 'AIzaSyCwqEsj3IfcENysnDo245rN0EljdfspvNw';
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '1r8xo24j4nO6xccE9rQaf51cPG23kRoFub6VFN_cn7mk';
const RANGE = 'Events!A2:F'; // Assuming headers are in row 1, data starts from row 2

export interface Event {
  event_id: string;
  title: string;
  subtitle: string;
  date: string;
  place: string;
  guests: number;
  status: 'full' | 'not yet';
  flag_active: boolean;
}

export interface NewsletterSubscriber {
  email: string;
  name: string;
  date: string;
}

export async function fetchEventsFromGoogleSheets(): Promise<Event[]> {
  if (!GOOGLE_SHEETS_API_KEY || !SPREADSHEET_ID) {
    console.error('Google Sheets API key or Spreadsheet ID not configured');
    return [];
  }

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${GOOGLE_SHEETS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const rows = data.values || [];

    const events = rows.map((row: string[], index: number) => ({
      event_id: (index + 1).toString(),
      title: row[0] || '',
      subtitle: row[1] || '',
      date: row[2] || '',
      place: row[3] || '',
      guests: parseInt(row[4]) || 0,
      status: (row[5] || 'not yet') as 'full' | 'not yet',
      flag_active: true, // Default to true for all events
    }));

    return events;
  } catch (error) {
    console.error('Error fetching events from Google Sheets:', error);
    return [];
  }
}

// Get events from Google Sheets or fallback to mock data
export async function getEvents(): Promise<Event[]> {
  try {
    const events = await fetchEventsFromGoogleSheets();
    if (events.length > 0) {
      return events;
    }
  } catch (error) {
    console.error('Failed to fetch from Google Sheets, using mock data:', error);
  }
  
  // Fallback to mock data
  return getMockEvents();
}

// Mock data as fallback
export function getMockEvents(): Event[] {
  return [
    // Upcoming shows
    {
      event_id: '1',
      title: 'TENNIS CHURCHILL',
      subtitle: 'Festival rire & bbq',
      date: '2025-09-04',
      place: 'Tennis Churchill, France',
      guests: 100,
      status: 'not yet',
      flag_active: true,
    },
    {
      event_id: '2',
      title: 'CÔTÉ MEUSE',
      subtitle: 'Stand up & spaguettis',
      date: '2025-09-18',
      place: 'Côte Meuse, France',
      guests: 80,
      status: 'not yet',
      flag_active: true,
    },
    {
      event_id: '3',
      title: 'WINE CLUB',
      subtitle: 'Stand up & cheese & wine',
      date: '2025-09-19',
      place: 'Wine Club, France',
      guests: 60,
      status: 'not yet',
      flag_active: true,
    },
    {
      event_id: '4',
      title: 'ALICE BAR',
      subtitle: 'Stand-up & Planchas & Cocktails',
      date: '2025-09-25',
      place: 'Alice Bar, France',
      guests: 90,
      status: 'not yet',
      flag_active: true,
    },
    // Past events for Événements passés section
    {
      event_id: '5',
      title: 'TENNIS CHURCHILL',
      subtitle: 'Festival rire & bbq',
      date: '2024-09-04',
      place: 'Tennis Churchill, France',
      guests: 100,
      status: 'full',
      flag_active: true,
    },
    {
      event_id: '6',
      title: 'CÔTÉ MEUSE',
      subtitle: 'Stand up & spaguettis',
      date: '2024-09-18',
      place: 'Côte Meuse, France',
      guests: 80,
      status: 'full',
      flag_active: true,
    },
    {
      event_id: '7',
      title: 'WINE CLUB',
      subtitle: 'Stand up & cheese & wine',
      date: '2024-09-19',
      place: 'Wine Club, France',
      guests: 60,
      status: 'full',
      flag_active: true,
    },
    {
      event_id: '8',
      title: 'ALICE BAR',
      subtitle: 'Stand-up & Planchas & Cocktails',
      date: '2024-09-25',
      place: 'Alice Bar, France',
      guests: 90,
      status: 'full',
      flag_active: true,
    },
  ];
}

// Google Forms URLs for different purposes
const NEWSLETTER_FORM_ACTION_URL = 'https://docs.google.com/forms/d/1AwApLoKivWAF0xX9XnfR_c06S7DXY7KrV4fnCVpmuTo/formResponse';
const TICKET_BOOKING_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfYOUR_FORM_ID_HERE/formResponse';

// Local storage solution for newsletter subscribers
export async function addNewsletterSubscriber(email: string, name: string): Promise<boolean> {
  try {
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const timestamp = new Date().toISOString();
    
    console.log('Adding newsletter subscriber:', { email, name, currentDate });
    
    // Create subscriber object
    const subscriber = {
      email,
      name,
      date: currentDate,
      timestamp,
      id: Date.now() // Unique ID
    };
    
    // Get existing subscribers from localStorage
    const existingSubscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    
    // Check if email already exists
    const emailExists = existingSubscribers.some((sub: any) => sub.email.toLowerCase() === email.toLowerCase());
    
    if (emailExists) {
      console.log('Email already exists in newsletter list');
      return true; // Still return true to show success
    }
    
    // Add new subscriber
    existingSubscribers.push(subscriber);
    
    // Save to localStorage
    localStorage.setItem('newsletter_subscribers', JSON.stringify(existingSubscribers));
    
    console.log('Newsletter subscriber saved successfully:', subscriber);
    console.log('Total subscribers:', existingSubscribers.length);
    
    // Also try to submit to Google Form (as backup)
    try {
      const formData = new FormData();
      formData.append('entry.2005620554', email);
      formData.append('entry.1065046570', name);
      
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      console.log('Also submitted to Google Form');
    } catch (formError) {
      console.log('Google Form submission failed, but data saved locally');
    }
    
    return true;
    
  } catch (error) {
    console.error('Error adding newsletter subscriber:', error);
    return false;
  }
}

// Function to get all newsletter subscribers (for admin use)
export function getNewsletterSubscribers() {
  try {
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    console.log('All newsletter subscribers:', subscribers);
    return subscribers;
  } catch (error) {
    console.error('Error getting newsletter subscribers:', error);
    return [];
  }
}

// Function to export subscribers as CSV
export function exportNewsletterSubscribers() {
  try {
    const subscribers = getNewsletterSubscribers();
    
    if (subscribers.length === 0) {
      console.log('No subscribers to export');
      return;
    }
    
    // Create CSV content
    const headers = 'Email,Name,Date,Timestamp\n';
    const csvContent = headers + subscribers.map((sub: any) => 
      `"${sub.email}","${sub.name}","${sub.date}","${sub.timestamp}"`
    ).join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log('Newsletter subscribers exported as CSV');
  } catch (error) {
    console.error('Error exporting newsletter subscribers:', error);
  }
}

// Interface for ticket booking data
export interface TicketBooking {
  eventTitle: string;
  eventDate: string;
  eventPlace: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  numberOfTickets: number;
  specialRequests?: string;
  timestamp: string;
}

// Function to submit ticket booking to Google Forms
export async function submitTicketBooking(booking: TicketBooking): Promise<boolean> {
  try {
    console.log('Submitting ticket booking to Google Forms:', booking);
    
    // Create FormData for Google Forms submission
    const formData = new FormData();
    
    // Map booking data to Google Forms entry IDs
    // You'll need to replace these with your actual Google Forms entry IDs
    formData.append('entry.1234567890', booking.eventTitle); // Event Title
    formData.append('entry.1234567891', booking.eventDate); // Event Date
    formData.append('entry.1234567892', booking.eventPlace); // Event Place
    formData.append('entry.1234567893', booking.customerName); // Customer Name
    formData.append('entry.1234567894', booking.customerEmail); // Customer Email
    formData.append('entry.1234567895', booking.customerPhone || ''); // Customer Phone
    formData.append('entry.1234567896', booking.numberOfTickets.toString()); // Number of Tickets
    formData.append('entry.1234567897', booking.specialRequests || ''); // Special Requests
    formData.append('entry.1234567898', booking.timestamp); // Timestamp
    
    // Submit to Google Forms
    const response = await fetch(TICKET_BOOKING_FORM_ACTION_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Required for Google Forms
    });
    
    console.log('Ticket booking submitted to Google Forms successfully');
    
    // Also save locally as backup
    const existingBookings = JSON.parse(localStorage.getItem('ticket_bookings') || '[]');
    existingBookings.push({
      ...booking,
      id: Date.now(),
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('ticket_bookings', JSON.stringify(existingBookings));
    
    return true;
    
  } catch (error) {
    console.error('Error submitting ticket booking:', error);
    
    // Save locally even if Google Forms fails
    try {
      const existingBookings = JSON.parse(localStorage.getItem('ticket_bookings') || '[]');
      existingBookings.push({
        ...booking,
        id: Date.now(),
        submittedAt: new Date().toISOString(),
        googleFormsFailed: true
      });
      localStorage.setItem('ticket_bookings', JSON.stringify(existingBookings));
      console.log('Booking saved locally as backup');
    } catch (localError) {
      console.error('Failed to save booking locally:', localError);
    }
    
    return false;
  }
}

// Function to get all ticket bookings (for admin use)
export function getTicketBookings(): TicketBooking[] {
  try {
    const bookings = JSON.parse(localStorage.getItem('ticket_bookings') || '[]');
    console.log('All ticket bookings:', bookings);
    return bookings;
  } catch (error) {
    console.error('Error getting ticket bookings:', error);
    return [];
  }
}

// Function to export ticket bookings as CSV
export function exportTicketBookings() {
  try {
    const bookings = getTicketBookings();
    
    if (bookings.length === 0) {
      console.log('No ticket bookings to export');
      return;
    }
    
    // Create CSV content
    const headers = 'Event Title,Event Date,Event Place,Customer Name,Customer Email,Customer Phone,Number of Tickets,Special Requests,Timestamp,Submitted At\n';
    const csvContent = headers + bookings.map((booking: any) => 
      `"${booking.eventTitle}","${booking.eventDate}","${booking.eventPlace}","${booking.customerName}","${booking.customerEmail}","${booking.customerPhone || ''}","${booking.numberOfTickets}","${booking.specialRequests || ''}","${booking.timestamp}","${booking.submittedAt}"`
    ).join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket_bookings_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log('Ticket bookings exported as CSV');
  } catch (error) {
    console.error('Error exporting ticket bookings:', error);
  }
}
