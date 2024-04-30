'use client'

import Image from "next/image";
import styles from "./page.module.scss";
import SearchForecastByCity from "@/components/SearchForecastByCity";

const Home = () => {
  return (    <main className={styles.main}>
        <SearchForecastByCity />
    </main>
  );
}

export default Home;
