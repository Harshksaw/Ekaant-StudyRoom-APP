const invoiceTemplate = (invoice) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        .container {
          font-family: Arial, sans-serif;
          margin: 0 auto;
          padding: 20px;
          max-width: 600px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .logo {
          display: block;
          margin: 0 auto 20px;
          max-width: 150px;
        }
        .message {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .invoice-container {
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .invoice-details, .booking-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .details-left, .details-right {
          width: 48%;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
        }
        .support {
          font-size: 14px;
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="https://EKAANT-edtech-project.vercel.app"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="EKAANT Logo"></a>
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
            <p><strong>Booking Date:</strong> ${new Date(invoice.bookingDate).toLocaleDateString()}</p>
            <p><strong>Booking Period:</strong> ${invoice.bookingPeriod} month(s)</p>
            <p><strong>Booking Status:</strong> ${invoice.bookingStatus}</p>
            <p><strong>Approved:</strong> ${invoice.approved}</p>
            <p><strong>Timestamp:</strong> ${new Date(invoice.timeStamp).toLocaleDateString()}</p>
            <p><strong>Seat Label:</strong> ${invoice.seatLabel}</p>
          </div>
          <div class="time-slot-details">
            <h3>Time Slot Details:</h3>
            ${invoice.timeSlotDetails.map(slot => `
              <p><strong>From:</strong> ${slot.from} <strong>To:</strong> ${slot.to} <strong>Price:</strong> ${slot.price}</p>
            `).join('')}
          </div>
          <div class="footer">
            <p>If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:info@EKAANT.com">info@EKAANT.com</a>. We are here to help!</p>
            <p class="support">Thank you for choosing EKAANT!</p>
          </div>
        </div>
      </div>
    </body>
    </html>`;
};

async function sendInvoiceEmail(adminEmail, invoice) {
  try {
    console.log("Sending invoice email to => ", adminEmail);
    const mailResponse = await mailSender(adminEmail, "Invoice Ekaant Study Room", invoiceTemplate(invoice));
    return mailResponse;
  } catch (error) {
    console.error("Error sending invoice email:", error);
    throw error;
  }
}

module.exports = {
  sendInvoiceEmail,
};