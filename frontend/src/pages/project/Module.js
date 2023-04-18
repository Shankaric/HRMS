
// import React, { useState, useEffect, useRef } from "react";
// import { Box, Typography, OutlinedInput, Dialog, Select,TableRow, TableCell,MenuItem, TableBody, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button } from "@mui/material";
// import { userStyle } from "../../pageStyle";
// import { FaPrint, FaFilePdf } from "react-icons/fa";
// import { ExportXL, ExportCSV } from "../../components/Export";
// import { StyledTableRow, StyledTableCell } from "../../components/Table";
// import { SERVICE } from '../../services/Baseservice';
// import jsPDF from "jspdf";
// import 'jspdf-autotable';
// import axios from "axios";
// import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import { useReactToPrint } from "react-to-print";
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
// import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
// import moment from 'moment-timezone';

// function Module() {


//     const [module, setModule] = useState({
//         project: "", subproject: "", name: "", estimation: "", estimationtime: ""
//     });
//     const [moduleid, setModuleid] = useState({  
//         project: "", subproject: "", name: "", estimation: "", estimationtime: ""
//     });
//     const [modules, setModules] = useState([]);  
//     const [entries, setEntries] = useState(1);
//     const [pages, setPages] = useState(1);
//     const [username, setUsername] = useState("");
//     const [getrowid, setRowGetid] = useState("");
//     const [projectEdit, setProjectEdit] = useState([]);
//     const [subProjectEdit, setSubProjectEdit] = useState([]);
//     const [subproject, setSubProject] = useState([]);
//     const [project, setProject] = useState([]);
//     const[rowEditTime , setRowEditTime] = useState("");
//     const[rowEditTimeProj , setRowEditTimeProj] = useState("");
//     const[editTimeCalculation , setEditTimeCalculation] = useState("");
//     const[editCalOverall , setEditCalOverall] = useState("");
//     const[getEstitype , setGetEstiType] = useState("");
//     const[conditionTiming , setConditionTiming] = useState("");
//     const[timeDiffCal , setTimeDiffCal] = useState("");
//     const[timeCalculation , setTimeCalculation] = useState("");
//     const[typeEst , setTypeEst] = useState("");
//     const[editProjDropdwon , setEditProjDropdown] = useState("");
//     const[subProjectEditList , setSubProjectEditList] = useState([]);
//     //Datatable
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(1);
    

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
//     const [deletemodule, setDeletemodule] = useState({});
//     const rowData = async (id) => {
//         try {
//             let res = await axios.get(`${SERVICE.MODULE_SINGLE}/${id}`, {
//                 // headers: {
//                 //     'Authorization': `Bearer ${auth.APIToken}`
//                 // }
//             });
//             setDeletemodule(res.data.smodule);
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


//             //fetching Project for Dropdowns
//             const fetch_Sub_ProjectDropdowns = async () => {
//                 try {
//                     let projectDrop = await axios.get(SERVICE.SUBPROJECT);
//                     setSubProjectEditList(projectDrop.data.subprojects);
    
//                 } catch (error) {
//                     console.log(error.response.data);
//                 }
//             };
    
//     const[subprojectnone, setsubprojectnone] = useState("")

//         //fetching sub-Project Dropdowns
//     const fetchProjectnames = async (e) => {    
     
//         try {
//             let subPro = await axios.get(SERVICE.SUBPROJECT);
//             let subProDrop = subPro.data.subprojects.filter((data) => {
//                 if (e === data.project){     
//                     return data                    
//                 }
                
//             })
//             setSubProject(subProDrop);
     
//         } catch (error) {
//             console.log(error.response.data);
//         }
//     };
 
// useEffect(() => {
//     if(subproject.length == 0){
//         setsubprojectnone("None")
//     }else{
//         setsubprojectnone("Show")
//     }
  
// })
   


// const[subprojecteditnone, setsubprojecteditnone] = useState("")
    
//     const[getprojectname,setgetprojectname] = useState("")


//     const fetchProjectnamesedit = async () => {     
//         let projectname = getprojectname ? getprojectname : moduleid.project;
//         try {
//             let subPro = await axios.get(SERVICE.SUBPROJECT);
//             let subProDrop = subPro.data.subprojects.filter((data) => {
//                 if (projectname == data.project)
//                     return data
//             })
//             setSubProjectEdit(subProDrop);

//         } catch (error) {
//             console.log(error.response.data);
//         }
//     };   

//     useEffect(() => {
//         if(subProjectEdit.length == 0){
//             setsubprojecteditnone("None")
//         }else{
//             setsubprojecteditnone("Show")
//         }
      
//     })


//     // Alert delete popup
//     let modulesid = deletemodule._id;
//     const delModule = async () => {
//         try {
//             await axios.delete(
//                 `${SERVICE.MODULE_SINGLE}/${modulesid}`, {});
//             handleCloseMod();
//         } catch (err) { 
//             console.log(err.response.data)
//         }
//     };

//     //add function...
//     const sendRequest = async () => {
//         try {
//             let modules = await axios.post(SERVICE.MODULE_CREATE, {
//                 project: String(module.project),
//                 subproject: String(module.subproject),
//                 name: String(module.name),
//                 estimation: String(module.estimation),
//                 estimationtime: String(module.estimationtime),
//                 addedby: [
//                     {
//                         name: String(username),
//                         date: String(new Date()),
//                     },
//                 ],
//             });
//             setModule(modules.data);
//             setModule({ project: "", subproject: "", name: "", estimation: "", estimationtime: "" });
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
//         if (module.project === "") {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {"Please Choose Project"}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         }else   if (module.subproject === "" && subprojectnone !== "None")  {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {"Please Choose Sub Project"}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         } else if (module.name === "") {
//             setShowAlert(
//                 <>
//                     <ErrorOutlineOutlinedIcon
//                         sx={{ fontSize: "100px", color: "orange" }}
//                     />
//                     <p style={{ fontSize: "20px", fontWeight: 900 }}>
//                         {"Please Enter Module Name"}
//                     </p>
//                 </>
//             );
//             handleClickOpenerr();
//         } else if (module.estimation === "" && module.estimationtime === "") {
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
//         }  else {
//             sendRequest();
//         }
//     };

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
//         setRowGetid(e);
//         let res = await axios.get(`${SERVICE.MODULE_SINGLE}/${e}`, {});
//         setModuleid(res.data.smodule);
//         setRowGetid(res.data.smodule);
//         setRowEditTime(res.data.smodule);
//     };
//     // get single row to view....
//     const getviewCode = async (e) => {
//         let res = await axios.get(`${SERVICE.MODULE_SINGLE}/${e}`, {});
//         setModuleid(res.data.smodule);
//     };

