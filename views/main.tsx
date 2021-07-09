import styles from './../styles/Home.module.css';
import {db} from './../config/config.js';
import React from 'react';
import Accord from './../components/Accordion';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import WebFont from 'webfontloader';

export default function App(){

const [data,setData] = React.useState<object>({});
const [historicData,setHistoricData] = React.useState<object>({});
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
  //   }
  // });


  return () => {
    console.log("cleanup")
  }
}, [])

const _filter = (data: any) => {
if(query.length>0){
  let out = Object.fromEntries( Object.entries(data).filter( ([key,value]) => key.toLowerCase().includes( query.toLowerCase() ) ) );
  return out;
  }
else{return data;}
}


if (data=={} || historicData=={}){
  return(
        <div className={styles["App"]}>
          <div>
            <p>
              Loading...
            </p>
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
    onInput={ e=>setQuery(e.target.value) }
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
