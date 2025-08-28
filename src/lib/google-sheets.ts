// Google Sheets API configuration
const GOOGLE_SHEETS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
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

    return rows.map((row: any[], index: number) => ({
      event_id: (index + 1).toString(),
      title: row[0] || '',
      subtitle: row[1] || '',
      date: row[2] || '',
      place: row[3] || '',
      guests: parseInt(row[4]) || 0,
      status: (row[5] || 'not yet') as 'full' | 'not yet',
      flag_active: true, // Default to true for all events
    }));
  } catch (error) {
    console.error('Error fetching events from Google Sheets:', error);
    return [];
  }
}

// For now, return mock data until Google Sheets is configured
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
