import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { CoinList } from '../config/api';
import { Container, LinearProgress, Table, TableCell, TableContainer, TableHead, TextField, ThemeProvider, Typography, createTheme, TableRow, TableBody, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { numberWithCommas } from './Banner/Carousel';



const Coinstable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState([]);
    // eslint-disable-next-line
    const [search, setSearch] = useState('');
    const { Currency, symbol } = CryptoState();
const[page,setPage]=useState(1);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                setLoading(true);
                const response = await fetch(CoinList(Currency))
                const data = await response.json()
                setCoins(data);
                console.log(data)
                setLoading(false)
            }
            catch (error) {
                console.log(error)
                setLoading(false)
                setCoins([]);
            }
        }
        fetchCoins()

    }, [Currency])

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
    // in home page this code of line help us to search particular coins which i write in textfeild


    const useStyles = makeStyles()(() => ({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
            },
            fontFamily: "Montserrat",
        },
        gradientLink: {
            background: 'linear-gradient(to right, #00008B, #1E90FF)',
            color:'white', // Replace with your desired gradient colors
    // Other styles here
          },
        pagination: {
            "& .MuiPaginationItem-root":{
            color: '#4d4dff',
            },
          },
          inputText: {
            color: 'white', // Set the desired text color
          },
          labelText: {
            color: 'white', // Color for the label
          },
          notchedOutline: {
            borderColor: 'white', // Border color for the outline
          },
          textFieldRoot: {
            '&:hover $notchedOutline': {
              borderColor: 'white', // Override hover border color
            },
          },
    }));
    const { classes } = useStyles();
    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search)
      );
    return (
        <ThemeProvider theme={darkTheme}>
            <Container
                style={{ textAlign: "center" }}
            >
                <Typography
                    variant='h4'
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField label="Search for a Crypto Currency.." variant="outlined"
                    style={{ marginBottom: 20, width: "100%", borderColor: "white" }}
                   // sx={{ border: '1px solid green', borderRadius: 1 }}
                   InputProps={{
                    style: {
                        borderColor: "white", // Set the border color for both focused and unfocused state
                      },
                    classes: {
                      input: classes.inputText,
                     // focused: classes.inputFocused, // Apply focused class
                      notchedOutline: classes.notchedOutline, // Apply notchedOutline class // Apply your custom class here
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelText, // Apply the custom style for the label
                    },
                  }}
                  classes={{
                    root: classes.textFieldRoot, // Apply the custom style for the root element
                  }}
                  value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "white" }} />
                        ) : (
                            <Table>
                                <TableHead  className={classes.gradientLink} style={{color:'white'}}>
                                    <TableRow>
                                        {
                                            ["Coin", "Price", "24h Change", "Market Cap"].map((head) => (

                                                <TableCell
                                                    style={{
                                                        color: "white",
                                                        fontWeight: "700",
                                                        fontFamily: "Montserrat",
                                                    }}
                                                    key={head}
                                                    align={head === "Coin" ? "inherit" : "right"}
                                                >
                                                    {head}
                                                </TableCell>
                                            ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>{
                                    /**/

                                    // handleSearch().
                                    filteredCoins.length > 0 && filteredCoins.slice((page-1)*10,(page-1)*10+10).map((row) => {
                                        console.log('Row:', row);
                                        const profit = row.price_change_percentage_24h > 0;
                                        console.log('Image URL:', row.image);
                                        return (
                                            <TableRow
                                                component={Link}
                                                to={`/coins/${row.id}`}
                                                className={classes.row}
                                                key={row.name}
                                            >


                                                <TableCell component="td" scope="row"
                                                    style={{
                                                        display: "flex",
                                                        gap: 15,
                                                    }}
                                                >
                                                    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                                                        <img src={row && row.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }} />
                                                    </div>
                                                    <div

                                                        style={{ display: "flex", flexDirection: "column" }}>
                                                        <span style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 22,
                                                            color: "white"
                                                        }}>
                                                            {row.symbol}
                                                        </span>
                                                        <span

                                                            style={{ color: "darkgrey" }}>
                                                            {row.name}
                                                        </span>

                                                    </div>
                                                </TableCell>

                                                <TableCell align='right'
                                                    style={{ color: "white" }}>
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell
                                                    align='right'
                                                    style={{
                                                        color: profit > 0 ? "rgb(14,203,129)" : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell
                                                    align='right'
                                                    style={{ color: "white" }}
                                                >
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row.market_cap.toString().slice(0, -6)
                                                    )}M
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )
                                }
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                <Pagination count={Math.ceil(coins.length / 10).toFixed(0)} 
               classes={{ul:classes.pagination}}
               onChange={(_,value)=>{
                setPage(value);
                window.scroll(0,450);
               }}
               style={{
                    padding:20,
                    width:"100%",
                    display:"flex",
                    justifyContent:"center",
                    
                }}
              sx={{ color: 'red' }}
                />


            </Container>
        </ThemeProvider>
    )
}

export default Coinstable
