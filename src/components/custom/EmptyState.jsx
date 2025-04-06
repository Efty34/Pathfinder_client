const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[500px] text-center">
      <div className="w-24 h-24 rounded-full bg-black border-2 border-teal-primary flex items-center justify-center mb-6 animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-teal-light"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-blue-light mb-2">
        No Roadmap Generated Yet
      </h3>
      <p className="text-gray-400 max-w-md">
        Enter a topic in the input field on the left and click "Generate
        Roadmap" to create your personalized learning path.
      </p>
    </div>
  );
};

export default EmptyState;
