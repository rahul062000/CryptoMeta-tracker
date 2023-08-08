import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import { makeStyles } from 'tss-react/mui';
import CoinInfo from '../components/CoinInfo';
import { LinearProgress, Typography } from '@mui/material';
import { numberWithCommas } from '../components/Banner/Carousel';
import ReactHtmlParser from 'kt-react-html-parser';

const CoinsList = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { Currency, symbol } = CryptoState();
  useEffect(() => {
    const fetchCoin = async () => {
      try{
      const response = await fetch(SingleCoin(id))
      const data = await response.json()
      console.log("coindetails:",data)
      setCoin(data)
      console.log("coin:",coin)
      }catch(error)
      {
        console.error('Error fetching data:', error); 
      }
    }
    fetchCoin()
  }, [])

  const useStyles = makeStyles()((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center"
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%"
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat"
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketdata:{
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
    },
  },
}));
  const { classes } = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "white", }} />

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin && coin.image.large}
          alt={coin && coin.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant='h3' className={classes.heading}>
          {coin && coin.name}
        </Typography>
        <Typography variant='subtitle1' className={classes.description}>

          {ReactHtmlParser(coin.description.en.split(". ")[0])}.
          
        </Typography>
        <div className={classes.marketdata}>
          <span style={{ display: "flex" }}>
            <Typography variant='h5' className={classes.heading}>Rank :</Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{ fontFamily: "Montserrat", }}>{coin && coin.market_cap_rank}</Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant='h5' className={classes.heading}>Current price :</Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{ fontFamily: "Montserrat", }}>{symbol}{" "}
           
      { numberWithCommas( coin && coin.market_data.current_price[Currency.toLowerCase()])}
     </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant='h5' className={classes.heading}>Market Cap :</Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{ fontFamily: "Montserrat", }}>{symbol}{" "}
           
            {numberWithCommas(coin && coin.market_data.market_cap[Currency.toLowerCase()]
                  .toString()
                  .slice(0, -6) )+ "M"}
            </Typography>
          </span>
        </div>
      </div>
      {/*char*/}
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinsList
