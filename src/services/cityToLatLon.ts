export const getCityToLatLon = async (city: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECT_GEOCODING_API}?q=${city}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const json = await response.json();
    return json;
  };