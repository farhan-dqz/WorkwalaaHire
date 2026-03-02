function doPost(e) {
  try {
    // Get the type of submission
    var type = e.parameter.type || "";
    
    if (type === "wishlist") {
      // Handle wishlist/waitlist submission
      return handleWishlistSubmission(e);
    } else {
      // Handle contact form submission (existing logic)
      return handleContactSubmission(e);
    }
    
  } catch (error) {
    // Return an error JSON response if something goes wrong
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleWishlistSubmission(e) {
  // Open the wishlist sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("wishlist");
  
  // If sheet doesn't exist, create it
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("wishlist");
    // Set up headers
    sheet.appendRow(["Timestamp", "Email", "Source", "IP Address"]);
    sheet.getRange("A1:D1").setFontWeight("bold");
  }
  
  // Extract values from the wishlist form
  var email = e.parameter.email || "";
  var source = e.parameter.source || "website";
  
  // Get IP address if available
  var ipAddress = e.parameter.ip || "Not available";
  
  // Create timestamp
  var timestamp = new Date();
  
  // Append to wishlist sheet
  sheet.appendRow([timestamp, email, source, ipAddress]);
  
  // Optional: Send notification email for new wishlist signup
  var subject = "New Waitlist Signup - Workwalaa";
  var body = "Someone just joined the Workwalaa waitlist!\n\n" +
             "Email: " + email + "\n" +
             "Source: " + source + "\n" +
             "Signed up on: " + timestamp + "\n\n" +
             "Keep them updated on your progress!";
  
  // Send notification (uncomment if you want email notifications)
  // MailApp.sendEmail("info@workwalaa.com", subject, body);
  
  return ContentService
    .createTextOutput(JSON.stringify({ "result": "success", "message": "Successfully joined waitlist!" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleContactSubmission(e) {
  // 1. Open the specific Google Sheet document (by name)
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("web_contact");
  
  // If sheet doesn't exist, create it
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("web_contact");
    // Set up headers
    sheet.appendRow(["Timestamp", "Type", "Name", "Phone", "Email", "Message"]);
    sheet.getRange("A1:F1").setFontWeight("bold");
  }
  
  // 2. Extract values from the incoming POST request form data
  // Assuming the form sends fields named exactly as below
  var type = e.parameter.type || "";
  var name = e.parameter.name || "";
  var phone = e.parameter.phone || "";
  var email = e.parameter.email || "";
  var message = e.parameter.message || "";
  
  // Create a timestamp for when the submission occurred
  var timestamp = new Date();

  // 3. Append the data to the next available row in the Google Sheet
  // Columns: [Timestamp, Type, Name, Phone, Email, Message]
  sheet.appendRow([timestamp, type, name, phone, email, message]);

  // 4. Specifically check if "Founder / Investor" was selected
  if (type === "founder_investor") {
    // Send an email to info@workwalaa.com
    var subject = "Important: New Founder/Investor Contact Form Submission";
    var body = "You have received a new contact request from a Founder/Investor on the Workwalaa website.\n\n" +
               "Name: " + name + "\n" +
               "Phone: " + phone + "\n" +
               "Email: " + email + "\n" +
               "Message: " + message + "\n\n" +
               "Submitted on: " + timestamp;
    
    MailApp.sendEmail("info@workwalaa.com", subject, body);
  }

  // 5. Return a success JSON response
  return ContentService
    .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Support GET requests as well (Optional for debugging/pinging)
function doGet(e) {
  return ContentService.createTextOutput("The Workwalaa Contact Form Web App is active.");
}
