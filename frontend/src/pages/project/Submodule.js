// import React, { useState, useEffect, useRef } from "react";
// import { Box, Typography, OutlinedInput, Dialog, TableBody,TableRow,TableCell, Select, MenuItem, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button } from "@mui/material";
// import { userStyle } from "../../pageStyle";
// import { FaPrint, FaFilePdf } from "react-icons/fa";
// import { ExportXL, ExportCSV } from "../../components/Export";
// import { StyledTableRow, StyledTableCell } from "../../components/Table";
// import { SERVICE } from '../../services/Baseservice';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import jsPDF from "jspdf";
// import 'jspdf-autotable';
// import axios from "axios";
// import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import { useReactToPrint } from "react-to-print";
// import moment from 'moment-timezone';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
// import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';


// function Submodule() {

//     const [project, setProject] = useState([]);
//     const [subproject, setSubProject] = useState([]);
//     const [projectEdit, setProjectEdit] = useState([]);
//     const [subProjectEdit, setSubProjectEdit] = useState([]);
//     const [module, setModule] = useState([]);
//     const [moduleEdit, setModuleEdit] = useState([]);
//     const [submodule, setSubmodule] = useState({
//         project: "", subproject: "", module: "", name: "", estimation: "", estimationtime: ""
//     });
//     const [submodules, setSubmodules] = useState([]);
//     const [submoduleid, setSubmoduleid] = useState({ name: "", project: "", subproject: "", module: "", estimation: "", estimationtime: "" });
//     const [isChecked, setIsChecked] = useState(false);
//     const [checkvalue, setCheckvalue] = useState("");
//     const [username, setUsername] = useState("");
//     const [getrowid, setRowGetid] = useState("");
//     const [timeCalculation, setTimeCalculation] = useState("");
//     const [timeCalculationEdit, setTimeCalculationEdit] = useState("");
//     const [timeDiffCal, setTimeDiffCal] = useState("");
//     const [timeDiffCalEdit, setTimeDiffCalEdit] = useState("");
//     const [typeEst, setTypeEst] = useState("");
//     const [typeEstEdit, setTypeEstEdit] = useState("");
//     const [finalCheck, SetFinalCheck] = useState("");
//     const [typCheck, setTypeCheck] = useState("");
//     const [typeEstEditCheck, setTypeEstEditCheck] = useState("");
//     const[rowEditTime , setRowEditTime] = useState("");
//     const[rowEditTimeProj , setRowEditTimeProj] = useState("");
//     const[editTimeCalculation , setEditTimeCalculation] = useState("");
//     const[editCalOverall , setEditCalOverall] = useState("");
//     const[getEstitype , setGetEstiType] = useState("");
//     const[conditionTiming , setConditionTiming] = useState("");
//     const[editProjDropdwon , setEditProjDropdown] = useState("");
//     const[moduleEditList , setModuleEditList] = useState([]);

//     //Datatable
//     const [page, setPage] = useState(1);
//     const [pageSize, setPageSize] = useState(1);


//     const handleCheckboxChange = (event) => {
//         setIsChecked(event.target.checked);
//         if (event.target.checked) {
//             setCheckvalue(event.target.value);
//         }
//     };

//     const[projectnameg,getprojectnameg] = useState("");

//     // Error Popup model
//     const [isErrorOpen, setIsErrorOpen] = useState(false);
//     const [showAlert, setShowAlert] = useState();
//     const handleClickOpenerr = () => {
//         setIsErrorOpen(true);
//     };
//     const handleCloseerr = () => {
//         setIsErrorOpen(false);
//     };

//     // view model
//     const [openview, setOpenview] = useState(false);

//     const handleClickOpenview = () => {
//         setOpenview(true);
//     };

//     const handleCloseview = () => {
//         setOpenview(false);
//     };

//     // info model
//     const [openInfo, setOpeninfo] = useState(false);

//     const handleClickOpeninfo = () => {
//         setOpeninfo(true);
//     };

//     const handleCloseinfo = () => {
//         setOpeninfo(false);
//     };


//     //Delete model
//     const [isDeleteOpen, setIsDeleteOpen] = useState(false);

//     const handleClickOpen = () => {
//         setIsDeleteOpen(true);
//     };
//     const handleCloseMod = () => {
//         setIsDeleteOpen(false);
//     };

//     //set function to get particular row
//     const [deletesubmodule, setDeletesubmodule] = useState({});
//     const rowData = async (id) => {
//         try {
//             let res = await axios.get(`${SERVICE.SUBMODULE_SINGLE}/${id}`, {
//                 // headers: {
//                 //     'Authorization': `Bearer ${auth.APIToken}`
//                 // }
//             });
//             setDeletesubmodule(res.data.ssubmodule);
//         } catch (err) { }
//     };
//     // Alert delete popup
//     let submodulesid = deletesubmodule._id;
//     const delSubModule = async () => {
//         try {
//             await axios.delete(
//                 `${SERVICE.SUBMODULE_SINGLE}/${submodulesid}`, {});
//             handleCloseMod();
//         } catch (err) { }
//     };


//     //fetching Project for Dropdowns
//     const fetchProjectDropdowns = async () => {
//         try {
//             let projectDrop = await axios.get(SERVICE.PROJECT);
//             setProject(projectDrop.data.projects);
//             setProjectEdit(projectDrop.data.projects);
//         } catch (error) {
//             console.log(error.response.data);
//         }
//     };

// const[subprojectnone, setsubprojectnone] = useState("")
//     //fetching sub-Project Dropdowns
//     const fetchSubProjectDropdowns = async (e) => {
//         try {
//             let subPro = await axios.get(SERVICE.SUBPROJECT);
//             let subProDrop = subPro.data.subprojects.filter((data) => {         
//                 if (e === data.project){                  
                       
//                          return data                        
                    
//                 }
                  
//             })
    
//             setSubProject(subProDrop);

//         } catch (error) {
//             console.log(error.response.data);
//         }
//     };

//     useEffect(() => {
//         if(subproject.length == 0){
//             setsubprojectnone("None")
//         }else{
//             setsubprojectnone("Show")
//         }
      
//     })
   
// // console.log(subprojectnone,'subprojectnone')
//     const [getprojectname, setgetprojectname] = useState("")


//     //fetching sub-Project Dropdowns
//     const fetchSubProjectDropdownsedit = async () => {
//         let projectName = getprojectname ? getprojectname : submoduleid.project
//         console.log(projectName,'pro')
//         try {
//             let subPro = await axios.get(SERVICE.SUBPROJECT);
//             let subProDrop = subPro.data.subprojects.filter((data) => {
//                 if (projectName === data.project)
//                     return data
//             })
//             setSubProjectEdit(subProDrop);

//         } catch (error) {
//             console.log(error.response.data);
//         }
//     };


//     //fetching Module Dropdowns
//     const fetchModuleDropdowns = async (e) => {
//         try {
//             let dropModule = await axios.get(SERVICE.MODULE);
//             let modulelist = dropModule.data.modules.filter((data) => {
               
//                 if (subprojectnone == "None"  ? projectnameg == data.project : e === data.subproject) {
//                     return data
//                 }
//             })
//             setModule(modulelist);
//         } catch (error) {
//             console.log(error.response.data);
//         }
//     };
//     // console.log(subprojectnone.name,'subprojectnone.name')

//     useEffect(() => {
//         if(subprojectnone == "None" ){          
//             fetchModuleDropdowns();
//         }
//     })
   
//         //fetching Project for Dropdowns
//         const fetchModuleEditDropDown = async () => {
//             try {
//                 let projectDrop = await axios.get(SERVICE.MODULE);
//                 setModuleEditList(projectDrop.data.modules)

//             } catch (error) {
//                 console.log(error.response.data);
//             }
//         };
    

//     const [getsubprojectname, setgetsubprojectname] = useState("")

//     //fetching Module Dropdowns
//     const fetchModuleDropdownsedit = async () => {
//         let modulename = getsubprojectname ? getsubprojectname : submoduleid.subproject;
//         console.log(modulename,'MOD')
//         try {
//             let dropModule = await axios.get(SERVICE.MODULE);
//             let modulelist = dropModule.data.modules.filter((data) => {
//                 if (modulename == data.subproject) {
//                     return data
//                 }
//             })
//             setModuleEdit(modulelist);
//         } catch (error) {
//             console.log(error.response.data);
//         }
//     };

//     //  console.log(moduleEdit,'noduleedit')

//     //add function...
//     const sendRequest = async () => {
//         try {
//             let submodules = await axios.post(SERVICE.SUBMODULE_CREATE, {
//                 project: String(submodule.project),
//                 subproject: String(submodule.subproject),
//                 module: String(submodule.module),
//                 name: String(isChecked ? checkvalue : submodule.name),
//                 estimation: String(submodule.estimation),
//                 estimationtime: String(submodule.estimationtime),
//                 addedby: [
//                     {
//                         name: String(username),
//                         date: String(new Date()),

//                     },
//                 ],
//             });
//             setSubmodule(submodules.data);
//             setSubmodule({ project: "", subproject: "", module: "", name: "", estimation: "", estimationtime: "" });
//         } catch (error) {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {error.response.data.errorMessage}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         }
//     };
//     //submit option for saving
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (submodule.project === "") {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {"Please Choose Project Name"}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         } else if (submodule.subproject === "") {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {"Please Choose Subproject Name"}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         } else if (submodule.module === "") {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {"Please Choose Module Name"}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         } else if (submodule.name === "" ) {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {"Please Enter Sub Module Name"}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         } else if (submodule.estimation === "" && submodule.estimationtime == "" ) {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {"Please Enter Estimation Time"}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         }
//         else {
//             sendRequest();
//         }
//     };

//     let difference = [];
//     let ans = 0;
//     let timeDiffs = 0;
//     //calculate time difference between the choosed projects
//     const fetchTimeDiffCal = async (projName) => {
//         try {

//             let sub_proj_time = submodules.map((data) => {
//                 if (projName === data.subproject) {

//                     if (data.estimationtime === "Month") {
//                         difference.push(Math.round((Number(data.estimation) / 12) * 365))
//                     }
//                     else if (data.estimationtime === "Year") {
//                         difference.push(Number(data.estimation) * 365)
//                     }
//                     else if (data.estimationtime === "Days") {
//                         difference.push(Number(data.estimation))
//                     }
//                     ans = difference.reduce((acc, cur) => acc + cur);
//                     console.log(difference)

//                     setTimeCalculation(ans);
//                     setTimeCalculationEdit(ans)
//                 }
//                 else if ((projName != data.subproject)) {
//                     setTimeCalculation(0);
//                 }

//             })

//             let project_check = module.map((value) => {
//                 if (projName === value.name) {
//                     if (value.estimationtime === "Month") {
//                         timeDiffs = ((Number(value.estimation) / 12) * 365);
//                         console.log(difference)
//                         setTimeDiffCal(timeDiffs)
//                         setTimeDiffCalEdit(timeDiffs)

//                     }
//                     else if (value.estimationtime === "Year") {
//                         setTimeDiffCal(0)
//                         setTimeDiffCalEdit(0)
//                         timeDiffs = Number(value.estimation) * 365;
//                         setTimeDiffCal(timeDiffs)
//                         setTimeDiffCalEdit(timeDiffs)

//                     }
//                     else if (value.estimationtime === "Days") {
//                         setTimeDiffCal(Number(value.estimation))
//                         setTimeDiffCalEdit(Number(value.estimation))

//                     }
//                 }
//             })
//         }
//         catch (error) {
//             console.log(error.response.data)
//         }
//     }

//     const fetchCalculRemaining = async (estType) => {
//         if (estType === "Month") {
//             setTypeEst(Math.round((timeDiffCal - timeCalculation) / 30))
//             setTypeEstEdit(Math.round((timeDiffCalEdit - timeCalculationEdit) / 30))
//         }
//         else if (estType === "Year") {
//             setTypeEst(Math.round((timeDiffCal - timeCalculation) / 365));
//             setTypeEstEdit(Math.round((timeDiffCalEdit - timeCalculationEdit) / 365));
//         }
//         else if (estType === "Days") {
//             setTypeEst(Math.round(timeDiffCal - timeCalculation))
//             setTypeEstEdit(Math.round(timeDiffCalEdit - timeCalculationEdit))
//         }
//     }


//     const fetchEditTimeCal = async (estEdiType) => {
//         try {

//             if (estEdiType === "Year") {
//                 if (typCheck === "Month") {
//                     let result = ((Number(typeEstEditCheck)) / 12)
//                     SetFinalCheck(result)
//                 }
//                 else if (typCheck === "Year") {
//                     let result = Number(typeEstEditCheck)
//                     SetFinalCheck(result)
//                 }
//                 else if (typCheck === "Days") {
//                     let result = ((Number(typeEstEditCheck)) / 365)
//                     SetFinalCheck(result)
//                 }

//             }
//             else if (estEdiType === "Days") {
//                 if (typCheck === "Month") {
//                     let result = (((Number(typeEstEditCheck)) / 12) * 365)
//                     console.log(typeEstEditCheck, 'dfsdfsdfsd4')
//                     console.log(typeEstEdit, 'bvfhsdfjhsdvfsdhfvhsdvfhdvshfvb')
//                     console.log(result, '4')
//                     SetFinalCheck(result)
//                 }
//                 else if (typCheck === "Year") {
//                     let result = (Number(typeEstEditCheck) * 365)
//                     console.log(result, '5')
//                     SetFinalCheck(result)
//                 }
//                 else if (typCheck === "Days") {
//                     let result = Number(typeEstEditCheck)
//                     console.log(result, '6')
//                     SetFinalCheck(result)
//                 }

//             }
//             else if (estEdiType === "Month") {
//                 if (typCheck === "Month") {
//                     let result = Number(typeEstEditCheck)
//                     console.log(result, '7')
//                     SetFinalCheck(result)
//                 }
//                 else if (typCheck === "Year") {
//                     let result = (Number(typeEstEditCheck) / 12)
//                     console.log(result, '8')
//                     SetFinalCheck(result)
//                 }
//                 else if (typCheck === "Days") {
//                     let result = ((Number(typeEstEditCheck) / 12) * 365)
//                     console.log(result, '9')
//                     SetFinalCheck(result)
//                 }

//             }
//         } catch (err) {
//             console.log(err.response.data.errormessage)
//         }
//     }


//     //Edit model...
//     const [isEditOpen, setIsEditOpen] = useState(false);
//     const handleClickOpenEdit = () => {
//         setIsEditOpen(true);
//     };
//     const handleCloseModEdit = (e, reason) => {
//         if (reason && reason === "backdropClick")
//             return;
//         setIsEditOpen(false);
//     };


//     //id for login...

//     let loginid = localStorage.LoginUserId;


//     //get user row  edit  function
//     const getusername = async () => {
//         try {
//             let res = await axios.get(`${SERVICE.USER}`)
//             let user = res.data.users.filter((data) => {
//                 if (loginid === data._id) {
//                     setUsername(data.username)
//                     return data

//                 }
//             })
//             //setUsername(user)
//         }
//         catch (err) {
//             console.log(err.response.data.errormessage)
//         }
//         // console.log(res.data.sarea)
//     }

//     //get single row to edit....
//     const getCode = async (e) => {
//         let res = await axios.get(`${SERVICE.SUBMODULE_SINGLE}/${e}`, {});
//         setSubmoduleid(res.data.ssubmodule);
//         setRowGetid(res.data.ssubmodule);
//         setTypeEstEditCheck(res.data.ssubmodule.estimation);
//         setTypeCheck(res.data.ssubmodule.estimationtime)
//         setRowEditTime(res.data.ssubmodule)
//     };
//     // get single row to view....
//     const getviewCode = async (e) => {
//         let res = await axios.get(`${SERVICE.SUBMODULE_SINGLE}/${e}`, {});
//         setSubmoduleid(res.data.ssubmodule);

//     };

//     // get single row to view....
//     const getinfoCode = async (e) => {
//         let res = await axios.get(`${SERVICE.SUBMODULE_SINGLE}/${e}`, {});
//         setSubmoduleid(res.data.ssubmodule);
//     };

//      //submodule updateby edit page...
//     let updateby = submoduleid.updatedby;
//     let addedby = submoduleid.addedby;

//     let submoduletsid = getrowid._id;

//     //editing the single data...
//     const sendEditRequest = async () => {
//         try {
//             let res = await axios.put(
//                 `${SERVICE.SUBMODULE_SINGLE}/${submoduletsid}`,
//                 {
//                     project: String(submoduleid.project),
//                     subproject: String(submoduleid.subproject),
//                     module: String(submoduleid.module),
//                     name: String(submoduleid.name),
//                     estimation: String(submoduleid.estimation),
//                     estimationtime: String(submoduleid.estimationtime),
//                     updatedby: [
//                         ...updateby, {
//                             name: String(username),
//                             date: String(new Date()),

//                         },
//                     ],
//                 }
//             );
//             setSubmoduleid(res.data);
//             handleCloseModEdit();
//         } catch (err) {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {err.response.data.errorMessage}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         }
//     };
//     const editSubmit = (e) => {
//         e.preventDefault();
//         if (submoduleid.project === "") {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {"Please Choose Project Name"}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         } else if (submoduleid.subproject === "" && subprojectnone !== "None") {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {"Please Choose Subproject Name"}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         } else if (submoduleid.module === "") {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {"Please Choose Module Name"}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         } else if (submoduleid.name === "" && !isChecked) {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {"Please Enter Sub Module Name"}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         } else if (submoduleid.estimation === "" && submoduleid.estimationtime == "") {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {"Please Enter Sub Module Name"}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         }
//         else {
//             sendEditRequest();
//         }

//     };

    
//     let differenceEdit = [];
//     let ansEdit=0;
//     let timeDiffsEdit=0;
    
//        //Edit Page Functionality for Estimation Time 
//        const fetchEditEstTime = async ()=>{
//         try{
//             let sub_Project = editProjDropdwon ?  editProjDropdwon : rowEditTime.module;

//             let sub_proj_time = submodules.filter((data)=>{
    
//                 if(sub_Project === data.module){
              
//                 if(data.estimationtime === "Month"){
//                     differenceEdit.push((Number(data.estimation) /12) * 365)
//                 }
//                 else if(data.estimationtime === "Year"){
//                     differenceEdit.push( Number(data.estimation) * 365)
//                 }
//                 else if(data.estimationtime === "Days"){
//                     differenceEdit.push(Number(data.estimation))
//                 }
//                 ansEdit = differenceEdit.reduce((acc , cur)=> acc+cur );
//                 setEditTimeCalculation(ansEdit);
//                 console.log(ansEdit)
//                 console.log(differenceEdit)
//             }
            
            
//             else if (sub_Project != data.module){
//                 setEditTimeCalculation(ansEdit);

//             }
           
//            })

//            let project_check = moduleEditList.map((value)=>{
//              if(sub_Project === value.name){
//                 if(value.estimationtime === "Month"){
//                 timeDiffsEdit = ((Number(value.estimation) /12) * 365) ;
//                 setRowEditTimeProj(timeDiffsEdit)

//                 }
//                 else if(value.estimationtime === "Year"){
//               timeDiffsEdit = Number(value.estimation) * 365 ;
//               setRowEditTimeProj( timeDiffsEdit)

//                 }
//                 else if(value.estimationtime === "Days"){
//                     setRowEditTimeProj(Number(value.estimation))
//                 }
//             }           
//            })


//         }
//         catch (error) {
//             console.log(error.response.data)
//         }
//     }
       
//     const fetchEditEstimationType = async () =>{

//         let estimatType = getEstitype ? getEstitype : rowEditTime.estimationtime
//         if(rowEditTime.estimationtime === "Month"){
//             if(estimatType === "Month"){   
//                 let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(2).toString().split('.');
//                 setConditionTiming(Number(rowEditTime.estimation) + ((rowEditTimeProj - editTimeCalculation) / 30))
//                 console.log(conditionTiming , '1' )
//                 setEditCalOverall(remaining[0] + " months " + remaining[1] + " days Remaining" )          
//            }
           
//            else if(estimatType === "Days"){
//             let remaining =((rowEditTimeProj - editTimeCalculation)).toFixed(0).toString();
//                 setConditionTiming((Number(rowEditTime.estimation) * 30)  + ((rowEditTimeProj - editTimeCalculation)))
//                 console.log(conditionTiming , '2' )
//                 setEditCalOverall(remaining  + " days Remaining" )
//            }
           
//             else if(estimatType === "Year"){
//             let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(2).toString().split('.');
//             setConditionTiming(Number(rowEditTime.estimation)/12  + ((rowEditTimeProj - editTimeCalculation)/365))
//             setEditCalOverall(remaining[0] + " months " + remaining[1] + " days Remaining" )
//            }

//         }

//         else if(rowEditTime.estimationtime === "Days"){
//             if(estimatType === "Month"){   
//                 let remaining =((rowEditTimeProj - editTimeCalculation)/ 25).toFixed(2).toString().split('.')
//                 let rem = ((rowEditTimeProj - editTimeCalculation)% 25).toFixed(2).toString().split('.')
//                 setConditionTiming(Number(rowEditTime.estimation) / 30 + ((rowEditTimeProj - editTimeCalculation)/30))
//                 console.log(conditionTiming , '4' )
//                 console.log(remaining , '4remaing' )
//                 setEditCalOverall(remaining[0] + " months " + rem[0] + " days Remaining" )          
//            }
           
//            else if(estimatType === "Days"){
//             let remaining =((rowEditTimeProj - editTimeCalculation)).toFixed(0).toString();
//                 setConditionTiming((Number(rowEditTime.estimation) * 30)  + ((rowEditTimeProj - editTimeCalculation)))
//                 console.log(conditionTiming , '5' )
//                 setEditCalOverall(remaining  + " days Remaining" )
//            }
           
//             else if(estimatType === "Year"){
//             let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(2).toString().split('.');
//             setConditionTiming(Number(rowEditTime.estimation)/365  + ((rowEditTimeProj - editTimeCalculation)/365))
//             setEditCalOverall(remaining[0] + " months " + remaining[1] + " days Remaining" )
//            }

//         }

//         else if(rowEditTime.estimationtime === "Year"){
//             if(estimatType === "Month"){   
//                 let remaining =(((rowEditTimeProj - editTimeCalculation)/ 365)*12).toFixed(2).toString().split('.')
//                 setConditionTiming((Number(rowEditTime.estimation) * 12) + (((rowEditTimeProj - editTimeCalculation)/365)*12))
//                 setEditCalOverall(remaining[0] + " Months Remaining" )          
//            }
           
//            else if(estimatType === "Days"){
//             let remaining =((rowEditTimeProj - editTimeCalculation)*365).toFixed(0).toString();
//                 setConditionTiming((Number(rowEditTime.estimation) * 365)  + ((rowEditTimeProj - editTimeCalculation)))
//                 setEditCalOverall(remaining  + " days Remaining" )
//            }
           
//             else if(estimatType === "Year"){
//             let remaining =((rowEditTimeProj - editTimeCalculation)/365 ).toFixed(2).toString().split('.');
//             setConditionTiming(Number(rowEditTime.estimation)  + ((rowEditTimeProj - editTimeCalculation)/365))
//             setEditCalOverall(remaining[0]  + " years Remaining" )
//            }

//         }

//     }

    
//     //get all modules.
//     const fetchAllSubModule = async () => {
//         try {
//             let res_module = await axios.get(SERVICE.SUBMODULE, {});
//             setSubmodules(res_module.data.submodules);

//         } catch (err) {
//             const messages = err.response.data.message;
//             console.log(messages)
//         }
//     };

//     const modifiedData = submodules.map((person) => ({
//         ...person,
//         estimateTime: person.estimation + ' ' + person.estimationtime,
//       }));
    

