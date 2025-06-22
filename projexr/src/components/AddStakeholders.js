import React, { useState, useEffect, useRef } from 'react';

const AddStakeholders = () => {
  const [search, setSearch] = useState('');
  const [stakeholders, setStakeholders] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch('https://capitalmitra.com/wp-json/wp/v2/users?roles[]=team_member')
      .then(res => res.json())
      .then(data => setStakeholders(data))
      .catch(() => setStakeholders([]));
  }, []);

  // Filter out already selected users
  const filtered = stakeholders.filter(s =>
    !selected.some(sel => sel.id === s.id) &&
    ((s.name && s.name.toLowerCase().includes(search.toLowerCase())) ||
      (s.role && s.role.toLowerCase().includes(search.toLowerCase())))
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setShowDropdown(true);
  };

  const handleSelectUser = (user) => {
    setSelected([...selected, user]);
    setSearch('');
    setShowDropdown(false);
  };

  const handleRemove = (id) => {
    setSelected(selected.filter(s => s.id !== id));
  };

  return (
    <div className="px-10 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#121217] tracking-light text-[32px] font-bold leading-tight min-w-72">Stakeholders</p>
          {/* <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f1f4] text-[#121217] text-sm font-medium leading-normal"
          >
            <span className="truncate">Add</span>
          </button> */}
        </div>
        <div className="px-4 py-3 relative">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full relative">
              <div
                className="text-[#656a86] flex border-none bg-[#f0f1f4] items-center justify-center pl-4 rounded-l-xl border-r-0"
                data-icon="MagnifyingGlass"
                data-size="24px"
                data-weight="regular"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                  ></path>
                </svg>
              </div>
              <input
                ref={inputRef}
                placeholder="Search stakeholders"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121217] focus:outline-0 focus:ring-0 border-none bg-[#f0f1f4] focus:border-none h-full placeholder:text-[#656a86] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                value={search}
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
                autoComplete="off"
              />
              {/* Custom dropdown */}
              {showDropdown && filtered.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 top-full z-10 mt-1 w-[420px] max-h-72 overflow-y-auto bg-white border border-[#dcdee5] rounded-xl shadow-lg"
                >
                  {filtered.map((s) => (
                    <div
                      key={s.id}
                      className="px-4 py-2 cursor-pointer hover:bg-[#f0f1f4] flex flex-col"
                      onClick={() => handleSelectUser(s)}
                    >
                      <span className="font-medium text-[#121217]">{s.name}</span>
                      <span className="text-xs text-[#656a86]">{s.role || (s.roles && s.roles.join(', '))}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </label>
        </div>
        <div className="px-4 py-3 @container">
          {selected.length > 0 && (
            <div className="flex overflow-hidden rounded-xl border border-[#dcdee5] bg-white">
              <table className="flex-1">
                <thead>
                  <tr className="bg-white">
                    <th className="table-67ba9f60-a877-4ca3-a19f-ae0699a3e4db-column-120 px-4 py-3 text-left text-[#121217] w-[400px] text-sm font-medium leading-normal">Name</th>
                    <th className="table-67ba9f60-a877-4ca3-a19f-ae0699a3e4db-column-240 px-4 py-3 text-left text-[#121217] w-[400px] text-sm font-medium leading-normal">Role</th>
                    <th className="px-4 py-3 text-left text-[#121217] w-[100px] text-sm font-medium leading-normal">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.map(s => (
                    <tr className="border-t border-t-[#dcdee5]" key={s.id || s.name}>
                      <td className="table-67ba9f60-a877-4ca3-a19f-ae0699a3e4db-column-120 h-[72px] px-4 py-2 w-[400px] text-[#121217] text-sm font-normal leading-normal">
                        {s.name}
                      </td>
                      <td className="table-67ba9f60-a877-4ca3-a19f-ae0699a3e4db-column-240 h-[72px] px-4 py-2 w-[400px] text-[#656a86] text-sm font-normal leading-normal">
                        {s.role || (s.roles && s.roles.join(', '))}
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[100px] text-[#656a86] text-sm font-normal leading-normal">
                        <button onClick={() => handleRemove(s.id)} className="text-red-500 hover:underline">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStakeholders;