export const getDateAfterMonths = (date: any, months: number): Date => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
};


export function calculatePeriod(bookingDate: string, bookingPeriod: number): string {
    // Array of short month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    // Parse the booking date string into a Date object
    const startDate = new Date(bookingDate);
    
    // Create a new Date object for the end date by adding the booking period to the start date's month
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + bookingPeriod);
    
    // Use the monthNames array to get the month in text in short form
    const startMonth = monthNames[startDate.getMonth()];
    const startDay = startDate.getDate();
    const endMonth = monthNames[endDate.getMonth()];
    const endDay = endDate.getDate();
    
    // Return the formatted period string with short month names
    return `${startMonth} ${startDay.toString().padStart(2, '0')} - ${endMonth} ${endDay.toString().padStart(2, '0')}`;
  }