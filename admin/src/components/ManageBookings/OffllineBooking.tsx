import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND } from "../../../../studyroom/utils/config";
import { Toast } from "../ui/toast";
import { toast } from "react-toastify";

const AdminOfflinePayments = () => {
  const [offlinePayments, setOfflinePayments] = useState([]);
  const adminId = JSON.parse(localStorage.getItem("userId") || '""');
  console.log("🚀 ~ AdminOfflinePayments ~ adminId:", adminId);

  // -------------------------------------------------
  // Function: getOfflinePayments
  // Purpose: Fetch offline payment requests for the given admin.
  // -------------------------------------------------
  const getOfflinePayments = async () => {
    try {
      const response = await axios.get(
        `${BACKEND}/api/v1/Booking/libraryOfflinePayments/${adminId}`
      );
      if (response.data.offlinePayments.length === 0) {
        toast.info("No pending offline payments", { duration: 3000 });
      } else {
        setOfflinePayments(response.data.offlinePayments);
      }
    } catch (error) {
      console.error("Error fetching offline payments:", error);
      toast.error("Error fetching offline payments", { duration: 3000 });
    }
  };

  // -------------------------------------------------
  // useEffect: Component Mount
  // Purpose: Start countdown interval for offline payments.
  // -------------------------------------------------
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      // Only update the countdown for payments already fetched.
      if (offlinePayments.length > 0) {
        setOfflinePayments((prev) =>
          prev.map((payment) => ({
            ...payment,
            remainingTime: Math.max(0, payment.remainingTime - 1),
          }))
        );
      }
    }, 1000); // update every second

    return () => clearInterval(countdownInterval);
  }, [offlinePayments]);

  // -------------------------------------------------
  // Function: handleApprove
  // Purpose: Approve an offline payment request.
  // -------------------------------------------------
  const handleApprove = (transactionId: string) => {
    axios
      .post(
        `${BACKEND}/api/v1/Booking/approveOffline/${transactionId}`,
       
       
      )
      .then(() => {
        setOfflinePayments((prev) =>
          prev.filter((payment) => payment.transactionId !== transactionId)
        );
      })
      .catch((error) => {
        console.error("Error approving payment:", error);
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Offline Payment Requests
      </h2>

      {/* Refresh Button to fetch latest offline payment requests */}
      <button
        onClick={getOfflinePayments}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Refresh Payments
      </button>

      {offlinePayments.length === 0 ? (
        <h2 className="text-gray-600">No pending offline payments</h2>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Library</th>
                <th className="p-3 text-left">Seat</th>
                <th className="p-3 text-left">Time Slot</th>
                <th className="p-3 text-left">Time Left</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offlinePayments.map((payment) => (
                <tr
                  key={payment.transactionId}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="p-3">
                    <span className="font-semibold">{payment.user.username}</span>
                    <p className="text-sm text-gray-500">{payment.user.email}</p>
                  </td>
                  <td className="p-3">{payment.library.name}</td>
                  <td className="p-3">{payment.bookedSeat.seatLabel}</td>
                  <td className="p-3">
                    {payment.timeSlotDetails.from} - {payment.timeSlotDetails.to}
                  </td>
                  <td className="p-3 text-red-600 font-semibold">
                    {payment.remainingTime} sec
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleApprove(payment.transactionId)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                      ✅ Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOfflinePayments;