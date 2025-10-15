
import React, { useState } from 'react';
import { VIETNAM_PROVINCES } from '../constants/provinces';

interface ProvinceSelectorProps {
  onSelect: (province: string) => void;
}

const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({ onSelect }) => {
  const [selectedProvince, setSelectedProvince] = useState<string>(VIETNAM_PROVINCES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProvince) {
      onSelect(selectedProvince);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-sm">
      <label htmlFor="province-select" className="sr-only">Chọn tỉnh thành</label>
      <select
        id="province-select"
        value={selectedProvince}
        onChange={(e) => setSelectedProvince(e.target.value)}
        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900 dark:text-slate-100"
        aria-label="Chọn tỉnh thành"
      >
        {VIETNAM_PROVINCES.map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-sky-500 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
        disabled={!selectedProvince}
        aria-label="Tìm taxi tại tỉnh thành đã chọn"
      >
        Tìm Taxi
      </button>
    </form>
  );
};

export default ProvinceSelector;
