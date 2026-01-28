import { useState } from "react";

export const useChangeWeatherMode = () => {
  const [mode, setMode] = useState<{ temp: string; pty: string }>({
    temp: "",
    pty: "",
  });

  const handleTempModeChange = (temp: string) => {
    setMode((prev) => {
      if (prev.temp === temp) {
        return { ...prev, temp: "" };
      } else {
        return { ...prev, temp };
      }
    });
  };

  const handlePtyModeChange = (pty: string) => {
    setMode((prev) => {
      if (prev.pty === pty) {
        return { ...prev, pty: "" };
      } else {
        return { ...prev, pty };
      }
    });
  };

  const getTempColor = (temp: string) => {
    if (mode?.temp === temp) {
      return "yellow";
    } else {
      return "white";
    }
  };

  const getPtyColor = (pty: string) => {
    if (mode?.pty === pty) {
      return "yellow";
    } else {
      return "white";
    }
  };

  return {
    mode,
    handleTempModeChange,
    handlePtyModeChange,
    getTempColor,
    getPtyColor,
  };
};
