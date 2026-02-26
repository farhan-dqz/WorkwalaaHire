function doPost(e) {
  try {
    // 1. Open the specific Google Sheet document (by name)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("web_contact");
    
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

  } catch (error) {
    // Return an error JSON response if something goes wrong
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Support GET requests as well (Optional for debugging/pinging)
function doGet(e) {
  return ContentService.createTextOutput("The Workwalaa Contact Form Web App is active.");
}
