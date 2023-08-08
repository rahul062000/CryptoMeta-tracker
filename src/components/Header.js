import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { CryptoState } from '../CryptoContext';
import DigitalClock from './Banner/DigitalClock';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const useStyles = makeStyles()(() => ({
  title: {
    flex: 1,
    // color: 'white',
    fontFamily: "Montserrat",
    fontWeight: 'bold',
    cursor: "pointer"
  },
  gradientLink: {
    background: 'linear-gradient(to right, #00008B, #1E90FF)', // Replace with your desired gradient colors
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textDecoration: 'none',
    // Other styles here
  },
  appBar: {
    boxShadow: '0px 2px 5px -1px #0000A0', // Dark blue shadow
    // Other styles here
  },
}))
const Header = () => {
  const { classes } = useStyles();
  const {Currency,setCurrency}=CryptoState();

  console.log(Currency)
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static' className={classes.appBar}>
        <Container>
          <Toolbar>
            <Typography className={classes.title} variant='h5'><Link to="/" style={{color:"#8080ff"}} className={classes.gradientLink}>Crypto Meta</Link></Typography>
            <DigitalClock />&nbsp;
            <Select variant='outlined' style={{
              width: 100,
              height: 40,
              marginRight: 15,

            }}
            //according inr or usd header change their state
            value={Currency} onChange={(e)=>setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
