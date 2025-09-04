import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      eventTitle, 
      eventDate, 
      eventPlace, 
      customerName, 
      customerEmail, 
      customerPhone, 
      numberOfTickets, 
      specialRequests 
    } = body;

    // Validate required fields
    if (!eventTitle || !eventDate || !eventPlace || !customerName || !customerEmail || !numberOfTickets) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Google Forms URL for ticket bookings
    const GOOGLE_FORM_ACTION_URL = process.env.GOOGLE_FORMS_TICKET_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSfYOUR_FORM_ID_HERE/formResponse';

    // Create FormData for Google Forms submission
    const formData = new FormData();
    
    // Map booking data to Google Forms entry IDs
    // You'll need to replace these with your actual Google Forms entry IDs
    formData.append('entry.1234567890', eventTitle); // Event Title
    formData.append('entry.1234567891', eventDate); // Event Date
    formData.append('entry.1234567892', eventPlace); // Event Place
    formData.append('entry.1234567893', customerName); // Customer Name
    formData.append('entry.1234567894', customerEmail); // Customer Email
    formData.append('entry.1234567895', customerPhone || ''); // Customer Phone
    formData.append('entry.1234567896', numberOfTickets.toString()); // Number of Tickets
    formData.append('entry.1234567897', specialRequests || ''); // Special Requests
    formData.append('entry.1234567898', new Date().toISOString()); // Timestamp

    // Submit to Google Forms
    const response = await fetch(GOOGLE_FORM_ACTION_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Required for Google Forms
    });

    console.log('Ticket booking submitted to Google Forms successfully');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Ticket booking submitted successfully! You will receive a confirmation email shortly.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

