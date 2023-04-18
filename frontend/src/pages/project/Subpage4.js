import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, TableBody,TableRow,TableCell, Select, MenuItem, Dialog, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button } from "@mui/material";
import { userStyle } from "../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import axios from "axios";
import { SERVICE } from '../../services/Baseservice';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useReactToPrint } from "react-to-print";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import moment from 'moment-timezone';


function Subpage4() {
    
    const [subpagefour, setSubpagefour] = useState({ project: "", subproject: "", module: "", name: "", submodule: "", mainpage: "", subpageone: "",subpagetwo:"",subpagethree:"",estimation:"",estimationtime:"Year"})

    const [subid, setSubid] = useState({
        project: "", subproject: "", module: "", name: "", submodule: "", mainpage: "", subpageone: "",subpagetwo:"",subpagethree:"",estimation:"",estimationtime:"Year"
    });
    const [mainpage, setMainpage] = useState([]);
    const [subproject, setSubProject] = useState([]);
    const [projectEdit, setProjectEdit] = useState([]);
    const [project, setProject] = useState([]);
    const [subProjectEdit, setSubProjectEdit] = useState([]);
    const [submodule, setSubmodule] = useState([]);
    const [module, setModule] = useState([]);
    const [moduleEdit, setModuleEdit] = useState([]);
    const [submoduleEdit, setSubmoduleEdit] = useState([]);
    const [username, setUsername] = useState("");
    const [subpage1, setSubpage1] = useState([]);
    const [subpage1Edit, setSubpage1Edit] = useState([]);
    const [subpage2, setSubpage2] = useState([]);
    const [subpage3, setSubpage3] = useState([]);
    const [subpage2Edit, setSubpage2Edit] = useState([]);
    const [subpage3Edit, setSubpage3Edit] = useState([]);
    const [getrowid, setRowGetid] = useState("");
    const [subpagetwos, setSubpagetwos] = useState([])
    const [subpagethrees, setSubpagethrees] = useState([])
    const [subpagefours, setSubpagefours] = useState([])
    const [mainpageEdit, setMainpageEdit] = useState([]);



    const [timeCalculation, setTimeCalculation] = useState("");
    const [timeDiffCal, setTimeDiffCal] = useState("");
    const [typeEst, setTypeEst] = useState("");
    const[rowEditTime , setRowEditTime] = useState("");
    const[rowEditTimeProj , setRowEditTimeProj] = useState("");
    const[editTimeCalculation , setEditTimeCalculation] = useState("");
    const[editCalOverall , setEditCalOverall] = useState("");
    const[getEstitype , setGetEstiType] = useState("");
    const[conditionTiming , setConditionTiming] = useState("");
    const[editProjDropdwon , setEditProjDropdown] = useState("");
    const[subpageThreeList , setSubPagethreeList] = useState([]);

    //Datatable
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);

    // view model
    const [openview, setOpenview] = useState(false);

    const handleClickOpenview = () => {
        setOpenview(true);
    };

    const handleCloseview = () => {
        setOpenview(false);
    };

    // Error Popup model
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [showAlert, setShowAlert] = useState()
    const handleClickOpenerr = () => {
        setIsErrorOpen(true);
    };
    const handleCloseerr = () => {
        setIsErrorOpen(false);
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

    

        //fetching subproject three for Dropdowns
        const fetchSubProjectTwoList = async () => {
            try {
                let projectDrop = await axios.get(SERVICE.SUBPAGESTHREE);
                setSubPagethreeList(projectDrop.data.subpagesthree);
    
            } catch (error) {
                console.log(error.response.data);
            }
        };


        const[subprojectnone, setsubprojectnone] = useState("") 
        const[projectnameg,getprojectnameg] = useState("");
    //fetching sub-Project Dropdowns
    const fetchSubProjectDropdowns = async (e) => {
        try {
            let subPro = await axios.get(SERVICE.SUBPROJECT);
            let subProDrop = subPro.data.subprojects.filter((data) => {
                if (e === data.project){
                    setsubprojectnone(data)
                    return data
                }
            })
            setSubProject(subProDrop);

        } catch (error) {
            console.log(error.response.data);
        }
    };


    const[getprojectname, setgetprojectname] = useState("")

     //fetching sub-Project Dropdowns
     const fetchSubProjectDropdownsedit = async () => {
        let projectName= getprojectname ? getprojectname : subid.project;
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



     //fetching Module Dropdowns
     const fetchModuleDropdowns = async (e) => {
        try {
            let dropModule = await axios.get(SERVICE.MODULE);
            let modulelist = dropModule.data.modules.filter((data) => {
                if (subprojectnone.name == "None"  ? projectnameg == data.project : e === data.subproject) {
                    return data
                }
            })
            setModule(modulelist);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        if(subprojectnone.name == "None" ){
            fetchModuleDropdowns();
        }
    })

    const[getsubprojectname, setgetsubprojectname] = useState("")


    //fetching Module Dropdowns
    const fetchModuleDropdownsedit = async () => {
        let subPro= getsubprojectname ? getsubprojectname : subid.subproject;

        try {
            let dropModule = await axios.get(SERVICE.MODULE);
            let modulelist = dropModule.data.modules.filter((data) => {
                if (subPro === data.subproject) {
                    return data
                }
            })
            setModuleEdit(modulelist);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const[submodulenone,setsubmodulenone] = useState("");
    //fetching Sub-Modules Dropdowns
    const fetchSubModuleDropdowns = async (e) => {
        try {
            let drosubmod = await axios.get(SERVICE.SUBMODULE);
            let submodulelist = drosubmod.data.submodules.filter((data) => {
                if (e === data.module) {
                    setsubmodulenone(data)
                    return data
                }

            })
            setSubmodule(submodulelist);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const[getmodulename, setgetmodulename] = useState("")

    //fetching Sub-Modules Dropdowns
    const fetchSubModuleDropdownsedit = async () => {
        let modu= getmodulename ? getmodulename : subid.module;
        try {
            let drosubmod = await axios.get(SERVICE.SUBMODULE);
            let submodulelist = drosubmod.data.submodules.filter((data) => {
                if (modu === data.module) {
                    return data
                }

            })
            setSubmoduleEdit(submodulelist);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    //fetching Main Page Dropdowns
    const fetchMainPageDropdowns = async (e) => {
        try {
            let mainPag = await axios.get(SERVICE.MAINPAGE);
            let mainPagdrop = mainPag.data.mains.filter((data) => {
                if (submodulenone.name == "None"  ? projectnameg == data.project : e === data.submodule)
                    return data
            })
            setMainpage(mainPagdrop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        if(submodulenone.name == "None" ){
            fetchMainPageDropdowns();
        }
    })

    const[getsubmodulename, setgetsubmodulename] = useState("")

     //fetching Main Page Dropdowns
     const fetchMainPageDropdownsedit = async () => {
        let submod= getsubmodulename ? getsubmodulename : subid.submodule;

        try {
            let mainPag = await axios.get(SERVICE.MAINPAGE);
            let mainPagdrop = mainPag.data.mains.filter((data) => {
                if (submod === data.submodule)
                    return data
            })
            setMainpageEdit(mainPagdrop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    //fetching Sub-Page-1 Dropdowns
    const fetchSubPage1Dropdowns = async (e) => {
        try {
                let subpag1 = await axios.get(SERVICE.SUBPAGESONE);
                let subPag1Drop= subpag1.data.subpagesone.filter((data) => {
                    if (e === data.mainpage)      
                        return data     
                    })
                    setSubpage1(subPag1Drop);
                } catch (error) {
                    console.log(error.response.data);
                }
            };

     const[getmainpagename, setgetmainpagename] = useState("")

    
     //fetching Sub-Page-1 Dropdowns
     const fetchSubPage1Dropdownsedit = async () => {
        let mainPag= getmainpagename ? getmainpagename : subid.mainpage;

        try {
                let subpag1 = await axios.get(SERVICE.SUBPAGESONE);
                let subPag1Drop= subpag1.data.subpagesone.filter((data) => {
                    if (mainPag === data.mainpage)      
                        return data     
                    })
                    setSubpage1Edit(subPag1Drop);
                } catch (error) {
                    console.log(error.response.data);
                }
            };

                 //fetching Sub-Page-2 Dropdowns
        const fetchSubPage2Dropdowns = async (e) => {
            try {
                    let subpag1 = await axios.get(SERVICE.SUBPAGESTWO);
                    let subPag1Drop= subpag1.data.subpagestwo.filter((data) => {
                        if (e === data.subpageone)      
                            return data     
                      })
                        setSubpage2(subPag1Drop);
                    } catch (error) {
                        console.log(error.response.data);
                    }
                };

        const[getsubpageonename, setgetsubpageonename] = useState("")

                            //fetching Sub-Page-2 Dropdowns
        const fetchSubPage2Dropdownsedit = async () => {
            let subPage1= getsubpageonename ? getsubpageonename : subid.subpageone;

            try {
                    let subpag1 = await axios.get(SERVICE.SUBPAGESTWO);
                    let subPag1Drop= subpag1.data.subpagestwo.filter((data) => {
                        if (subPage1 === data.subpageone)      
                            return data     
                      })
                        setSubpage2Edit(subPag1Drop);
                    } catch (error) {
                        console.log(error.response.data);
                    }
                };
                 //fetching Sub-Page-3 Dropdowns
        const fetchSubPage3Dropdowns = async (subPage2) => {
            try {
                    let subpag1 = await axios.get(SERVICE.SUBPAGESTHREE);
                    let subPag1Drop= subpag1.data.subpagesthree.filter((data) => {
                        if (subPage2 === data.subpagetwo)      
                            return data     
                      })
                        setSubpage3(subPag1Drop);
                    } catch (error) {
                        console.log(error.response.data);
                    }
                };

          const[getsubpagetwoname, setgetsubpagetwoname] = useState("")

                  //fetching Sub-Page-3 Dropdowns
        const fetchSubPage3Dropdownsedit = async () => {
            let subPage2= getsubpagetwoname ? getsubpagetwoname : subid.subpagetwo;
            try {
                    let subpag1 = await axios.get(SERVICE.SUBPAGESTHREE);
                    let subPag1Drop= subpag1.data.subpagesthree.filter((data) => {
                        if (subPage2 === data.subpagetwo)      
                            return data     
                      })
                        setSubpage3Edit(subPag1Drop);
                    } catch (error) {
                        console.log(error.response.data);
                    }
                };       


    //get all subpagetwo.
    const fetchAllSubpagetwo = async () => {
        try {
            let res_mainpage = await axios.get(SERVICE.SUBPAGESTWO, {
            });
            setSubpagetwos(res_mainpage.data.subpagestwo);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    }


    //get all subpagethree.
    const fetchAllSubpagethree = async () => {
        try {
            let res_mainpage = await axios.get(SERVICE.SUBPAGESTHREE, {
            });
            setSubpagethrees(res_mainpage.data.subpagesthree);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    }
    //get all subpagethree.
    const fetchAllSubpagefour = async () => {
        try {
            let res_subfour = await axios.get(SERVICE.SUBPAGESFOUR, {
            });
            setSubpagefours( res_subfour.data.subpagesfour);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    }
    const [deletemainpage, setDeletemainpage] = useState("");

    //set function to get particular row
    const rowData = async (id) => {
        try {
            let res = await axios.get(`${SERVICE.SUBPAGEFOUR_SINGLE}/${id}`, {
                // headers: {
                //     'Authorization': `Bearer ${auth.APIToken}`
                // }
            });
            setDeletemainpage(res.data.ssubpagefour);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    }

    // Alert delete popup
    let mainpageid = deletemainpage._id;
    const delMainpage = async () => {
        try {
            await axios.delete(`${SERVICE.SUBPAGEFOUR_SINGLE}/${mainpageid}`, {
                // headers: {
                //     'Authorization': `Bearer ${auth.APIToken}`
                // }
            });
            handleCloseMod();
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    };

    //add function 
    const sendRequest = async () => {
        try {
            let subpagescreate = await axios.post(SERVICE.SUBPAGEFOUR_CREATE, {
                // headers: {
                //     'Authorization':`Bearer ${auth.APIToken}`
                //     }
                project: String(subpagefour.project),
                subproject: String(subprojectnone.name == "None" ? "None" : subpagefour.subproject),
                module: String(subpagefour.module),
                submodule: String(submodulenone.name == "None" ? "None" : subpagefour.submodule),
                mainpage: String(subpagefour.mainpage),
                name: String(subpagefour.name),
                subpageone: String(subpagefour.subpageone),
                subpagetwo: String(subpagefour.subpagetwo),
                subpagethree: String(subpagefour.subpagethree),
                estimation: String(subpagefour.estimation),
                estimationtime: String(subpagefour.estimationtime) ? subpagefour.estimationtime : "Year",
                addedby: [
                     {
                        name: String(username),
                        date: String(new Date()),
                    },
                ],
               
            })
            setSubpagefour(subpagescreate.data)
            setSubpagefour({ project: "", subproject: "", module: "", submodule: "", name: "", mainpage: "",subpageone:"",subpagetwo:"",subpagethree:"",estimation: "", estimationtime: "" })
        } catch (error) {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
                    <p style={{ fontSize: '20px', fontWeight: 900 }}>{error.response.data.errorMessage}</p>
                </>
            );
            handleClickOpenerr();
        }
    }

    //submit option for saving
    const handleSubmit = (e) => {
        e.preventDefault();
        if (subpagefour.name === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
                    <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter Name"}</p>
                </>
            );
            handleClickOpenerr();
        }
        else {
            sendRequest();
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
            //setUsername(user)
        }
        catch (err) {
            console.log(err.response.data.errormessage)
        }
    }

    //get single row to edit Page
    const getCode = async (e) => {
        setRowGetid(e);
        let res = await axios.get(
            `${SERVICE.SUBPAGEFOUR_SINGLE}/${e}`,
            {}
        );
        setSubid(res.data.ssubpagefour);
        setRowGetid(res.data.sprojectdetails);
        setRowEditTime(res.data.ssubpagefour);
    };
    // get single row to view....
    const getviewCode = async (e) => {
        let res = await axios.get(`${SERVICE.SUBPAGEFOUR_SINGLE}/${e}`, {});
        setSubid(res.data.ssubpagefour);
    };

    // get single row to view....
    const getinfoCode = async (e) => {
        let res = await axios.get(`${SERVICE.SUBPAGEFOUR_SINGLE}/${e}`, {});
        setSubid(res.data.ssubpagefour);
    };
   
    //subpage4 updateby edit page...
    let updateby = subid.updatedby;
    let addedby = subid.addedby;

    let suboneid = subid._id;

    //editing the single data...
    const sendEditRequest = async () => {
        try {
            let res = await axios.put(`${SERVICE.SUBPAGEFOUR_SINGLE}/${suboneid}`, {
                project: String(subid.project),
                subproject: String(subid.subproject),
                module: String(subid.module),
                submodule: String(subid.submodule),
                mainpage: String(subid.mainpage),
                name: String(subid.name),
                subpageone: String(subid.subpageone),
                subpagetwo: String(subid.subpagetwo),
                subpagethree: String(subid.subpagethree),
                estimation: String(subid.estimation),
                estimationtime: String(subid.estimationtime),
                updatedby: [
                    ...updateby, {
                        name: String(username),
                        date: String(new Date()),
                    },
                ],
            });
            setSubid(res.data);
            handleCloseModEdit();
        } catch (err) {
            console.log(err.response.data.message)
        }
    }

    const editSubmit = (e) => {
        e.preventDefault();
        sendEditRequest();
    }


    let difference = [];
    let ans = 0;
    let timeDiffs = 0;
    //calculate time difference between the choosed projects
    const fetchTimeDiffCal = async (projName) => {
        try {

            let sub_proj_time = subpagefours.map((data) => {
                if (projName === data.subpagethree) {

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
                    console.log(difference)

                    setTimeCalculation(ans);
                    // setTimeCalculationEdit(ans)
                }
                // else if ((projName != data.subproject)) {
                //     setTimeCalculation(0);
                // }

            }) 
            let project_check = subpage3.map((value) => {
                if (projName === value.name) {
                    if (value.estimationtime === "Month") {
                        timeDiffs = ((Number(value.estimation) / 12) * 365);
                        console.log(difference)
                        setTimeDiffCal(timeDiffs)
                        // setTimeDiffCalEdit(timeDiffs)

                    }
                    else if (value.estimationtime === "Year") {
                        setTimeDiffCal(0)
                        // setTimeDiffCalEdit(0)
                        timeDiffs = Number(value.estimation) * 365;
                        setTimeDiffCal(timeDiffs)
                        // setTimeDiffCalEdit(timeDiffs)

                    }
                    else if (value.estimationtime === "Days") {
                        setTimeDiffCal(Number(value.estimation))
                        // setTimeDiffCalEdit(Number(value.estimation))

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
            // setTypeEstEdit(Math.round((timeDiffCalEdit - timeCalculationEdit) / 30))
        }
        else if (estType === "Year") {
            setTypeEst(Math.round((timeDiffCal - timeCalculation) / 365));
            // setTypeEstEdit(Math.round((timeDiffCalEdit - timeCalculationEdit) / 365));
        }
        else if (estType === "Days") {
            setTypeEst(Math.round(timeDiffCal - timeCalculation))
            // setTypeEstEdit(Math.round(timeDiffCalEdit - timeCalculationEdit))
        }
    } 
    
     
    let differenceEdit = [];
    let ansEdit=0;
    let timeDiffsEdit=0;
    
       //Edit Page Functionality for Estimation Time 
       const fetchEditEstTime = async ()=>{
        try{
            let sub_Project = editProjDropdwon ?  editProjDropdwon : rowEditTime.subpagethree;
            console.log(sub_Project)

            let sub_proj_time = subpagefours.filter((data)=>{
    
                if(sub_Project === data.subpagethree){
              
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
            
            
            else if (sub_Project != data.subpagethree){
                setEditTimeCalculation(ansEdit);

            }
           
           })

           let project_check = subpageThreeList.map((value)=>{
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
                // console.log(conditionTiming , '1' )
                setEditCalOverall(remaining[0] + " months " + remaining[1] + " days Remaining" )          
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
                // console.log(conditionTiming , '4' )
                // console.log(remaining , '4remaing' )
                setEditCalOverall(remaining[0] + " months " + rem[0] + " days Remaining" )          
           }
           
           else if(estimatType === "Days"){
            let remaining =((rowEditTimeProj - editTimeCalculation)).toFixed(0).toString();
                setConditionTiming((Number(rowEditTime.estimation))  + ((rowEditTimeProj - editTimeCalculation)))
                // console.log(conditionTiming , '5' )
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

    const modifiedData = subpagefours.map((person) => ({
        ...person,
        estimateTime: person.estimation + ' ' + person.estimationtime,
      }));


     // pdf.....
     const columns = [
        { title: "Project", field: "project" },
        { title: "Subproject", field: "subproject" },
        { title: "Module", field: "module" },
        { title: "Submodule", field: "submodule" },
        { title: "Mainpage", field: "mainpage" },
        { title: "Subpageone", field: "subpageone" },
        { title: "Subpagetwo", field: "subpagetwo" },
        { title: "Subpagethree", field: "subpagethree" },
        { title: "Name", field: "name" },
        { title: "EstimationTime", field: "estimateTime" },

    ]

    const downloadPdf = () => {
        const doc = new jsPDF()
        doc.autoTable({
            theme: "grid",
            styles: {
                fontSize: 6,
              },
            columns: columns.map(col => ({ ...col, dataKey: col.field })),
            body: modifiedData
        })
        doc.save('subpage-4.pdf')
    }

    // Excel
    const fileName = "subpage-4";

    const [subpageData, setSubpageData] = useState([]);

    // get particular columns for export excel
    const getexcelDatas = async () => {
    
        var data = subpagefours.map(t => ({
            project: t.project,
            subproject: t.subproject,
            module: t.module,
            submodule: t.submodule,
            mainpage: t.mainpage,
            subpageone: t.subpageone,
            subpagetwo: t.subpagetwo,
            subpagethree: t.subpagethree,
            name: t.name,
            estimateTime:t.estimation + " " + t.estimationtime
        }));
        setSubpageData(data);
    }

     //print...
     const componentRef = useRef();
     const handleprint = useReactToPrint({
         content: () => componentRef.current,
         documentTitle: 'Subpage 4',
         pageStyle: 'print'
     });


    useEffect(
        () => {
            getexcelDatas();
            getusername();
            fetchAllSubpagetwo();
            fetchAllSubpagethree();
            fetchAllSubpagefour();
            fetchProjectDropdowns();
            fetchSubProjectDropdownsedit();
            fetchModuleDropdownsedit();
            fetchSubModuleDropdownsedit();
            fetchMainPageDropdownsedit();
            fetchSubPage1Dropdownsedit();
            fetchSubPage2Dropdownsedit();
            fetchSubPage3Dropdownsedit();
            fetchEditEstTime();
            fetchEditEstimationType();
            fetchSubProjectTwoList();
            fetchTimeDiffCal();
            fetchCalculRemaining();
        }
    );

        
    const [items, setItems] = useState([]);

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

    const totalPages = Math.ceil(subpagefours.length / pageSize);

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
            <Typography sx={userStyle.HeaderText}>Sub Page 4 </Typography>
            <Box sx={userStyle.container}>
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography sx={userStyle.importheadtext}>Manage Sub Page 4</Typography>
                        </Grid>
                    </Grid><br />
                    <Grid container sx={{ justifyContent: "left" }} spacing={1}>
                        <Grid item md={4} xs={12} sm={12}>
                            <Typography>Project</Typography>
                            <FormControl size="small" fullWidth>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={subpagefour.project}
                                    onChange={(e, i) => {
                                        setSubpagefour({ ...subpagefour, project: e.target.value });
                                      
                                    }}
                                >{project &&
                                    project.map((row, index) => (
                                        <MenuItem value={row.name} key={index} onClick={() => {fetchSubProjectDropdowns(row.name); getprojectnameg(row.name); }}>
                                            {row.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        { subprojectnone.name == "None" ? null :
                        <Grid item md={4} xs={12} sm={12}>
                            <Typography>Sub Project</Typography>
                            <FormControl size="small" fullWidth>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={subpagefour.subproject}
                                    onChange={(e, i) => {
                                        setSubpagefour({ ...subpagefour, subproject: e.target.value });
                                        fetchModuleDropdowns(e.target.value);
                                    }}

                                >
                                    {subproject &&
                                        subproject.map((row, index) => (
                                            <MenuItem value={row.name} key={index}>
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
                                    value={subpagefour.module}
                                    onChange={(e, i) => {
                                        setSubpagefour({ ...subpagefour, module: e.target.value });
                                        fetchSubModuleDropdowns(e.target.value);
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
                        { submodulenone.name == "None" ? null :
                        <Grid item md={4} xs={12} sm={12}>
                            <Typography>Submodule</Typography>
                            <FormControl size="small" fullWidth>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={subpagefour.submodule}
                                    onChange={(e, i) => {
                                        setSubpagefour({ ...subpagefour, submodule: e.target.value });
                                        fetchMainPageDropdowns(e.target.value);
                                    }}
                                >{submodule &&
                                    submodule.map((row, index) => (
                                        <MenuItem value={row.name} key={index}>
                                            {row.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                         }
                        <Grid item md={4} xs={12} sm={12}>
                            <Typography>Main Page</Typography>
                            <FormControl size="small" fullWidth>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={subpagefour.mainpage}
                                    onChange={(e, i) => {
                                        setSubpagefour({ ...subpagefour, mainpage: e.target.value });
                                        fetchSubPage1Dropdowns(e.target.value);
                                    }}
                                >{mainpage &&
                                    mainpage.map((row, index) => (
                                        <MenuItem value={row.name} key={index}>
                                            {row.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12} sm={12}>
                            <Typography>Sub-Page 1</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={subpagefour.subpageone}
                                    onChange={(e) => {
                                        setSubpagefour({ ...subpagefour, subpageone: e.target.value });
                                        fetchSubPage2Dropdowns(e.target.value);
                                    }}
                                >
                                     {
                                        subpage1.map((data)=>{
                                                    return  <MenuItem value ={data.name}>{data.name}</MenuItem>
                                                })
                                            }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12} sm={12}>
                            <Typography>Sub-Page 2</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={subpagefour.subpagetwo}
                                    onChange={(e) => {
                                        setSubpagefour({ ...subpagefour, subpagetwo: e.target.value });
                                        fetchSubPage3Dropdowns(e.target.value);
                                    }}
                                >
                                     {
                                        subpage2.map((data)=>{
                                                    return  <MenuItem value ={data.name}>{data.name}</MenuItem>
                                                })
                                            }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12} sm={12}>
                            <Typography>Sub-Page 3</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={subpagefour.subpagethree}
                                    onChange={(e) => {
                                        setSubpagefour({ ...subpagefour, subpagethree: e.target.value });
                                        fetchTimeDiffCal(e.target.value);
                                    }}
                                >
                                     {
                                        subpage3.map((data)=>{
                                                    return  <MenuItem value ={data.name}>{data.name}</MenuItem>
                                                })
                                            }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography>Name</Typography>
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={subpagefour.name}
                                    onChange={(e) => { setSubpagefour({ ...subpagefour, name: e.target.value }) }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12} sm={12}>
                            <Grid container>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography>Estimation</Typography>
                                <FormControl fullWidth size="small" >
                                    <OutlinedInput
                                        id="component-outlined"
                                        type="number"
                                        value={subpagefour.estimation}
                                        onChange={(e) => { setSubpagefour({ ...subpagefour, estimation: Number(e.target.value) > typeEst ? "" : Number(e.target.value) }) }}
                                    />
                                </FormControl>
                                {subpagefour.estimationtime ?
                        <Typography sx={{ color: "red" }}> {typeEst} {subpagefour.estimationtime} is Remaining </Typography> : " "}
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                            <Typography>Time</Typography>
                                <Select
                                    fullWidth
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={subpagefour.estimationtime}
                                    onChange={(e) => { setSubpagefour({ ...subpagefour, estimationtime: e.target.value });
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
                       
                        <Grid item xs={12} sm={6} md={2} lg={2} marginTop={3}>
                            <Button variant='contained' color='primary' sx={{ display: "flex" }} onClick={handleSubmit}>Create New</Button>
                        </Grid>
                    </Grid>
                </>
            </Box>
            <Box>
                {/* Edit DIALOG */}
                <Dialog
                    open={isEditOpen}
                    onClose={handleCloseModEdit}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="md"
                >
                    <Box sx={userStyle.dialogbox}>
                        <Box sx={{padding:'20px'}}>
                            <Grid container spacing={2}>
                                <Typography sx={userStyle.importheadtext}>Manage Sub Page-4</Typography>
                            </Grid><br />
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>project </Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={subid.project}
                                            onChange={(e, i) => {
                                                setSubid({ ...subid, project: e.target.value });
                                                setgetprojectname(e.target.value);
                                            }}
                                        >
                                            {projectEdit &&
                                                projectEdit.map((row) => (
                                                    <MenuItem value={row.name}>{row.name}</MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Subproject </Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={subid.subproject}
                                            onChange={(e, i) => {
                                                setSubid({ ...subid, subproject: e.target.value });
                                                setgetsubprojectname(e.target.value);
                                            }}
                                        >
                                            {
                                                subProjectEdit && subProjectEdit.map((data) => {
                                                    return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Module </Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={subid.module}
                                            onChange={(e, i) => {
                                                setSubid({ ...subid, module: e.target.value });
                                                setgetmodulename(e.target.value);
                                            }}
                                        >
                                            {
                                                moduleEdit && moduleEdit.map((data) => {
                                                    return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Submodule</Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={subid.submodule}
                                            onChange={(e, i) => {
                                                setSubid({ ...subid, submodule: e.target.value });
                                                setgetsubmodulename(e.target.value);
                                            }}
                                        >
                                            {
                                                submoduleEdit && submoduleEdit.map((data) => {
                                                    return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Mainpage</Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={subid.mainpage}
                                            onChange={(e, i) => {
                                                setSubid({ ...subid, mainpage: e.target.value });
                                                setgetmainpagename(e.target.value);
                                            }}
                                        >
                                            {
                                                mainpageEdit && mainpageEdit.map((data) => {
                                                    return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                            <Typography>Sub-Page 1</Typography>

                            <FormControl fullWidth size="small">
                            <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={subid.subpageone}
                                            onChange={(e) => {
                                                setSubid({ ...subid, subpageone: e.target.value });
                                                setgetsubpageonename(e.target.value);
                                            }}
                                        >
                                                {
                                                subpage1Edit && subpage1Edit.map((data)=>{
                                                    return  <MenuItem value ={data.name}>{data.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12} sm={12}>
                            <Typography>Sub-Page 2</Typography>

                            <FormControl fullWidth size="small">
                            <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={subid.subpagetwo}
                                            onChange={(e) => {
                                                setSubid({ ...subid, subpagetwo: e.target.value });
                                                setgetsubpagetwoname(e.target.value);
                                            }}
                                        >
                                                {
                                                subpage2Edit && subpage2Edit.map((data)=>{
                                                    return  <MenuItem value ={data.name}>{data.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12} sm={12}>
                            <Typography>Sub-Page 3</Typography>
                            <FormControl fullWidth size="small">
                            <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={subid.subpagethree}
                                            onChange={(e) => {
                                                setSubid({ ...subid, subpagethree: e.target.value });
                                                setEditProjDropdown(e.target.value);
                                            }}
                                        >
                                                {
                                                subpage3Edit && subpage3Edit.map((data)=>{
                                                    return  <MenuItem value ={data.name}>{data.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12} sm={12}>
                             <Grid container>
                             <Grid item md={6} xs={12} sm={12}>
                                    <Typography>Estimation</Typography>
                                    <FormControl fullWidth size="small" >
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={subid.estimation}
                                            onChange={(e) => { setSubid({ ...subid, estimation: Number(e.target.value) > Number(conditionTiming) ? "" : Number(e.target.value) }) }}
                                        />
                                    </FormControl>
                                </Grid>                               
                                    <Grid item md={6} xs={12} sm={12}>
                                        <Typography>Estimation Time</Typography>
                                        <Select
                                            fullWidth
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={subid.estimationtime}
                                            onChange={(e) => { setSubid({ ...subid, estimationtime: e.target.value });
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
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Name</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={subid.name}
                                            onChange={(e) => { setSubid({ ...subid, name: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Typography sx={{color:"red"}}> {editCalOverall}</Typography>
                            <br /><br />
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Button variant="contained" onClick={editSubmit} >Update</Button>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Button sx={userStyle.btncancel} onClick={handleCloseModEdit} >Cancel</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Dialog>
            </Box>
            <br />
            {/* ****** Table Start ****** */}
            <>
                <Box sx={userStyle.container}>
                    { /* ******************************************************EXPORT Buttons****************************************************** */}
                    <Grid item xs={8}>
                        <Typography sx={userStyle.importheadtext}>Sub Page4 List</Typography>
                    </Grid>
                    <Grid container sx={{ justifyContent: "center" }} >
                        <Grid >
                            {/* {isUserRoleCompare[0].excelsupplier && (
                                <> */}
                            <ExportCSV csvData={subpageData} fileName={fileName} />
                            {/* </>
                            )} */}
                            {/* {isUserRoleCompare[0].csvsupplier && (
                                <> */}
                            <ExportXL csvData={subpageData} fileName={fileName} />
                            {/* </>
                            )} */}
                            {/* {isUserRoleCompare[0].printsupplier && (
                                <> */}
                            <Button sx={userStyle.buttongrp} onClick={handleprint}>&ensp;<FaPrint />&ensp;Print&ensp;</Button>
                            {/* </>
                            )} */}
                            {/* {isUserRoleCompare[0].pdfsupplier && (
                                <> */}
                            <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()} ><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
                            {/* </>
                            )} */}
                        </Grid>
                    </Grid><br />
                    {/* ****** Table Grid Container ****** */}
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
                            <MenuItem value={(subpagefours.length)}>All</MenuItem>
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
                    {/* ****** Table start ****** */}
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 700, }}
                            aria-label="customized table"
                            id="usertable"
                        >
                            <TableHead sx={{ fontWeight: "600" }}>
                                <StyledTableRow>
                                <StyledTableCell onClick={() => handleSorting('serialNumber')}><Box sx={userStyle.tableheadstyle}><Box>SNo</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('serialNumber')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('project')}><Box sx={userStyle.tableheadstyle}><Box>Project Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('project')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('subproject')}><Box sx={userStyle.tableheadstyle}><Box>SubProject Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('subproject')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('module')}><Box sx={userStyle.tableheadstyle}><Box>Module Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('module')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('submodule')}><Box sx={userStyle.tableheadstyle}><Box>Submodule Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('submodule')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('mainpage')}><Box sx={userStyle.tableheadstyle}><Box>Mainpage Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('mainpage')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('subpageone')}><Box sx={userStyle.tableheadstyle}><Box>Subpageone Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('subpageone')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('subpagetwo')}><Box sx={userStyle.tableheadstyle}><Box>Subpagetwo Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('subpagetwo')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('subpagethree')}><Box sx={userStyle.tableheadstyle}><Box>Subpagethree Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('subpagethree')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('name')}><Box sx={userStyle.tableheadstyle}><Box>Subpagefour Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('name')}</Box></Box></StyledTableCell>
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
                                            <StyledTableCell>{row.submodule}</StyledTableCell>
                                            <StyledTableCell>{row.mainpage}</StyledTableCell>
                                            <StyledTableCell>{row.subpageone}</StyledTableCell>
                                            <StyledTableCell>{row.subpagetwo}</StyledTableCell>
                                            <StyledTableCell>{row.subpagethree}</StyledTableCell>
                                            <StyledTableCell>{row.name}</StyledTableCell>
                                            <StyledTableCell>{row.estimateTime}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row" colSpan={1}>
                                                <Grid sx={{ display: 'flex' }}>
                                                    <Button sx={userStyle.buttonedit} onClick={() => {
                                                        handleClickOpenEdit();
                                                        getCode(row._id)
                                                    }}><EditOutlinedIcon style={{ fontsize: 'large' }} /></Button>
                                                    {/* <Link to={`/location/${row._id}`} style={{ textDecoration: 'none', color: '#fff', minWidth: '0px' }}><Button sx={userStyle.buttonedit} style={{ minWidth: '0px' }}><EditOutlinedIcon style={{ fontSize: 'large' }} /></Button></Link> */}
                                                    <Button sx={userStyle.buttondelete} onClick={(e) => { handleClickOpen(); rowData(row._id) }}><DeleteOutlineOutlinedIcon style={{ fontsize: 'large' }} /></Button>
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
                                     )))  :   <StyledTableRow> <StyledTableCell colSpan={12} align="center">No Data Available</StyledTableCell> </StyledTableRow> }
                                     </TableBody>
                                   </Table>
                                 </TableContainer>
                                 <Box style={userStyle.dataTablestyle}>
                                   <Box>
                                       Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, subpagefours.length)} of {subpagefours.length} entries
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
                    <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
                        <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} />
                        <Typography variant="h5" sx={{ color: 'red', textAlign: 'center' }}>Are you sure?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseMod} sx={userStyle.btncancel}>Cancel</Button>
                        <Button autoFocus variant="contained" color='error'
                            onClick={(e) => delMainpage(mainpageid)}
                        > OK </Button>
                    </DialogActions>
                </Dialog>

                {/* print layout */}

                <TableContainer component={Paper} sx={userStyle.printcls}>
                    <Table sx={{ minWidth: 700, }} aria-label="customized table" id="usertable" ref={componentRef}>
                        <TableHead>
                            <TableRow>
                                <TableCell> SI.No</TableCell>
                                <TableCell> Project</TableCell>
                                <TableCell> Sub project</TableCell>
                                <TableCell> Module </TableCell>
                                <TableCell> Submodule </TableCell>
                                <TableCell> Mainpage </TableCell>
                                <TableCell> Subpage-1 </TableCell>
                                <TableCell> Subpage-2 </TableCell>
                                <TableCell> Subpage-3 </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Estimation Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody align="left">
                            {subpagefours &&
                                (subpagefours.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{row.project}</TableCell>
                                        <TableCell>{row.subproject}</TableCell>
                                        <TableCell>{row.module}</TableCell>
                                        <TableCell>{row.submodule}</TableCell>
                                        <TableCell>{row.mainpage}</TableCell>
                                        <TableCell>{row.subpageone}</TableCell>
                                        <TableCell>{row.subpagetwo}</TableCell>
                                        <TableCell>{row.subpagethree}</TableCell>
                                        <TableCell>{row.estimation + " " + row.estimationtime}</TableCell>
                                    </TableRow>
                                )))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

           
            {/* view model */}
            <Dialog
                open={openview}
                onClose={handleClickOpenview}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"lg"}
            >
                <Box sx={{ width: "550px", padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.HeaderText}> View Page</Typography>
                        <br /> <br />
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">project</Typography>
                                    <Typography>{subid.project}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Subproject</Typography>
                                    <Typography>{subid.subproject}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6"> Module Name</Typography>
                                    <Typography>{subid.module}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Submodule</Typography>
                                    <Typography>{subid.submodule}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Mainpage</Typography>
                                    <Typography>{subid.mainpage}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">subpage1</Typography>
                                    <Typography>{subid.subpageone}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">subpage 2</Typography>
                                    <Typography>{subid.subpagetwo}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">subpage 3</Typography>
                                    <Typography>{subid.subpagethree}</Typography>
                                </FormControl>
                            </Grid>
                                <Grid item md={6} xs={12} sm={12} >
                                    <FormControl fullWidth size="small">
                                        <Typography variant="h6"> Estimation Time</Typography>
                                        <Typography>{subid.estimation + " " + subid.estimationtime}</Typography>
                                    </FormControl>
                                </Grid>
                             </Grid>
                        <br /> <br />  <br />
                        <Grid container spacing={2}>
                            <Button variant="contained" color="primary" onClick={handleCloseview}> Back </Button>
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
                maxWidth={"lg"}
            >
                <Box sx={{ width: '550px', padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.HeaderText}> Info </Typography>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">addedby</Typography><br/>
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
                                    <Typography variant="h6">Updated by</Typography><br/>
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
    );
}


export default Subpage4;