//     // get single row to view....
//     const getinfoCode = async (e) => {
//         let res = await axios.get(`${SERVICE.MODULE_SINGLE}/${e}`, {});
//         setModuleid(res.data.smodule);
//     };

//     //Module updateby edit page...
//     let updateby = moduleid.updatedby;
//     let addedby = moduleid.addedby;


//     let moduletsid = moduleid._id;

//     //editing the single data...
//     const sendEditRequest = async () => {
//         try {
//             let res = await axios.put(
//                 `${SERVICE.MODULE_SINGLE}/${moduletsid}`,
//                 {
//                     project: String(moduleid.project),
//                     subproject: String(moduleid.subproject),
//                     name: String(moduleid.name),
//                     estimation: String(moduleid.estimation),
//                     estimationtime: String(moduleid.estimationtime),
                  
//                     updatedby: [
//                         ...updateby, {
//                             name: String(username),
//                             date: String(new Date()),
//                         },
//                     ],
//                 }
//             );
//             setModuleid(res.data);
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
//         sendEditRequest();
//     };

//     //get all modules.
//     const fetchAllModule = async () => {
//         try {
//             let res_module = await axios.get(SERVICE.MODULE, {

//             });
//             setModules(res_module.data.modules);

//         } catch (err) {
//             const messages = err.response.data.message;
//             console.log(messages)
//         }
//     };



//     let difference = [];
//     let ans =0;
//     let timeDiffsCreate=0;
//         //calculate time difference between the choosed projects
//         const fetchTimeDiffCal = async (projName)=>{
//             try{
               
//                     let sub_proj_time = modules.filter((data)=>{
//                         if(projName === data.subproject ){
                          
//                             if(data.estimationtime === "Month"){
//                                 difference.push(((Number(data.estimation)) /12) * 365)
//                             }
//                             else if(data.estimationtime === "Year"){
//                                 difference.push( Number(data.estimation) * 365)
//                             }
//                             else if(data.estimationtime === "Days"){
//                                 difference.push(Number(data.estimation))
//                             }
//                          ans = difference.reduce((acc , cur)=> acc+cur );
//                        setTimeCalculation(ans);
//                         }
//                     })

//                     let project_check = subProjectEditList.map((value)=>{
//                         if(projName === value.name){
//                            if(value.estimationtime === "Month"){
//                                timeDiffsCreate = ((Number(value.estimation) /12) * 365) ;
//                                setTimeDiffCal(timeDiffsCreate)
       
//                            }
//                            else if(value.estimationtime === "Year"){
//                                timeDiffsCreate = Number(value.estimation) * 365 ;
//                                setTimeDiffCal( timeDiffsCreate)
       
//                            }
//                            else if(value.estimationtime === "Days"){
//                                setTimeDiffCal(Number(value.estimation))
//                            }
//                        }           
//                       })
             
//             }
//             catch (error) {
//                 console.log(error.response.data)
//             }
//         }



     
//         const fetchCalculRemaining = async (estType) => {
//             if(estType === "Month"){
//                 setTypeEst(((timeDiffCal - timeCalculation )/ 30).toFixed(0))
//             }
//             else if (estType === "Year"){
//                 setTypeEst(((timeDiffCal - timeCalculation )/ 365).toFixed(0));
            
//             }
//             else if(estType === "Days"){
//                 setTypeEst((timeDiffCal - timeCalculation ).toFixed(0))
//             }


//         }

   
//     let differenceEdit = [];
//     let ansEdit=0;
//     let timeDiffs=0;
    
//        //Edit Page Functionality for Estimation Time 
//        const fetchEditEstTime = async ()=>{
//         try{
//             let sub_Project = editProjDropdwon ?  editProjDropdwon : rowEditTime.subproject;

//             let sub_proj_time = modules.filter((data)=>{
    
//                 if(sub_Project === data.subproject){
              
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
            
            
//             else if (sub_Project != data.subproject){
//                 setEditTimeCalculation(ansEdit);

//             }
           
//            })

//            let project_check = subProjectEditList.map((value)=>{
//              if(sub_Project === value.name){
//                 if(value.estimationtime === "Month"){
//                 timeDiffs = ((Number(value.estimation) /12) * 365) ;
//                 setRowEditTimeProj(timeDiffs)

//                 }
//                 else if(value.estimationtime === "Year"){
//               timeDiffs = Number(value.estimation) * 365 ;
//               setRowEditTimeProj( timeDiffs)

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




//      if(rowEditTime.estimationtime === "Month"){
//             if(estimatType === "Month"){   
//                 let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(0).toString().split('.');
//                 setConditionTiming(Number(rowEditTime.estimation) + ((rowEditTimeProj - editTimeCalculation) / 30))
//                 console.log(conditionTiming , '1' )
//                 setEditCalOverall(remaining[0] + " months "  )          
//            }
           
//            else if(estimatType === "Days"){
//             let remaining =((rowEditTimeProj - editTimeCalculation)).toFixed(0).toString();
//                 setConditionTiming((Number(rowEditTime.estimation) * 30)  + ((rowEditTimeProj - editTimeCalculation)))
//                 console.log(conditionTiming , '2' )
//                 setEditCalOverall(remaining  + " days Remaining" )
//            }
           
//             else if(estimatType === "Year"){
//             let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(0).toString().split('.');
//             setConditionTiming(Number(rowEditTime.estimation)/12  + ((rowEditTimeProj - editTimeCalculation)/365))
//             setEditCalOverall(remaining[0] + " months " + remaining[1] + " days Remaining" )
//            }

//         }

//         else if(rowEditTime.estimationtime === "Days"){
//             if(estimatType === "Month"){   
//                 let remaining =((rowEditTimeProj - editTimeCalculation)/ 25).toFixed(0).toString().split('.')
//                 let rem = ((rowEditTimeProj - editTimeCalculation)% 25).toFixed(0).toString().split('.')
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
//             let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(0).toString().split('.');
//             setConditionTiming(Number(rowEditTime.estimation)/365  + ((rowEditTimeProj - editTimeCalculation)/365))
//             setEditCalOverall(remaining[0] + " months " + remaining[1] + " days Remaining" )
//            }

//         }

//         else if(rowEditTime.estimationtime === "Year"){
//             if(estimatType === "Month"){   
//                 let remaining =(((rowEditTimeProj - editTimeCalculation)/ 365)*12).toFixed(0).toString().split('.')
//                 setConditionTiming((Number(rowEditTime.estimation) * 12) + (((rowEditTimeProj - editTimeCalculation)/365)*12))
//                 setEditCalOverall(remaining[0] + " Months Remaining" )          
//            }
           
//            else if(estimatType === "Days"){
//             let remaining =((rowEditTimeProj - editTimeCalculation)*365).toFixed(0).toString();
//                 setConditionTiming((Number(rowEditTime.estimation) * 365)  + ((rowEditTimeProj - editTimeCalculation)))
//                 setEditCalOverall(remaining  + " days Remaining" )
//            }
           
//             else if(estimatType === "Year"){
//             let remaining =((rowEditTimeProj - editTimeCalculation)/365 ).toFixed(0).toString().split('.');
//             setConditionTiming(Number(rowEditTime.estimation)  + ((rowEditTimeProj - editTimeCalculation)/365))
//             setEditCalOverall(remaining[0]  + " years Remaining" )
//            }

//         }

//     }
//     const modifiedData = modules.map((person) => ({
//         ...person,
//         estimateTime: person.estimation + ' ' + person.estimationtime,
//       }));
    

//     //pdf....
//     const columns = [
//         { title: "Project", field: "project" },
//         { title: "Subproject", field: "subproject" },
//         { title: "Name", field: "name" },
//         { title: "Estimation Time", field: "estimateTime" },
//     ];
//     const downloadPdf = () => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             theme: "grid",
//             columns: columns.map((col) => ({ ...col, dataKey: col.field })),
//             body: modifiedData,
//         });
//         doc.save("Module.pdf");
//     };

//     // Excel
//     const fileName = "modules";

//     const [moduleData, setModuleData] = useState([]);


//     // get particular columns for export excel
//     const getexcelDatas = async () => {
//         let response = await axios.get(SERVICE.MODULE, {
//             //  headers: {
//             //      'Authorization': `Bearer ${auth.APIToken}`
//             //  },
//         });
//         var data = response.data.modules.map((t) => ({
//             "Project": t.project,
//             "Sub Project": t.subproject,
//             "Name": t.name,
//             "Estimation Time":t.estimation + " " + t.estimationtime,
//         }));
//         setModuleData(data);
//     };

//     //print...
//     const componentRef = useRef();
//     const handleprint = useReactToPrint({
//         content: () => componentRef.current,
//         documentTitle: "Module",
//         pageStyle: "print",
//     });

    
//     const [items, setItems] = useState([]);

//     useEffect(() => {     
             
//         getexcelDatas();
//         fetchEditEstimationType();
//         getusername();
//         fetchProjectDropdowns();
//         fetch_Sub_ProjectDropdowns();
//         fetchTimeDiffCal();
//         fetchCalculRemaining();
//     }, []);

//     useEffect(() => {
//         fetchAllModule();
//         fetchProjectnamesedit();      
//         fetchEditEstTime();  
//         fetchEditEstimationType();
//     });
    

//     const addSerialNumber = () => {
//       const itemsWithSerialNumber = modifiedData?.map((item, index) => ({ ...item, serialNumber: index + 1 }));
//       setItems(itemsWithSerialNumber);
//     }
  
//     useEffect(()=>{
//       addSerialNumber();
//     })

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
//         //Datatable
//             const handlePageChange = (newPage) => {
//             setPage(newPage);
//             };
        
//             const handlePageSizeChange = (event) => {
//             setPageSize(Number(event.target.value));
//             setPage(1);
//             };
        
        
            
//             //datatable....
//             const [searchQuery, setSearchQuery] = useState("");
//             const handleSearchChange = (event) => {
//             setSearchQuery(event.target.value);
//             };
//             const filteredDatas = items.filter((item) =>
//             Object.values(item).some((value) =>
//                 value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//             )
//             );
        
//             const filteredData = filteredDatas.slice((page - 1) * pageSize, page * pageSize);
        
//             const totalPages = Math.ceil(modules.length / pageSize);
        
//             const visiblePages = Math.min(totalPages, 3);
        
//             const firstVisiblePage = Math.max(1, page - 1);
//             const lastVisiblePage = Math.min(firstVisiblePage + visiblePages - 1, totalPages);
        
//             const pageNumbers = [];
        
//             const indexOfLastItem = page * pageSize;
//             const indexOfFirstItem = indexOfLastItem - pageSize;
        
//             for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
//             pageNumbers.push(i);
//             }

         

//     return (
//         <Box>
//             {/* ****** Header Content ****** */}
//             <Typography sx={userStyle.HeaderText}>Module </Typography>
//             <Box sx={userStyle.container}>
//                 <>
//                     <Grid container spacing={2}>
//                         <Grid item xs={8}>
//                             <Typography sx={userStyle.importheadtext}>Manage Module</Typography>
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
//                                     defaultValue = ""
//                                     value={(module.project)}
//                                     onChange={(e) => {
//                                         setModule({ ...module, project: e.target.value });
                                        
//                                     }}
//                                 >{project &&
//                                     project?.map((row, index) => (
//                                         <MenuItem value={(row.name)} key={index} onClick={() => {fetchProjectnames(row.name)}}>
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
//                                     value={(module.subproject)}
//                                     defaultValue = ""
//                                     onChange={(e) => {
//                                         setModule({ ...module, subproject: e.target.value });
//                                         fetchTimeDiffCal(e.target.value)
//                                     }}

