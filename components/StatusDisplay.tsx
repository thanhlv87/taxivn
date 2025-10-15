import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface StatusDisplayProps {
  icon: 'location' | 'info' | 'error' | 'loading';
  title: string;
  message: string;
  children?: React.ReactNode;
}

// Fix: Replaced JSX.Element with React.ReactElement to resolve namespace issue.
const icons: { [key in StatusDisplayProps['icon']]: React.ReactElement } = {
  location: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-sky-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  ),
  error: (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  ),
  loading: <LoadingSpinner />
};

const StatusDisplay: React.FC<StatusDisplayProps> = ({ icon, title, message, children }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full">
      <div className="mb-4">
        {icons[icon]}
      </div>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h2>
      <p className="text-slate-600 dark:text-slate-400 max-w-sm">{message}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};

export default StatusDisplay;