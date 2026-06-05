/**
 * LoadingSpinner.jsx
 * ------------------
 * A simple loading spinner component.
 * Used while data is loading or async operations are in progress.
 */

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}