//                                 >
//                                     {subproject &&
//                                         subproject?.map((row, index) => (
//                                             <MenuItem value={(row.name)} key={index}>
//                                                 {row.name}
//                                             </MenuItem>
//                                         ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                             }
//                         <Grid item md={4} xs={12} sm={12}>
//                             <FormControl fullWidth size="small">
//                                 <Typography>Name</Typography>
//                                 <OutlinedInput
//                                     id="component-outlined"
//                                     type="text"
//                                     value={module.name}
//                                     onChange={(e) => {
//                                         setModule({ ...module, name: e.target.value });
//                                     }}
//                                 />
//                             </FormControl>
//                         </Grid>
//                         <Grid item md={4} xs={12} sm={12}>
//                             <Grid container>
//                                 <Grid item md={6} xs={6} sm={6}>
//                                     <Typography>Estimation</Typography>
//                                     <FormControl fullWidth size="small" >
//                                         <OutlinedInput
//                                             id="component-outlined"
//                                             type="number"
//                                             value={module.estimation}
//                                             onChange={(e) => { setModule({ ...module, estimation:  Number(e.target.value) > typeEst ? "" : Number(e.target.value)}) }}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item md={6} xs={6} sm={6}>
//                                     <Typography> Time</Typography>
//                                     <Select
//                                         fullWidth
//                                         labelId="demo-select-small"
//                                         id="demo-select-small"
//                                         value={module.estimationtime ?module.estimationtime :"Month"}
//                                         onChange={(e) => { setModule({ ...module, estimationtime: e.target.value });
//                                         fetchCalculRemaining(e.target.value)
//                                     }}
//                                     >
//                                         <MenuItem value="Days"> {"Days"} </MenuItem>
//                                         <MenuItem value="Month"> {"Month"} </MenuItem>
//                                         <MenuItem value="Year"> {"Year"} </MenuItem>
//                                     </Select>
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     <Typography sx={{color:"red"}}>{typeEst} {module.estimationtime} is Remaining</Typography>

//                     <br />
//                     <br />
//                     <Grid item xs={12} sm={12} md={4} lg={4}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             sx={{ display: "flex" }}
//                             onClick={handleSubmit}
//                         >
//                             SUBMIT
//                         </Button>
//                     </Grid>
//                 </>
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
//                                     Manage Module
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
//                                             defaultValue = ""
//                                             value={(moduleid.project)}
//                                             onChange={(e) => {
//                                                 setModuleid({ ...moduleid, project: e.target.value });
//                                                 setgetprojectname(e.target.value)

//                                             }}
//                                         >
//                                             {project &&
//                                                 project.map((row) => (
//                                                     <MenuItem value={(row.name)}>{row.name}</MenuItem>
//                                                 ))}
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 { subprojecteditnone == "None" ? null :     
//                                 <Grid item md={12} xs={12} sm={12}>
//                                     <FormControl fullWidth size="small" >
//                                         <Typography>Subproject </Typography>
//                                         <Select
//                                             labelId="demo-select-small"
//                                             id="demo-select-small"
//                                             defaultValue = ""
//                                             value={moduleid.subproject ? moduleid.subproject : ""}
//                                             onChange={(e) => {
//                                                 setModuleid({ ...moduleid, subproject: e.target.value });
//                                                 setEditProjDropdown(e.target.value);
//                                             }}
//                                         >
//                                             {
//                                                 subProjectEdit && subProjectEdit?.map((data) => {
//                                                     return <MenuItem value={data.name}>{data.name}</MenuItem>
//                                                 })
//                                             }
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                     }
//                                 <Grid item md={12} xs={12} sm={12}>
//                                     <FormControl fullWidth size="small">
//                                         <Typography>Name</Typography>
//                                         <OutlinedInput
//                                             id="component-outlined"
//                                             type="text"
//                                             value={moduleid.name}
//                                             onChange={(e) => {
//                                                 setModuleid({ ...moduleid, name: e.target.value });
//                                             }}
//                                         />
//                                     </FormControl>
//                                 </Grid>
                         
//                             <Grid item md={12} xs={12} sm={12}>
//                             <Grid container>
//                                 <Grid item md={6} xs={6} sm={6}>
//                                     <FormControl fullWidth size="small" >
//                                         <Typography>Estimation</Typography>
//                                         <OutlinedInput
//                                             id="component-outlined"
//                                             type="text"
//                                             value={moduleid.estimation}
//                                             onChange={(e) => { setModuleid({ ...moduleid, estimation: Number(e.target.value) > Number(conditionTiming) ? " " :  Number(e.target.value) }) }}
//                                         />
//                                     </FormControl>
//                                 </Grid><br />
//                                 <Grid item md={6} xs={6} sm={6}>
//                                     <Typography>Estimation Time</Typography>
//                                     <Select
//                                         fullWidth
//                                         labelId="demo-select-small"
//                                         id="demo-select-small"
//                                         value={moduleid.estimationtime ? moduleid.estimationtime : "Month"}
//                                         onChange={(e) => { setModuleid({ ...moduleid, estimationtime: e.target.value });
//                                         setGetEstiType(e.target.value);
//                                      }}
//                                     >

//                                         <MenuItem value="Days"> {"Days"} </MenuItem>
//                                         <MenuItem value="Month"> {"Month"} </MenuItem>
//                                         <MenuItem value="Year"> {"Year"}</MenuItem>
//                                     </Select>
//                                 </Grid>
//                             </Grid>
//                             </Grid>
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
//                         <Typography sx={userStyle.importheadtext}>Module List</Typography>
//                     </Grid>
//                     <Grid container sx={{ justifyContent: "center" }}>
//                         <Grid>
//                             <ExportCSV csvData={moduleData} fileName={fileName} />

//                             <ExportXL csvData={moduleData} fileName={fileName} />

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
//                             <Select id="pageSizeSelect" defaultValue = "" value={pageSize} onChange={handlePageSizeChange} sx={{width:"77px"}}>
//                             <MenuItem value={1}>1</MenuItem>
//                             <MenuItem value={5}>5</MenuItem>
//                             <MenuItem value={10}>10</MenuItem>
//                             <MenuItem value={25}>25</MenuItem>
//                             <MenuItem value={50}>50</MenuItem>
//                             <MenuItem value={100}>100</MenuItem>
//                             <MenuItem value={(modules.length)}>All</MenuItem>
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
//                    </Grid>
//                     <br />
//                     {/* ****** Table Grid Container ****** */}
                
