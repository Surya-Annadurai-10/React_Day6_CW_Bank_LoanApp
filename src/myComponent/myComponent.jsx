import styles from "./myComponent.module.css";
import { useRef,useEffect, useState } from "react";
 import Chart from "../Chart/Chart";

const MyComponent = () => {
const [monthlyPay , setMonthlyPay] = useState(45.29);
const [home , setHome] = useState(3000);
const [down , setDown] = useState(600);
const [loan , setLoan] = useState(2400);
const [interest , setInterest] = useState(5);
const [tenure , setTenure] = useState(5);
const [totalInterest , setTotalInterest] = useState(0)
// console.log("totalInterest",totalInterest);

const fn = () =>{
  let interestPerMonth = (interest / 100) / 12;
  let totalLoanMonths = tenure * 12;
  // console.log("loan" , loan);

 let  monthlyPayment = Number((loan * interestPerMonth *(1 + interestPerMonth) ** totalLoanMonths) / ((1 + interestPerMonth) ** totalLoanMonths - 1)).toFixed(2);

  // console.log("monthlyPayment : ",monthlyPayment);
  setMonthlyPay(monthlyPayment);
  
  let totalInterestGenerated = (monthlyPayment * totalLoanMonths - loan).toFixed(2);

 setTotalInterest(Number(totalInterestGenerated));
//  console.log("totalInterest",totalInterest);
 
}


const onHome = (e) =>{
  setHome(e.target.value);
  let downPay= (20 / 100) * e.target.value;
  setDown(downPay);
  let loanAm = e.target.value - downPay;
  setLoan(loanAm); 
  
// fn();
}

const onDown = (e) =>{
  setDown(e.target.value);
  let loanAmount = home - e.target.value;
  setLoan(loanAmount)
   
// fn();
}

const onLoan = (e) =>{
  setLoan(e.target.value);
  let down = home - e.target.value;
  setDown(down);
  
// fn();
}

const onInterest = (e) =>{
  setInterest(e.target.value);
  
// fn();
}



const onTenure = (e) =>{
  setTenure(e.target.value);
  // fn();
}

useEffect(() =>{
  // console.log("tenure",tenure);
  
fn();
});


 
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.box}>
            <h2>Home Value</h2>
            <p className={styles.value}>${home}</p>
            <input  onChange={onHome} value={home} type="range" min={"1000"}  max={"10000"} step={"100"} />
            <div className={styles.minMax}>
              <p>$1000</p>
              <p>${home}</p>
            </div>
          </div>
          <div className={styles.box}>
            <h2>Down Payment</h2>
            <p className={styles.value}>${down}</p>
            <input onChange={onDown} value={down} type="range" min={"0"}  max={home} step={"100"}  />
            <div className={styles.minMax}>
              <p>$0</p>
              <p>${home}</p>
            </div>
          </div>
          <div className={styles.box}>
            <h2>Loan Amount</h2>
            <p className={styles.value}>${loan}</p>
            <input onChange={onLoan} value={loan} type="range" min={"0"}  max={home} step={"100"}  />
            <div className={styles.minMax}>
              <p>$0</p>
              <p>${home}</p>
            </div>
          </div>
          <div className={styles.box}>
            <h2>Interest Rate</h2>
            <p className={styles.value}>{interest} %</p>
            <input  onChange={onInterest} type="range" min={"2"} value={interest}  max={"18"} />
            <div className={styles.minMax}>
              <p>2 %</p>
              <p>18 %</p>
            </div>
          </div>
          <div>
            <fieldset className={styles.field}>
              <legend>Tenure</legend>
              <select onChange={onTenure} name="" id="year">
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
          
          <Chart monthlyPay={monthlyPay} setMonthlyPay={setMonthlyPay} totalInterest={totalInterest} setTotalInterest={setTotalInterest}  home={home} fn={fn} />
        </div>
      </div>
    </>
  );
};

export default MyComponent;
