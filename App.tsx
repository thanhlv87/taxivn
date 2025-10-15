import React, { useState, useCallback } from 'react';
// import { fetchTaxisByLocation, fetchTaxisByProvinceName } from './services/geminiService';
import { TaxiData, AppStatus } from './types';
import TaxiCard from './components/TaxiCard';
import StatusDisplay from './components/StatusDisplay';
import ProvinceSelector from './components/ProvinceSelector';
import ChangeProvinceSelector from './components/ChangeProvinceSelector';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>('PROMPTING');
  const [error, setError] = useState<string | null>(null);
  const [taxiData, setTaxiData] = useState<TaxiData | null>(null);

  const getStatusContent = () => {
    switch (status) {
      case 'PROMPTING':
        return {
          icon: 'location' as const,
          title: 'Tìm taxi xung quanh bạn',
          message: 'Cho phép truy cập vị trí để tự động tìm taxi hoặc chọn tỉnh/thành phố của bạn theo cách thủ công.',
        };
      case 'FETCHING_LOCATION':
        return {
          icon: 'loading' as const,
          title: 'Đang xác định vị trí...',
          message: 'Chờ một chút trong khi chúng tôi tìm vị trí hiện tại của bạn.',
        };
      case 'PROMPTING_PROVINCE':
        return {
          icon: 'error' as const,
          title: 'Không thể lấy vị trí',
          message: error || 'Chúng tôi không thể tự động xác định vị trí của bạn. Vui lòng chọn tỉnh/thành phố của bạn để tiếp tục.',
        };
      case 'FETCHING_TAXIS':
        return {
          icon: 'loading' as const,
          title: 'Đang tìm các hãng taxi...',
          message: `Chúng tôi đang tìm taxi tại ${taxiData?.locationName || 'vị trí của bạn'}. Đang tải danh sách...`,
        };
      case 'ERROR':
        return {
          icon: 'error' as const,
          title: 'Đã xảy ra lỗi',
          message: error || 'Không thể tải dữ liệu. Vui lòng thử lại sau.',
        };
      default:
        return null;
    }
  };

  const handleProvinceSelect = useCallback(async (province: string) => {
    setStatus('FETCHING_TAXIS');
    // Set location name preemptively for the loading message
    setTaxiData({ locationName: province, taxis: [] });
    setError(null);

    // Use static data instead of API for static export
    try {
        // Use static taxi data directly
        const staticTaxiData: { [key: string]: any[] } = {
          '1': [ // Hà Nội
            { id: '1', name: 'Taxi Mai Linh', phone: '024.38616161', image: '/taxi-logos/mai-linh.png' },
            { id: '2', name: 'Taxi Group', phone: '024.38222222', image: '/taxi-logos/group.png' },
            { id: '3', name: 'Taxi ABC', phone: '024.38615151', image: '/taxi-logos/abc.png' },
            { id: '4', name: 'Taxi Thành Công', phone: '024.38353535', image: '/taxi-logos/thanh-cong.png' }
          ]
        };

        const provinceDataResult = staticTaxiData[province];
        const provinceData = staticTaxiData[province];

        if (provinceData) {
            setTaxiData({ locationName: province, taxis: provinceData });
            setStatus('SUCCESS');
        } else {
            throw new Error('Không tìm thấy dữ liệu cho tỉnh này');
        }
    } catch (error) {
        setStatus('ERROR');
        setError(error instanceof Error ? error.message : 'Lỗi không xác định.');
    }
  }, []);

  const startGeolocating = useCallback(() => {
    // Temporarily disable GPS location, redirect to manual province selection
    setStatus('PROMPTING_PROVINCE');
    setError('Tính năng định vị GPS tạm thời không khả dụng. Vui lòng chọn tỉnh/thành phố thủ công.');
  }, []);

  const renderContent = () => {
    if (status !== 'SUCCESS') {
      const statusContent = getStatusContent();
      return statusContent ? (
        <StatusDisplay {...statusContent}>
          {status === 'PROMPTING' && (
            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
              <button
                onClick={startGeolocating}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-sky-500 transition-colors"
                aria-label="Tìm taxi gần vị trí của bạn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                Tìm taxi gần đây
              </button>
              <button
                onClick={() => setStatus('PROMPTING_PROVINCE')}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-sky-500 transition-colors"
                aria-label="Chọn tỉnh thành thủ công"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75V17.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  Chọn tỉnh/thành phố
              </button>
            </div>
          )}
           {status === 'PROMPTING_PROVINCE' && (
            <ProvinceSelector onSelect={handleProvinceSelect} />
          )}
        </StatusDisplay>
      ) : null;
    }

    if (!taxiData || taxiData.taxis.length === 0) {
      return (
          <>
            <StatusDisplay 
              icon="info"
              title="Không tìm thấy taxi"
              message={`Chúng tôi không thể tìm thấy hãng taxi nào cho khu vực ${taxiData?.locationName || 'của bạn'}.`}
            />
            <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8">
              <ChangeProvinceSelector onSelect={handleProvinceSelect} />
            </div>
          </>
      );
    }
    
    return (
       <>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {taxiData.taxis.map((taxi) => (
            <TaxiCard key={`${taxi.name}-${taxi.phone}`} taxi={taxi} />
          ))}
        </div>
        <div className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-8">
          <ChangeProvinceSelector onSelect={handleProvinceSelect} />
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-50 flex flex-col">
      <main className="container mx-auto p-4 md:p-6 lg:p-8 flex-grow flex flex-col">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            <span className="text-sky-500">Taxi</span>Finder
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Gọi taxi nhanh chóng tại {taxiData?.locationName || 'Việt Nam'}
          </p>
        </header>
        <div className="flex-grow flex flex-col justify-center">
          {renderContent()}
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} Taxi Finder Vietnam. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;