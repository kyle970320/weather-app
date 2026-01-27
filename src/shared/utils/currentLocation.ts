export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("GEOLOCATION_PERMISSION_DENIED"));
            break;
          case error.TIMEOUT:
            reject(new Error("GEOLOCATION_TIMEOUT"));
            break;
          default:
            reject(new Error("GEOLOCATION_UNKNOWN_ERROR"));
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
};