//                     {/* ****** Table start ****** */}
//                     <TableContainer component={Paper}>
//                         <Table
//                             sx={{ minWidth: 700 }}
//                             aria-label="customized table"
//                             id="usertable"

//                         >
//                             <TableHead sx={{ fontWeight: "600" }}>
//                             <StyledTableRow>
//                                     <StyledTableCell onClick={() => handleSorting('serialNumber')}><Box sx={userStyle.tableheadstyle}><Box>SNo</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('serialNumber')}</Box></Box></StyledTableCell>
//                                     <StyledTableCell onClick={() => handleSorting('project')}><Box sx={userStyle.tableheadstyle}><Box>Project Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('project')}</Box></Box></StyledTableCell>
//                                     <StyledTableCell onClick={() => handleSorting('subproject')}><Box sx={userStyle.tableheadstyle}><Box>SubProject Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('subproject')}</Box></Box></StyledTableCell>
//                                     <StyledTableCell onClick={() => handleSorting('name')}><Box sx={userStyle.tableheadstyle}><Box>Module Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('module')}</Box></Box></StyledTableCell>
//                                     <StyledTableCell onClick={() => handleSorting('estimateTime')}><Box sx={userStyle.tableheadstyle}><Box>Estimation Time</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('estimateTime')}</Box></Box></StyledTableCell>
//                                     <StyledTableCell>Action</StyledTableCell>
//                                     </StyledTableRow>
//                                 </TableHead>
//                                 <TableBody align="left">
//                                 {filteredData.length > 0 ? (
//                                 filteredData?.map((row, index) => (
//                                             <StyledTableRow key={index}>
//                                                 <StyledTableCell>{row.serialNumber}</StyledTableCell>
//                                                 <StyledTableCell>{row.project}</StyledTableCell>
//                                                 <StyledTableCell>{row.subproject}</StyledTableCell>
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
//                                 )))
//                                 :   <StyledTableRow> <StyledTableCell colSpan={6} align="center">No Data Available</StyledTableCell> </StyledTableRow>
//                                  }
//                                 </TableBody>
//                                 </Table>
//                             </TableContainer>
//                             <Box style={userStyle.dataTablestyle}>
//                                 <Box>
//                                     Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, modules.length)} of {modules.length} entries
//                                 </Box>
//                                 <Box>
//                                     <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1} sx={{textTransform:'capitalize',color:'black'}}>
//                                     Prev
//                                     </Button>
//                                     {pageNumbers?.map((pageNumber) => (
//                                     <Button key={pageNumber} sx={userStyle.paginationbtn} onClick={() => handlePageChange(pageNumber)} className={((page )) === pageNumber ? 'active' : ''} disabled={page === pageNumber}>
//                                         {pageNumber}
//                                     </Button>
//                                     ))}
//                                     {lastVisiblePage < totalPages && <span>...</span>}
//                                     <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} sx={{textTransform:'capitalize',color:'black'}}>
//                                     Next
//                                     </Button>
//                                 </Box>  
//                                 </Box>   
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
//                             onClick={(e) => delModule(modulesid)}
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
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>Estimation Time</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody >
//                             {modules &&
//                                 modules.map((row, index) => (
//                                     <TableRow key={index}>
//                                         <TableCell>{index+1}</TableCell>
//                                         <TableCell>{row.project}</TableCell>
//                                         <TableCell>{row.subproject}</TableCell>
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
//                         <Typography sx={userStyle.HeaderText}> View Module</Typography>
//                         <br /><br />
//                         <Grid container spacing={2}>
//                             <Grid item md={6} xs={12} sm={12}>
//                                 <FormControl fullWidth size="small">
//                                     <Typography variant="h6">project</Typography>
//                                     <Typography>{moduleid.project}</Typography>
//                                 </FormControl>
//                             </Grid><br/>
//                             <Grid item md={6} xs={12} sm={12}>
//                                 <FormControl fullWidth size="small">
//                                     <Typography variant="h6">Subproject</Typography>
//                                     <Typography>{moduleid.subproject}</Typography>
//                                 </FormControl>
//                             </Grid><br/>
//                             <Grid item md={6} xs={12} sm={12}>
//                                 <FormControl fullWidth size="small">
//                                     <Typography variant="h6">Name</Typography>
//                                     <Typography>{moduleid.name}</Typography>
//                                 </FormControl>
//                             </Grid><br/>
//                             <Grid item md={6} xs={12} sm={12}>
//                                 <Typography variant="h6">Estimation Time</Typography>
//                                 <FormControl fullWidth size="small">
//                                     <Typography>{moduleid.estimation +"  " + moduleid.estimationtime}</Typography>
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
//                         <Typography sx={userStyle.HeaderText}> Info </Typography>
//                         <br /><br />
//                         <Grid container spacing={2}>
//                             <Grid item md={12} xs={12} sm={12}>
//                                 <FormControl fullWidth size="small">
//                                     <Typography variant="h6">addedby</Typography>
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
//                             <br/>
//                             <Grid item md={12} xs={12} sm={12}>
//                                 <FormControl fullWidth size="small">
//                                     <Typography variant="h6">Updated by</Typography>
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

// export default Module;

import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, Dialog, Select,TableRow, TableCell,MenuItem, TableBody, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button } from "@mui/material";
import { userStyle } from "../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import { SERVICE } from '../../services/Baseservice';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import axios from "axios";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useReactToPrint } from "react-to-print";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import moment from 'moment-timezone';

