import React, { useState } from 'react';
import { VIETNAM_PROVINCES } from '../constants/provinces';

interface ChangeProvinceSelectorProps {
  onSelect: (province: string) => void;
}

const ChangeProvinceSelector: React.FC<ChangeProvinceSelectorProps> = ({ onSelect }) => {
  const [selectedProvince, setSelectedProvince] = useState<string>(VIETNAM_PROVINCES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProvince) {
      onSelect(selectedProvince);
    }
  };

  return (
    <div className="text-center">
      <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
        Tìm taxi ở một tỉnh/thành phố khác?
      </h4>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full max-w-md mx-auto">
        <label htmlFor="change-province-select" className="sr-only">Chọn tỉnh thành khác</label>
        <select
          id="change-province-select"
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="w-full sm:w-auto flex-grow px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900 dark:text-slate-100"
          aria-label="Chọn tỉnh thành khác"
        >
          {VIETNAM_PROVINCES.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-sky-500 transition-colors"
          disabled={!selectedProvince}
        >
          Tìm
        </button>
      </form>
    </div>
  );
};

export default ChangeProvinceSelector;
