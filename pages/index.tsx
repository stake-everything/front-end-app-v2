//import Head from 'next/head'
//import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from './../components/navBar'
import BottomNav from './../components/bottomNav'
//import Main from './../views/main'

//////
import {db} from './../config/config.js';
import React from 'react';
import Accord from './../components/Accordion';
import { FiLoader } from 'react-icons/fi';
import { coinDataT, histDataT } from './../types';
  

function Spinner() {
  return(
    <div className={styles["Spinner"]}>
        <FiLoader size={34} className={styles["icon-spin"]}/>
    </div>
);
}

export default function Home() {

  const [data,setData] = React.useState<coinDataT | null>(null);
  const [hData,setHistoricData] = React.useState<histDataT | null>(null);
  const [query,setQuery] = React.useState<string>("");

  const _filter = (data: coinDataT) => {
    if(query.length>0){
      let out = Object.fromEntries( Object.entries(data).filter( ([key,value]) => key.toLowerCase().includes( query.toLowerCase() ) ) );
      return out;
      }
    else{return data;}
    }

  const DataComp =()=> {
    return(  
    <>
      <input
        type="text"
        value={query}
        onInput={ (event) => setQuery( (event.target as HTMLInputElement).value ) }
        id={styles["header-search"]}
        placeholder="Search..."
        name="s" 
        autoComplete="off"
      />
      <Accord data={ _filter(data) } histData={hData} />
      </>
      );
  }

  const loadData = (tag: string) => {
    const dbRef = db.ref();
    dbRef.child(tag).get().then((snapshot) => {
      if (snapshot.exists()) {
  
        if (tag=="coins"){setData( snapshot.val() )}
        else if (tag=="historic"){setHistoricData( snapshot.val() )}
  
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  React.useEffect(() => {

  loadData("coins");
  loadData("historic");

  return () => {
    console.log("cleanup")
  }
}, [])

  return (
    <div className={ (data==null || hData==null) ? styles.Main0 : styles.Main1 }>
          <Banner />
          { (data==null || hData==null) ? <Spinner /> : <DataComp />}
          <BottomNav />
    </div>
  )
}
