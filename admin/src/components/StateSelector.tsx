
const StateDropdown = ({ value, onChange }:any) => {
  const statesOfIndia = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];
  

  return (
    <div className="flex-col items-center justify-start mb-4 rounded-2xl ">
      <label
        htmlFor="adminState"
        className="w-1/2 text-gray-700 text-left font-mulish font-bold text-md leading-tight rounded-md"
      >
        State
      </label>
      <select
        className="w-full px-5 py-2 border border-gray-500   rounded-xl "
        id="adminState"
        name="adminState"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled className="rounded-md">Select your state</option>
        {statesOfIndia.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateDropdown;