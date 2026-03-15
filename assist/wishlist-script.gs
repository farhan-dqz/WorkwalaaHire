// Workwalaa Backend (Contact Form + Wishlist)

const SPREADSHEET_ID = "16A4F0sn08cZ8-6hWDeUA-Kjm2Nw2p2nmxqWDpI6F64M";

function doGet() {
  return ContentService.createTextOutput("Workwalaa Backend Running");
}

function doPost(e) {

  try {

    const formType = e.parameter.formType;

    if (formType === "wishlist") {
      return handleWishlist(e);
    } else {
      return handleContact(e);
    }

  } catch (error) {

    return ContentService
      .createTextOutput("Error: " + error)
      .setMimeType(ContentService.MimeType.TEXT);

  }

}


/* ==============================
   CONTACT FORM HANDLER
============================== */

function handleContact(e) {

  const sheet = SpreadsheetApp
    .openById(SPREADSHEET_ID)
    .getSheetByName("contactus");

  const timestamp = new Date();

  const name = e.parameter.name || "Not provided";
  const email = e.parameter.email || "Not provided";
  const phone = e.parameter.phone || "Not provided";
  const type = e.parameter.type || "Not provided";
  const message = e.parameter.message || "Not provided";

  sheet.appendRow([
    timestamp,
    name,
    email,
    phone,
    type,
    message
  ]);

  sendContactEmail(name, email, phone, type, message);

  return ContentService.createTextOutput("Success");

}


/* ==============================
   WISHLIST HANDLER
============================== */

function handleWishlist(e) {

  const sheet = SpreadsheetApp
    .openById(SPREADSHEET_ID)
    .getSheetByName("wishlist");

  const timestamp = new Date();
  const email = e.parameter.email || "Not provided";

  sheet.appendRow([
    timestamp,
    email,
    "Waitlist"
  ]);

  sendWishlistEmail(email);

  return ContentService.createTextOutput("Success");

}


/* ==============================
   EMAIL NOTIFICATIONS
============================== */

function sendContactEmail(name,email,phone,type,message) {

  const recipient = "info@workwalaa.com";
  const subject = "New Contact Form Submission - Workwalaa";

  const body = `
New contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone}
Type: ${type}

Message:
${message}

Submitted: ${new Date().toLocaleString()}
`;

  MailApp.sendEmail(recipient, subject, body);

}


function sendWishlistEmail(email) {

  const recipient = "info@workwalaa.com";
  const subject = "New Workwalaa Assist Wishlist Signup";

  const body = `
New wishlist signup:

Email: ${email}

User wants early access to Workwalaa Assist.

Signed up: ${new Date().toLocaleString()}
`;

  MailApp.sendEmail(recipient, subject, body);

}