//     //pdf....
//     const columns = [
//         { title: "Project", field: "project" },
//         { title: "Subproject", field: "subproject" },
//         { title: "Module", field: "module" },
//         { title: "Name", field: "name" },
//         { title: "EstimationTime", field: "estimateTime" },
//     ];
//     const downloadPdf = () => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             theme: "grid",
//             columns: columns.map((col) => ({ ...col, dataKey: col.field })),
//             body: modifiedData,
//         });
//         doc.save("SubModule.pdf");
//     };

//     // Excel
//     const fileName = "submodules";

//     const [submoduleData, setSubmoduleData] = useState([]);

//     // get particular columns for export excel
//     const getexcelDatas = async () => {
 
//         var data = modifiedData.map((t) => ({
//             // Sno: excelno++,
//             "Project": t.project,
//             "Subproject": t.subproject,
//             "Module": t.module,
//             "Name": t.name,
//             "EstimationTime": t.estimateTime,
//         }));
//         setSubmoduleData(data);
//     };

//     //print...
//     const componentRef = useRef();
//     const handleprint = useReactToPrint({
//         content: () => componentRef.current,
//         documentTitle: "SubModule",
//         pageStyle: "print",
//     });
//     const [items, setItems] = useState([]);
//     useEffect(() => {      
//         getexcelDatas();
//         getusername();   
//         fetchProjectDropdowns();         
//         fetchTimeDiffCal();
//         fetchCalculRemaining();
//         fetchEditEstTime();
//         fetchEditEstimationType();
//         fetchModuleEditDropDown();
//     },[]);

//     useEffect(() => {  
//         fetchAllSubModule();
//         fetchSubProjectDropdownsedit();
//         fetchModuleDropdownsedit();
//     })



//     const addSerialNumber = () => {
//       const itemsWithSerialNumber = modifiedData?.map((item, index) => ({ ...item, serialNumber: index + 1 }));
//       setItems(itemsWithSerialNumber);
//     }
  
//     useEffect(()=>{
//       addSerialNumber();
//     },[])
//    //table sorting
//       const [sorting, setSorting] = useState({ column: '', direction: '' });
  
//       const handleSorting = (column) => {
//           const direction = sorting.column === column && sorting.direction === 'asc' ? 'desc' : 'asc';
//           setSorting({ column, direction });
//       };
  
//       const sortedData = items.sort((a, b) => {
//           if (sorting.direction === 'asc') {
//               return a[sorting.column] > b[sorting.column] ? 1 : -1;
//           } else if (sorting.direction === 'desc') {
//               return a[sorting.column] < b[sorting.column] ? 1 : -1;
//           }
//           return 0;
//       });
  
//       const renderSortingIcon = (column) => {
//           if (sorting.column !== column) {
//               return <>
//                   <Box sx={{ color:'#bbb6b6'}}>
//                       <Grid sx={{height:'6px',fontSize:'1.6rem'}}>
//                           <ArrowDropUpOutlinedIcon/>
//                       </Grid>
//                       <Grid sx={{height:'6px',fontSize:'1.6rem'}}>
//                           <ArrowDropDownOutlinedIcon/>
//                       </Grid>
//                   </Box>
//               </>;
//           } else if (sorting.direction === 'asc') {
//               return <>
//                   <Box >
//                       <Grid sx={{height:'6px'}}>
//                           <ArrowDropUpOutlinedIcon style={{ color:'black',fontSize:'1.6rem'}}/>
//                       </Grid>
//                       <Grid sx={{height:'6px'}}>
//                           <ArrowDropDownOutlinedIcon style={{ color:'#bbb6b6',fontSize:'1.6rem'}}/>
//                       </Grid>
//                   </Box>
//               </>;
//           } else {
//               return  <>
//                   <Box >
//                       <Grid sx={{height:'6px'}}>
//                           <ArrowDropUpOutlinedIcon style={{ color:'#bbb6b6',fontSize:'1.6rem'}}/>
//                       </Grid>
//                       <Grid sx={{height:'6px'}}>
//                           <ArrowDropDownOutlinedIcon style={{ color:'black',fontSize:'1.6rem'}}/>
//                       </Grid>
//                   </Box>
//               </>;
//           }
//       };
//   //Datatable
//     const handlePageChange = (newPage) => {
//       setPage(newPage);
//     };
  
//     const handlePageSizeChange = (event) => {
//       setPageSize(Number(event.target.value));
//       setPage(1);
//     };
  
   
      
//     //datatable....
//     const [searchQuery, setSearchQuery] = useState("");
//     const handleSearchChange = (event) => {
//       setSearchQuery(event.target.value);
//     };
//     const filteredDatas = items.filter((item) =>
//       Object.values(item).some((value) =>
//         value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
  
//     const filteredData = filteredDatas.slice((page - 1) * pageSize, page * pageSize);
  
//     const totalPages = Math.ceil(submodules.length / pageSize);
  
//     const visiblePages = Math.min(totalPages, 3);
  
//     const firstVisiblePage = Math.max(1, page - 1);
//     const lastVisiblePage = Math.min(firstVisiblePage + visiblePages - 1, totalPages);
  
//     const pageNumbers = [];
  
//     const indexOfLastItem = page * pageSize;
//     const indexOfFirstItem = indexOfLastItem - pageSize;
  
//     for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
//       pageNumbers.push(i);
//     }
  



//     return (
//         <Box>
//             {/* ****** Header Content ****** */}
//             <Typography sx={userStyle.HeaderText}> SubModule </Typography>

//             <Box sx={userStyle.container}>
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={8}>
//                             <Typography sx={userStyle.importheadtext}>Manage SubModule</Typography>
//                         </Grid>
//                     </Grid>
//                     <br />
//                     <Grid container spacing={2}>
//                         <Grid item md={4} xs={12} sm={12}>
//                             <Typography>Project</Typography>
//                             <FormControl size="small" fullWidth>
//                                 <Select
//                                     labelId="demo-select-small"
//                                     id="demo-select-small"
//                                     value={submodule.project}
//                                     onChange={(e, i) => {
//                                         setSubmodule({ ...submodule, project: e.target.value });
                                      
//                                     }}
//                                 >{project &&
//                                     project.map((row, index) => (
//                                         <MenuItem value={row.name} key={index} onClick={() =>{ fetchSubProjectDropdowns(row.name);getprojectnameg(row.name)} }>
//                                             {row.name}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         { subprojectnone == "None" ? null :
//                         <Grid item md={4} xs={12} sm={12}>
//                             <Typography>Sub Project</Typography>
//                             <FormControl size="small" fullWidth>
//                                 <Select
//                                     labelId="demo-select-small"
//                                     id="demo-select-small"
//                                     value={submodule.subproject}
//                                     onChange={(e, i) => {
//                                         setSubmodule({ ...submodule, subproject: e.target.value });
                                        
//                                     }}

//                                 >
//                                     {subproject &&
//                                         subproject.map((row, index) => (
//                                             <MenuItem value={row.name} key={index} onClick={() => fetchModuleDropdowns(row.name)}>
//                                                 {row.name}
//                                             </MenuItem>
//                                         ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         }
//                         <Grid item md={4} xs={12} sm={12}>
//                             <Typography>Module</Typography>
//                             <FormControl size="small" fullWidth>
//                                 <Select
//                                     labelId="demo-select-small"
//                                     id="demo-select-small"
//                                     value={submodule.module}
//                                     onChange={(e, i) => {
//                                         setSubmodule({ ...submodule, module: e.target.value });
//                                         fetchTimeDiffCal(e.target.value);
//                                     }}
//                                 >{module &&
//                                     module.map((row, index) => (
//                                         <MenuItem value={row.name} key={index}>
//                                             {row.name}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item md={4} xs={12} sm={12}>
//                             <FormControl fullWidth size="small">
//                                 <Typography>Name</Typography>
//                                 <OutlinedInput
//                                     id="component-outlined"
//                                     type="text"
//                                     value={submodule.name}
//                                     onChange={(e) => {
//                                         setSubmodule({ ...submodule, name: e.target.value });
//                                     }}
//                                 />
//                             </FormControl>
//                         </Grid>
//                         {/* <Grid item md={2} xs={12} sm={12}>
//                             <Typography>Choose if No subproject</Typography>

//                             <FormControlLabel
//                                 value="None"
//                                 control={<Checkbox checked={isChecked}
//                                 onChange={handleCheckboxChange} />}
//                                 label="None"
//                                 labelPlacement="end"
//                             />

