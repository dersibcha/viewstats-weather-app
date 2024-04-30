import { redirect } from 'next/navigation'
import { getForecast } from "@/services/getForecast";
import styles from "./forecast.module.scss";


type ForecastProps = {  
  searchParams: {
    name: string;
    lat: string;
    lon: string;
    country:string;
    state?:string;
  }
};

const Forecast = async ({searchParams}: ForecastProps) => {

  const {name, lat, lon, country, state} = searchParams
  
  const latLonRegex = /^-?\d+(\.\d+)?$/;
  
  if (!name || !lat || !lon || !country) {
    redirect('/');
  }
  if(!latLonRegex.test(lat) || !latLonRegex.test(lon)){
    redirect('/');
  }
  
  const forecast = await getForecast(lat, lon);

  if (!forecast) {
    redirect('/')
  }

  return (
    <main>
       
      <div className={styles.grid}>
        <div className='forecast__title'>
        <p>{`5 day Forecast`}</p>
        <p>{`${name}, ${state} ${country}`}</p>  
        </div>
      </div>
      <p>
        City:{JSON.stringify(searchParams)}
      </p>
      <p>
        {JSON.stringify(forecast)}
      </p>
        </main>
  );
}

export default Forecast;