const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  invoiceNumber: {
    type: String,
    required: false,
    default: 'INV-0'
  },
  libraryaddress:{
    type: String,
    required: true
  },
  libraryName: {

    type: String,
    required: true
  },
  invoiceDate: {
    type: Date,
    default: Date.now
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhoneNumber: {
    type: String,
    required: true
  },
  libraryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Library',
    required: true
  },
  initialPrice: {
    type: Number,
    required: true
  },
  finalPrice: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  bookingPeriod: {
    type: Number,
    required: true
  },
  bookingStatus: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    required: true
  },
  timeStamp: {
   
  },
  bookingFinalDate:{
    type: Date,
    required: true
  },
  seatLabel: {
    type: String,
    required: true
  },
  timeSlotDetails: [{
    from: String,
    to: String,
    price: String,
    booked: Boolean,
    bookingSource: String,
    slotId: String
  }]

})
invoiceSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastInvoice = await mongoose.model('Invoice').findOne().sort({ invoiceNumber: -1 });
    const lastInvoiceNumber = lastInvoice ? parseInt(lastInvoice.invoiceNumber.split('-')[1]) : 0;
    this.invoiceNumber = `INV-${lastInvoiceNumber + 1}`;
  }
  next();
});




module.exports = mongoose.model('Invoice', invoiceSchema);