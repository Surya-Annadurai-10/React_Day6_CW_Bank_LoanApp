import styles from "./myComponent.module.css";
import { useRef,useEffect } from "react";
import { Pie } from 'react-chartjs-2';
 import { Chart as ChartJS, CategoryScale, LinearScale, PieController, ArcElement, Title, Tooltip, Legend } from 'chart.js'; 
 ChartJS.register(CategoryScale, LinearScale, PieController, ArcElement, Title, Tooltip, Legend);

const MyComponent = () => {
  const data = {
    labels: ["Principle", "Interest", ],
    datasets: [
      {
        label: "Ratio of Principle and Interest",
        data: [3000, 317],
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
             chartRef.current = new ChartJS(ctx, { type: 'pie', data, options, });
              return () => { 
                if (chartRef.current) 
                    { chartRef.current.destroy(); 

                    } 
                }; 
            }, 
            [data, options]
        );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.box}>
            <h2>Home Value</h2>
            <p className={styles.value}>$3000</p>
            <input type="range" min={"1000"} value={"3000"} max={"10000"} />
            <div className={styles.minMax}>
              <p>$1000</p>
              <p>$10000</p>
            </div>
          </div>
          <div className={styles.box}>
            <h2>Down Payment</h2>
            <p className={styles.value}>$600</p>
            <input type="range" min={"0"} value={"600"} max={"3000"} />
            <div className={styles.minMax}>
              <p>$0</p>
              <p>$3000</p>
            </div>
          </div>
          <div className={styles.box}>
            <h2>Loan Amount</h2>
            <p className={styles.value}>$2400</p>
            <input type="range" min={"0"} value={"2400"} max={"3000"} />
            <div className={styles.minMax}>
              <p>$0</p>
              <p>$3000</p>
            </div>
          </div>
          <div className={styles.box}>
            <h2>Interest Rate</h2>
            <p className={styles.value}>5 %</p>
            <input type="range" min={"5"} value={"18"} max={"10000"} />
            <div className={styles.minMax}>
              <p>2 %</p>
              <p>18 %</p>
            </div>
          </div>
          <div>
            <fieldset className={styles.field}>
              <legend>Tenure</legend>
              <select name="" id="year">
                <option value={"5"}>5 years</option>
                <option value={"10"}>10 years</option>
                <option value={"15"}>15 years</option>
                <option value={"20"}>20 years</option>
                <option value={"25"}>25 years</option>
              </select>
            </fieldset>
          </div>
        </div>

        <div  className={styles.right}>
        <canvas ref={canvasRef} width="100" height="100"></canvas>
        </div>
      </div>
    </>
  );
};

export default MyComponent;
