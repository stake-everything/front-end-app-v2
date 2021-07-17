// import logo from './../assets/steak.svg';
import styles from './../styles/Home.module.css';
import Image from 'next/image'

export default function App(){

    return(
        <div className={styles["App-header"]}>
            <h4 id={styles["logo-text"]}>
            <img
                src="/assets/steak.svg"
                width="34"
                height="34"
                className={styles["imgg"]}
            /><b>{' Stake Everything'}</b>
            </h4>
            <h6 id={styles["bsc-text"]}>
            <b><i>{'Earn the best interest with your crypto on the Binance Smart Chain.'}</i></b>
            </h6>
         </div>
    );
}