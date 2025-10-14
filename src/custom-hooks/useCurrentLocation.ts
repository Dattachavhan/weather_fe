import { useEffect, useState } from "react";
import type { ICordinates } from "../api/types";

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<ICordinates | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => setError(err.message)
    );
  }, []);

  return { location, error };
};
