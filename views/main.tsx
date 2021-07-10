import styles from './../styles/Home.module.css';
import {db} from './../config/config.js';
import React from 'react';
import Accord from './../components/Accordion';
import { FiLoader } from 'react-icons/fi';
import { coinDataT, histDataT } from './../types';

export default function App(){

const [data,setData] = React.useState<coinDataT | null>(null);
const [historicData,setHistoricData] = React.useState<histDataT | null>(null);
const [query,setQuery] = React.useState<string>("");

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

  // WebFont.load({
  //   google: {
  //     families: ["Nunito"]
  //  }
  // });
  return () => {
    console.log("cleanup")
  }
}, [])

const _filter = (data: coinDataT) => {
if(query.length>0){
  let out = Object.fromEntries( Object.entries(data).filter( ([key,value]) => key.toLowerCase().includes( query.toLowerCase() ) ) );
  return out;
  }
else{return data;}
}

if (data==null || historicData==null){
  return(
        <div className={styles["App"]}>
          <div>
            <FiLoader size={28} className={styles["icon-spin"]}/>
          </div>
        </div>
  );
}
else{

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
  <Accord data={ _filter(data) } histData={historicData} />
  </>
  );
}
}
