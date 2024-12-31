import styles from './Chart.module.css'
import { Chart as ChartJS, CategoryScale, LinearScale, PieController, ArcElement, Title, Tooltip, Legend } from 'chart.js'; 
 ChartJS.register(CategoryScale, LinearScale, PieController, ArcElement, Title, Tooltip, Legend);
import { useRef,useEffect, memo } from "react";
import { Pie } from 'react-chartjs-2';


const Chart = (props) =>{
  // props.fn;
  // console.log("props.loan",props.loan);
  
     const data = {
        labels: ["Principle", "Interest", ],
        datasets: [
          {
            label: "Ratio of Principle and Interest",
            data: [props.home, props.totalInterest],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
            
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
            
            ],
            borderWidth: 1,
          },
        ],
      };
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    
    
        const chartRef = useRef(null); 
        const canvasRef = useRef(null); 
        useEffect(() => { 
            if (chartRef.current) {
                 chartRef.current.destroy();
            } 
            const ctx = canvasRef.current.getContext('2d'); 
            chartRef.current = new ChartJS(ctx, 
              { type: 'pie', 
                data, 
                options
               });
               
            return () => { 
              if (chartRef.current) { 
                  chartRef.current.destroy(); 
    
              } 
            }; 
         }, [data, options]);
    
    return (
        <>
        <div className={styles.monthly}>
          <p>Monthly Interest : $ {props.monthlyPay}</p>
        </div>
        <canvas ref={canvasRef} width="100" height="100"></canvas>
        </>
    )
}

export default memo( Chart);