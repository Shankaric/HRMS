import React, { useState, useEffect,useContext } from "react";
import Navbar from './Navbar';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import { AuthContext } from '../context/Appcontext';
import Stack from '@mui/material/Stack';
import { userStyle } from '../pageStyle';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import { SERVICE } from "../services/Baseservice";


const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};


const Header = () => {

// const [branches, setBranches] = useState([]);
// const [companies, setComapanies] = useState([]);
// const [companyid, setcompanyid] = useState();
// const [header, setheader] = useState({ company:"Company",branch:"" });
const { auth, setAuth } = useContext(AuthContext);

const [companyTitle,setCompanyTitile] = useState('Hilife.ai');

const backPage = useNavigate();

const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);




  const [companyName, setcompanyName] = useState(["Company"]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setcompanyName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

// get all branches
// const fetchBranch = async () => {
//   try {
//     let response = await axios.get(`http://192.168.85.8:7001/api/managecompany`, {
//    });
//     let res_data = response.data.managecompany?.map((item) =>{
//       if(item.company === companyid){
//         return item.branch
//       }
//     });
//     setBranches(res_data);
//   } catch (err) {
//     setBranches([]);
//   }
// }

const logOut = async () => {
  try {
     await axios.get('http://192.168.85.8:7001/api/authout',{
      headers: {
        'Authorization':`Bearer ${auth.APIToken}`
      }
    })
    //change login state
    setAuth({ ...auth, loginState: false });
    backPage('/signin');
    localStorage.clear();
  } catch (err) {
    const messages = err.response.data.errorMessage;
    console.log(messages)
  }
}




useEffect(()=> {
  isCheckUserLogin();
},[]);


useEffect(() => {
  localStorage.setItem('auth', JSON.stringify(auth));
}, [{loginState: false}]);


const isCheckUserLogin = async () => {
  let getApiToken = localStorage.getItem('APIToken');
  let getLoginUserid = localStorage.getItem('LoginUserId');
  if(getApiToken){
    
      try{
         await axios.get(`http://192.168.85.8:7001/api/auth/${getLoginUserid}`,
        {
          headers: {
            'Authorization':`Bearer ${getApiToken}`
          }
        })
       setAuth((prevAuth)=> {
            return {...prevAuth,loader : false,loginState : true, APIToken : getApiToken, loginuserid: getLoginUserid,companyname:prevAuth.companyname}
          });
      }
      catch(err){
        console.log(err.response.data.errorMessage);
      }
  }else{
      setAuth({...auth, loader:false, loginState: false})
  }  
}

// Comapny Name Functionality
         const fetchUserName  = async () => {
            try {
                let req = await axios.get(SERVICE.USER);
                 req.data.users.filter((data)=>{            
                    if(auth.loginuserid === data._id){
                       setCompanyTitile(data)
                    } else return ""
                    })
                }
             catch (err) {
                const messages = err.response.data.message;
               console.log(messages)
            }
        };

 
useEffect(
  () => {
    fetchUserName();
  }
);

  return (
    <header>
      <div className="nav-area">
        <Link to="/dashboard" className="logo" >
      {companyTitle.company}
        </Link>
        <Navbar />  
        <div className="nav-arearight">
          <FormControl sx={userStyle.topdropdown}>
         
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={companyName}
                    onChange={handleChange}
                    input={<OutlinedInput size="small" sx={{color:'white'}} label="Tag" />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>{"Company"}</em>;
                      }
                      
                      return <em>{"Company"}</em>;
                    }}
                    MenuProps={MenuProps}
                  >
                    <MenuItem disabled value="Company">
                    <em>Company</em>
                  </MenuItem>
                    {companyTitle?.accesslocation?.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={companyName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
          </FormControl>
          <FormControl sx={userStyle.topdropdown}>
           <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  placeholder="Company"
                  size="small"
                  // value={"Branch"}
                  sx={userStyle.selectwhite}
                  // onChange={(e, i) => {
                  //   setFloor({
                  //     ...floor,
                  //     branch: e.target.value,
                  //   });
                  // }}
                >
                  {/* <MenuItem value={"Branch"}>{"Branch"}</MenuItem> */}
                  {/* {branches &&
                    branches?.filter((row) => (
                      <MenuItem value={row}>{row}</MenuItem>
                    ))} */}
                </Select>
          </FormControl>
          <Stack direction="row" spacing={2}>
      <div>
         <Box
            component="img"
            onClick={handleToggle}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            sx={{
              height: 40,
              width: 40,
              borderRadius:'50%',
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src={companyTitle.profileimage ? companyTitle.profileimage : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"}
          />
      
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem>{companyTitle.firstname + " " + companyTitle.lastname }</MenuItem>
                    <Link to={`/profile/${companyTitle._id}`} style={{textDecoration:'none', color:'black'}}><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
        </div> 
      </div>
    
    </header>
  );
};

export default Header;