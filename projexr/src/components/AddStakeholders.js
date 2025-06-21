import React, { useState } from 'react';

const AddStakeholders = () => {
  const [selectedStakeholders, setSelectedStakeholders] = useState([]);
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Add Stakeholders</h2>
      {/* MultiSelect Stakeholders */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <label className="block text-sm font-medium text-gray-700 mb-2">Stakeholders</label>
            <select
              multiple
              value={selectedStakeholders || []}
              onChange={e => {
                const options = Array.from(e.target.selectedOptions, option => option.value);
                setSelectedStakeholders(options);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Ram(Manager)">Ram(Manager)</option>
              <option value="Shivani(Manager)">Shivani(Manager)</option>
              <option value="John(Lead)">John(Lead)</option>
              <option value="Diljeet(Sales)">Diljeet(Sales)</option>
              <option value="Jack(QA)">Jack(QA)</option>
              <option value="Harish(Lead)">Harish(Lead)</option>
              <option value="Lina(QA)">Lina(QA)</option>
              <option value="Govind(Sales)">Govind(Sales)</option>
              <option value="Sara(Manager)">Sara(Manager)</option>
              <option value="Jai(Manager)">Jai(Manager)</option>
            </select>
            {/* Show selected values below the box, only if any are selected */}
            {selectedStakeholders && selectedStakeholders.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedStakeholders.map((name) => (
                  <span key={name} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>
    </div>
  );
}
export default AddStakeholders; 