import { Line,defaults } from 'react-chartjs-2';
import styles from './../styles/Home.module.css';
import _ from 'lodash';

defaults.font.family = "Nunito";


const LineChart = (props) => {

    
    console.log(props)
    let l=14
    let hdata=props.histData;
    let item=props._item;
    let tag=props.tag;
    let days = _.range(l)
    days = days.map( (n)=>(n+1).toString() )
    let keys = Object.keys( hdata );
    let _data=null;
    if (keys.includes(tag)){ _data=hdata[tag] }

    if (_data){

      if (_data[item].values.length>6){
        const data = {
          labels: days,
          datasets: [
            {
              label: 'Daily Avg Return',
              data: _data[item].values.slice(-l),
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ],
        };
          const options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };

        return(
        <div className={styles["DropDownListEl2"]}>
          <Line data={data} options={options} />
        </div>
        );
      }
      else{return(<></>);}
    }
    else{return(<></>);}
  }
  export default LineChart;
