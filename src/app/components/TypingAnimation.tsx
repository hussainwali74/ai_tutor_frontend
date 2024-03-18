const TypingAnimation = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-200 to-purple-700 animate-pulse"></div>
      <div className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-200 to-purple-800 animate-pulse delay-75"></div>
      <div className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-200 to-purple-900 animate-pulse delay-150"></div>
    </div>
  );
};

export default TypingAnimation;
