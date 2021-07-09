import styles from './../styles/Home.module.css';
import React, { useState } from 'react';
import {FC} from 'react';
import { IconContext } from 'react-icons';
import { CgArrowTopRightR } from "react-icons/cg";
import { FiPlus, FiMinus } from 'react-icons/fi';
import LineChart from './hchart'



let style1={}
let style2 = {backgroundColor:"#118ab2",padding:"0.5%",borderRadius:"4px"}

// interface props {
//   jim?: number;
// }


const DropdownListGroup:FC = (props: any) => {

    const InsideListElementData:FC = (props: any) =>{
        return(
            <div className={styles["DropDownListEl"]}>
                <div className={styles["List-element"]}>
                  <div className={styles["ddle-text"]}>
                    <div className={styles["ddle-text-item"]}><b>Farm :</b> {props.site}</div>
                    <div className={styles["ddle-text-item"]}><b>Token earned :</b> {props.token_earned}</div>
                    <div className={styles["ddle-text-item"]}><b>{props.apry} :</b> {props.apry_val}%</div>
                  </div>
                  <a className={styles["A-tag"]} href={props.url}>
                    <CgArrowTopRightR style={{color:"white"}}/>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
                  <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
                  </svg> */}
                  </a>
                </div>
            </div>
        );}

    let INFO = props.info;

    const listItems = INFO.map((ind_site: any) =>
    //   <InsideListElement site={site.site} url={site.url} apry_val={ site.apr ? "APR" : "APY" } apry_val={ site.apr ? site.apr : site.apy } />
      (
      <>
      <InsideListElementData site={ind_site.site} url={ind_site.url} token_earned={ind_site.token_earned} apry={ ind_site.apr ? "APR" : "APY" } apry_val={ ind_site.apr ? ind_site.apr : ind_site.apy } />
      <LineChart histData={ props.histData } tag={ind_site.tag} _item={props._item} />
      </>
      )
    );
    
    return(
        <ul className={styles["Dd-list"]}>
            {listItems}
        </ul>
    );

}

const Accordion:FC = (props: any) => {


  const avg_return=(a: any)=>{
    let s=0;

    for (let i=0;i<a.length;i++){
      if (  Object.keys( a[i] ).includes("apy")  ){s=s+a[i]["apy"]}
      else if (  Object.keys( a[i] ).includes("apr")  ){s=s+a[i]["apr"]}
      else{s=s+0}
    }
    return( (s/a.length).toFixed(1) );
  }

  const [clicked, setClicked] = useState<number>(-1);


  let data = props.data;
  let coins = Object.keys(data);

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
      {/* <div className="List-section"> */}
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
                        // className="d-inline-block align-top"
                    />
                  {/* <div className="Coin-title"><p><b>{item}</b></p></div> */}
                  <h6 className={styles["Coin-title"]}><b>{item} - { avg_return( data[item]["info"] ) }%  </b></h6>
                 </div>
                  {/* <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span> */}
                  {clicked === index ? <FiMinus /> : <FiPlus />}
                </div>
                <div style={clicked === index ? style2 : style1}>
                {clicked === index ? (
                      <DropdownListGroup info={data[item]["info"]} _item={item} histData={props.histData} />
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