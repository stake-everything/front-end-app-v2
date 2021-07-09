import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from './../components/navBar'
import BottomNav from './../components/bottomNav'
import Main from './../views/main'

export default function Home() {
  return (
    <div className={styles.App}>
          <Banner />
          <Main />
          <BottomNav />

    </div>
  )
}
