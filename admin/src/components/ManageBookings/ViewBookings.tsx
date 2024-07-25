import React from 'react'

type Props = {}

const ViewBookings = (props: Props) => {
    const [bookings, setBookings] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookings();
                setBookings(response.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                // Handle error
            }
        };
        fetchBookings();
    }, []);

  return (
    <div>
    {isLoading ? (
        <div>Loading...</div>
    ) : (
        <div>
            {bookings.map((booking) => (
                <div key={booking.id}>{booking.name}</div>
            ))}
        </div>
    )}
</div>
  )
}

export default ViewBookings