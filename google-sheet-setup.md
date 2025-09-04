# Google Sheets Setup for CHEZ MACHA Events

## Create a Google Sheet with this structure:

### Sheet Name: "Events"
### Headers (Row 1):
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| event_id | title | subtitle | date | place | guests | status | flag_active |

### Data (Rows 2-11):

**Upcoming Shows:**
| 1 | TENNIS CHURCHILL | Festival Rire & BBQ | 2025-09-04 | Tennis Churchill, France | 100 | not yet | TRUE |
| 2 | CÔTÉ MEUSE | Stand up & spaguettis | 2025-09-18 | Côte Meuse, France | 80 | not yet | TRUE |
| 3 | WINE CLUB | Stand up & cheese & wine | 2025-09-19 | Wine Club, France | 60 | not yet | TRUE |
| 4 | ALICE BAR | Stand-up & Planchas & Cocktails | 2025-09-25 | Alice Bar, France | 90 | not yet | TRUE |

**Past Events:**
| 5 | TENNIS CHURCHILL | Festival rire & bbq | 2024-09-04 | Tennis Churchill, France | 100 | full | FALSE |
| 6 | CÔTÉ MEUSE | Stand up & spaguettis | 2024-09-18 | Côte Meuse, France | 80 | full | FALSE |
| 7 | WINE CLUB | Stand up & cheese & wine | 2024-09-19 | Wine Club, France | 60 | full | FALSE |
| 8 | ALICE BAR | Stand-up & Planchas & Cocktails | 2024-09-25 | Alice Bar, France | 90 | full | FALSE |
| 9 | COMEDY NIGHT | Stand up & cocktails | 2024-08-15 | Comedy Club, France | 120 | full | FALSE |
| 10 | LAUGHTER CLUB | Comedy & wine tasting | 2024-07-20 | Laughter Club, France | 75 | full | FALSE |

## Setup Instructions:

1. **Create Google Sheet**: Go to sheets.google.com and create a new sheet
2. **Name it**: "CHEZ MACHA Events" 
3. **Copy the data above** into the sheet
4. **Share the sheet**: Make it publicly viewable (Anyone with the link can view)
5. **Get the Spreadsheet ID**: From the URL (the long string between /d/ and /edit)
6. **Get API Key**: Go to Google Cloud Console and enable Sheets API
7. **Update .env.local**:
   ```
   NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_api_key_here
   NEXT_PUBLIC_SPREADSHEET_ID=your_spreadsheet_id_here
   ```

## Example URL:
If your sheet URL is: `https://docs.google.com/spreadsheets/d/1r8xo24j4nO6xccE9rQaf51cPG23kRoFub6VFN_cn7mk`
Then your Spreadsheet ID is: `1r8xo24j4nO6xccE9rQaf51cPG23kRoFub6VFN_cn7mk`

## Range:
The code will read from range: `Events!A1:G11`
