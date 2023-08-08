import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import { CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS,LineElement,PointElement,CategoryScale,LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { chartDays } from '../config/data';
import SelectButton from './Banner/SelectButton';
//  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
ChartJS.register(LineElement,PointElement,CategoryScale, LinearScale,ArcElement, Tooltip, Legend);
const CoinInfo = ({coin}) => {
    const [history,setHistory]=useState();
    const [days,setDays]=useState(1);
    const {Currency}=CryptoState();
    

    useEffect(()=>{
        const fetchHistoryCoins = async () => {
            const response = await fetch(HistoricalChart(coin.id,days,Currency))
            const data = await response.json()
            console.log("data:",data)
            setHistory(data.prices)
            console.log("historydata:",history)
        }
        fetchHistoryCoins()
    },[Currency,days])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
        components: {
            MuiPagination: {
              styleOverrides: {
                ul: {
                  color: 'white', // Set the text color to white
                },
              },
            },
          },
    })

    const useStyles=makeStyles()((theme)=>({
        container: {
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]: {
              width: "100%",
              marginTop: 0,
              padding: 20,
              paddingTop: 0,
            },
          },
       }));
       const {classes}=useStyles();
  return (
   <ThemeProvider theme={darkTheme}>
    <div className={classes.container}>
        {!history?(
            <CircularProgress style={{color:"#4d4dff"}} size={250} thickness={1}/>
        ):(<>
        
        <Line
            data={{
              labels: history.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: history.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${Currency}`,
                  borderColor: "#4d4dff", //bodrerclor golden
                },
              ],
            }}
            options={{
              
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
        />
        <div
         style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "space-around",
          width: "100%",
        }}> 
          {chartDays.map((day)=>(
            <SelectButton
            key={day.value}
            onClick={() => {setDays(day.value);
             
            }}
            selected={day.value === days}
          >
            {day.label}
          </SelectButton>
          ))}
        </div>
        </>)}
    </div>
   </ThemeProvider>
  )
}

export default CoinInfo
