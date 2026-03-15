# Workwalaa Assist Wishlist Backend Setup

This guide shows how to connect the Workwalaa Assist wishlist form to Google Sheets using Google Apps Script.

## 🚀 Quick Setup (5 minutes)

### 1. Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: "Workwalaa Assist Wishlist"
4. Create these columns in order:
   - `Timestamp` (Column A)
   - `Email` (Column B)
   - `Status` (Column C)

### 2. Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Paste the code from `wishlist-script.gs` below
4. Save the project (Ctrl+S)

### 3. Deploy as Web App
1. Click "Deploy" → "New Deployment"
2. Choose "Web app"
3. Configuration:
   - Description: "Workwalaa Assist Wishlist"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Development: (leave empty)
4. Click "Deploy"
5. Copy the **Web app URL** - this is your script URL

### 4. Update Your Wishlist Form

Replace the script URL in your assist files:

### In `assist/assist.js` (line ~65):
```javascript
const wishlistScriptURL = 'PASTE_YOUR_WISHLIST_WEB_APP_URL_HERE';
```

## 🔗 Connect Spreadsheet to Script

1. In Google Apps Script editor, click "Add Service" (+)
2. Select "Google Sheets API"
3. Click "Add"
4. In the popup, select your "Workwalaa Assist Wishlist" spreadsheet
5. Click "Add" again

## 📋 Google Apps Script Code

Copy this entire code and paste into your Google Apps Script editor:

```javascript
// Google Apps Script for Workwalaa Assist Wishlist
function doGet(e) {
  return HtmlService.createHtmlOutput('<h1>Workwalaa Assist Wishlist Backend</h1><p>Backend is running!</p>');
}

function doPost(e) {
  try {
    // Get the spreadsheet
    const sheet = SpreadsheetApp.openById('YOUR_WISHLIST_SPREADSHEET_ID_HERE');
    const worksheet = sheet.getActiveSheet();
    
    // Get form data
    const params = e.parameter;
    const timestamp = new Date().toLocaleString();
    
    // Add new row to spreadsheet
    worksheet.appendRow([
      timestamp,
      params.email || 'Not provided',
      'Waitlist' // Status for all wishlist signups
    ]);
    
    // Send email notification
    sendWishlistEmailNotification(params);
    
    // Return success response
    return ContentService.createTextOutput('Success');
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput('Error: ' + error.toString());
  }
}

function sendWishlistEmailNotification(params) {
  const recipient = 'info@workwalaa.com'; // Your email
  const subject = 'New Workwalaa Assist Wishlist Signup';
  
  const body = `
New Workwalaa Assist wishlist signup:

Email: ${params.email || 'Not provided'}

Signed up: ${new Date().toLocaleString()}
User is interested in early access to Workwalaa Assist.
  `;
  
  MailApp.sendEmail(recipient, subject, body);
}

// Test function to verify setup
function testWishlistSpreadsheet() {
  try {
    const sheet = SpreadsheetApp.openById('YOUR_WISHLIST_SPREADSHEET_ID_HERE');
    const worksheet = sheet.getActiveSheet();
    const lastRow = worksheet.getLastRow();
    
    Logger.log('Wishlist spreadsheet connected successfully');
    Logger.log('Last row: ' + lastRow.toString());
    
    return 'Success: Wishlist spreadsheet is connected';
  } catch (error) {
    Logger.log('Error connecting to wishlist spreadsheet: ' + error.toString());
    return 'Error: ' + error.toString();
  }
}
```

## 🔧 Required Updates

### 1. Get Wishlist Spreadsheet ID
1. Open your "Workwalaa Assist Wishlist" spreadsheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/WISHLIST_SPREADSHEET_ID_HERE/edit`
3. Copy the part after `/d/` (before `/edit`)
4. Replace `YOUR_WISHLIST_SPREADSHEET_ID_HERE` in the script above

### 2. Update Wishlist Script URL
1. After deploying, copy your Web App URL
2. Replace `PASTE_YOUR_WISHLIST_WEB_APP_URL_HERE` in assist.js

## 📱 How It Works

1. User clicks "Join Waitlist" and enters email
2. Form data is sent to Google Apps Script
3. Script saves data to Google Sheets
4. Script sends email notification to you
5. User sees success animation

## 🔒 Security Notes

- The form uses HTTPS for secure submission
- Google Apps Script handles the server-side processing
- No sensitive data is stored in the frontend code
- All submissions are logged in Google Sheets

## 📊 What You Get

- **Real-time notifications** via email
- **Automatic data storage** in Google Sheets
- **Timestamp tracking** for all signups
- **Error handling** for failed submissions
- **Professional appearance** with animations

## 🚨 Troubleshooting

If wishlist form doesn't work:
1. Check that the Web App URL is correctly updated
2. Verify the Wishlist Spreadsheet ID is correct
3. Ensure Google Sheets API is added
4. Check browser console for error messages
5. Test the deployment permissions

## 📞 Support

For issues with setup:
1. Check the Google Apps Script documentation
2. Verify all URLs and IDs are correct
3. Test each component separately

## 🎯 Benefits

- **Separate from Contact Form**: Different spreadsheet for wishlist
- **Clean Data Management**: Dedicated list for interested users
- **Email Notifications**: Instant alerts for new signups
- **Professional Experience**: Smooth user experience
- **No UI Changes**: Same look and feel
