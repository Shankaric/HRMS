

import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, TableBody,TableRow,TableCell,Select, MenuItem, Dialog, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button } from "@mui/material";
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


function Mainpage() {

    const [mainpage, setMainpage] = useState({
        project: "", subproject: "", module: "",submodule:"", name: "", estimation: "", estimationtime: ""
    });

    const [project, setProject] = useState([]);
    const [subProjectEdit, setSubProjectEdit] = useState([]);
    const [subproject, setSubProject] = useState([]);
    const [projectEdit, setProjectEdit] = useState([]);
    const [module, setModule] = useState([]);
    const [moduleEdit, setModuleEdit] = useState([]);
    const [submodule, setSubmodule] = useState([]);
    const [submoduleEdit, setSubmoduleEdit] = useState([]);
    const [mainid, setMainid] = useState({
        project: "", subproject: "", module: "", name: "",submodule:"", estimation: "", estimationtime: ""

    });
    const [mainpages, setMainpages] = useState([]);
    const [entries, setEntries] = useState(1);
    const [pages, setPages] = useState(1);
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
    const[subModulesList , setSubModulesList] = useState([]);


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

    // info model
    const [openInfo, setOpeninfo] = useState(false);

    const handleClickOpeninfo = () => {
        setOpeninfo(true);
    };

    const handleCloseinfo = () => {
        setOpeninfo(false);
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

    //Delete model
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleClickOpen = () => {
        setIsDeleteOpen(true);
    };
    const handleCloseMod = () => {
        setIsDeleteOpen(false);
    };

    const [deletemainpage, setDeletemainpage] = useState("");

    //set function to get particular row
    const rowData = async (id) => {
        try {
            let res = await axios.get(`${SERVICE.MAINPAGE_SINGLE}/${id}`, {
                // headers: {
                //     'Authorization': `Bearer ${auth.APIToken}`
                // }
            });
            setDeletemainpage(res.data.smains);
        } catch (err) {
            console.log(err.response.data.errorMessage)
        }
    }
     
    

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
    const fetchSubModulesEditList = async () => {
        try {
            let projectDrop = await axios.get(SERVICE.SUBMODULE);
          
            setSubModulesList(projectDrop.data.submodules);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const[projectnameg,getprojectnameg] = useState("");

    const[subprojectnone, setsubprojectnone] = useState("")
    //fetching sub-Project Dropdowns
    const fetchSubProjectnames = async (e) => {
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

    const [getprojectname, setgetprojectname] = useState("")

    const fetchSubProjectnamesedit = async () => {
        let projectName = getprojectname ? getprojectname : mainid.project
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
    const[projectnameeditg,getprojectnameeditg] = useState("");

    //fetching Module Dropdowns
    const fetchModulenames = async (e) => {
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
            fetchModulenames();
        }
    })

   
    const [getsubprojectname, setgetsubprojectname] = useState("")
    const[submoduleeditnone, setsubmoduleeditnone] = useState("")


    const fetchModulenamesedit = async () => {
        let subPro = getsubprojectname ? getsubprojectname : mainid.subproject
        try {
            let dropModule = await axios.get(SERVICE.MODULE);
            let modulelist = dropModule.data.modules.filter((data) => {
                // if (subPro === data.subproject) {
                    
                //     return data
                // }
                   
                if (subprojectnone == "None"  ? projectnameeditg == data.project : subPro === data.subproject) {
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
    const fetchSubModulenames= async (e) => {
        try {
            let drosubmod = await axios.get(SERVICE.SUBMODULE);
            let submodulelist = drosubmod.data.submodules.filter((data) => {
                if ( e === data.module) {
                    return data
                }

            })
            setSubmodule(submodulelist);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        if(submodule.length == 0){
            setsubmodulenone("None")
        }else{
            setsubmodulenone("Show")
        }
      
    })

    const [getmodulename , setgetmodulename] = useState("")

    const fetchSubModulenamesedit= async () => {
        let modu = getmodulename ? getmodulename : mainid.module
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

    useEffect(() => {
        if(submoduleEdit.length == 0){
            setsubmoduleeditnone("None")
        }else{
            setsubmoduleeditnone("Show")
        }
      
    })
    // Alert delete popup
    let mainpageid = deletemainpage._id;
    const delMainpage = async () => {
        try {
            await axios.delete(`${SERVICE.MAINPAGE_SINGLE}/${mainpageid}`, {
            });
            handleCloseMod();
        } catch (err) {
            console.log(err.response.data.errorMessage)
        }
    };
 
    //add function 
    const sendRequest = async () => {
        try {
            let mainpagescreate = await axios.post(SERVICE.MAINPAGE_CREATE, {
                // headers: {
                //     'Authorization':`Bearer ${auth.APIToken}`
                //     }
                project: String(mainpage.project),
                subproject: String(subprojectnone == "None" ? "None" : mainpage.subproject),
                module: String(mainpage.module),
                submodule: String(submodulenone.name == "None" ? "None" : mainpage.submodule),
                name: String(mainpage.name),
                estimation: String(mainpage.estimation),
                estimationtime: String(mainpage.estimationtime) ? mainpage.estimationtime : "Year",
                addedby: [
                     {
                        name: String(username),
                        date: String(new Date()),
                    },
                ],
            })
            setMainpage(mainpagescreate.data)
            setMainpage({ project: "", subproject: "", module: "", submodule: "", name: "", estimation: "", estimationtime: "" })
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
        if (mainpage.name === "") {
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

    let difference = [];
    let ans = 0;
    let timeDiffs = 0;

      //calculate time difference between the choosed projects
      const fetchTimeDiffCal = async (projName) => {
        try {

            let sub_proj_time = mainpages.map((data) => {
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
                    console.log(difference)

                    setTimeCalculation(ans);
                    setTimeCalculationEdit(ans)
                }
                else if ((projName != data.subproject)) {
                    setTimeCalculation(0);
                }

            })

            let project_check = submodule.map((value) => {
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
                }})
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
                    console.log(typeEstEditCheck, 'dfsdfsdfsd4')
                    console.log(typeEstEdit, 'bvfhsdfjhsdvfsdhfvhsdvfhdvshfvb')
                    console.log(result, '4')
                    SetFinalCheck(result)
                }
                else if (typCheck === "Year") {
                    let result = (Number(typeEstEditCheck) * 365)
                    console.log(result, '5')
                    SetFinalCheck(result)
                }
                else if (typCheck === "Days") {
                    let result = Number(typeEstEditCheck)
                    console.log(result, '6')
                    SetFinalCheck(result)
                }

            }
            else if (estEdiType === "Month") {
                if (typCheck === "Month") {
                    let result = Number(typeEstEditCheck)
                    console.log(result, '7')
                    SetFinalCheck(result)
                }
                else if (typCheck === "Year") {
                    let result = (Number(typeEstEditCheck) / 12)
                    console.log(result, '8')
                    SetFinalCheck(result)
                }
                else if (typCheck === "Days") {
                    let result = ((Number(typeEstEditCheck) / 12) * 365)
                    console.log(result, '9')
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

    //Local storage ....
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
        // console.log(res.data.sarea)
    }


    //get single row to edit....
    const getCode = async (e) => {
        let res = await axios.get(`${SERVICE.MAINPAGE_SINGLE}/${e}`, {
        })
        setMainid(res.data.smains);
        setRowGetid(res.data.smains);
        setRowEditTime(res.data.smains)
        setTypeEstEditCheck(res.data.smains.estimation);
        setTypeCheck(res.data.smains.estimationtime)
    }

    // get single row to view....
    const getviewCode = async (e) => {
        let res = await axios.get(`${SERVICE.MAINPAGE_SINGLE}/${e}`, {});
        setMainid(res.data.smains);
    };

    // get single row to view....
    const getinfoCode = async (e) => {
        let res = await axios.get(`${SERVICE.MAINPAGE_SINGLE}/${e}`, {});
        setMainid(res.data.smains);
    };

    let mainsid = getrowid._id;

    //mainpage updateby edit page...
    let updateby = mainid.updatedby;
    let addedby = mainid.addedby;

    //editing the single data...
    const sendEditRequest = async () => {
        try {
            let res = await axios.put(`${SERVICE.MAINPAGE_SINGLE}/${mainsid}`, {
                project: String(mainid.project),
                subproject: String(mainid.subproject),
                module: String(mainid.module),
                submodule: String(mainid.submodule),
                name: String(mainid.name),
                addedby: String(username),
                estimation: String(mainid.estimation),
                estimationtime: String(mainid.estimationtime),
                updatedby: [
                    ...updateby, {
                        name: String(username),
                        date: String(new Date()),
                    },
                ],
            });
            setMainid(res.data);
            handleCloseModEdit();
        } catch (err) {
            console.log(err.response.data.message)
        }
    }

    const editSubmit = (e) => {
        e.preventDefault();
        sendEditRequest();
    }

     
    let differenceEdit = [];
    let ansEdit=0;
    let timeDiffsEdit=0;
    
       //Edit Page Functionality for Estimation Time 
       const fetchEditEstTime = async ()=>{
        try{
            let sub_Project = editProjDropdwon ?  editProjDropdwon : rowEditTime.submodule;
   

            let sub_proj_time = mainpages.filter((data)=>{
    
                if(sub_Project === data.submodule){
              
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
                console.log(ansEdit)
                console.log(differenceEdit)
            }
            
            
            else if (sub_Project != data.submodule){
                setEditTimeCalculation(ansEdit);

            }
           
           })

           let project_check = subModulesList.map((value)=>{
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
                let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(2).toString().split('.');
                setConditionTiming(Number(rowEditTime.estimation) + ((rowEditTimeProj - editTimeCalculation) / 30))
                console.log(conditionTiming , '1' )
                setEditCalOverall(remaining[0] + " months " + remaining[1] + " days Remaining" )          
           }
           
           else if(estimatType === "Days"){
            let remaining =((rowEditTimeProj - editTimeCalculation)).toFixed(0).toString();
                setConditionTiming((Number(rowEditTime.estimation) * 30)  + ((rowEditTimeProj - editTimeCalculation)))
                console.log(conditionTiming , '2' )
                setEditCalOverall(remaining  + " days Remaining" )
           }
           
            else if(estimatType === "Year"){
            let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(2).toString().split('.');
            setConditionTiming(Number(rowEditTime.estimation)/12  + ((rowEditTimeProj - editTimeCalculation)/365))
            setEditCalOverall(remaining[0] + " months " + remaining[1] + " days Remaining" )
           }

        }

        else if(rowEditTime.estimationtime === "Days"){
            if(estimatType === "Month"){   
                let remaining =((rowEditTimeProj - editTimeCalculation)/ 25).toFixed(2).toString().split('.')
                let rem = ((rowEditTimeProj - editTimeCalculation)% 25).toFixed(2).toString().split('.')
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
            let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(2).toString().split('.');
            setConditionTiming(Number(rowEditTime.estimation)/365  + ((rowEditTimeProj - editTimeCalculation)/365))
            setEditCalOverall(remaining[0] + " months " + remaining[1] + " days Remaining" )
           }

        }

        else if(rowEditTime.estimationtime === "Year"){
            if(estimatType === "Month"){   
                let remaining =(((rowEditTimeProj - editTimeCalculation)/ 365)*12).toFixed(2).toString().split('.')
                setConditionTiming((Number(rowEditTime.estimation) * 12) + (((rowEditTimeProj - editTimeCalculation)/365)*12))
                setEditCalOverall(remaining[0] + " Months Remaining" )          
           }
           
           else if(estimatType === "Days"){
            let remaining =((rowEditTimeProj - editTimeCalculation)*365).toFixed(0).toString();
                setConditionTiming((Number(rowEditTime.estimation) * 365)  + ((rowEditTimeProj - editTimeCalculation)))
                setEditCalOverall(remaining  + " days Remaining" )
           }
           
            else if(estimatType === "Year"){
            let remaining =((rowEditTimeProj - editTimeCalculation)/365 ).toFixed(2).toString().split('.');
            setConditionTiming(Number(rowEditTime.estimation)  + ((rowEditTimeProj - editTimeCalculation)/365))
            setEditCalOverall(remaining[0]  + " years Remaining" )
           }

        }

    }

    //get all project.
    const fetchAllMainpage = async () => {
        try {
            let res_mainpage = await axios.get(SERVICE.MAINPAGE, {
            });
            setMainpages(res_mainpage.data.mains);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    }
    const modifiedData = mainpages.map((person) => ({
        ...person,
        estimateTime: person.estimation + ' ' + person.estimationtime,
      }));
    

    // pdf.....
    const columns = [
        { title: "Project", field: "project" },
        { title: "Subproject", field: "subproject" },
        { title: "Module", field: "module" },
        { title: "Submodule", field: "submodule" },
        { title: "Name", field: "name" },
        { title: "EstimateTime", field: "estimateTime" },
    ]

    const downloadPdf = () => {
        const doc = new jsPDF()
        doc.autoTable({
            theme: "grid",
            columns: columns.map(col => ({ ...col, dataKey: col.field })),
            body: modifiedData
        })
        doc.save('Main Page.pdf')
    }

    // Excel
    const fileName = "Main Page";

    const [mainpageData, setMainData] = useState([]);

    // get particular columns for export excel
    const getexcelDatas = async () => {
        let response = await axios.get(SERVICE.MAINPAGE, {
            //  headers: {
            //      'Authorization': `Bearer ${auth.APIToken}`
            //  },
        });
        var data = response.data.mains.map(t => ({
            "Project": t.project,
            "Subproject": t.subproject,
            "Module": t.module,
            "Submodule": t.submodule,
            "Name": t.name,
            "Estimation Time":t.estimation + " " + t.estimationtime

        }));
        setMainData(data);
    }

    //print...
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Main Page',
        pageStyle: 'print'
    });

    const [items, setItems] = useState([]);

    useEffect(
        () => {
          
            fetchTimeDiffCal();
            fetchCalculRemaining();
            getexcelDatas();
            getusername();
        }, []
    );

    useEffect(
        () => {
            fetchProjectDropdowns();  
            fetchAllMainpage();
            fetchSubProjectnamesedit();
            fetchModulenamesedit();
            fetchSubModulenamesedit();
            fetchEditEstTime();
            fetchEditEstimationType();
            fetchSubModulesEditList();
        }
    )
   
 

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
  
    const totalPages = Math.ceil(mainpages.length / pageSize);
  
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
            <Typography sx={userStyle.HeaderText}>Main Page </Typography>
            <Box sx={userStyle.container}>
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography sx={userStyle.importheadtext}>Manage Main Page</Typography>
                        </Grid>
                    </Grid><br />
                    <Grid container sx={{ justifyContent: "left" }} spacing={1}>
                        <Grid item md={4} xs={12} sm={12}>
                            <Typography>Project</Typography>
                            <FormControl size="small" fullWidth>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={mainpage.project}
                                    onChange={(e, i) => {
                                        setMainpage({ ...mainpage, project: e.target.value });
                                    }}
                                >{project &&
                                    project.map((row, index) => (
                                        <MenuItem value={row.name} key={index} onClick={()=> {fetchSubProjectnames(row.name); getprojectnameg(row.name);}}>
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
                                    value={mainpage.subproject}
                                    onChange={(e, i) => {
                                        setMainpage({ ...mainpage, subproject: e.target.value });
                                        fetchModulenames(e.target.value);
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
                                    value={mainpage.module}
                                    onChange={(e, i) => {
                                        setMainpage({ ...mainpage, module: e.target.value });
                                        
                                    }}
                                >{module &&
                                    module.map((row, index) => (
                                        <MenuItem value={row.name} key={index} onClick={() => {fetchSubModulenames(row.name) }}>
                                            {row.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        { submodulenone == "None" ? null :
                        <Grid item md={4} xs={12} sm={12}>
                            <Typography>Submodule</Typography>
                            <FormControl size="small" fullWidth>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={mainpage.submodule}
                                    onChange={(e, i) => {
                                        setMainpage({ ...mainpage, submodule: e.target.value });
                                        fetchTimeDiffCal(e.target.value)
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
                            <FormControl fullWidth size="small" >
                                <Typography>Name</Typography>
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={mainpage.name}
                                    onChange={(e) => { setMainpage({ ...mainpage, name: e.target.value }) }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12} sm={12} >
                            <Grid container>
                                <Grid item md={3} xs={1} sm={1}>
                                    <Typography>Estimation</Typography>
                                    <FormControl fullWidth size="small" >
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="number"
                                            value={mainpage.estimation }
                                            onChange={(e) => { setMainpage({ ...mainpage, estimation: Number(e.target.value) > typeEst ? "" : Number(e.target.value) }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={9} xs={11} sm={11} >
                                    <Typography> Time</Typography>
                                    <Select
                                        fullWidth
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={mainpage.estimationtime}
                                        onChange={(e) => { setMainpage({ ...mainpage, estimationtime: e.target.value });
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
                        {mainpage.estimationtime ?
                        <Typography sx={{ color: "red" }}> {typeEst} {mainpage.estimationtime} is Remaining </Typography> : " "}
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
                                <Typography sx={userStyle.importheadtext}>Manage Main Page </Typography>
                            </Grid><br />
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>project </Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={mainid.project}
                                            onChange={(e) => {
                                                setMainid({ ...mainid, project: e.target.value });
                                               

                                             
                                            }}
                                        >
                                            {projectEdit &&
                                                projectEdit.map((row,index) => (
                                                    <MenuItem value={row.name} onClick={() => {getprojectnameeditg(row.name); setgetprojectname(row.name);}}>{row.name} </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                { subprojecteditnone == "None" ? null :
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Subproject </Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="0demo-select-small"
                                            value={mainid.subproject}
                                            onChange={(e) => {
                                                setMainid({ ...mainid, subproject: e.target.value });
                                                setgetsubprojectname(e.target.value);
                                                // fetchModuleDropdowns(e.target.value);
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
                                    }
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Module </Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={mainid.module}
                                            onChange={(e) => {
                                                setMainid({ ...mainid, module: e.target.value });
                                            }}
                                        >
                                            {
                                                moduleEdit && moduleEdit.map((row) => {
                                                    return <MenuItem value={row.name} onClick={() => { setgetmodulename(row.name)}}>{row.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                { submoduleeditnone == "None" ? null :
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Submodule</Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={mainid.submodule}
                                            onChange={(e) => {
                                                setMainid({ ...mainid, submodule: e.target.value });
                                                setEditProjDropdown(e.target.value)
                                                //fetchMainPageDropdowns(e.target.value);
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
                                }
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Name</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={mainid.name}
                                            onChange={(e) => { setMainid({ ...mainid, name: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                <Grid container>
                                    <Grid item md={6} xs={6} sm={6}>
                                        <FormControl fullWidth size="small" >
                                            <Typography>Estimation</Typography>
                                            <OutlinedInput
                                                id="component-outlined"
                                                type="number"
                                                value={mainid.estimation}
                                                onChange={(e) => { setMainid({ ...mainid,
                                                    estimation: Number(e.target.value) > Number(conditionTiming) ? " " : Number(e.target.value)  }) }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={6} xs={6} sm={6} >
                                        <Typography>Time</Typography>
                                        <Select
                                            fullWidth
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={mainid.estimationtime}
                                            onChange={(e) => { setMainid({ ...mainid, estimationtime: e.target.value });
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
                                    <Typography sx={{color:"red"}}> {editCalOverall}</Typography>
                                </Grid>
                               
                                </Grid>
                                </Grid>
                                <br/>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Button variant="contained" onClick={editSubmit} >Update</Button>
                                </Grid>
                                <Grid item md={6} xs={6} sm={6}>
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
                        <Typography sx={userStyle.importheadtext}>Main Page List</Typography>
                    </Grid>
                    <Grid container sx={{ justifyContent: "center" }} >
                        <Grid >
                            {/* {isUserRoleCompare[0].excelsupplier && (
                                <> */}
                            <ExportCSV csvData={mainpageData} fileName={fileName} />
                            {/* </>
                            )} */}
                            {/* {isUserRoleCompare[0].csvsupplier && (
                                <> */}
                            <ExportXL csvData={mainpageData} fileName={fileName} />
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
                            <MenuItem value={(mainpages.length)}>All</MenuItem>
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
                                    <StyledTableCell onClick={() => handleSorting('name')}><Box sx={userStyle.tableheadstyle}><Box>Manigepage</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('name')}</Box></Box></StyledTableCell>
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
                                     )))  :   <StyledTableRow> <StyledTableCell colSpan={4} align="center">No Data Available</StyledTableCell> </StyledTableRow> }
                                     </TableBody>
                                   </Table>
                                 </TableContainer>
                                 <Box style={userStyle.dataTablestyle}>
                                   <Box>
                                       Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, mainpages.length)} of {mainpages.length} entries
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
                                <TableCell>Main page</TableCell>
                                <TableCell>Estimation Time</TableCell>
                              
                            </TableRow>
                        </TableHead>
                        <TableBody align="left">
                            {mainpages &&
                                (mainpages.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{row.project}</TableCell>
                                        <TableCell>{row.subproject}</TableCell>
                                        <TableCell>{row.module}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.submodule}</TableCell>
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
            >
                <Box sx={{ width: "550px", padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.HeaderText}> View Main Page</Typography>
                        <br /> <br />
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">project</Typography>
                                    <Typography>{mainid.project}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Subproject</Typography>
                                    <Typography>{mainid.subproject}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6"> Module Name</Typography>
                                    <Typography>{mainid.module}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Submodule Name</Typography>
                                    <Typography>{mainid.submodule}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6"> Name</Typography>
                                    <Typography>{mainid.name}</Typography>
                                </FormControl>

                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6"> Estimation Time</Typography>
                                    <Typography>{mainid.estimation + " " + mainid.estimationtime}</Typography>
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


export default Mainpage;