function Module() {


    const [module, setModule] = useState({
        project: "", subproject: "", name: "", estimation: "", estimationtime: ""
    });
    const [moduleid, setModuleid] = useState({  
        project: "", subproject: "", name: "", estimation: "", estimationtime: ""
    });
    const [modules, setModules] = useState([]);  
    const [entries, setEntries] = useState(1);
    const [pages, setPages] = useState(1);
    const [username, setUsername] = useState("");
    const [projNameCreate, setProjNameCreate] = useState("");
    const [getrowid, setRowGetid] = useState("");
    const [projectEdit, setProjectEdit] = useState([]);
    const [subProjectEdit, setSubProjectEdit] = useState([]);
    const [subproject, setSubProject] = useState([]);
    const [project, setProject] = useState([]);
    const[rowEditTime , setRowEditTime] = useState("");
    const[rowEditTimeProj , setRowEditTimeProj] = useState("");
    const[editTimeCalculation , setEditTimeCalculation] = useState("");
    const[editCalOverall , setEditCalOverall] = useState("");
    const[getEstitype , setGetEstiType] = useState("");
    const[conditionTiming , setConditionTiming] = useState("");
    const[timeDiffCal , setTimeDiffCal] = useState("");
    const[timeCalculation , setTimeCalculation] = useState("");
    const[typeEst , setTypeEst] = useState("");
    const[editProjDropdwon , setEditProjDropdown] = useState("");
    const[subProjectEditList , setSubProjectEditList] = useState([]);
    //Datatable
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
    

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
    const [deletemodule, setDeletemodule] = useState({});
    const rowData = async (id) => {
        try {
            let res = await axios.get(`${SERVICE.MODULE_SINGLE}/${id}`, {
                // headers: {
                //     'Authorization': `Bearer ${auth.APIToken}`
                // }
            });
            setDeletemodule(res.data.smodule);
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


            //fetching Project for Dropdowns
            const fetch_Sub_ProjectDropdowns = async () => {
                try {
                    let projectDrop = await axios.get(SERVICE.SUBPROJECT);
                    setSubProjectEditList(projectDrop.data.subprojects);
    
                } catch (error) {
                    console.log(error.response.data);
                }
            };
    
    const[subprojectnone, setsubprojectnone] = useState("")

        //fetching sub-Project Dropdowns
    const fetchProjectnames = async (e) => {    
     
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
   

  
const[subprojecteditnone, setsubprojecteditnone] = useState("")
    // console.log(subprojectnone,'subprojectnone')
    
    const[getprojectname,setgetprojectname] = useState("")


    const fetchProjectnamesedit = async () => {     
        let projectname = getprojectname ? getprojectname : moduleid.project;
        try {
            let subPro = await axios.get(SERVICE.SUBPROJECT);
            let subProDrop = subPro.data.subprojects.filter((data) => {
                if (projectname == data.project)
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


    // Alert delete popup
    let modulesid = deletemodule._id;
    const delModule = async () => {
        try {
            await axios.delete(
                `${SERVICE.MODULE_SINGLE}/${modulesid}`, {});
            handleCloseMod();
        } catch (err) { 
            console.log(err.response.data)
        }
    };

    //add function...
    const sendRequest = async () => {
        try {
            let modules = await axios.post(SERVICE.MODULE_CREATE, {
                project: String(module.project),
                subproject: String(module.subproject),
                name: String(module.name),
                estimation: String(module.estimation),
                estimationtime: String(module.estimationtime),
                addedby: [
                    {
                        name: String(username),
                        date: String(new Date()),
                    },
                ],
            });
            setModule(modules.data);
            setModule({ project: "", subproject: "", name: "", estimation: "", estimationtime: "" });
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
        if (module.project === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose Project"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }else   if (module.subproject === "" && subprojectnone !== "None")  {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose Sub Project"}
                    </p>
                </>
            );
            handleClickOpenerr();
        } else if (module.name === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Enter Module Name"}
                    </p>
                </>
            );
            handleClickOpenerr();
        } else if (module.estimation === "" && module.estimationtime === "") {
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
        }  else {
            sendRequest();
        }
    };

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
            //setUsername(user)
        }
        catch (err) {
            console.log(err.response.data.errormessage)
        }
        // console.log(res.data.sarea)
    }

    //get single row to edit....
    const getCode = async (e) => {
        setRowGetid(e);
        let res = await axios.get(`${SERVICE.MODULE_SINGLE}/${e}`, {});
        setModuleid(res.data.smodule);
        setRowGetid(res.data.smodule);
        setRowEditTime(res.data.smodule);
    };
    // get single row to view....
    const getviewCode = async (e) => {
        let res = await axios.get(`${SERVICE.MODULE_SINGLE}/${e}`, {});
        setModuleid(res.data.smodule);
    };

    // get single row to view....
    const getinfoCode = async (e) => {
        let res = await axios.get(`${SERVICE.MODULE_SINGLE}/${e}`, {});
        setModuleid(res.data.smodule);
    };

    //Module updateby edit page...
    let updateby = moduleid.updatedby;
    let addedby = moduleid.addedby;


    let moduletsid = moduleid._id;

    //editing the single data...
    const sendEditRequest = async () => {
        try {
            let res = await axios.put(
                `${SERVICE.MODULE_SINGLE}/${moduletsid}`,
                {
                    project: String(moduleid.project),
                    subproject: String(moduleid.subproject),
                    name: String(moduleid.name),
                    estimation: String(moduleid.estimation),
                    estimationtime: String(moduleid.estimationtime),
                  
                    updatedby: [
                        ...updateby, {
                            name: String(username),
                            date: String(new Date()),
                        },
                    ],
                }
            );
            setModuleid(res.data);
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
        sendEditRequest();
    };

    //get all modules.
    const fetchAllModule = async () => {
        try {
            let res_module = await axios.get(SERVICE.MODULE, {

            });
            setModules(res_module.data.modules);

        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    };


    console.log(projNameCreate , 'projectName')
    console.log(subproject.length , 'length')
    console.log(project , 'project')

    let difference = [];
    let ans =0;
    let timeDiffsCreate=0;
        //calculate time difference between the choosed projects
        const fetchTimeDiffCal = async (projName)=>{
            try{
              
                if(subproject.length > 0){
                
                    let sub_proj_time = modules.filter((data)=>{
                        if(projName === data.subproject ){
                          
                            if(data.estimationtime === "Month"){
                                difference.push(((Number(data.estimation)) /12) * 365)
                            }
                            else if(data.estimationtime === "Year"){
                                difference.push( Number(data.estimation) * 365)
                            }
                            else if(data.estimationtime === "Days"){
                                difference.push(Number(data.estimation))
                            }
                         ans = difference.reduce((acc , cur)=> acc+cur );
                       setTimeCalculation(ans);
                       console.log(difference , 'difference')
                        }
                    })
                 
                    let project_check = subProjectEditList.map((value)=>{
                        
                        if(projName === value.name){
                           if(value.estimationtime === "Month"){
                               timeDiffsCreate = ((Number(value.estimation) /12) * 365) ;
                               setTimeDiffCal(timeDiffsCreate)
       
                           }
                           else if(value.estimationtime === "Year"){
                               timeDiffsCreate = Number(value.estimation) * 365 ;
                               setTimeDiffCal( timeDiffsCreate)
       
                           }
                           else if(value.estimationtime === "Days"){
                               setTimeDiffCal(Number(value.estimation))
                           }
                       }           
                      })
                            
                }
                else if(subproject.length == 0){
                    console.log('hello')
                    let project_check = project.map((value)=>{
                        
                        if(projNameCreate === value.name){
                           if(value.estimationtime === "Month"){
                               timeDiffsCreate = ((Number(value.estimation) /12) * 365) ;
                               setTimeDiffCal(timeDiffsCreate)
       
                           }
                           else if(value.estimationtime === "Year"){
                               timeDiffsCreate = Number(value.estimation) * 365 ;
                               setTimeDiffCal( timeDiffsCreate)
       
                           }
                           else if(value.estimationtime === "Days"){
                               setTimeDiffCal(Number(value.estimation))
                           }
                       }           
                      })
                }
                    
                // else if (projName != data.subproject){
                //     setEditTimeCalculation(ans);
    
                // }
             
       

 
            }
            catch (error) {
                console.log(error.response.data)
            }
        }



     
        const fetchCalculRemaining = async (estType) => {
            if(estType === "Month"){
                setTypeEst(((timeDiffCal - timeCalculation )/ 30).toFixed(0))
            }
            else if (estType === "Year"){
                setTypeEst(((timeDiffCal - timeCalculation )/ 365).toFixed(0));
            
            }
            else if(estType === "Days"){
                setTypeEst((timeDiffCal - timeCalculation ).toFixed(0))
            }


        }


   
    let differenceEdit = [];
    let ansEdit=0;
    let timeDiffs=0;
    
       //Edit Page Functionality for Estimation Time 
       const fetchEditEstTime = async ()=>{
        try{
            let sub_Project = editProjDropdwon ?  editProjDropdwon : rowEditTime.subproject;

            let sub_proj_time = modules.filter((data)=>{
    
                if(sub_Project === data.subproject){
              
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
                // console.log(ansEdit)
                // console.log(differenceEdit)
            }
            
            
            else if (sub_Project != data.subproject){
                setEditTimeCalculation(ansEdit);

            }
           
           })

           let project_check = subProjectEditList.map((value)=>{
             if(sub_Project === value.name){
                if(value.estimationtime === "Month"){
                timeDiffs = ((Number(value.estimation) /12) * 365) ;
                setRowEditTimeProj(timeDiffs)

                }
                else if(value.estimationtime === "Year"){
              timeDiffs = Number(value.estimation) * 365 ;
              setRowEditTimeProj( timeDiffs)

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
                // console.log(conditionTiming , '1' )
                setEditCalOverall(remaining[0] + " months "  )          
           }
           
           else if(estimatType === "Days"){
            let remaining =((rowEditTimeProj - editTimeCalculation)).toFixed(0).toString();
                setConditionTiming((Number(rowEditTime.estimation) * 30)  + ((rowEditTimeProj - editTimeCalculation)))
                // console.log(conditionTiming , '2' )
                setEditCalOverall(remaining  + " days Remaining" )
           }
           
            else if(estimatType === "Year"){
            let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(0).toString().split('.');
            setConditionTiming(Number(rowEditTime.estimation)/12  + ((rowEditTimeProj - editTimeCalculation)/365))
            setEditCalOverall(remaining[0] + " months " + remaining[1] + " days Remaining" )
           }

        }

        else if(rowEditTime.estimationtime === "Days"){
            if(estimatType === "Month"){   
                let remaining =((rowEditTimeProj - editTimeCalculation)/ 25).toFixed(0).toString().split('.')
                let rem = ((rowEditTimeProj - editTimeCalculation)% 25).toFixed(0).toString().split('.')
                setConditionTiming(Number(rowEditTime.estimation) / 30 + ((rowEditTimeProj - editTimeCalculation)/30))
                console.log(conditionTiming , '4' )
                console.log(remaining , '4remaing' )
                setEditCalOverall(remaining[0] + " months " + rem[0] + " days Remaining" )          
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
            setEditCalOverall(remaining[0] + " months " + remaining[1] + " days Remaining" )
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
    const modifiedData = modules.map((person) => ({
        ...person,
        estimateTime: person.estimation + ' ' + person.estimationtime,
      }));
    

    //pdf....
    const columns = [
        { title: "Project", field: "project" },
        { title: "Subproject", field: "subproject" },
        { title: "Name", field: "name" },
        { title: "Estimation Time", field: "estimateTime" },
    ];
    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.autoTable({
            theme: "grid",
            columns: columns.map((col) => ({ ...col, dataKey: col.field })),
            body: modifiedData,
        });
        doc.save("Module.pdf");
    };

    // Excel
    const fileName = "modules";

    const [moduleData, setModuleData] = useState([]);


    // get particular columns for export excel
    const getexcelDatas = async () => {
        let response = await axios.get(SERVICE.MODULE, {
            //  headers: {
            //      'Authorization': `Bearer ${auth.APIToken}`
            //  },
        });
        var data = response.data.modules.map((t) => ({
            "Project": t.project,
            "Sub Project": t.subproject,
            "Name": t.name,
            "Estimation Time":t.estimation + " " + t.estimationtime,
        }));
        setModuleData(data);
    };

    //print...
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Module",
        pageStyle: "print",
    });

    
    const [items, setItems] = useState([]);

    useEffect(() => {   
                          
        getexcelDatas();   
        getusername();
        fetchProjectDropdowns();
        fetch_Sub_ProjectDropdowns();

    }, []);

    useEffect(() => {

        fetchTimeDiffCal();
        fetchCalculRemaining();
        fetchEditEstimationType();
        fetchEditEstTime(); 
        fetchAllModule();
        fetchProjectnamesedit();
    });
    

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
        
            const totalPages = Math.ceil(modules.length / pageSize);
        
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
            <Typography sx={userStyle.HeaderText}>Module </Typography>
            <Box sx={userStyle.container}>
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography sx={userStyle.importheadtext}>Manage Module</Typography>
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
                                    defaultValue = ""
                                    value={(module.project)}
                                    onChange={(e) => {
                                        setModule({ ...module, project: e.target.value });
                                        setProjNameCreate(e.target.value)
                                        
                                    }}
                                >{project &&
                                    project?.map((row, index) => (
                                        <MenuItem value={(row.name)} key={index} onClick={() => {fetchProjectnames(row.name)}}>
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
                                    value={(module.subproject)}
                                    defaultValue = ""
                                    onChange={(e) => {
                                        setModule({ ...module, subproject: e.target.value });
                                        fetchTimeDiffCal(e.target.value)
                                    }}

                                >
                                    {subproject &&
                                        subproject?.map((row, index) => (
                                            <MenuItem value={(row.name)} key={index}>
                                                {row.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                            }
                        <Grid item md={4} xs={12} sm={12}>
                            <FormControl fullWidth size="small">
                                <Typography>Name</Typography>
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={module.name}
                                    onChange={(e) => {
                                        setModule({ ...module, name: e.target.value });
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12} sm={12}>
                            <Grid container>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Typography>Estimation</Typography>
                                    <FormControl fullWidth size="small" >
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="number"
                                            value={module.estimation}
                                            onChange={(e) => { setModule({ ...module, estimation:  Number(e.target.value) > typeEst ? "" : Number(e.target.value)}) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Typography> Time</Typography>
                                    <Select
                                        fullWidth
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={module.estimationtime ?module.estimationtime :"Month"}
                                        onChange={(e) => { setModule({ ...module, estimationtime: e.target.value });
                                        fetchCalculRemaining(e.target.value)
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
                    <Typography sx={{color:"red"}}>{typeEst} {module.estimationtime} is Remaining</Typography>

                    <br />
                    <br />
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ display: "flex" }}
                            onClick={handleSubmit}
                        >
                            SUBMIT
                        </Button>
                    </Grid>
                </>
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
                                    Manage Module
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
                                            defaultValue = ""
                                            value={(moduleid.project)}
                                            onChange={(e) => {
                                                setModuleid({ ...moduleid, project: e.target.value });
                                                setgetprojectname(e.target.value)

                                            }}
                                        >
                                            {project &&
                                                project.map((row) => (
                                                    <MenuItem value={(row.name)}>{row.name}</MenuItem>
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
                                            defaultValue = ""
                                            value={moduleid.subproject ? moduleid.subproject : ""}
                                            onChange={(e) => {
                                                setModuleid({ ...moduleid, subproject: e.target.value });
                                                setEditProjDropdown(e.target.value);
                                            }}
                                        >
                                            {
                                                subProjectEdit && subProjectEdit?.map((data) => {
                                                    return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                }
                                <Grid item md={12} xs={12} sm={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Name</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={moduleid.name}
                                            onChange={(e) => {
                                                setModuleid({ ...moduleid, name: e.target.value });
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                          
                            <Grid item md={12} xs={12} sm={12}>
                            <Grid container>
                                <Grid item md={6} xs={6} sm={6}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Estimation</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={moduleid.estimation}
                                            onChange={(e) => { setModuleid({ ...moduleid, estimation: Number(e.target.value) > Number(conditionTiming) ? " " :  Number(e.target.value) }) }}
                                        />
                                    </FormControl>
                                </Grid><br />
                                <Grid item md={6} xs={6} sm={6}>
                                    <Typography>Estimation Time</Typography>
                                    <Select
                                        fullWidth
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={moduleid.estimationtime ? moduleid.estimationtime : "Month"}
                                        onChange={(e) => { setModuleid({ ...moduleid, estimationtime: e.target.value });
                                        setGetEstiType(e.target.value);
                                     }}
                                    >

                                        <MenuItem value="Days"> {"Days"} </MenuItem>
                                        <MenuItem value="Month"> {"Month"} </MenuItem>
                                        <MenuItem value="Year"> {"Year"}</MenuItem>
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
                        <Typography sx={userStyle.importheadtext}>Module List</Typography>
                    </Grid>
                    <Grid container sx={{ justifyContent: "center" }}>
                        <Grid>
                            <ExportCSV csvData={moduleData} fileName={fileName} />

                            <ExportXL csvData={moduleData} fileName={fileName} />

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
                            <Select id="pageSizeSelect" defaultValue = "" value={pageSize} onChange={handlePageSizeChange} sx={{width:"77px"}}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                            <MenuItem value={(modules.length)}>All</MenuItem>
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
                    <br />
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
                                    <StyledTableCell onClick={() => handleSorting('subproject')}><Box sx={userStyle.tableheadstyle}><Box>SubProject Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('subproject')}</Box></Box></StyledTableCell>
                                    <StyledTableCell onClick={() => handleSorting('name')}><Box sx={userStyle.tableheadstyle}><Box>Module Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('module')}</Box></Box></StyledTableCell>
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
                                :   <StyledTableRow> <StyledTableCell colSpan={6} align="center">No Data Available</StyledTableCell> </StyledTableRow>
                                 }
                                </TableBody>
                                </Table>
                            </TableContainer>
                            <Box style={userStyle.dataTablestyle}>
                                <Box>
                                    Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, modules.length)} of {modules.length} entries
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
                            onClick={(e) => delModule(modulesid)}
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
                                <TableCell>Name</TableCell>
                                <TableCell>Estimation Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {modules &&
                                modules.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{row.project}</TableCell>
                                        <TableCell>{row.subproject}</TableCell>
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
                        <Typography sx={userStyle.HeaderText}> View Module</Typography>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">project</Typography>
                                    <Typography>{moduleid.project}</Typography>
                                </FormControl>
                            </Grid><br/>
                            <Grid item md={6} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Subproject</Typography>
                                    <Typography>{moduleid.subproject}</Typography>
                                </FormControl>
                            </Grid><br/>
                            <Grid item md={6} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Name</Typography>
                                    <Typography>{moduleid.name}</Typography>
                                </FormControl>
                            </Grid><br/>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Estimation Time</Typography>
                                <FormControl fullWidth size="small">
                                    <Typography>{moduleid.estimation +"  " + moduleid.estimationtime}</Typography>
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
                        <Typography sx={userStyle.HeaderText}> Info </Typography>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">addedby</Typography>
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
                            <br/>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Updated by</Typography>
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

export default Module;