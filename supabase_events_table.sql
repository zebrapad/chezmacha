-- Create events table for CHEZ MACHA website
-- Run this in your Supabase SQL editor

CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day INTEGER NOT NULL,
  month_year VARCHAR(20) NOT NULL,
  city VARCHAR(100) NOT NULL,
  venue_details TEXT NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('SOLD OUT', 'BUY TICKETS')),
  ticket_link VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO events (day, month_year, city, venue_details, status, ticket_link) VALUES
(8, 'DEC 2026', 'Montreal', 'Club Soda, Metropolis, L''Astral | Montreal, Canada', 'SOLD OUT', NULL),
(14, 'DEC 2026', 'Amsterdam', 'De Kleine Komedie, Theater Amsterdam | Amsterdam, The Netherlands', 'SOLD OUT', NULL),
(16, 'DEC 2026', 'New York City', 'Carnegie Hall, Apollo Theater | New York, USA', 'BUY TICKETS', 'https://example.com/tickets/nyc'),
(17, 'DEC 2026', 'Paris', 'Olympia, Le Divan du Monde, Le Trianon | Paris, France', 'BUY TICKETS', 'https://example.com/tickets/paris');

-- Create RLS policies (optional - for security)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON events
  FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete (if needed)
CREATE POLICY "Allow authenticated users to manage events" ON events
  FOR ALL USING (auth.role() = 'authenticated');
