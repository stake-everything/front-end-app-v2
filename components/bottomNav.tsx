// import logo from './../assets/steak.svg';
import styles from './../styles/Home.module.css';
import Image from 'next/image';

export default function App(){

    return(
        <div className={styles["Bottom-nav"]}>
            <div id={styles["bn-text"]}>
                <p>APY and APR are updated every day.</p>
            </div>
            <div id={styles["bn-text"]}>
                <p>
                <img
                    alt=""
                    src="/assets/steak.svg"
                    width="32"
                    height="32"
                    className="d-inline-block align-center"
                />{' Stake Everything © 2021'}
                </p>
            </div>
         </div>
    );
}