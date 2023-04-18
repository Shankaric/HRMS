import React, { useState, useMemo, useEffect, } from 'react';
import { BrowserRouter} from 'react-router-dom';
import Applicationstack from './routes/Applicationstack';
import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { AuthContext } from './context/Appcontext';
import Authstack from './routes/Authstack';
import axios from 'axios';
// import Test from  '..' 

function App() {

  const [auth, setAuth] = useState({ loader: true, loginState: false, APIToken:"", loginuserid:"" })

  const authContextData = useMemo(() => {
    return { auth, setAuth}
  })

  // const backPage = useNavigate();

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
          let loginuserdata = await axios.get(`http://192.168.85.8:7001/api/auth/${getLoginUserid}`,
          {
            headers: {
              'Authorization':`Bearer ${getApiToken}`
            }
          })
         setAuth((prevAuth)=> {
              return {...prevAuth,loader : false,loginState : true, APIToken : getApiToken, loginuserid: getLoginUserid}
          });
        }
        catch(err){
          console.log(err.response.data.errorMessage);
        }
    }else{
        setAuth({...auth, loader:false, loginState: false})
        // return backPage('/signin')
    }  
}

  return (
    <>
      <div>
      <AuthContext.Provider value={authContextData}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
                 
            {!auth.loginState ? <Authstack /> :
             <Applicationstack /> 
           }  
                 {/* < Test></Test>        */}
          </BrowserRouter>
          </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;