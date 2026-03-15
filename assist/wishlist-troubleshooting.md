# Workwalaa Assist Wishlist Troubleshooting Guide

## 🚨 Issue: Wishlist Signups Not Appearing in Google Sheets

### 🔍 Common Problems & Solutions

---

## **Problem 1: Wishlist Spreadsheet ID Not Updated**

**❌ Issue**: Your Google Apps Script still has placeholder `YOUR_WISHLIST_SPREADSHEET_ID_HERE`

**✅ Solution**:
1. Open your Google Sheets: "Workwalaa Assist Wishlist"
2. Look at the URL: `https://docs.google.com/spreadsheets/d/WISHLIST_SPREADSHEET_ID/edit`
3. Copy the ID between `/d/` and `/edit`
4. In Google Apps Script, replace `YOUR_WISHLIST_SPREADSHEET_ID_HERE` with your actual ID

**Example**:
```javascript
// ❌ WRONG
const sheet = SpreadsheetApp.openById('YOUR_WISHLIST_SPREADSHEET_ID_HERE');

// ✅ CORRECT  
const sheet = SpreadsheetApp.openById('1abc123def456ghi789jkl012mno345pqr');
```

---

## **Problem 2: Google Sheets API Not Connected**

**❌ Issue**: Google Sheets service not added to Apps Script

**✅ Solution**:
1. In Google Apps Script editor
2. Click "Add Service" (+)
3. Select "Google Sheets API"
4. Click "Add"
5. Select your spreadsheet when prompted

---

## **Problem 3: Wishlist Web App Not Deployed**

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

## **Problem 4: Wishlist Script URL Not Updated**

**❌ Issue**: Frontend still has placeholder URL

**✅ Solution**:
1. Copy your Web App URL from Google Apps Script deployment
2. Update in `assist/assist.js` (line ~62):
```javascript
const wishlistScriptURL = 'PASTE_YOUR_WISHLIST_WEB_APP_URL_HERE';
```
3. Update in `index.html` (line ~3335):
```javascript
const wishlistScriptURL = 'PASTE_YOUR_WISHLIST_WEB_APP_URL_HERE';
```

---

## **Problem 5: Form Field Names Mismatch**

**❌ Issue**: Form field names don't match script expectations

**✅ Solution**: Check your HTML form field:
```html
<input name="email" ... id="wishlistEmail" required>
```

---

## **🧪 Testing Steps**

### Step 1: Test Wishlist Spreadsheet Connection
1. In Google Apps Script, run `testWishlistSpreadsheet` function
2. Check "Execution log" for results
3. Should show: "Success: Wishlist spreadsheet is connected"

### Step 2: Test Wishlist Web App URL
1. Open your web app URL in browser
2. Should show: "Workwalaa Assist Wishlist Backend - Backend is running!"

### Step 3: Test Wishlist Form Submission
1. Open your website's assist section
2. Click "Join Waitlist"
3. Enter test email
4. Click "Confirm"
5. Check browser console for errors

### Step 4: Check Google Apps Script Logs
1. In Google Apps Script: "Executions" tab
2. Look for recent executions
3. Check for error messages

---

## **🔧 Quick Fix Script**

Replace your entire `wishlist-script.gs` with this corrected version:

```javascript
// Google Apps Script for Workwalaa Assist Wishlist
function doGet(e) {
  return HtmlService.createHtmlOutput('<h1>Workwalaa Assist Wishlist Backend</h1><p>Backend is running!</p>');
}

function doPost(e) {
  try {
    // Log the incoming request for debugging
    Logger.log('Wishlist request: ' + JSON.stringify(e.parameter));
    
    // Get the spreadsheet - REPLACE WITH YOUR ACTUAL WISHLIST SPREADSHEET ID
    const sheet = SpreadsheetApp.openById('REPLACE_WITH_YOUR_WISHLIST_SPREADSHEET_ID');
    const worksheet = sheet.getActiveSheet();
    
    // Get form data
    const params = e.parameter;
    const timestamp = new Date().toLocaleString();
    
    // Log the data we're about to save
    Logger.log('Saving wishlist data: ' + JSON.stringify(params));
    
    // Add new row to spreadsheet
    worksheet.appendRow([
      timestamp,
      params.email || 'Not provided',
      'Waitlist' // Status for all wishlist signups
    ]);
    
    Logger.log('Wishlist data saved successfully');
    
    // Send email notification
    sendWishlistEmailNotification(params);
    
    // Return success response
    return ContentService.createTextOutput('Success');
    
  } catch (error) {
    Logger.log('Wishlist Error: ' + error.toString());
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
    // REPLACE WITH YOUR ACTUAL WISHLIST SPREADSHEET ID
    const sheet = SpreadsheetApp.openById('REPLACE_WITH_YOUR_WISHLIST_SPREADSHEET_ID');
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

---

## **📋 Complete Fix Checklist**

### ✅ Must Do:
- [ ] Replace `REPLACE_WITH_YOUR_WISHLIST_SPREADSHEET_ID` in wishlist-script.gs
- [ ] Add Google Sheets API service
- [ ] Deploy wishlist web app with correct permissions
- [ ] Update wishlist script URL in both assist.js and index.html
- [ ] Test with actual wishlist spreadsheet ID

### ✅ Verify:
- [ ] Wishlist web app URL loads in browser
- [ ] `testWishlistSpreadsheet` function runs successfully
- [ ] Wishlist form submission appears in execution log
- [ ] Data appears in Google Sheets

---

## **🆘 Still Not Working?**

### Check Browser Console:
1. Open your website
2. Press F12 (Developer Tools)
3. Click "Console" tab
4. Submit the wishlist form
5. Look for error messages

### Check Google Apps Script:
1. Go to your Apps Script project
2. Click "Executions" tab
3. Look for recent wishlist submissions
4. Check "Execution log" for errors

### Common Errors:
- **"Spreadsheet not found"** → Wrong wishlist spreadsheet ID
- **"Permission denied"** → Wrong deployment settings
- **"Invalid request"** → Form field names mismatch

---

## **💡 Pro Tips**

1. **Always test with real email** - don't use empty fields
2. **Check execution logs** after each test
3. **Use browser developer tools** to see network requests
4. **Keep wishlist spreadsheet public** or share with your Google account
5. **Test web app URL** in browser first

---

## **📊 What You Should See**

### In Google Sheets:
| Timestamp | Email | Status |
|-----------|-------|--------|
| 15/03/2026, 1:30:00 PM | user@example.com | Waitlist |

### In Email:
- Subject: "New Workwalaa Assist Wishlist Signup"
- Body: Contains email and timestamp

### In Browser:
- Loading state: "Joining..."
- Success animation: "You're on the list!"
- Form resets after 3 seconds

If you're still having issues, please share:
- Your wishlist spreadsheet ID (first few characters only)
- Any error messages from browser console
- Any error messages from Apps Script execution log