//                         </Grid> */}
//                         <Grid item md={4} xs={12} sm={12}>
//                             <Grid container>
//                                 <Grid item md={6} xs={6} sm={6}>
//                                     <Typography>Estimation</Typography>
//                                     <FormControl fullWidth size="small" >
//                                         <OutlinedInput
//                                             id="component-outlined"
//                                             type="text"
//                                             value={submodule.estimation > typeEst ? "" : submodule.estimation}
//                                             onChange={(e) => { setSubmodule({ ...submodule, estimation: e.target.value }) }}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item md={6} xs={6} sm={6}>
//                                     <Typography> Time</Typography>
//                                     <Select
//                                         fullWidth
//                                         labelId="demo-select-small"
//                                         id="demo-select-small"
//                                         value={submodule.estimationtime}
//                                         onChange={(e) => {
//                                             setSubmodule({ ...submodule, estimationtime: e.target.value });
//                                             fetchCalculRemaining(e.target.value);
//                                         }}
//                                     >
//                                         <MenuItem value="Days"> {"Days"} </MenuItem>
//                                         <MenuItem value="Month"> {"Month"} </MenuItem>
//                                         <MenuItem value="Year"> {"Year"} </MenuItem>
//                                     </Select>
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     {submodule.estimationtime ?
//                         <Typography sx={{ color: "red" }}> {typeEst} {submodule.estimationtime} is Remaining </Typography> : " "}
//                     <br />
//                     <br />
//                     <Grid item xs={12} sm={12} md={4} lg={12}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             sx={{ display: "flex" }}
//                             type="submit"
//                         >
//                             SUBMIT
//                         </Button>
//                     </Grid>
//                 </form>
//             </Box>
//             <Box>
//                 {/* edit model */}
//                 <Dialog
//                     open={isEditOpen}
//                     onClose={handleCloseModEdit}
//                     aria-labelledby="alert-dialog-title"
//                     aria-describedby="alert-dialog-description"
//                 >
//                     <Box sx={userStyle.container}>
//                         <>
//                             <Grid container spacing={2}>

//                                 <Typography sx={userStyle.importheadtext}>
//                                     Manage SubModule
//                                 </Typography>

//                             </Grid>
//                             <br />
//                             <Grid container spacing={2}>
//                                 <Grid item md={12} xs={12} sm={12}>
//                                     <FormControl fullWidth size="small" >
//                                         <Typography>project </Typography>
//                                         <Select
//                                             labelId="demo-select-small"
//                                             id="demo-select-small"
//                                             value={submoduleid.project}
//                                             onChange={(e) => {
//                                                 setSubmoduleid({ ...submoduleid, project: e.target.value });
//                                                 setgetprojectname(e.target.value)
//                                             }}
//                                         >
//                                             {project &&
//                                                 project.map((row,i) => (
//                                                     <MenuItem value={row.name} key={i}>{row.name}</MenuItem>
//                                                 ))}
//                                         </Select>
//                                     </FormControl>
//                                 </Grid><br />
//                                 <Grid item md={12} xs={12} sm={12}>
//                                     <FormControl fullWidth size="small" >
//                                         <Typography>Subproject </Typography>
//                                         <Select
//                                             labelId="demo-select-small"
//                                             id="demo-select-small"
//                                             value={submoduleid.subproject}
//                                             onChange={(e) => {
//                                                 setSubmoduleid({ ...submoduleid, subproject: e.target.value });
//                                                 setgetsubprojectname(e.target.value);
//                                             }}
//                                         >
//                                             {
//                                                 subProjectEdit && subProjectEdit?.map((data,i) => {
//                                                     return <MenuItem value={data.name} key={i}>{data.name}</MenuItem>
//                                                 })
//                                             }
//                                         </Select>
//                                     </FormControl>
//                                 </Grid><br />
//                                 <Grid item md={12} xs={12} sm={12}>
//                                     <FormControl fullWidth size="small" >
//                                         <Typography>Module </Typography>
//                                         <Select
//                                             labelId="demo-select-small"
//                                             id="demo-select-small"
//                                             value={submoduleid.module}
//                                             onChange={(e) => {
//                                                 setSubmoduleid({ ...submoduleid, module: e.target.value });
//                                                 setEditProjDropdown(e.target.value)
//                                             }}
//                                         >
//                                             {
//                                                 moduleEdit && moduleEdit.map((row, index) => {
//                                                     return <MenuItem value={row.name} key={index}>{row.name}</MenuItem>
//                                                 })
//                                             }
//                                         </Select>
//                                     </FormControl>
//                                 </Grid><br />
//                                 <Grid item md={12} xs={12} sm={12}>
//                                     <FormControl fullWidth size="small">
//                                         <Typography>Name</Typography>
//                                         <OutlinedInput
//                                             id="component-outlined"
//                                             type="text"
//                                             value={submoduleid.name}
//                                             onChange={(e) => {
//                                                 setSubmoduleid({ ...submoduleid, name: e.target.value });
//                                             }}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//                             </Grid><br />
//                             <Grid container>
//                                 <Grid item md={6} xs={6} sm={6}>
//                                     <Typography>Estimation</Typography>
//                                     <FormControl fullWidth size="small" >
//                                         <OutlinedInput
//                                             id="component-outlined"
//                                             type="text"
//                                             value={submoduleid.estimation >  Number(conditionTiming) ? " " : submoduleid.estimation}
//                                             onChange={(e) => { setSubmoduleid({ ...submoduleid,  estimation: Number(e.target.value) }) }}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//                                 <br />
//                                 <Grid item md={6} xs={6} sm={6}>
//                                     <Typography> Time</Typography>
//                                     <Select
//                                         fullWidth
//                                         labelId="demo-select-small"
//                                         id="demo-select-small"
//                                         value={submoduleid.estimationtime}
//                                         onChange={(e) => {
//                                             setSubmoduleid({ ...submoduleid, estimationtime: e.target.value });
//                                             fetchCalculRemaining(e.target.value);
//                                             fetchEditTimeCal(e.target.value);
//                                             setGetEstiType(e.target.value);
//                                         }}
//                                     >
//                                         <MenuItem value="Days"> {"Days"} </MenuItem>
//                                         <MenuItem value="Month"> {"Month"} </MenuItem>
//                                         <MenuItem value="Year"> {"Year"} </MenuItem>
//                                     </Select>
//                                 </Grid>
//                             </Grid>
//                             <Typography sx={{color:"red"}}> {editCalOverall}</Typography>
//                             <br /> <br />
//                             <Grid container spacing={2}>
//                                 <Grid item md={6} xs={12} sm={12}>
//                                     <Button variant="contained" onClick={editSubmit}>  Update</Button>
//                                 </Grid><br />
//                                 <Grid item md={6} xs={12} sm={12}>
//                                     <Button sx={userStyle.btncancel} onClick={handleCloseModEdit}> Cancel </Button>
//                                 </Grid>
//                             </Grid>
//                         </>
//                     </Box>
//                 </Dialog>
//             </Box>
//             <br />
//             {/* ****** Table Start ****** */}
//             <>
//                 <Box sx={userStyle.container}>
//                     {/* ******************************************************EXPORT Buttons****************************************************** */}
//                     {/*       
//           <Box sx={userStyle.container} > */}
//                     <Grid item xs={8}>
//                         <Typography sx={userStyle.importheadtext}>SubModule List</Typography>
//                     </Grid>
//                     <Grid container sx={{ justifyContent: "center" }}>
//                         <Grid>
//                             <ExportCSV csvData={submoduleData} fileName={fileName} />

//                             <ExportXL csvData={submoduleData} fileName={fileName} />

//                             <Button sx={userStyle.buttongrp} onClick={handleprint}>
//                                 &ensp;
//                                 <FaPrint />
//                                 &ensp;Print&ensp;
//                             </Button>

//                             <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}>
//                                 <FaFilePdf />
//                                 &ensp;Export to PDF&ensp;
//                             </Button>
//                         </Grid>
//                     </Grid>
//                     <br />
//                     <Grid style={userStyle.dataTablestyle}>
//                         <Box>
//                             <label htmlFor="pageSizeSelect">Show entries:</label>
//                             <Select id="pageSizeSelect" value={pageSize} onChange={handlePageSizeChange} sx={{width:"77px"}}>
//                             <MenuItem value={1}>1</MenuItem>
//                             <MenuItem value={5}>5</MenuItem>
//                             <MenuItem value={10}>10</MenuItem>
//                             <MenuItem value={25}>25</MenuItem>
//                             <MenuItem value={50}>50</MenuItem>
//                             <MenuItem value={100}>100</MenuItem>
//                             <MenuItem value={(submodules.length)}>All</MenuItem>
//                             </Select>
//                         </Box>
//                         <Box>
//                             <FormControl fullWidth size="small" >
//                                 <Typography>Search</Typography>
//                                 <OutlinedInput
//                                     id="component-outlined"
//                                     type="text"
//                                     value={searchQuery}
//                                     onChange={handleSearchChange}
//                                 />
//                             </FormControl>
//                         </Box>
//                     </Grid>

//                     {/* ****** Table Grid Container ****** */}
                 
//                     {/* ****** Table start ****** */}
//                     <TableContainer component={Paper}>
//                         <Table
//                             sx={{ minWidth: 700 }}
//                             aria-label="customized table"
//                             id="usertable"
//                         >
//                             <TableHead sx={{ fontWeight: "600" }}>
//                                 <StyledTableRow>
//                                     <StyledTableCell onClick={() => handleSorting('serialNumber')}><Box sx={userStyle.tableheadstyle}><Box>SNo</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('serialNumber')}</Box></Box></StyledTableCell>
//                                         <StyledTableCell onClick={() => handleSorting('project')}><Box sx={userStyle.tableheadstyle}><Box>Project Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('project')}</Box></Box></StyledTableCell>
//                                         <StyledTableCell onClick={() => handleSorting('subproject')}><Box sx={userStyle.tableheadstyle}><Box>Subproject Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('subproject')}</Box></Box></StyledTableCell>
//                                         <StyledTableCell onClick={() => handleSorting('module')}><Box sx={userStyle.tableheadstyle}><Box>Module Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('module')}</Box></Box></StyledTableCell>
//                                         <StyledTableCell onClick={() => handleSorting('name')}><Box sx={userStyle.tableheadstyle}><Box>Submodule Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('name')}</Box></Box></StyledTableCell>
//                                         <StyledTableCell onClick={() => handleSorting('estimateTime')}><Box sx={userStyle.tableheadstyle}><Box>Estimation Time</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('estimateTime')}</Box></Box></StyledTableCell>
//                                         <StyledTableCell>Action</StyledTableCell>
//                                         </StyledTableRow>
//                                     </TableHead>
//                                 <TableBody align="left">
//                                 {filteredData.length > 0 ? (
//                                filteredData?.map((row, index) => (
//                                             <StyledTableRow key={index}>
//                                                 <StyledTableCell>{row.serialNumber}</StyledTableCell>
//                                                 <StyledTableCell>{row.project}</StyledTableCell>
//                                                 <StyledTableCell>{row.subproject}</StyledTableCell>
//                                                 <StyledTableCell>{row.module}</StyledTableCell>
//                                                 <StyledTableCell>{row.name}</StyledTableCell>
//                                                 <StyledTableCell>{row.estimateTime}</StyledTableCell>
//                                                 <StyledTableCell component="th" scope="row" colSpan={1}>
//                                                     <Grid sx={{ display: "flex" }}>
//                                                         <Button
//                                                             sx={userStyle.buttonedit}
//                                                             onClick={() => {
//                                                                 handleClickOpenEdit();
//                                                                 getCode(row._id);
//                                                             }}
//                                                         >
//                                                             <EditOutlinedIcon style={{ fontsize: "large" }} />
//                                                         </Button>
//                                                         <Button
//                                                             sx={userStyle.buttondelete}
//                                                             onClick={(e) => {
//                                                                 handleClickOpen();
//                                                                 rowData(row._id);
//                                                             }}
//                                                         >
//                                                             <DeleteOutlineOutlinedIcon
//                                                                 style={{ fontsize: "large" }}
//                                                             />
//                                                         </Button>
//                                                         <Button
//                                                             sx={userStyle.buttonedit}
//                                                             onClick={() => {
//                                                                 handleClickOpenview();
//                                                                 getviewCode(row._id);
//                                                             }}
//                                                         >
//                                                             <VisibilityOutlinedIcon style={{ fontsize: "large" }} />
//                                                         </Button>
//                                                         <Button
//                                                             sx={userStyle.buttonedit}
//                                                             onClick={() => {
//                                                                 handleClickOpeninfo();
//                                                                 getinfoCode(row._id);
//                                                             }}
//                                                         >
//                                                             <InfoOutlinedIcon style={{ fontsize: "large" }} />
//                                                         </Button>
//                                                     </Grid>
//                                                 </StyledTableCell>
//                                             </StyledTableRow>
//                                  )))
//                                   :   <StyledTableRow> <StyledTableCell colSpan={7} align="center">No Data Available</StyledTableCell> </StyledTableRow>
//                                    }
//                                  </TableBody>
//                                </Table>
//                              </TableContainer>
//                              <Box style={userStyle.dataTablestyle}>
//                                <Box>
//                                    Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, submodules.length)} of {submodules.length} entries
//                                  </Box>
//                                  <Box>
//                                    <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1} sx={{textTransform:'capitalize',color:'black'}}>
//                                      Prev
//                                    </Button>
//                                    {pageNumbers?.map((pageNumber) => (
//                                      <Button key={pageNumber} sx={userStyle.paginationbtn} onClick={() => handlePageChange(pageNumber)} className={((page )) === pageNumber ? 'active' : ''} disabled={page === pageNumber}>
//                                        {pageNumber}
//                                      </Button>
//                                    ))}
//                                    {lastVisiblePage < totalPages && <span>...</span>}
//                                    <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} sx={{textTransform:'capitalize',color:'black'}}>
//                                      Next
//                                    </Button>
//                                  </Box>  
//                                </Box>       
//                     {/* ****** Table End ****** */}
//                 </Box>
//             </>
//             {/* ****** Table End ****** */}

//             {/* Delete Modal */}
//             <Box>
//                 {/* ALERT DIALOG */}
//                 <Dialog
//                     open={isDeleteOpen}
//                     onClose={handleCloseMod}
//                     aria-labelledby="alert-dialog-title"
//                     aria-describedby="alert-dialog-description"
//                 >
//                     <DialogContent
//                         sx={{ width: "350px", textAlign: "center", alignItems: "center" }}
//                     >
//                         <ErrorOutlineOutlinedIcon
//                             sx={{ fontSize: "80px", color: "orange" }}
//                         />
//                         <Typography variant="h5" sx={{ color: "red", textAlign: "center" }}>
//                             Are you sure?
//                         </Typography>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleCloseMod} sx={userStyle.btncancel}>
//                             Cancel
//                         </Button>
//                         <Button
//                             autoFocus
//                             variant="contained"
//                             color="error"
//                             onClick={(e) => delSubModule(submoduleData)}
//                         >
//                             {" "}
//                             OK{" "}
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//                 {/* print layout */}
//                 <TableContainer component={Paper} sx={userStyle.printcls}>
//                     <Table
//                         sx={{ minWidth: 700 }}
//                         aria-label="customized table"
//                         id="usertable"
//                         ref={componentRef}
//                     >
//                         <TableHead sx={{ fontWeight: "600" }}>
//                             <TableRow>
//                                 <TableCell> SI.No</TableCell>
//                                 <TableCell> Project</TableCell>
//                                 <TableCell> Sub project</TableCell>
//                                 <TableCell> Module Name</TableCell>
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>Estimation Time</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody >
//                             {submodules &&
//                                 submodules.map((row, index) => (
//                                     <TableRow key={index}>
//                                         <TableCell>{index+1}</TableCell>
//                                         <TableCell>{row.project}</TableCell>
//                                         <TableCell>{row.subproject}</TableCell>
//                                         <TableCell>{row.module}</TableCell>
//                                         <TableCell>{row.name}</TableCell>
//                                         <TableCell>{row.estimation + " " + row.estimationtime}</TableCell>
//                                     </TableRow>
//                                 ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//             {/* view model */}
//             <Dialog
//                 open={openview}
//                 onClose={handleCloseview}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <Box sx={{ width: '550px', padding: '20px 50px' }}>
//                     <>
//                         <Typography sx={userStyle.HeaderText}>View SubModule </Typography>
//                         <br /><br />
//                         <Grid container spacing={2}>
//                             <Grid item md={6} xs={12} sm={12}>
//                                 <FormControl fullWidth size="small">
//                                     <Typography variant="h6">project</Typography>
//                                     <Typography>{submoduleid.project}</Typography>
//                                 </FormControl>
//                             </Grid>
//                             <Grid item md={6} xs={12} sm={12}>
//                                 <FormControl fullWidth size="small">
//                                     <Typography variant="h6">Subproject</Typography>
//                                     <Typography>{submoduleid.subproject}</Typography>
//                                 </FormControl>
//                             </Grid>
//                             <Grid item md={6} xs={12} sm={12} >
//                                 <FormControl fullWidth size="small">
//                                     <Typography variant="h6"> Module Name</Typography>
//                                     <Typography>{submoduleid.module}</Typography>
//                                 </FormControl>
//                             </Grid>
//                             <Grid item md={6} xs={12} sm={12}>
//                                 <FormControl fullWidth size="small">
//                                     <Typography variant="h6">Name</Typography>
//                                     <Typography>{submoduleid.name}</Typography>
//                                 </FormControl>
//                             </Grid>
//                             <Grid item md={6} xs={12} sm={12}>
//                                 <FormControl fullWidth size="small">
//                                     <Typography variant="h6">Estimation Time</Typography>
//                                     <Typography>{submoduleid.estimation + " " + submoduleid.estimationtime}</Typography>
//                                 </FormControl>
//                             </Grid>
//                         </Grid>
//                         <br /> <br /><br />
//                         <Grid container spacing={2}>
//                             <Button variant="contained" onClick={handleCloseview}> Back </Button>
//                         </Grid>
//                     </>
//                 </Box>
//             </Dialog>

//             {/* this is info view details */}

//             <Dialog
//                 open={openInfo}
//                 onClose={handleCloseinfo}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <Box sx={{ width: '550px', padding: '20px 50px' }}>
//                     <>
//                         <Typography sx={userStyle.HeaderText}> Info</Typography>
//                         <br /><br />
//                         <Grid container spacing={2}>
//                             <Grid item md={12} xs={12} sm={12}>
//                                 <FormControl fullWidth size="small">
//                                     <Typography variant="h6">addedby</Typography>
//                                     <br/>
//                                     <Table>
//                                             <TableHead>
//                                                     <StyledTableCell sx={{padding:'5px 10px !important'}}>{"SNO"}.</StyledTableCell>
//                                                     <StyledTableCell sx={{padding:'5px 10px !important'}}> {"UserName"}</StyledTableCell>
//                                                     <StyledTableCell sx={{padding:'5px 10px !important'}}> {"Date"}</StyledTableCell>
//                                             </TableHead>
//                                             <TableBody>
//                                             {addedby?.map((item, i) => (
//                                                 <StyledTableRow>
//                                                     <StyledTableCell sx={{padding:'5px 10px !important'}}>{i+1}.</StyledTableCell>
//                                                     <StyledTableCell sx={{padding:'5px 10px !important'}}> {item.name}</StyledTableCell>
//                                                     <StyledTableCell sx={{padding:'5px 10px !important'}}> {moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</StyledTableCell>
//                                                 </StyledTableRow>
//                                                      ))}
//                                             </TableBody>
//                                         </Table>
//                                 </FormControl>
//                             </Grid>
//                             <Grid item md={12} xs={12} sm={12}>
//                                 <FormControl fullWidth size="small">
//                                     <Typography variant="h6">Updated by</Typography>
//                                     <br/>
//                                     <Table>
//                                             <TableHead>
//                                                     <StyledTableCell sx={{padding:'5px 10px !important'}}>{"SNO"}.</StyledTableCell>
//                                                     <StyledTableCell sx={{padding:'5px 10px !important'}}> {"UserName"}</StyledTableCell>
//                                                     <StyledTableCell sx={{padding:'5px 10px !important'}}> {"Date"}</StyledTableCell>
//                                             </TableHead>
//                                             <TableBody>
//                                             {updateby?.map((item, i) => (
//                                                 <StyledTableRow>
//                                                     <StyledTableCell sx={{padding:'5px 10px !important'}}>{i+1}.</StyledTableCell>
//                                                     <StyledTableCell sx={{padding:'5px 10px !important'}}> {item.name}</StyledTableCell>
//                                                     <StyledTableCell sx={{padding:'5px 10px !important'}}> {moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</StyledTableCell>
//                                                 </StyledTableRow>
//                                                      ))}
//                                             </TableBody>
//                                         </Table>
//                                 </FormControl>
//                             </Grid>
//                         </Grid>
//                         <br /> <br /><br />
//                         <Grid container spacing={2}>
//                             <Button variant="contained" onClick={handleCloseinfo}> Back </Button>
//                         </Grid>
//                     </>
//                 </Box>
//             </Dialog>


//             {/* ALERT DIALOG */}
//             <Box>
//                 <Dialog
//                     open={isErrorOpen}
//                     onClose={handleCloseerr}
//                     aria-labelledby="alert-dialog-title"
//                     aria-describedby="alert-dialog-description"
//                 >
//                     <DialogContent
//                         sx={{ width: "350px", textAlign: "center", alignItems: "center" }}
//                     >
//                         {/* <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} /> */}
//                         <Typography variant="h6">{showAlert}</Typography>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button variant="contained" color="error" onClick={handleCloseerr}>
//                             ok
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             </Box>
//         </Box>
//     );
// }

// export default Submodule;

import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, Dialog, TableBody,TableRow,TableCell, Select, MenuItem, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button } from "@mui/material";
import { userStyle } from "../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import { SERVICE } from '../../services/Baseservice';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import axios from "axios";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useReactToPrint } from "react-to-print";
import moment from 'moment-timezone';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';


