# Contact Form Backend Setup

This guide shows how to connect your contact form to Google Sheets using Google Apps Script.

## 🚀 Quick Setup (5 minutes)

### 1. Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: "Workwalaa Contact Submissions"
4. Create these columns in order:
   - `Timestamp` (Column A)
   - `Name` (Column B)
   - `Email` (Column C)
   - `Phone` (Column D)
   - `Type` (Column E)
   - `Message` (Column F)

### 2. Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Paste the code from `Code.gs` below
4. Save the project (Ctrl+S)

### 3. Deploy as Web App
1. Click "Deploy" → "New Deployment"
2. Choose "Web app"
3. Configuration:
   - Description: "Workwalaa Contact Form"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Development: (leave empty)
4. Click "Deploy"
5. Copy the **Web app URL** - this is your script URL

## 📝 Update Your Form

Replace the script URL in your contact files:

### In `contact/contact.js` (line ~32):
```javascript
const scriptURL = 'PASTE_YOUR_WEB_APP_URL_HERE';
```

### In `contact/contact.html` (line ~32):
```javascript
const scriptURL = 'PASTE_YOUR_WEB_APP_URL_HERE';
```

## 🔗 Connect Spreadsheet to Script

1. In Google Apps Script editor, click "Add Service" (+)
2. Select "Google Sheets API"
3. Click "Add"
4. In the popup, select your "Workwalaa Contact Submissions" spreadsheet
5. Click "Add" again

## 📋 Google Apps Script Code

Copy this entire code and paste into your Google Apps Script editor:

```javascript
// Google Apps Script for Workwalaa Contact Form
function doGet(e) {
  return HtmlService.createHtmlOutput('<h1>Workwalaa Contact Form Backend</h1><p>Backend is running!</p>');
}

function doPost(e) {
  try {
    // Get the spreadsheet
    const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_HERE');
    const worksheet = sheet.getActiveSheet();
    
    // Get form data
    const params = e.parameter;
    const timestamp = new Date().toLocaleString();
    
    // Add new row to spreadsheet
    worksheet.appendRow([
      timestamp,
      params.name || 'Not provided',
      params.email || 'Not provided',
      params.phone || 'Not provided',
      params.type || 'Not provided',
      params.message || 'Not provided'
    ]);
    
    // Send email notification
    sendEmailNotification(params);
    
    // Return success response
    return ContentService.createTextOutput('Success');
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput('Error: ' + error.toString());
  }
}

function sendEmailNotification(params) {
  const recipient = 'info@workwalaa.com'; // Your email
  const subject = 'New Contact Form Submission - Workwalaa';
  
  const body = `
New contact form submission:

Name: ${params.name || 'Not provided'}
Email: ${params.email || 'Not provided'}
Phone: ${params.phone || 'Not provided'}
Type: ${params.type || 'Not provided'}
Message: ${params.message || 'Not provided'}

Submitted: ${new Date().toLocaleString()}
  `;
  
  MailApp.sendEmail(recipient, subject, body);
}

// Test function to verify setup
function testSpreadsheet() {
  try {
    const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_HERE');
    const worksheet = sheet.getActiveSheet();
    const lastRow = worksheet.getLastRow();
    
    Logger.log('Spreadsheet connected successfully');
    Logger.log('Last row: ' + lastRow.toString());
    
    return 'Success: Spreadsheet is connected';
  } catch (error) {
    Logger.log('Error connecting to spreadsheet: ' + error.toString());
    return 'Error: ' + error.toString();
  }
}
```

## 🔧 Required Updates

### 1. Get Spreadsheet ID
1. Open your "Workwalaa Contact Submissions" spreadsheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
3. Copy the part after `/d/` (before `/edit`)
4. Replace `YOUR_SPREADSHEET_ID_HERE` in the script above

### 2. Update Script URL
1. After deploying, copy your Web App URL
2. Replace `PASTE_YOUR_WEB_APP_URL_HERE` in both contact files

## 📱 How It Works

1. User fills out contact form on website
2. Form data is sent to Google Apps Script
3. Script saves data to Google Sheets
4. Script sends email notification to you
5. User sees success animation on website

## 🧪 Testing

1. Deploy the script and copy the Web App URL
2. Test the contact form on your website
3. Check your Google Sheets for new entries
4. Check your email for notifications

## 🔒 Security Notes

- The form uses HTTPS for secure submission
- Google Apps Script handles the server-side processing
- No sensitive data is stored in the frontend code
- All submissions are logged in Google Sheets

## 📊 What You Get

- **Real-time notifications** via email
- **Automatic data storage** in Google Sheets
- **Timestamp tracking** for all submissions
- **Error handling** for failed submissions
- **Professional appearance** with loading animations

## 🚨 Troubleshooting

If form doesn't work:
1. Check that the Web App URL is correctly updated
2. Verify the Spreadsheet ID is correct
3. Ensure Google Sheets API is added
4. Check browser console for error messages
5. Test the deployment permissions

## 📞 Support

For issues with setup:
1. Check the Google Apps Script documentation
2. Verify all URLs and IDs are correct
3. Test each component separately
