import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName="mt-4"
      toastOptions={{
        // Styling
        className: `
          text-sm font-medium 
          bg-white dark:bg-gray-800 
          text-gray-800 dark:text-gray-100
          shadow-xl rounded-xl
          border border-gray-200 dark:border-gray-700
          backdrop-blur-sm
          max-w-xs
        `,
        style: {
          padding: '1rem',
          minWidth: '280px',
          maxWidth: '350px',
          fontFamily: `'Inter', sans-serif`,
          transition: 'all 0.3s ease-in-out',
        },
        duration: 4000,

        // Success theme
        success: {
          icon: (
            <span className="text-green-500 flex items-center justify-center h-5 w-5">
              ✅
            </span>
          ),
          style: {
            background: '#f0fdf4',
            color: '#16a34a',
            borderColor: '#dcfce7',
          },
        },

        // Error theme
        error: {
          icon: (
            <span className="text-red-500 flex items-center justify-center h-5 w-5">
              ❌
            </span>
          ),
          style: {
            background: '#fef2f2',
            color: '#ef4444',
            borderColor: '#fecdd3',
          },
        },

        // Loading theme
        loading: {
          icon: (
            <span className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-gray-600 rounded-full flex items-center justify-center"></span>
          ),
          style: {
            background: '#f8fafc',
            color: '#475569',
            borderColor: '#e2e8f0',
          },
        },
      }}
    />
  );
}