function Submodule() {

    const [project, setProject] = useState([]);
    const [subproject, setSubProject] = useState([]);
    const [projectEdit, setProjectEdit] = useState([]);
    const [subProjectEdit, setSubProjectEdit] = useState([]);
    const [module, setModule] = useState([]);
    const [moduleEdit, setModuleEdit] = useState([]);
    const [submodule, setSubmodule] = useState({
        project: "", subproject: "", module: "", name: "", estimation: "", estimationtime: ""
    });
    const [submodules, setSubmodules] = useState([]);
    const [submoduleid, setSubmoduleid] = useState({ name: "", project: "", subproject: "", module: "", estimation: "", estimationtime: "" });
    const [isChecked, setIsChecked] = useState(false);
    const [checkvalue, setCheckvalue] = useState("");
    const [username, setUsername] = useState("");
    const [getrowid, setRowGetid] = useState("");
    const [timeCalculation, setTimeCalculation] = useState("");
    const [timeCalculationEdit, setTimeCalculationEdit] = useState("");
    const [timeDiffCal, setTimeDiffCal] = useState("");
    const [timeDiffCalEdit, setTimeDiffCalEdit] = useState("");
    const [typeEst, setTypeEst] = useState("");
    const [typeEstEdit, setTypeEstEdit] = useState("");
    const [finalCheck, SetFinalCheck] = useState("");
    const [typCheck, setTypeCheck] = useState("");
    const [typeEstEditCheck, setTypeEstEditCheck] = useState("");
    const[rowEditTime , setRowEditTime] = useState("");
    const[rowEditTimeProj , setRowEditTimeProj] = useState("");
    const[editTimeCalculation , setEditTimeCalculation] = useState("");
    const[editCalOverall , setEditCalOverall] = useState("");
    const[getEstitype , setGetEstiType] = useState("");
    const[conditionTiming , setConditionTiming] = useState("");
    const[editProjDropdwon , setEditProjDropdown] = useState("");
    const[moduleEditList , setModuleEditList] = useState([]);

    //Datatable
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);


    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        if (event.target.checked) {
            setCheckvalue(event.target.value);
        }
    };

    const[projectnameg,getprojectnameg] = useState("");

    // Error Popup model
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [showAlert, setShowAlert] = useState();
    const handleClickOpenerr = () => {
        setIsErrorOpen(true);
    };
    const handleCloseerr = () => {
        setIsErrorOpen(false);
    };

    // view model
    const [openview, setOpenview] = useState(false);

    const handleClickOpenview = () => {
        setOpenview(true);
    };

    const handleCloseview = () => {
        setOpenview(false);
    };

    // info model
    const [openInfo, setOpeninfo] = useState(false);

    const handleClickOpeninfo = () => {
        setOpeninfo(true);
    };

    const handleCloseinfo = () => {
        setOpeninfo(false);
    };


    //Delete model
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleClickOpen = () => {
        setIsDeleteOpen(true);
    };
    const handleCloseMod = () => {
        setIsDeleteOpen(false);
    };

    //set function to get particular row
    const [deletesubmodule, setDeletesubmodule] = useState({});
    const rowData = async (id) => {
        try {
            let res = await axios.get(`${SERVICE.SUBMODULE_SINGLE}/${id}`, {
                // headers: {
                //     'Authorization': `Bearer ${auth.APIToken}`
                // }
            });
            setDeletesubmodule(res.data.ssubmodule);
        } catch (err) { }
    };
    // Alert delete popup
    let submodulesid = deletesubmodule._id;
    const delSubModule = async () => {
        try {
            await axios.delete(
                `${SERVICE.SUBMODULE_SINGLE}/${submodulesid}`, {});
            handleCloseMod();
        } catch (err) { }
    };


    //fetching Project for Dropdowns
    const fetchProjectDropdowns = async () => {
        try {
            let projectDrop = await axios.get(SERVICE.PROJECT);
            setProject(projectDrop.data.projects);
            setProjectEdit(projectDrop.data.projects);
        } catch (error) {
            console.log(error.response.data);
        }
    };

