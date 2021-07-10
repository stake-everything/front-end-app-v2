import styles from './../styles/Home.module.css';
import React, { useState } from 'react';
import {FC} from 'react';
import { IconContext } from 'react-icons';
import { CgArrowTopRightR } from "react-icons/cg";
import { FiPlus, FiMinus } from 'react-icons/fi';
import LineChart from './hchart';
import { coinDataT, histDataT, histDataCoinT, coinInfoT } from './../types';



// interface coinInfoT{
//   apy?: number,
//   apr?: number,
//   tag: string,
//   token_earned: string,
//   url: string,
//   return?: number,
// }

// interface coinDataIndT{
//   image_uri?: string,
//   info: coinInfoT[]
// }

// interface histDataCoinT{
//    [index: string]: number[][]
// }

// interface histDataT{
//   [index: string]: histDataCoinT
// }


////////////

interface AccordPropsT{
  data: coinDataT,
  histData: histDataT
}

interface DropListPropsT{
  histData: histDataCoinT,
  info: coinInfoT[],
  _item: string

}

interface insideListElProps {
  site: string,
  url:string,
  token_earned:string,
  apry: string,
  apry_val:number,
  tag:string
}

interface coinInfo {
  apy?: number,
  apr?: number,
  tag: string,
  token_earned: string,
  url: string,
  return?: number,
}

interface coinDataInd{
  image_uri?: string,
  info: coinInfo[]
}

interface coinDataAll{[index: string]: coinDataInd}

const style1={}
const style2 = {backgroundColor:"#118ab2",padding:"0.5%",borderRadius:"4px"}

const InsideListElementData = (props: {data:coinInfoT} ): JSX.Element =>{
  //site={ind_site.site} url={ind_site.url} token_earned={ind_site.token_earned} apry={ ind_site.apr ? "APR" : "APY" } apry_val={ ind_site.apr ? ind_site.apr : ind_site.apy } />
  
  console.log("inside list el")
  console.log(props)
  let data: coinInfoT = props.data;
  let retType: string = data.apr ? "APR" : "APY";
  //needs to be fixed
  let ret: number | undefined = data.apr ? data.apr : data.apy

  return(
      <div className={styles["DropDownListEl"]}>
          <div className={styles["List-element"]}>
            <div className={styles["ddle-text"]}>
              <div className={styles["ddle-text-item"]}><b>Farm :</b> {data.site}</div>
              <div className={styles["ddle-text-item"]}><b>Token earned :</b> {data.token_earned}</div>
              <div className={styles["ddle-text-item"]}><b>{retType} :</b> {ret}%</div>
            </div>
            <a className={styles["A-tag"]} href={data.url}>
              <CgArrowTopRightR style={{color:"white"}}/>
            </a>
          </div>
      </div>
  );}

const DropdownListGroup = (props: DropListPropsT): JSX.Element => {

  
  console.log( "inside ddlg" )
  console.log( props )  

  let INFO: coinInfoT[] = props.info;

    const listItems = INFO.map(
          //   <InsideListElement site={site.site} url={site.url} apry_val={ site.apr ? "APR" : "APY" } apry_val={ site.apr ? site.apr : site.apy } />
      (ind_site) =>
      (
      <>
      <InsideListElementData data={ind_site} />
      <LineChart histData={ props.histData } tag={ind_site.tag} _item={props._item} />
      </>
      )
    );
    
    return(
        <ul className={styles["Dd-list"]}>coinInfoT
            {listItems}
        </ul>
    );

}

const Accordion = ( props: AccordPropsT): JSX.Element => {

  const [clicked, setClicked] = useState<number>(-1);
  
  let data: coinDataT= props.data;
  let histData: histDataT = props.histData;
  let coins = Object.keys(data);

  const avg_return=(a: any)=>{
    let s=0;
  
    for (let i=0;i<a.length;i++){
      if (  Object.keys( a[i] ).includes("apy")  ){s=s+a[i]["apy"]}
      else if (  Object.keys( a[i] ).includes("apr")  ){s=s+a[i]["apr"]}
      else{s=s+0}
    }
    return( (s/a.length).toFixed(1) );
  }

  const toggle = (index: number) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(-1);
    }

    setClicked(index);
  };
  
  return (
    <IconContext.Provider value={{ color: 'black', size: '25px' }}>
      <div style={{height: "100%" }} className={styles["List-section"]}>
        <div className={styles["Cont"]}>
          {
          
          coins.map((item, index) => {
            return (
              <>
                <div className={styles["Wrap"]} onClick={() => toggle(index)} key={index}>
                 <div className={styles["Coin-logo"]}>
                    <img
                        alt=""
                        src={data[item].image_uri}
                        width="22"
                        height="22"
                    />
                  <h6 className={styles["Coin-title"]}><b>{item} - { avg_return( data[item]["info"] ) }%  </b></h6>
                 </div>
                  {clicked === index ? <FiMinus /> : <FiPlus />}
                </div>
                <div style={clicked === index ? style2 : style1}>
                {clicked === index ? (
                      <DropdownListGroup info={ data[item]["info"] } 
                                         _item={item} 
                                         histData={histData[item]} />
                ) : null}
                </div>
              </>
            );
          })
          }
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Accordion;