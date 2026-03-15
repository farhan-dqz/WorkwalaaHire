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
