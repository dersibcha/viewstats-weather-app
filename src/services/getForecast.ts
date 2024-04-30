export const getForecast = async (lat:string, lon:string) => {
  if (lat && lon) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ONE_CALL_API}?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      return null;
    }
  }
  return null
};