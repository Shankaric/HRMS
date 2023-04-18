import { Grid,  Typography, Button, Dialog,InputAdornment, IconButton,DialogContent, DialogActions, Box, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import { loginSignIn } from './Loginstyle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/Appcontext';
import { AUTH } from '../services/Authservice';
import { userStyle } from '../pageStyle';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

const Signin = () => {

  // Error Popup model
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [showAlert,
    //  setShowAlert
    ] = useState()
  // const handleClickOpenerr = () => {
  //   setIsErrorOpen(true);
  // };
  const handleCloseerr = () => {
    setIsErrorOpen(false);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [errorMessage, setErrorMessage] = useState('');


  useEffect(
    () => {
      document.body.classList.add('signinbackground');
      return () => {
        document.body.classList.remove('signinbackground');
      }
    }, []
  );

  const [signin, setSignin] = useState({ username: "", password: "", });

  const { auth, setAuth } = useContext(AuthContext);

  const backPage = useNavigate();

  const fetchHandler = async () => {
    try {
      const response = await axios.post
        (
          `${AUTH.LOGIN}`
          ,
          {
            username: String(signin.username),
            password: String(signin.password)
          });
      localStorage.setItem('APIToken', response.data.token);
      localStorage.setItem('LoginUserId', response.data.user._id)
      setAuth({ ...auth, loginState: true, APIToken: response.data.token, loginuserid: response.data.user._id });
      backPage('/dashboard');
      console.log(response);
      setSignin(response);
    }
    catch (error) {
     if (error.response && error.response.status === 401 ) {
        setErrorMessage('Invalid username or password');
        setSignin({username:"",password:""})
      } 
      backPage('/signin');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(signin.username === "" || signin.password === ""){
    setErrorMessage('Please enter username and password');
  }
    fetchHandler();
  }

  return (
    <>
       
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',boxShadow:'0px 0px 20px #00000029'}}>
          <Box sx={userStyle.loginbox}>
          <Grid sx={{ display: "flex" }}>
     
                                        
                <form onSubmit={handleSubmit}>
                  <Typography variant="h5" sx={loginSignIn.signInheadtxt}>HI-HRMS</Typography><br/>
               
                <InputLabel htmlFor="outlined-adornment-amount">User Name</InputLabel>
                  <FormControl variant="outlined" fullWidth sx={{ maxWidth: '100%' }}>
                    <OutlinedInput
                      sx={{paddingRight:"8px"}}
                      id="outlined-adornment-weight"
                      value={signin.username}
                    onChange={(e) => setSignin({ ...signin, username: e.target.value })}
                      endAdornment={<InputAdornment position="end"><PersonIcon sx={{fontSize:"25px"}} /></InputAdornment>}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                  </FormControl>
                  <br />
                  <br />

                
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                   <FormControl variant="outlined" fullWidth sx={{ maxWidth: '100%' }}>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={signin.password}
                       onChange={(e) => setSignin({ ...signin, password: e.target.value })}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {!showPassword ? <VisibilityOff sx={{fontSize:"25px"}}/> : <Visibility sx={{fontSize:"25px"}} />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Button variant="contained" type="submit" sx={loginSignIn.signinBtn}>Signin</Button>
                  {errorMessage && <div className="alert alert-danger" style={{color:'red'}}>{errorMessage}</div>}
                  <Box sx={loginSignIn.otplinks}>
                  </Box>
                  <br />
                </form>
              </Grid>
          </Box>
          </Box>
       
   <br /><br />
      <Box>

        {/* ALERT DIALOG */}
        <Box>
          <Dialog
            open={isErrorOpen}
            onClose={handleCloseerr}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
              {/* <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} /> */}
              <Typography variant="h6" >{showAlert}</Typography>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="error" onClick={handleCloseerr}>ok</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </>
  )
}
export default Signin;