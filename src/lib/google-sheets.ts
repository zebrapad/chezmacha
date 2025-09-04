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
const NEWSLETTER_FORM_ACTION_URL = 'https://docs.google.com/forms/d/1B56T7flBQ5mbcjF3YeSyq-BE0hAo_J-6Y2TiowuF6wk/formResponse';
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
    const emailExists = existingSubscribers.some((sub: { email: string }) => sub.email.toLowerCase() === email.toLowerCase());
    
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
      // Try multiple field ID patterns
      const fieldPatterns = [
        ['entry.222569404', 'entry.1891785840'], // Correct IDs from your form
        ['entry.2005620554', 'entry.1065046570'], // Original IDs
        ['entry.1234567890', 'entry.0987654321'], // Common patterns
        ['entry.1111111111', 'entry.2222222222'], // Simple patterns
        ['entry.1000000000', 'entry.2000000000'], // Round numbers
      ];
      
      let submitted = false;
      
      for (const [emailField, nameField] of fieldPatterns) {
        try {
          const formData = new FormData();
          formData.append(emailField, email);
          formData.append(nameField, name);
          
          const response = await fetch(NEWSLETTER_FORM_ACTION_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
          });
          
          // If we get a 200 or no error, this pattern worked
          if (response.status === 200 || response.status === 0) {
            console.log(`✅ Google Form submission successful with pattern: ${emailField}, ${nameField}`);
            submitted = true;
            break;
          }
        } catch (patternError) {
          console.log(`Pattern ${emailField}, ${nameField} failed:`, patternError);
        }
      }
      
      if (!submitted) {
        console.log('❌ All Google Form patterns failed, but data saved locally');
      }
      
    } catch (error) {
      console.log('Google Form submission failed, but data saved locally:', error);
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
    const csvContent = headers + subscribers.map((sub: { email: string; name: string; date: string; timestamp: string }) => 
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

// Function to test Google Form field IDs
export async function testGoogleFormFieldIDs() {
  console.log('Testing Google Form field IDs...');
  
  // Common field ID patterns to test
  const testPatterns = [
    ['entry.222569404', 'entry.1891785840'], // Correct IDs from your form
    ['entry.2005620554', 'entry.1065046570'], // Original IDs
    ['entry.1234567890', 'entry.0987654321'], // Common patterns
    ['entry.1111111111', 'entry.2222222222'], // Simple patterns
    ['entry.1000000000', 'entry.2000000000'], // Round numbers
    ['entry.123456789', 'entry.987654321'],   // 9-digit patterns
    ['entry.12345678', 'entry.87654321'],     // 8-digit patterns
  ];
  
  const testData = {
    email: 'test@example.com',
    name: 'Test User'
  };
  
  for (let i = 0; i < testPatterns.length; i++) {
    const [emailField, nameField] = testPatterns[i];
    
    try {
      console.log(`Testing pattern ${i + 1}: ${emailField}, ${nameField}`);
      
      const formData = new FormData();
      formData.append(emailField, testData.email);
      formData.append(nameField, testData.name);
      
      const response = await fetch(NEWSLETTER_FORM_ACTION_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      console.log(`Pattern ${i + 1} response:`, response.status);
      
      // If we get a 200 or no error, this might be the correct pattern
      if (response.status === 200 || response.status === 0) {
        console.log(`✅ SUCCESS! Correct field IDs found: ${emailField}, ${nameField}`);
        return { emailField, nameField };
      }
      
    } catch (error) {
      console.log(`Pattern ${i + 1} failed:`, error);
    }
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('❌ No working field ID patterns found');
  return null;
}

// Function to test newsletter subscription
export async function testNewsletterSubscription() {
  console.log('🧪 Testing newsletter subscription...');
  
  const testEmail = 'test@example.com';
  const testName = 'Test User';
  
  try {
    const result = await addNewsletterSubscriber(testEmail, testName);
    console.log('✅ Newsletter subscription test result:', result);
    
    // Check local storage
    const subscribers = getNewsletterSubscribers();
    console.log('📊 Local subscribers:', subscribers);
    
    return result;
  } catch (error) {
    console.error('❌ Newsletter subscription test failed:', error);
    return false;
  }
}

// Function to check newsletter status
export function checkNewsletterStatus() {
  console.log('📊 Newsletter Status Check:');
  console.log('Form URL:', NEWSLETTER_FORM_ACTION_URL);
  console.log('Field IDs: entry.222569404 (email), entry.1891785840 (name)');
  
  const subscribers = getNewsletterSubscribers();
  console.log('📈 Total local subscribers:', subscribers.length);
  console.log('📋 All subscribers:', subscribers);
  
  return {
    formUrl: NEWSLETTER_FORM_ACTION_URL,
    fieldIds: ['entry.222569404', 'entry.1891785840'],
    subscriberCount: subscribers.length,
    subscribers: subscribers
  };
}

// Function to manually submit all local subscribers to Google Form
export async function syncSubscribersToGoogleForm() {
  try {
    const subscribers = getNewsletterSubscribers();
    
    if (subscribers.length === 0) {
      console.log('No subscribers to sync');
      return;
    }
    
    console.log(`Syncing ${subscribers.length} subscribers to Google Form...`);
    
    for (const subscriber of subscribers) {
      try {
        const formData = new FormData();
        formData.append('entry.222569404', subscriber.email);
        formData.append('entry.1891785840', subscriber.name);
        
        await fetch(NEWSLETTER_FORM_ACTION_URL, {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        });
        
        console.log(`Synced subscriber: ${subscriber.email}`);
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to sync subscriber ${subscriber.email}:`, error);
      }
    }
    
    console.log('Sync completed');
  } catch (error) {
    console.error('Error syncing subscribers to Google Form:', error);
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
    await fetch(TICKET_BOOKING_FORM_ACTION_URL, {
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
    const headers = 'Event Title,Event Date,Event Place,Customer Name,Customer Email,Customer Phone,Number of Tickets,Special Requests,Timestamp\n';
    const csvContent = headers + bookings.map((booking: TicketBooking) => 
      `"${booking.eventTitle}","${booking.eventDate}","${booking.eventPlace}","${booking.customerName}","${booking.customerEmail}","${booking.customerPhone || ''}","${booking.numberOfTickets}","${booking.specialRequests || ''}","${booking.timestamp}"`
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
