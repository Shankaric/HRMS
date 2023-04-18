import {  Routes, Route } from 'react-router-dom';

import Signin from '../login/Signin';
// import Signup from '../login/Signup';

function Authstack(){
    return(
        <>
    
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="signin" element={<Signin />} />
                {/* <Route path="signup" element={<Signup />} /> */}
            </Routes>
     
        </>
    )
}
export default Authstack;