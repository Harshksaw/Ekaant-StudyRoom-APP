import React, { useState } from 'react'
import LocationSelector from '@/components/ManageLibrary/LocationSelector'

const Step6 = ({ handleLocationSelect, nextStep, prevStep }: any) => {
  // State to track loading status
  const [isLoading, setIsLoading] = useState(false)

  // Simulate location extraction (You can replace this with your actual location fetching logic)
  const extractLocation = async () => {
    setIsLoading(true)
    try {
      // Simulate delay for fetching location (replace with your logic)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error("Error fetching location:", error)
    }
  }

  // Call extractLocation when the component is mounted or whenever needed
  React.useEffect(() => {
    extractLocation()
  }, [])

  return (
    <div className="w-full h-full flex-col mt-20 mb-10 flex justify-around items-center rounded-lg">
      <h2 className="text-3xl text-blue-800 mb-10">Kindly Select Your Library Location</h2>

      {/* Loader Display */}
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <LocationSelector onLocationSelect={handleLocationSelect} />
      )}

      <div className="flex flex-row gap-60 items-center justify-around mt-6">
        <button
          className="mt-1 bg-gradient-to-r from-sky-300 to-sky-400 text-white py-2 px-10 rounded-xl"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className="center mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-16 rounded-xl"
          onClick={nextStep}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Step6
