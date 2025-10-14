import React, { useState } from "react";

export default function AddWorkCalendar() {
  const [halfDay, setHalfDay] = useState(false);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weeks = ["All", "1st", "2nd", "3rd", "4th", "5th"];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4 sm:p-6 lg:p-10">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-7xl p-5 sm:p-6">
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
          Add Work Calendar
        </h2>

        {/* Checkbox */}
        <div className="mb-4 flex items-center space-x-2">
          <input
            id="halfDay"
            type="checkbox"
            checked={halfDay}
            onChange={(e) => setHalfDay(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="halfDay" className="text-gray-700 text-sm sm:text-base">
            Half working day & half weekend
          </label>
        </div>

        {/* Desktop / Tablet View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 border text-left">Day</th>
                {weeks.map((week) => (
                  <th key={week} className="p-3 border text-center">
                    {week}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day} className="hover:bg-gray-50">
                  <td className="p-3 border font-medium">{day}</td>
                  {weeks.map((week) => (
                    <td key={week} className="p-3 border text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                        />
                        {halfDay && (
                          <select className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Full Day</option>
                            <option>1st Half</option>
                            <option>2nd Half</option>
                          </select>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden space-y-4">
          {days.map((day) => (
            <div
              key={day}
              className="border rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <h3 className="font-semibold text-gray-800 mb-2">{day}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {weeks.map((week) => (
                  <div
                    key={week}
                    className="flex flex-col items-start border border-gray-200 p-2 rounded-lg bg-white"
                  >
                    <label className="text-xs font-medium mb-1">{week}</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                      {halfDay && (
                        <select className="border border-gray-300 rounded-md text-xs px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Full Day</option>
                          <option>1st Half</option>
                          <option>2nd Half</option>
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm sm:text-base">
            Cancel
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
