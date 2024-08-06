// Import React and useEffect hook
import React, { useState, useEffect } from 'react';
// Import DotLottieReact from @lottiefiles/dotlottie-react
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import dynamic from 'next/dynamic';

// Dynamically import DotLottieReact without SSR
const DynamicDotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then(mod => mod.DotLottieReact),
  { ssr: false }
);

const LottaComponent: React.FC = () => {
  // State to track if component should render DotLottieReact
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set state to true once component mounts (client side)
    setIsClient(true);
  }, []);

  return (
    <div>
      {/* Conditionally render DotLottieReact based on isClient state */}
      {isClient && (
        <DynamicDotLottieReact
          autoResizeCanvas={true}
          src="animation/1_yellow.lottie"
          width={4}
          height={4}
          loop
          autoplay
        />
      )}
    </div>
  );
};

export default LottaComponent;
