import LocationSelector from '@/components/ManageLibrary/LocationSelector'


const Step6 = ({handleLocationSelect,  nextStep,
    prevStep}:any) => {
  return (

          <div className=" w-full h-full flex-col mt-20 mb-10  flex justify-around items-center rounded-lg">
<h2 className='text-3xl text-blue-800 mb-10'>Kindly Select Your Library Location</h2>

        <LocationSelector onLocationSelect={handleLocationSelect} />

        <div className="flex flex-row gap-60    items-center justify-around">
          <button
            className=" mt-1 bg-gradient-to-r from-sky-300 to-sky-400 text-white py-2 px-10 rounded-full"
            onClick={prevStep}
          >
            Back
          </button>
          <button
            className=" center  mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-20 rounded-full"
            onClick={nextStep}
          >
            Next
          </button>
        </div>
    </div>
  )
}

export default Step6
