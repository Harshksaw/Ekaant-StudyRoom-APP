const mailSender = require("../mailSender");
const invoiceTemplate = (invoice) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="UTF-8">
      <title>Invoice Email</title>
      <style>
        body {
          background-color: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.4;
          color: #333333;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
    
        .logo {
          max-width: 200px;
          margin-bottom: 20px;
        }
    
        .message {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }
    
        .body {
          font-size: 16px;
          margin-bottom: 20px;
          text-align: left;
        }
    
        .cta {
          display: inline-block;
          padding: 10px 20px;
          background-color: #FFD60A;
          color: #000000;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 20px;
        }
    
        .support {
          font-size: 14px;
          color: #999999;
          margin-top: 20px;
        }
    
        .highlight {
          font-weight: bold;
        }
          .invoice-container {
  border: 1px solid #ccc;
  padding: 20px;
  font-family: Arial, sans-serif;
  display: grid;
  grid-template-rows: auto 1fr auto 1fr;
  }
  
  .header {
  grid-row: 1;
  text-align: center;
  }
  
  h1 {
  margin-bottom: 10px;
  }
  
  .invoice-details {
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  }
  
  .details-left, .details-right {
  display: flex;
  flex-direction: column;
  gap: 5px;
  }
  
  .booking-info {
  grid-row: 3;
  }
  
  .footer {
  grid-row: 4;
  text-align: center;
  }
  
  .support {
  margin-top: 10px;
  }
  
      </style>
    
    </head>
    
    <body>
      <div class="container">
        <a href="https://EKAANT-edtech-project.vercel.app"><img class="logo"
            src="https://i.ibb.co/7Xyj3PC/logo.png" alt="EKAANT Logo"></a>
        <div class="message">Invoice Details</div>
     <div class="invoice-container">
  <div class="header">
    <h1>Invoice</h1>
    <p>Dear ${invoice.customerName},</p>
    <p>Thank you for your booking. Here are the details of your invoice:</p>
  </div>
  <div class="invoice-details">
    <div class="details-left">
      <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>
      <p><strong>Booking ID:</strong> ${invoice.bookingId}</p>
      <p><strong>Library ID:</strong> ${invoice.libraryId}</p>
    </div>
    <div class="details-right">
      <p><strong>Initial Price:</strong> ${invoice.initialPrice}</p>
      <p><strong>Final Price:</strong> ${invoice.finalPrice}</p>
      <p><strong>Paid:</strong> ${invoice.paid}</p>
    </div>
  </div>
  <div class="booking-info">
    <p><strong>Booking Date:</strong> ${invoice.bookingDate}</p>
    <p><strong>Booking Period:</strong> ${invoice.bookingPeriod}</p>
    <p><strong>Booking Status:</strong> ${invoice.bookingStatus}</p>
    <p><strong>Approved:</strong> ${invoice.approved}</p>
    <p><strong>Timestamp:</strong> ${invoice.timeStamp}</p>
  </div>
  <div class="footer">
    <p>If you have any questions or need assistance, please feel free to reach out to us at <a
        href="mailto:info@EKAANT.com">info@EKAANT.com</a>. We are here to help!</p>
    <p class="support">Thank you for choosing EKAANT!</p>
  </div>
  </div>
    </body>
    
    </html>`;
  };
  
async function sendInvoiceEmail(adminEmail, invoice) {
    try{

        console.log("Sending invoice email to => ", adminEmail);
        const mailResponse = await mailSender(adminEmail,
             "Invoice  Ekaant Study Room",
             invoiceTemplate(invoice));
        console.log("Email sent Successfully!! => ", mailResponse);
    } catch(error) {
        console.log("Error while sending email", error);
        throw error;
    }
}
module.exports = sendInvoiceEmail;