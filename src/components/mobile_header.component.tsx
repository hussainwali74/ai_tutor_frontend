import React from "react";
import MobileSidebarComponent from "./mobile_sidebar.component";

export default function MobileHeaderComponent() {
  return (
    <div className="lg:hidden px-6 h-20 flex items-center bg-yellow-400 border-b fixed top-0  w-full  z-50">
        <MobileSidebarComponent />
    </div>
  );
}
