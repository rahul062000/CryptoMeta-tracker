import React, { useState, useEffect } from 'react'
import { makeStyles } from 'tss-react/mui';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles()(() => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
    },
}));

export function numberWithCommas(x) {
    if (x === undefined || x === null) {
        return ''; // Return an empty string if x is undefined or null
      }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const Carousel = () => {
    const { classes } = useStyles();
    //contextapi modulue
    const { Currency, symbol } = CryptoState();

    const [trending, setTrending] = useState([]);
    useEffect(() => {
        const fetchTradingCoins = async () => {
            const response = await fetch(TrendingCoins(Currency))
            const data = await response.json()
            console.log(data)
            setTrending(data)
        }
        fetchTradingCoins()
    }, [Currency])


    const items = trending.map((coin) => {
        let profit = coin && coin.price_change_percentage_24h >= 0;
        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img
                    src={coin && coin.image}
                    alt={coin && coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span>{coin && coin.symbol}
                    &nbsp;
                    <span
                        //this style help to change color of price according to up or down if its up its green or if its down its red
                        style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                        }}
                    >{profit && "+"}{coin && coin.price_change_percentage_24h !== undefined
                        ? coin.price_change_percentage_24h.toFixed(2)
                        : ""}</span>
                </span>
                <span style={{
                    fontSize: 22,
                    fontWeight: 500
                }}>
                    {symbol}{numberWithCommas(coin && coin.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })
    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4
        }
    }
    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
                autoPlay
            />
        </div>
    )
}

export default Carousel
