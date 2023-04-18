import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

// import Login from '../login/Signin.js'

// HR
import Branch from '../pages/hr/Branch';
import Unit from '../pages/hr/Unit';
import Area from '../pages/hr/Area';
import Location from '../pages/hr/Location';
import Floor from '../pages/hr/Floor';
import Department from '../pages/hr/Department';
import Designation from '../pages/hr/Designation';
import Designationgroup from '../pages/hr/Designationgroup';
import Layout from '../components/Layout';
import Qualification from '../pages/hr/Qualification';
import Shift from '../pages/hr/shift';
import Teams from '../pages/hr/Teams';
import Education from '../pages/hr/Education';
import Certificaion from '../pages/hr/Certification';
import Skillset from '../pages/hr/Skillset';
import TodoList from '../pages/hr/Todo';
import ImageCropper from '../pages/hr/ImageCropper';

// add employee page
import Addemployee from '../pages/hr/employees/Create';
import Editemployee from '../pages/hr/employees/Edit';
import Listemployee from '../pages/hr/employees/List';
import Draftlist from '../pages/hr/employees/Draftlist'
import Viewemployee from '../pages/hr/employees/View';
import Personalupdate from '../pages/hr/employees/updatepages/Personalupdate';
import Contactupdate from '../pages/hr/employees/updatepages/Contactupdate';
import Loginupdate from '../pages/hr/employees/updatepages/Loginupdate';
import Boardingupdate from '../pages/hr/employees/updatepages/Boardingupdate';
import Documentupdate from '../pages/hr/employees/updatepages/Documentupdate';
import Joiningupdate from '../pages/hr/employees/updatepages/Joiningupdate';
import Educationalupdate from '../pages/hr/employees/updatepages/Educationupdate';
import Addlqualificationupdate from '../pages/hr/employees/updatepages/Addqualificationupdate';
import Workhistoryupdate from '../pages/hr/employees/updatepages/Workhistoryupdate';
import Profile from '../pages/hr/employees/Profilepage';

//Project
import Project from '../pages/project/Project';
import Subproject from '../pages/project/Subproject';
import Module from '../pages/project/Module';
import Submodule from '../pages/project/Submodule';
import Mainpage from '../pages/project/Mainpage';
import Subpage1 from '../pages/project/Subpage1';
import Subpage2 from '../pages/project/Subpage2';
import Subpage3 from '../pages/project/Subpage3';
import Subpage4 from '../pages/project/Subpage4';
import Subpage5 from '../pages/project/Subpage5';
import Priority from '../pages/project/Priority';
import Projectdetails from '../pages/project/Projectdetails';
import Projectestimation from '../pages/project/Projectestimation';
import Projectallocation from '../pages/project/Projectallocation';
import Test from '../pages/project/test';
import Cronjob from '../pages/project/cron';
//company
import Company from '../pages/company/company';
import Branchunitmap from '../pages/company/Branchunitmap';
import Companybranchmap from '../pages/company/companybranchmap';

const App = () => {
  return (
    <>
      <Routes>
          {/* <Route index element={<Login />} /> */}
          <Route path="/" element={<Layout />} >  
          <Route index path="dashboard" element={<Home />} />       
          <Route path="branch" element={<Branch />} />
          <Route path="unit" element={<Unit />} />         
          <Route path="area" element={<Area />} />
          <Route path="location" element={<Location />} />
          <Route path="floor" element={<Floor />} />
          <Route path="department" element={<Department />} />
          <Route path="designation" element={<Designation />} />
          <Route path="designationgroup" element={<Designationgroup />} />
          <Route path="qualification" element={<Qualification />} />
          <Route path="teams" element={<Teams />} />
          <Route path="shift" element={<Shift />} />
          <Route path="education" element={<Education />} />
          <Route path="certification" element={<Certificaion />} />
          <Route path="skillset" element={<Skillset />} />
          <Route path="addemployee" element={<Addemployee />} />
          <Route path="edit/:id" element={<Editemployee />} />
          <Route path="list" element={<Listemployee />} />
          <Route path="view/:id" element={<Viewemployee />} />
          <Route path="draftlist" element={<Draftlist />} />
          <Route path="updatepages/personalupdate" element={<Personalupdate />} />
          <Route path="updatepages/contactupdate" element={<Contactupdate />} />
          <Route path="updatepages/loginupdate" element={<Loginupdate />} />
          <Route path="updatepages/boardingupdate" element={<Boardingupdate />} />
          <Route path="updatepages/documentupdate" element={<Documentupdate />} />
          <Route path="updatepages/Joiningupdate" element={<Joiningupdate />} />
          <Route path="updatepages/educationalupdate" element={<Educationalupdate />} />
          <Route path="updatepages/addlqualificationupdate" element={<Addlqualificationupdate />} />
          <Route path="updatepages/workhistoryupdate" element={<Workhistoryupdate />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="todo" element={<TodoList />} />
          <Route path="cropper" element={<ImageCropper />} />

          {/* Project */}
          <Route path="project/project" element={<Project />} />
          <Route path="project/subproject" element={<Subproject />} />
          <Route path="project/module" element={<Module />} />
          <Route path="project/submodule" element={<Submodule />} />
          <Route path="project/mainpage" element={<Mainpage />} />
          <Route path="project/subpageone" element={<Subpage1 />} />
          <Route path="project/subpagetwo" element={<Subpage2 />} />
          <Route path="project/subpagethree" element={<Subpage3 />} />
          <Route path="project/subpagefour" element={<Subpage4 />} />
          <Route path="project/subpagefive" element={<Subpage5 />} />
          <Route path="project/priority" element={<Priority />} />
          <Route path="project/projectdetails" element={<Projectdetails />} />
          <Route path="project/projectestimation" element={<Projectestimation />} />
          <Route path="project/projectallocation" element={<Projectallocation />} />
          <Route path="test" element={<Test />} />
          <Route path="cronjob" element={<Cronjob />} />

          {/* company */}
          <Route path="company" element={<Company />} />
          <Route path="branchunitmap" element={<Branchunitmap />} />
          <Route path="companybranchmap" element={<Companybranchmap />} />


          {/* page not found */}
          <Route path="*" element={<p>Not found!</p>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
