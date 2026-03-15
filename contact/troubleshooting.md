# Contact Form Troubleshooting Guide

## 🚨 Issue: Messages Not Appearing in Google Sheets

### 🔍 Common Problems & Solutions

---

## **Problem 1: Spreadsheet ID Not Updated**

**❌ Issue**: Your Google Apps Script still has placeholder `YOUR_SPREADSHEET_ID_HERE`

**✅ Solution**:
1. Open your Google Sheets: "Workwalaa Contact Submissions"
2. Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
3. Copy the ID between `/d/` and `/edit`
4. In Google Apps Script, replace `YOUR_SPREADSHEET_ID_HERE` with your actual ID

**Example**:
```javascript
// ❌ WRONG
const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_HERE');

// ✅ CORRECT  
const sheet = SpreadsheetApp.openById('1abc123def456ghi789jkl012mno345pqr');
```

---

## **Problem 2: Google Sheets API Not Connected**

**❌ Issue**: Google Sheets service not added to Apps Script

**✅ Solution**:
1. In Google Apps Script editor
2. Click "Add Service" (+ icon)
3. Select "Google Sheets API"
4. Click "Add"
5. Select your spreadsheet when prompted

---

## **Problem 3: Web App Not Deployed Correctly**

**❌ Issue**: Web app deployment issues

**✅ Solution**:
1. In Google Apps Script: "Deploy" → "Manage deployments"
2. Click your deployment
3. Click "Edit"
4. Ensure:
   - Execute as: "Me"
   - Who has access: "Anyone"
5. Click "Deploy"

---

## **Problem 4: Form Field Names Mismatch**

**❌ Issue**: Form field names don't match script expectations

**✅ Solution**: Check your HTML form fields:
```html
<input name="name" ...>
<input name="email" ...>  
<input name="phone" ...>
<select name="type" ...>
<textarea name="message" ...>
```

---

## **🧪 Testing Steps**

### Step 1: Test Spreadsheet Connection
1. In Google Apps Script, run `testSpreadsheet` function
2. Check "Execution log" for results
3. Should show: "Success: Spreadsheet is connected"

### Step 2: Test Web App URL
1. Open your web app URL in browser
2. Should show: "Workwalaa Contact Form Backend - Backend is running!"

### Step 3: Test Form Submission
1. Open your website's contact form
2. Fill in test data
3. Click "Send Message"
4. Check browser console for errors

### Step 4: Check Google Apps Script Logs
1. In Google Apps Script: "Executions" tab
2. Look for recent executions
3. Check for error messages

---

## **🔧 Quick Fix Script**

Replace your entire `Code.gs` with this corrected version:

```javascript
// Google Apps Script for Workwalaa Contact Form
function doGet(e) {
  return HtmlService.createHtmlOutput('<h1>Workwalaa Contact Form Backend</h1><p>Backend is running!</p>');
}

function doPost(e) {
  try {
    // Log the incoming request for debugging
    Logger.log('Received request: ' + JSON.stringify(e.parameter));
    
    // Get the spreadsheet - REPLACE WITH YOUR ACTUAL SPREADSHEET ID
    const sheet = SpreadsheetApp.openById('REPLACE_WITH_YOUR_SPREADSHEET_ID');
    const worksheet = sheet.getActiveSheet();
    
    // Get form data
    const params = e.parameter;
    const timestamp = new Date().toLocaleString();
    
    // Log the data we're about to save
    Logger.log('Saving data: ' + JSON.stringify(params));
    
    // Add new row to spreadsheet
    worksheet.appendRow([
      timestamp,
      params.name || 'Not provided',
      params.email || 'Not provided', 
      params.phone || 'Not provided',
      params.type || 'Not provided',
      params.message || 'Not provided'
    ]);
    
    Logger.log('Data saved successfully');
    
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
    // REPLACE WITH YOUR ACTUAL SPREADSHEET ID
    const sheet = SpreadsheetApp.openById('REPLACE_WITH_YOUR_SPREADSHEET_ID');
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

---

## **📋 Complete Fix Checklist**

### ✅ Must Do:
- [ ] Replace `REPLACE_WITH_YOUR_SPREADSHEET_ID` in Code.gs
- [ ] Add Google Sheets API service
- [ ] Redeploy web app with correct permissions
- [ ] Test with actual spreadsheet ID

### ✅ Verify:
- [ ] Web app URL loads in browser
- [ ] `testSpreadsheet` function runs successfully
- [ ] Form submission appears in execution log
- [ ] Data appears in Google Sheets

---

## **🆘 Still Not Working?**

### Check Browser Console:
1. Open your website
2. Press F12 (Developer Tools)
3. Click "Console" tab
4. Submit the form
5. Look for error messages

### Check Google Apps Script:
1. Go to your Apps Script project
2. Click "Executions" tab
3. Look for recent form submissions
4. Check "Execution log" for errors

### Common Errors:
- **"Spreadsheet not found"** → Wrong spreadsheet ID
- **"Permission denied"** → Wrong deployment settings
- **"Invalid request"** → Form field names mismatch

---

## **💡 Pro Tips**

1. **Always test with real data** - don't use empty fields
2. **Check execution logs** after each test
3. **Use browser developer tools** to see network requests
4. **Keep spreadsheet public** or share with your Google account
5. **Test web app URL** in browser first

If you're still having issues, please share:
- Your spreadsheet ID (first few characters only)
- Any error messages from browser console
- Any error messages from Apps Script execution log
