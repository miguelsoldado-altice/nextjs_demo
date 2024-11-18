"use client";

import React, { useEffect, useState } from "react";

export function HydrationErrorTimestamp() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="fixed top-0 w-full pt-8 text-center">{currentTime}</div>;
}
