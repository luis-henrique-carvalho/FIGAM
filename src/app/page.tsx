
import React from 'react'
import HeaderHome from './components/HeaderHome';
import AboutHome from "./components/AboutHome";
import CoreHome from "./components/Core";

import { createClient } from '@/prismicio';

const Home = async () => {
  const prismic = createClient();
  const home: any = await prismic.getByUID("home", "home_page_1");

  const data = home.data

  return (
    <div className="flex flex-col gap-5">
      <HeaderHome data={data} />
      <AboutHome data={data} />
      <CoreHome data={data} />
    </div>

  )
}

export default Home