const[subprojectnone, setsubprojectnone] = useState("")
    //fetching sub-Project Dropdowns
    const fetchSubProjectDropdowns = async (e) => {
        try {
            let subPro = await axios.get(SERVICE.SUBPROJECT);
            let subProDrop = subPro.data.subprojects.filter((data) => {         
                if (e === data.project){                  
                       
                         return data                        
                    
                }
                  
            })
    
            setSubProject(subProDrop);

        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        if(subproject.length == 0){
            setsubprojectnone("None")
        }else{
            setsubprojectnone("Show")
        }
      
    })

    const [getprojectname, setgetprojectname] = useState("")


    const[subprojecteditnone, setsubprojecteditnone] = useState("")
    //fetching sub-Project Dropdowns
    const fetchSubProjectDropdownsedit = async () => {
        let projectName = getprojectname ? getprojectname : submoduleid.project
        console.log(projectName,'pro')
        try {
            let subPro = await axios.get(SERVICE.SUBPROJECT);
            let subProDrop = subPro.data.subprojects.filter((data) => {
                if (projectName === data.project)
                    return data
            })
            setSubProjectEdit(subProDrop);

        } catch (error) {
            console.log(error.response.data);
        }
    };
    
    useEffect(() => {
        if(subProjectEdit.length == 0){
            setsubprojecteditnone("None")
        }else{
            setsubprojecteditnone("Show")
        }
      
    })


    //fetching Module Dropdowns
    const fetchModuleDropdowns = async (e) => {
        try {
            let dropModule = await axios.get(SERVICE.MODULE);
            let modulelist = dropModule.data.modules.filter((data) => {
               
                if (subprojectnone == "None"  ? projectnameg == data.project : e === data.subproject) {
                    return data
                }
            })
            setModule(modulelist);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        if(subprojectnone == "None" ){          
            fetchModuleDropdowns();
        }
    })
   
        //fetching Project for Dropdowns
        const fetchModuleEditDropDown = async () => {
            try {
                let projectDrop = await axios.get(SERVICE.MODULE);
                setModuleEditList(projectDrop.data.modules)

            } catch (error) {
                console.log(error.response.data);
            }
        };
    

    const [getsubprojectname, setgetsubprojectname] = useState("")

    //fetching Module Dropdowns
    const fetchModuleDropdownsedit = async () => {
        let modulename = getsubprojectname ? getsubprojectname : submoduleid.subproject;
        console.log(modulename,'MOD')
        try {
            let dropModule = await axios.get(SERVICE.MODULE);
            let modulelist = dropModule.data.modules.filter((data) => {
                if (modulename == data.subproject) {
                    return data
                }
            })
            setModuleEdit(modulelist);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    //  console.log(moduleEdit,'noduleedit')

    //add function...
    const sendRequest = async () => {
        try {
            let submodules = await axios.post(SERVICE.SUBMODULE_CREATE, {
                project: String(submodule.project),
                subproject: String(submodule.subproject),
                module: String(submodule.module),
                name: String(isChecked ? checkvalue : submodule.name),
                estimation: String(submodule.estimation),
                estimationtime: String(submodule.estimationtime),
                addedby: [
                    {
                        name: String(username),
                        date: String(new Date()),

                    },
                ],
            });
            setSubmodule(submodules.data);
            setSubmodule({ project: "", subproject: "", module: "", name: "", estimation: "", estimationtime: "" });
        } catch (error) {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {error.response.data.errorMessage}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
    };
    //submit option for saving
    const handleSubmit = (e) => {
        e.preventDefault();
        if (submodule.project === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose Project Name"}
                    </p>
                </>
            );
            handleClickOpenerr();
        } else if (submodule.subproject === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose Subproject Name"}
                    </p>
                </>
            );
            handleClickOpenerr();
        } else if (submodule.module === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose Module Name"}
                    </p>
                </>
            );
            handleClickOpenerr();
        } else if (submodule.name === "" ) {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Enter Sub Module Name"}
                    </p>
                </>
            );
            handleClickOpenerr();
        } else if (submodule.estimation === "" && submodule.estimationtime == "" ) {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Enter Estimation Time"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else {
            sendRequest();
        }
    };

    let difference = [];
    let ans = 0;
    let timeDiffs = 0;
    //calculate time difference between the choosed projects
    const fetchTimeDiffCal = async (projName) => {
        try {

            let sub_proj_time = submodules.map((data) => {
                if (projName === data.subproject) {

                    if (data.estimationtime === "Month") {
                        difference.push(Math.round((Number(data.estimation) / 12) * 365))
                    }
                    else if (data.estimationtime === "Year") {
                        difference.push(Number(data.estimation) * 365)
                    }
                    else if (data.estimationtime === "Days") {
                        difference.push(Number(data.estimation))
                    }
                    ans = difference.reduce((acc, cur) => acc + cur);
                    setTimeCalculation(ans);
                    setTimeCalculationEdit(ans)
                }
                else if ((projName != data.subproject)) {
                    setTimeCalculation(0);
                }

            })

            let project_check = module.map((value) => {
                if (projName === value.name) {
                    if (value.estimationtime === "Month") {
                        timeDiffs = ((Number(value.estimation) / 12) * 365);
                        console.log(difference)
                        setTimeDiffCal(timeDiffs)
                        setTimeDiffCalEdit(timeDiffs)

                    }
                    else if (value.estimationtime === "Year") {
                        setTimeDiffCal(0)
                        setTimeDiffCalEdit(0)
                        timeDiffs = Number(value.estimation) * 365;
                        setTimeDiffCal(timeDiffs)
                        setTimeDiffCalEdit(timeDiffs)

                    }
                    else if (value.estimationtime === "Days") {
                        setTimeDiffCal(Number(value.estimation))
                        setTimeDiffCalEdit(Number(value.estimation))

                    }
                }
            })
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    const fetchCalculRemaining = async (estType) => {
        if (estType === "Month") {
            setTypeEst(Math.round((timeDiffCal - timeCalculation) / 30))
            setTypeEstEdit(Math.round((timeDiffCalEdit - timeCalculationEdit) / 30))
        }
        else if (estType === "Year") {
            setTypeEst(Math.round((timeDiffCal - timeCalculation) / 365));
            setTypeEstEdit(Math.round((timeDiffCalEdit - timeCalculationEdit) / 365));
        }
        else if (estType === "Days") {
            setTypeEst(Math.round(timeDiffCal - timeCalculation))
            setTypeEstEdit(Math.round(timeDiffCalEdit - timeCalculationEdit))
        }
    }


    const fetchEditTimeCal = async (estEdiType) => {
        try {

            if (estEdiType === "Year") {
                if (typCheck === "Month") {
                    let result = ((Number(typeEstEditCheck)) / 12)
                    SetFinalCheck(result)
                }
                else if (typCheck === "Year") {
                    let result = Number(typeEstEditCheck)
                    SetFinalCheck(result)
                }
                else if (typCheck === "Days") {
                    let result = ((Number(typeEstEditCheck)) / 365)
                    SetFinalCheck(result)
                }

            }
            else if (estEdiType === "Days") {
                if (typCheck === "Month") {
                    let result = (((Number(typeEstEditCheck)) / 12) * 365)
                    SetFinalCheck(result)
                }
                else if (typCheck === "Year") {
                    let result = (Number(typeEstEditCheck) * 365)
                    SetFinalCheck(result)
                }
                else if (typCheck === "Days") {
                    let result = Number(typeEstEditCheck)
                    SetFinalCheck(result)
                }

            }
            else if (estEdiType === "Month") {
                if (typCheck === "Month") {
                    let result = Number(typeEstEditCheck)
                    SetFinalCheck(result)
                }
                else if (typCheck === "Year") {
                    let result = (Number(typeEstEditCheck) / 12)
                    SetFinalCheck(result)
                }
                else if (typCheck === "Days") {
                    let result = ((Number(typeEstEditCheck) / 12) * 365)
                    SetFinalCheck(result)
                }

            }
        } catch (err) {
            console.log(err.response.data.errormessage)
        }
    }


    //Edit model...
    const [isEditOpen, setIsEditOpen] = useState(false);
    const handleClickOpenEdit = () => {
        setIsEditOpen(true);
    };
    const handleCloseModEdit = (e, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setIsEditOpen(false);
    };


    //id for login...

    let loginid = localStorage.LoginUserId;


    //get user row  edit  function
    const getusername = async () => {
        try {
            let res = await axios.get(`${SERVICE.USER}`)
            let user = res.data.users.filter((data) => {
                if (loginid === data._id) {
                    setUsername(data.username)
                    return data

                }
            })
         
        }
        catch (err) {
            console.log(err.response.data.errormessage)
        }
      
    }

    //get single row to edit....
    const getCode = async (e) => {
        let res = await axios.get(`${SERVICE.SUBMODULE_SINGLE}/${e}`, {});
        setSubmoduleid(res.data.ssubmodule);
        setRowGetid(res.data.ssubmodule);
        setTypeEstEditCheck(res.data.ssubmodule.estimation);
        setTypeCheck(res.data.ssubmodule.estimationtime)
        setRowEditTime(res.data.ssubmodule)
    };
    // get single row to view....
    const getviewCode = async (e) => {
        let res = await axios.get(`${SERVICE.SUBMODULE_SINGLE}/${e}`, {});
        setSubmoduleid(res.data.ssubmodule);

    };

    // get single row to view....
    const getinfoCode = async (e) => {
        let res = await axios.get(`${SERVICE.SUBMODULE_SINGLE}/${e}`, {});
        setSubmoduleid(res.data.ssubmodule);
    };

     //submodule updateby edit page...
    let updateby = submoduleid.updatedby;
    let addedby = submoduleid.addedby;

    let submoduletsid = getrowid._id;

    //editing the single data...
    const sendEditRequest = async () => {
        try {
            let res = await axios.put(
                `${SERVICE.SUBMODULE_SINGLE}/${submoduletsid}`,
                {
                    project: String(submoduleid.project),
                    subproject: String(submoduleid.subproject),
                    module: String(submoduleid.module),
                    name: String(submoduleid.name),
                    estimation: String(submoduleid.estimation),
                    estimationtime: String(submoduleid.estimationtime),
                    updatedby: [
                        ...updateby, {
                            name: String(username),
                            date: String(new Date()),

                        },
                    ],
                }
            );
            setSubmoduleid(res.data);
            handleCloseModEdit();
        } catch (err) {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {err.response.data.errorMessage}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
    };
    const editSubmit = (e) => {
        e.preventDefault();
        if (submoduleid.project === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose Project Name"}
                    </p>
                </>
            );
            handleClickOpenerr();
        } else if (submoduleid.subproject === "" && subprojectnone !== "None") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose Subproject Name"}
                    </p>
                </>
            );
            handleClickOpenerr();
        } else if (submoduleid.module === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose Module Name"}
                    </p>
                </>
            );
            handleClickOpenerr();
        } else if (submoduleid.name === "" && !isChecked) {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Enter Sub Module Name"}
                    </p>
                </>
            );
            handleClickOpenerr();
        } else if (submoduleid.estimation === "" && submoduleid.estimationtime == "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Enter Sub Module Name"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else {
            sendEditRequest();
        }

    };

    
    let differenceEdit = [];
    let ansEdit=0;
    let timeDiffsEdit=0;
    
       //Edit Page Functionality for Estimation Time 
       const fetchEditEstTime = async ()=>{
        try{
            let sub_Project = editProjDropdwon ?  editProjDropdwon : rowEditTime.module;

            let sub_proj_time = submodules.filter((data)=>{
    
                if(sub_Project === data.module){
              
                if(data.estimationtime === "Month"){
                    differenceEdit.push((Number(data.estimation) /12) * 365)
                }
                else if(data.estimationtime === "Year"){
                    differenceEdit.push( Number(data.estimation) * 365)
                }
                else if(data.estimationtime === "Days"){
                    differenceEdit.push(Number(data.estimation))
                }
                ansEdit = differenceEdit.reduce((acc , cur)=> acc+cur );
                setEditTimeCalculation(ansEdit);
            }
            
            
            else if (sub_Project != data.module){
                setEditTimeCalculation(ansEdit);

            }
           
           })

           let project_check = moduleEditList.map((value)=>{
             if(sub_Project === value.name){
                if(value.estimationtime === "Month"){
                timeDiffsEdit = ((Number(value.estimation) /12) * 365) ;
                setRowEditTimeProj(timeDiffsEdit)

                }
                else if(value.estimationtime === "Year"){
              timeDiffsEdit = Number(value.estimation) * 365 ;
              setRowEditTimeProj( timeDiffsEdit)

                }
                else if(value.estimationtime === "Days"){
                    setRowEditTimeProj(Number(value.estimation))
                }
            }           
           })


        }
        catch (error) {
            console.log(error.response.data)
        }
    }
       
    const fetchEditEstimationType = async () =>{

        let estimatType = getEstitype ? getEstitype : rowEditTime.estimationtime
        if(rowEditTime.estimationtime === "Month"){
            if(estimatType === "Month"){   
                let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(0).toString().split('.');
                setConditionTiming(Number(rowEditTime.estimation) + ((rowEditTimeProj - editTimeCalculation) / 30))
                setEditCalOverall(remaining[0] + " months Remaining " )          
           }
           
           else if(estimatType === "Days"){
            let remaining =((rowEditTimeProj - editTimeCalculation)).toFixed(0).toString();
                setConditionTiming((Number(rowEditTime.estimation) * 30)  + ((rowEditTimeProj - editTimeCalculation)))
                setEditCalOverall(remaining  + " days Remaining" )
           }
           
            else if(estimatType === "Year"){
            let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(0).toString().split('.');
            setConditionTiming(Number(rowEditTime.estimation)/12  + ((rowEditTimeProj - editTimeCalculation)/365))
            setEditCalOverall(remaining[0] + " months Remaining " )
           }

        }

        else if(rowEditTime.estimationtime === "Days"){
            if(estimatType === "Month"){   
                let remaining =((rowEditTimeProj - editTimeCalculation)/ 25).toFixed(0).toString().split('.')
                let rem = ((rowEditTimeProj - editTimeCalculation)% 25).toFixed(0).toString().split('.')
                setConditionTiming(Number(rowEditTime.estimation) / 30 + ((rowEditTimeProj - editTimeCalculation)/30))
                setEditCalOverall(remaining[0] + " months Remaining" )          
           }
           
           else if(estimatType === "Days"){
            let remaining =((rowEditTimeProj - editTimeCalculation)).toFixed(0).toString();
                setConditionTiming((Number(rowEditTime.estimation) )  + ((rowEditTimeProj - editTimeCalculation)))
                console.log(conditionTiming , '5' )
                setEditCalOverall(remaining  + " days Remaining" )
           }
           
            else if(estimatType === "Year"){
            let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(0).toString().split('.');
            setConditionTiming(Number(rowEditTime.estimation)/365  + ((rowEditTimeProj - editTimeCalculation)/365))
            setEditCalOverall(remaining[0] + " months Remaining" )
           }

        }

        else if(rowEditTime.estimationtime === "Year"){
            if(estimatType === "Month"){   
                let remaining =(((rowEditTimeProj - editTimeCalculation)/ 365)*12).toFixed(0).toString().split('.')
                setConditionTiming((Number(rowEditTime.estimation) * 12) + (((rowEditTimeProj - editTimeCalculation)/365)*12))
                setEditCalOverall(remaining[0] + " Months Remaining" )          
           }
           
           else if(estimatType === "Days"){
            let remaining =((rowEditTimeProj - editTimeCalculation)*365).toFixed(0).toString();
                setConditionTiming((Number(rowEditTime.estimation) * 365)  + ((rowEditTimeProj - editTimeCalculation)))
                setEditCalOverall(remaining  + " days Remaining" )
           }
           
            else if(estimatType === "Year"){
            let remaining =((rowEditTimeProj - editTimeCalculation)/365 ).toFixed(0).toString().split('.');
            setConditionTiming(Number(rowEditTime.estimation)  + ((rowEditTimeProj - editTimeCalculation)/365))
            setEditCalOverall(remaining[0]  + " years Remaining" )
           }

        }

    }

    
    //get all modules.
    const fetchAllSubModule = async () => {
        try {
            let res_module = await axios.get(SERVICE.SUBMODULE, {});
            setSubmodules(res_module.data.submodules);

        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    };

    const modifiedData = submodules.map((person) => ({
        ...person,
        estimateTime: person.estimation + ' ' + person.estimationtime,
      }));
    

    //pdf....
    const columns = [
        { title: "Project", field: "project" },
        { title: "Subproject", field: "subproject" },
        { title: "Module", field: "module" },
        { title: "Name", field: "name" },
        { title: "EstimationTime", field: "estimateTime" },
    ];
    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.autoTable({
            theme: "grid",
            columns: columns.map((col) => ({ ...col, dataKey: col.field })),
            body: modifiedData,
        });
        doc.save("SubModule.pdf");
    };

    // Excel
    const fileName = "submodules";

    const [submoduleData, setSubmoduleData] = useState([]);

  // get particular columns for export excel 
  const getexcelDatas = async () => {
    let response = await axios.get(SERVICE.SUBMODULE, {
        //  headers: {
        //      'Authorization': `Bearer ${auth.APIToken}`
        //  },
    });
    var data = response.data.submodules.map((t,index) => ({
        "SNO":index+1,
        "Project": t.project, 
        "Subproject": t.subproject,
        "Module": t.module,
        "Submodule": t.submodule,
        "Name": t.name, 
        "Estimation Time": t.estimation + " " + t.estimationtime,

    }));
    setSubmoduleData(data);
}

    //print...
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "SubModule",
        pageStyle: "print",
    });
    const [items, setItems] = useState([]);
    useEffect(() => {      
        getexcelDatas();
        getusername();   
        fetchProjectDropdowns();         
        fetchTimeDiffCal();
        fetchCalculRemaining();    
        fetchModuleEditDropDown();
    },[]);

    useEffect(() => {  
        fetchAllSubModule();
        fetchSubProjectDropdownsedit();
        fetchModuleDropdownsedit();
        fetchEditEstTime();
        fetchEditEstimationType();
    })

    const addSerialNumber = () => {
      const itemsWithSerialNumber = modifiedData?.map((item, index) => ({ ...item, serialNumber: index + 1 }));
      setItems(itemsWithSerialNumber);
    }
  
    useEffect(()=>{
      addSerialNumber();
    })
   //table sorting
      const [sorting, setSorting] = useState({ column: '', direction: '' });
  
      const handleSorting = (column) => {
          const direction = sorting.column === column && sorting.direction === 'asc' ? 'desc' : 'asc';
          setSorting({ column, direction });
      };
  
      const sortedData = items.sort((a, b) => {
          if (sorting.direction === 'asc') {
              return a[sorting.column] > b[sorting.column] ? 1 : -1;
          } else if (sorting.direction === 'desc') {
              return a[sorting.column] < b[sorting.column] ? 1 : -1;
          }
          return 0;
      });
  
      const renderSortingIcon = (column) => {
          if (sorting.column !== column) {
              return <>
                  <Box sx={{ color:'#bbb6b6'}}>
                      <Grid sx={{height:'6px',fontSize:'1.6rem'}}>
                          <ArrowDropUpOutlinedIcon/>
                      </Grid>
                      <Grid sx={{height:'6px',fontSize:'1.6rem'}}>
                          <ArrowDropDownOutlinedIcon/>
                      </Grid>
                  </Box>
              </>;
          } else if (sorting.direction === 'asc') {
              return <>
                  <Box >
                      <Grid sx={{height:'6px'}}>
                          <ArrowDropUpOutlinedIcon style={{ color:'black',fontSize:'1.6rem'}}/>
                      </Grid>
                      <Grid sx={{height:'6px'}}>
                          <ArrowDropDownOutlinedIcon style={{ color:'#bbb6b6',fontSize:'1.6rem'}}/>
                      </Grid>
                  </Box>
              </>;
          } else {
              return  <>
                  <Box >
                      <Grid sx={{height:'6px'}}>
                          <ArrowDropUpOutlinedIcon style={{ color:'#bbb6b6',fontSize:'1.6rem'}}/>
                      </Grid>
                      <Grid sx={{height:'6px'}}>
                          <ArrowDropDownOutlinedIcon style={{ color:'black',fontSize:'1.6rem'}}/>
                      </Grid>
                  </Box>
              </>;
          }
      };
  //Datatable
    const handlePageChange = (newPage) => {
      setPage(newPage);
    };
  
    const handlePageSizeChange = (event) => {
      setPageSize(Number(event.target.value));
      setPage(1);
    };
  
   
      
    //datatable....
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
    const filteredDatas = items.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  
    const filteredData = filteredDatas.slice((page - 1) * pageSize, page * pageSize);
  
    const totalPages = Math.ceil(submodules.length / pageSize);
  
    const visiblePages = Math.min(totalPages, 3);
  
    const firstVisiblePage = Math.max(1, page - 1);
    const lastVisiblePage = Math.min(firstVisiblePage + visiblePages - 1, totalPages);
  
    const pageNumbers = [];
  
    const indexOfLastItem = page * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
  
    for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
      pageNumbers.push(i);
    }
  
  


    return (
        <Box>
            {/* ****** Header Content ****** */}
            <Typography sx={userStyle.HeaderText}> SubModule </Typography>

            <Box sx={userStyle.container}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography sx={userStyle.importheadtext}>Manage SubModule</Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item md={4} xs={12} sm={12}>
                            <Typography>Project</Typography>
                            <FormControl size="small" fullWidth>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={submodule.project}
                                    onChange={(e, i) => {
                                        setSubmodule({ ...submodule, project: e.target.value });
                                      
                                    }}
                                >{project &&
                                    project.map((row, index) => (
                                        <MenuItem value={row.name} key={index} onClick={() =>{ fetchSubProjectDropdowns(row.name);getprojectnameg(row.name)} }>
                                            {row.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        { subprojectnone == "None" ? null :
                        <Grid item md={4} xs={12} sm={12}>
                            <Typography>Sub Project</Typography>
                            <FormControl size="small" fullWidth>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={submodule.subproject}
                                    onChange={(e, i) => {
                                        setSubmodule({ ...submodule, subproject: e.target.value });
                                        
                                    }}

                                >
                                    {subproject &&
                                        subproject.map((row, index) => (
                                            <MenuItem value={row.name} key={index} onClick={() => fetchModuleDropdowns(row.name)}>
                                                {row.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        }
                        <Grid item md={4} xs={12} sm={12}>
                            <Typography>Module</Typography>
                            <FormControl size="small" fullWidth>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={submodule.module}
                                    onChange={(e, i) => {
                                        setSubmodule({ ...submodule, module: e.target.value });
                                        fetchTimeDiffCal(e.target.value);
                                    }}
                                >{module &&
                                    module.map((row, index) => (
                                        <MenuItem value={row.name} key={index}>
                                            {row.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12} sm={12}>
                            <FormControl fullWidth size="small">
                                <Typography>Name</Typography>
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={submodule.name}
                                    onChange={(e) => {
                                        setSubmodule({ ...submodule, name: e.target.value });
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        {/* <Grid item md={2} xs={12} sm={12}>
                            <Typography>Choose if No subproject</Typography>

                            <FormControlLabel
                                value="None"
                                control={<Checkbox checked={isChecked}
                                onChange={handleCheckboxChange} />}
                                label="None"
                                labelPlacement="end"
                            />

                        </Grid> */}
                        <Grid item md={4} xs={12} sm={12}>
                            <Grid container>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Typography>Estimation</Typography>
                                    <FormControl fullWidth size="small" >
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="number"
                                            value={submodule.estimation }
                                            onChange={(e) => { setSubmodule({ ...submodule, estimation: Number(e.target.value) > typeEst ? "" : Number(e.target.value) }) }}
                                        />
                                        {submodule.estimationtime ?
                        <Typography sx={{ color: "red" }}> {typeEst} {submodule.estimationtime} is Remaining </Typography> : " "}
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Typography> Time</Typography>
                                    <Select
                                        fullWidth
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={submodule.estimationtime}
                                        onChange={(e) => {
                                            setSubmodule({ ...submodule, estimationtime: e.target.value });
                                            fetchCalculRemaining(e.target.value);
                                        }}
                                    >
                                        <MenuItem value="Days"> {"Days"} </MenuItem>
                                        <MenuItem value="Month"> {"Month"} </MenuItem>
                                        <MenuItem value="Year"> {"Year"} </MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <br />
                    <br />
                    <Grid item xs={12} sm={12} md={4} lg={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ display: "flex" }}
                            type="submit"
                        >
                            SUBMIT
                        </Button>
                    </Grid>
                </form>
            </Box>
            <Box>
                {/* edit model */}
                <Dialog
                    open={isEditOpen}
                    onClose={handleCloseModEdit}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Box sx={userStyle.container}>
                        <>
                            <Grid container spacing={2}>

                                <Typography sx={userStyle.importheadtext}>
                                    Manage SubModule
                                </Typography>

                            </Grid>
                            <br />
                            <Grid container spacing={2}>
                                <Grid item md={12} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>project </Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={submoduleid.project}
                                            onChange={(e) => {
                                                setSubmoduleid({ ...submoduleid, project: e.target.value });
                                                setgetprojectname(e.target.value)
                                            }}
                                        >
                                            {project &&
                                                project.map((row,i) => (
                                                    <MenuItem value={row.name} key={i}>{row.name}</MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                { subprojecteditnone == "None" ? null :
                                <Grid item md={12} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Subproject </Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={submoduleid.subproject}
                                            onChange={(e) => {
                                                setSubmoduleid({ ...submoduleid, subproject: e.target.value });
                                                setgetsubprojectname(e.target.value);
                                            }}
                                        >
                                            {
                                                subProjectEdit && subProjectEdit?.map((data,i) => {
                                                    return <MenuItem value={data.name} key={i}>{data.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                    }
                                <Grid item md={12} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Module </Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={submoduleid.module}
                                            onChange={(e) => {
                                                setSubmoduleid({ ...submoduleid, module: e.target.value });
                                                setEditProjDropdown(e.target.value)
                                            }}
                                        >
                                            {
                                                moduleEdit && moduleEdit.map((row, index) => {
                                                    return <MenuItem value={row.name} key={index}>{row.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={12} xs={12} sm={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Name</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={submoduleid.name}
                                            onChange={(e) => {
                                                setSubmoduleid({ ...submoduleid, name: e.target.value });
                                            }}
                                        />
                                    </FormControl>
                                </Grid>                         
                            <Grid item md={12} xs={12} sm={12}>
                            <Grid container>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Typography>Estimation</Typography>
                                    <FormControl fullWidth size="small" >
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="number"
                                            value={submoduleid.estimation }
                                            onChange={(e) => { setSubmoduleid({ ...submoduleid,  estimation:  Number(e.target.value) > Number(conditionTiming) ? " " : Number(e.target.value)  }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <br />
                                <Grid item md={6} xs={6} sm={6}>
                                    <Typography> Time</Typography>
                                    <Select
                                        fullWidth
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={submoduleid.estimationtime}
                                        onChange={(e) => {
                                            setSubmoduleid({ ...submoduleid, estimationtime: e.target.value });
                                            fetchCalculRemaining(e.target.value);
                                            fetchEditTimeCal(e.target.value);
                                            setGetEstiType(e.target.value);
                                        }}
                                    >
                                        <MenuItem value="Days"> {"Days"} </MenuItem>
                                        <MenuItem value="Month"> {"Month"} </MenuItem>
                                        <MenuItem value="Year"> {"Year"} </MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                            </Grid>
                            </Grid>
                            <Typography sx={{color:"red"}}> {editCalOverall}</Typography>
                            <br /> <br />
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Button variant="contained" onClick={editSubmit}>  Update</Button>
                                </Grid><br />
                                <Grid item md={6} xs={12} sm={12}>
                                    <Button sx={userStyle.btncancel} onClick={handleCloseModEdit}> Cancel </Button>
                                </Grid>
                            </Grid>
                        </>
                    </Box>
                </Dialog>
            </Box>
            <br />
            {/* ****** Table Start ****** */}
            <>
                <Box sx={userStyle.container}>
                    {/* ******************************************************EXPORT Buttons****************************************************** */}
                    {/*       
          <Box sx={userStyle.container} > */}
                    <Grid item xs={8}>
                        <Typography sx={userStyle.importheadtext}>SubModule List</Typography>
                    </Grid>
                    <Grid container sx={{ justifyContent: "center" }}>
                        <Grid>
                            <ExportCSV csvData={submoduleData} fileName={fileName} />

                            <ExportXL csvData={submoduleData} fileName={fileName} />

                            <Button sx={userStyle.buttongrp} onClick={handleprint}>
                                &ensp;
                                <FaPrint />
                                &ensp;Print&ensp;
                            </Button>

                            <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}>
                                <FaFilePdf />
                                &ensp;Export to PDF&ensp;
                            </Button>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid style={userStyle.dataTablestyle}>
                        <Box>
                            <label htmlFor="pageSizeSelect">Show entries:</label>
                            <Select id="pageSizeSelect" value={pageSize} onChange={handlePageSizeChange} sx={{width:"77px"}}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                            <MenuItem value={(submodules.length)}>All</MenuItem>
                            </Select>
                        </Box>
                        <Box>
                            <FormControl fullWidth size="small" >
                                <Typography>Search</Typography>
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </FormControl>
                        </Box>
                    </Grid>

                    {/* ****** Table Grid Container ****** */}
                 
                    {/* ****** Table start ****** */}
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 700 }}
                            aria-label="customized table"
                            id="usertable"
                        >
                            <TableHead sx={{ fontWeight: "600" }}>
                                <StyledTableRow>
                                    <StyledTableCell onClick={() => handleSorting('serialNumber')}><Box sx={userStyle.tableheadstyle}><Box>SNo</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('serialNumber')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('project')}><Box sx={userStyle.tableheadstyle}><Box>Project Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('project')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('subproject')}><Box sx={userStyle.tableheadstyle}><Box>Subproject Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('subproject')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('module')}><Box sx={userStyle.tableheadstyle}><Box>Module Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('module')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('name')}><Box sx={userStyle.tableheadstyle}><Box>Submodule Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('name')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('estimateTime')}><Box sx={userStyle.tableheadstyle}><Box>Estimation Time</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('estimateTime')}</Box></Box></StyledTableCell>
                                        <StyledTableCell>Action</StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                <TableBody align="left">
                                {filteredData.length > 0 ? (
                               filteredData?.map((row, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell>{row.serialNumber}</StyledTableCell>
                                                <StyledTableCell>{row.project}</StyledTableCell>
                                                <StyledTableCell>{row.subproject}</StyledTableCell>
                                                <StyledTableCell>{row.module}</StyledTableCell>
                                                <StyledTableCell>{row.name}</StyledTableCell>
                                                <StyledTableCell>{row.estimateTime}</StyledTableCell>
                                                <StyledTableCell component="th" scope="row" colSpan={1}>
                                                    <Grid sx={{ display: "flex" }}>
                                                        <Button
                                                            sx={userStyle.buttonedit}
                                                            onClick={() => {
                                                                handleClickOpenEdit();
                                                                getCode(row._id);
                                                            }}
                                                        >
                                                            <EditOutlinedIcon style={{ fontsize: "large" }} />
                                                        </Button>
                                                        <Button
                                                            sx={userStyle.buttondelete}
                                                            onClick={(e) => {
                                                                handleClickOpen();
                                                                rowData(row._id);
                                                            }}
                                                        >
                                                            <DeleteOutlineOutlinedIcon
                                                                style={{ fontsize: "large" }}
                                                            />
                                                        </Button>
                                                        <Button
                                                            sx={userStyle.buttonedit}
                                                            onClick={() => {
                                                                handleClickOpenview();
                                                                getviewCode(row._id);
                                                            }}
                                                        >
                                                            <VisibilityOutlinedIcon style={{ fontsize: "large" }} />
                                                        </Button>
                                                        <Button
                                                            sx={userStyle.buttonedit}
                                                            onClick={() => {
                                                                handleClickOpeninfo();
                                                                getinfoCode(row._id);
                                                            }}
                                                        >
                                                            <InfoOutlinedIcon style={{ fontsize: "large" }} />
                                                        </Button>
                                                    </Grid>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                 )))
                                  :   <StyledTableRow> <StyledTableCell colSpan={7} align="center">No Data Available</StyledTableCell> </StyledTableRow>
                                   }
                                 </TableBody>
                               </Table>
                             </TableContainer>
                             <Box style={userStyle.dataTablestyle}>
                               <Box>
                                   Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, submodules.length)} of {submodules.length} entries
                                 </Box>
                                 <Box>
                                   <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1} sx={{textTransform:'capitalize',color:'black'}}>
                                     Prev
                                   </Button>
                                   {pageNumbers?.map((pageNumber) => (
                                     <Button key={pageNumber} sx={userStyle.paginationbtn} onClick={() => handlePageChange(pageNumber)} className={((page )) === pageNumber ? 'active' : ''} disabled={page === pageNumber}>
                                       {pageNumber}
                                     </Button>
                                   ))}
                                   {lastVisiblePage < totalPages && <span>...</span>}
                                   <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} sx={{textTransform:'capitalize',color:'black'}}>
                                     Next
                                   </Button>
                                 </Box>  
                               </Box>       
                    {/* ****** Table End ****** */}
                </Box>
            </>
            {/* ****** Table End ****** */}

            {/* Delete Modal */}
            <Box>
                {/* ALERT DIALOG */}
                <Dialog
                    open={isDeleteOpen}
                    onClose={handleCloseMod}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent
                        sx={{ width: "350px", textAlign: "center", alignItems: "center" }}
                    >
                        <ErrorOutlineOutlinedIcon
                            sx={{ fontSize: "80px", color: "orange" }}
                        />
                        <Typography variant="h5" sx={{ color: "red", textAlign: "center" }}>
                            Are you sure?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseMod} sx={userStyle.btncancel}>
                            Cancel
                        </Button>
                        <Button
                            autoFocus
                            variant="contained"
                            color="error"
                            onClick={(e) => delSubModule(submoduleData)}
                        >
                            {" "}
                            OK{" "}
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* print layout */}
                <TableContainer component={Paper} sx={userStyle.printcls}>
                    <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                        id="usertable"
                        ref={componentRef}
                    >
                        <TableHead sx={{ fontWeight: "600" }}>
                            <TableRow>
                                <TableCell> SI.No</TableCell>
                                <TableCell> Project</TableCell>
                                <TableCell> Sub project</TableCell>
                                <TableCell> Module Name</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Estimation Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {submodules &&
                                submodules.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{row.project}</TableCell>
                                        <TableCell>{row.subproject}</TableCell>
                                        <TableCell>{row.module}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.estimation + " " + row.estimationtime}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* view model */}
            <Dialog
                open={openview}
                onClose={handleCloseview}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{ width: '550px', padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.HeaderText}>View SubModule </Typography>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">project</Typography>
                                    <Typography>{submoduleid.project}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Subproject</Typography>
                                    <Typography>{submoduleid.subproject}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6"> Module Name</Typography>
                                    <Typography>{submoduleid.module}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Name</Typography>
                                    <Typography>{submoduleid.name}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Estimation Time</Typography>
                                    <Typography>{submoduleid.estimation + " " + submoduleid.estimationtime}</Typography>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br /> <br /><br />
                        <Grid container spacing={2}>
                            <Button variant="contained" onClick={handleCloseview}> Back </Button>
                        </Grid>
                    </>
                </Box>
            </Dialog>

            {/* this is info view details */}

            <Dialog
                open={openInfo}
                onClose={handleCloseinfo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{ width: '550px', padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.HeaderText}> Info</Typography>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">addedby</Typography>
                                    <br/>
                                    <Table>
                                            <TableHead>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}>{"SNO"}.</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {"UserName"}</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {"Date"}</StyledTableCell>
                                            </TableHead>
                                            <TableBody>
                                            {addedby?.map((item, i) => (
                                                <StyledTableRow>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}>{i+1}.</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {item.name}</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</StyledTableCell>
                                                </StyledTableRow>
                                                     ))}
                                            </TableBody>
                                        </Table>
                                </FormControl>
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Updated by</Typography>
                                    <br/>
                                    <Table>
                                            <TableHead>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}>{"SNO"}.</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {"UserName"}</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {"Date"}</StyledTableCell>
                                            </TableHead>
                                            <TableBody>
                                            {updateby?.map((item, i) => (
                                                <StyledTableRow>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}>{i+1}.</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {item.name}</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</StyledTableCell>
                                                </StyledTableRow>
                                                     ))}
                                            </TableBody>
                                        </Table>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br /> <br /><br />
                        <Grid container spacing={2}>
                            <Button variant="contained" onClick={handleCloseinfo}> Back </Button>
                        </Grid>
                    </>
                </Box>
            </Dialog>


            {/* ALERT DIALOG */}
            <Box>
                <Dialog
                    open={isErrorOpen}
                    onClose={handleCloseerr}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent
                        sx={{ width: "350px", textAlign: "center", alignItems: "center" }}
                    >
                        {/* <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} /> */}
                        <Typography variant="h6">{showAlert}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="error" onClick={handleCloseerr}>
                            ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}

export default Submodule;