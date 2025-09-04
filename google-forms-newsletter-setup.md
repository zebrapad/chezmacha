# Google Forms Setup for CHEZ MACHA Newsletter

## Overview
This guide shows you how to set up Google Forms for newsletter signups without requiring browser reviews. The newsletter signup will automatically submit to your Google Form and also save locally as backup.

## Current Setup
Your newsletter signup is already configured to work with Google Forms! Here's what's already in place:

### 1. Google Forms Integration
- **Newsletter Form URL**: `https://docs.google.com/forms/d/1AwApLoKivWAF0xX9XnfR_c06S7DXY7KrV4fnCVpmuTo/formResponse`
- **Entry IDs**: 
  - Email: `entry.2005620554`
  - Name: `entry.1065046570`

### 2. How It Works
When users sign up for your newsletter:
1. Data is submitted to your Google Form automatically
2. Data is also saved locally in the browser as backup
3. No browser reviews required - it works seamlessly

## Setting Up Your Google Form

### Step 1: Create the Form
1. Go to [forms.google.com](https://forms.google.com)
2. Create a new form
3. Add these questions:
   - **Email** (Short answer, required)
   - **Name** (Short answer, required)

### Step 2: Get the Form URL
1. Click "Send" in your form
2. Click the link icon
3. Copy the form URL
4. It should look like: `https://docs.google.com/forms/d/FORM_ID/formResponse`

### Step 3: Get Entry IDs
1. Open your form in edit mode
2. Right-click on the email field → "Inspect Element"
3. Look for `name="entry.XXXXXXXXX"` - this is your email entry ID
4. Do the same for the name field
5. Update the entry IDs in your code

### Step 4: Update Your Code
In `src/lib/google-sheets.ts`, update these lines:

```typescript
// Update this URL with your form URL
const NEWSLETTER_FORM_ACTION_URL = 'https://docs.google.com/forms/d/YOUR_FORM_ID_HERE/formResponse';

// In the addNewsletterSubscriber function, update these entry IDs:
formData.append('entry.YOUR_EMAIL_ENTRY_ID', email);
formData.append('entry.YOUR_NAME_ENTRY_ID', name);
```

## Testing Your Setup

### Test Newsletter Signup
1. Go to your website
2. Find the newsletter signup section
3. Enter an email and name
4. Submit the form
5. Check your Google Form responses to see if the data appears

### View Local Data (for debugging)
Open browser console and run:
```javascript
// View all newsletter subscribers
console.log(JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]'));

// Export as CSV
// (This function is already available in your code)
```

## Benefits of This Setup

✅ **No Browser Reviews**: Google Forms submissions work without OAuth approval  
✅ **Automatic Backup**: Data saved locally even if Google Forms fails  
✅ **Easy Management**: View all signups in your Google Form responses  
✅ **Export Options**: Built-in CSV export functionality  
✅ **Reliable**: Works on all devices and browsers  

## Current Newsletter Form Fields

Your newsletter form collects:
- **Email**: User's email address
- **Name**: User's name
- **Date**: Automatic timestamp
- **ID**: Unique identifier

## Troubleshooting

### If Google Forms submission fails:
- Check the form URL is correct
- Verify entry IDs match your form fields
- Check browser console for errors
- Data will still be saved locally as backup

### To view form responses:
1. Open your Google Form
2. Click "Responses" tab
3. View all submissions in real-time

## Next Steps

1. **Create your Google Form** with email and name fields
2. **Update the form URL** in your code
3. **Get the entry IDs** and update them in the code
4. **Test the signup** to make sure it works
5. **Monitor responses** in your Google Form

Your newsletter signup is now ready to collect user information directly into Google Forms without any browser review requirements!
