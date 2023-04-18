
// export default Subproject;
import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, TableBody,TableRow, TableCell,Select, MenuItem, Dialog, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button } from "@mui/material";
import { userStyle } from "../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import FormControlLabel from '@mui/material/FormControlLabel';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';
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


function Subproject() {

    const [subproject, setSubproject] = useState({
        project: "", name: "", estimation: "", estimationtime: ""
    });

    const [subprojid, setSubprojid] = useState({ project: "", name: "", estimation: "", estimationtime: "" })
    const [subprojects, setSubprojects] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [checkvalue, setCheckvalue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [username, setUsername] = useState("");
    const[timeDiffCal , setTimeDiffCal] = useState("");
    const[timeCalculation , setTimeCalculation] = useState("");
    const[rowEditTime , setRowEditTime] = useState("");
    const[rowEditTimeProj , setRowEditTimeProj] = useState("");
    const[editTimeCalculation , setEditTimeCalculation] = useState("");
    const[editCalOverall , setEditCalOverall] = useState("");
    const[getEstitype , setGetEstiType] = useState("");
    const[conditionTiming , setConditionTiming] = useState("");
    const[typeEst , setTypeEst] = useState("");
    const[editProjDropdwon , setEditProjDropdown] = useState("");
    //Datatable
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        if (event.target.checked) {
            setCheckvalue(event.target.value);
        }
    };

    const userData = {
        name: username,
        date: new Date(),
    };

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

    //Delete model
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleClickOpen = () => {
        setIsDeleteOpen(true);
    };
    const handleCloseMod = () => {
        setIsDeleteOpen(false);
    };

    const [deletesubproject, setDeletesubproject] = useState("");

    //set function to get particular row
    const rowData = async (id) => {
        try {
            let res = await axios.get(`${SERVICE.SUBPROJECT_SINGLE}/${id}`, {
                // headers: {
                //     'Authorization': `Bearer ${auth.APIToken}`
                // }
            });
            setDeletesubproject(res.data.ssubprojects);
        } catch (err) {
        }
    }

    // Alert delete popup
    let subprojectid = deletesubproject._id;
    const delSubproject = async () => {
        try {
            await axios.delete(`${SERVICE.SUBPROJECT_SINGLE}/${subprojectid}`, {
                // headers: {
                //     'Authorization': `Bearer ${auth.APIToken}`
                // }
            });
            handleCloseMod();
        } catch (err) {
        }
    };


    //To get the project details
    const fetchProjects = async () => {
        try {
            let subp = await axios.get(SERVICE.PROJECT);
            setProjects(subp.data.projects);
            
        } catch (error) {
            console.log(error.response.data.errorMessage)
        }
    };


    //add function 
    const sendRequest = async () => {
        try {
            let subprojectscreate = await axios.post(SERVICE.SUBPROJECT_CREATE, {
                // headers: {
                //     'Authorization':`Bearer ${auth.APIToken}`
                //     }
                project: String(subproject.project),
                name: String(isChecked ? checkvalue : subproject.name),
                estimation: String(subproject.estimation),
                estimationtime: String(subproject.estimationtime),
                addedby: [
                    {
                        name: String(username),
                        date: String(new Date()),
                    },
                ],
                // updatedby: String(localStorage.LoginUserId),
            })
            setSubproject(subprojectscreate.data)
            setSubproject({ project: "", name: "", estimation: "", estimationtime: "" })
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
        if (subproject.project === "" ) {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
                    <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please Choose Project"}</p>
                </>
            );
            handleClickOpenerr();
        }else if (subproject.name === "" ) {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
                    <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter Name"}</p>
                </>
            );
            handleClickOpenerr();
        }else  if (subproject.estimation == "" && subproject.estimationtime =="") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
                    <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please Enter Estimatio Time"}</p>
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

     // info model
     const [openInfo, setOpeninfo] = useState(false);

     const handleClickOpeninfo = () => {
         setOpeninfo(true);
     };
 
     const handleCloseinfo = () => {
         setOpeninfo(false);
     };


    //id for login...
    const [aid, setAid] = useState([]);
    let loginid = localStorage.LoginUserId;


    //get single row to edit....
    const getCodea = async () => {
        try {
            let res = await axios.get(`${SERVICE.SUBPROJECT_SINGLE}/${loginid}`, {
            })
            setAid(res.data.ssubprojects)
        }
        catch (err) {
            console.log(err.response.data.errormessage)
        }
   
    }


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
        let res = await axios.get(`${SERVICE.SUBPROJECT_SINGLE}/${e}`, {});
        setSubprojid(res.data.ssubprojects);
        setRowEditTime(res.data.ssubprojects)
    }

   
    // get single row to view....
    const getviewCode = async (e) => {
        let res = await axios.get(`${SERVICE.SUBPROJECT_SINGLE}/${e}`, {});
        setSubprojid(res.data.ssubprojects);
    };
       // get single row to view....
       const getinfoCode = async (e) => {
        let res = await axios.get(`${SERVICE.SUBPROJECT_SINGLE}/${e}`, {});
        setSubprojid(res.data.ssubprojects);
    };


       //Project updateby edit page...
       let updateby = subprojid.updatedby;
       let addedby = subprojid.addedby;


    let subprojectsid = subprojid._id;

    //editing the single data...
    const sendEditRequest = async () => {
        try {
            let res = await axios.put(`${SERVICE.SUBPROJECT_SINGLE}/${subprojectsid}`, {
                project: String(subprojid.project),
                name: String(isChecked ? checkvalue : subprojid.name),
                estimation: String(subprojid.estimation),
                estimationtime: String(subprojid.estimationtime),
                updatedby: [
                    ...updateby, {
                        name: String(username),
                        date: String(new Date()),
                    },
                ],
            });
            setSubprojid(res.data);

            handleCloseModEdit();
        } catch (err) {
            console.log(err.response.data)
        }
    }

    const editSubmit = (e) => {
        e.preventDefault();
        sendEditRequest();
    }
    //get all Sub projects.
    const fetchAllSubproject = async () => {
        try {
            let res_subproject = await axios.get(SERVICE.SUBPROJECT, {
            });
            setSubprojects(res_subproject.data.subprojects);
            //setTimeDiffCal(res_subproject.data.subprojects);
        } catch (err) {
            const messages = err.response.data.message;
           
        }
    }

    let difference = [];
    let differenceEdit = [];
    let ans =0;
    let ansEdit=0;
    let timeDiffs=0;
        //calculate time difference between the choosed projects
        const fetchTimeDiffCal = async (projName)=>{
            try{

                
                let sub_proj_time = subprojects.filter((data)=>{
                if(projName === data.project){
                  
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
                }
             
               })

               let project_check = projects.map((value)=>{
                 if(projName === value.name){
                    if(value.estimationtime === "Month"){
                    timeDiffs = ((Number(value.estimation) /12) * 365) ;
                        setTimeDiffCal(timeDiffs)

                    }
                    else if(value.estimationtime === "Year"){
                  timeDiffs = Number(value.estimation) * 365 ;
                        setTimeDiffCal( timeDiffs)

                    }
                    else if(value.estimationtime === "Days"){
                        setTimeDiffCal(Number(value.estimation))
                    }
                }           
               })
            }
            catch (error) {
                console.log(error.response.data)
            }
        }

        const fetchCalculRemaining = (estType) => {
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

       //Edit Page Functionality for Estimation Time 
    
       const fetchEditEstTime = () => {
        try{
            let sub_Project = editProjDropdwon ?  editProjDropdwon : rowEditTime.project;
          
            let sub_proj_time = subprojects.filter((data)=>{
    
                if(sub_Project === data.project){
              
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
            
            
            else if (sub_Project != data.project){
                setEditTimeCalculation(ansEdit);

            }
           
           })

           let project_check = projects.map((value)=>{
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
       

    const fetchEditEstimationType = () =>{

        let estimatType = getEstitype ? getEstitype : rowEditTime.estimationtime
        if(rowEditTime.estimationtime === "Month"){
            if(estimatType === "Month"){   
                let remaining =((rowEditTimeProj - editTimeCalculation) / 30 ).toFixed(0).toString().split('.');
                setConditionTiming(Number(rowEditTime.estimation) + ((rowEditTimeProj - editTimeCalculation) / 30))
                console.log(conditionTiming , '1' )
                setEditCalOverall(remaining[0] + " months " )          
           }
           
           else if(estimatType === "Days"){
            let remaining =((rowEditTimeProj - editTimeCalculation)).toFixed(0).toString();
                setConditionTiming((Number(rowEditTime.estimation) * 30)  + ((rowEditTimeProj - editTimeCalculation)))
                console.log(conditionTiming , '2' )
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

    const modifiedData = subprojects.map((person) => ({
        ...person,
        estimateTime: person.estimation + ' ' + person.estimationtime,
      }));

      // pdf.....
    const columns = [
        { title: "Project", field: "project" },
        { title: "Name", field: "name" },
        { title: "EstimationTime", field: "estimateTime" },
    ]

    const downloadPdf = () => {
        const doc = new jsPDF()
        doc.autoTable({
            theme: "grid",
            columns: columns.map(col => ({ ...col, dataKey: col.field })),
            body: modifiedData
        })
        doc.save('subproject.pdf')
    }

    // Excel
    const fileName = "subproject";

    const [subprojectData, setSubprojectData] = useState([]);

    // get particular columns for export excel 
    const getexcelDatas = async () => {
        let response = await axios.get(SERVICE.SUBPROJECT, {
            //  headers: {
            //      'Authorization': `Bearer ${auth.APIToken}`
            //  },
        });
        var data = response.data.subprojects.map((t,index) => ({
            "SNO":index+1,"Project": t.project, "Name": t.name, "Estimation Time": t.estimation + " " + t.estimationtime,

        }));
        setSubprojectData(data);
    }

    //print...
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Sub Project',
        pageStyle: 'print'
    });

    useEffect(
        () => {       
            getCodea();
            getusername();         
            getexcelDatas();
        },[]
    );

    useEffect(
        () => {  
            fetchTimeDiffCal();
            fetchCalculRemaining();    
            fetchProjects();        
            fetchEditEstTime();
            fetchEditEstimationType();
            fetchAllSubproject();     
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
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredDatas = items.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredData = filteredDatas.slice((page - 1) * pageSize, page * pageSize);

  const totalPages = Math.ceil(subprojects.length / pageSize);

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
            <Typography sx={userStyle.HeaderText}>Sub Project </Typography>
            <Box sx={userStyle.container}>
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography sx={userStyle.importheadtext}>Manage Sub Project</Typography>
                        </Grid>
                    </Grid><br />
                    <Grid container sx={{ justifyContent: "left" }} spacing={2}>
                        <Grid item md={3} xs={12} sm={12}>
                            <Typography>Project</Typography>
                            <FormControl size="small" fullWidth>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={subproject.project}
                                    onChange={(e, i) => {
                                        setSubproject({ ...subproject, project: e.target.value });
                                        fetchTimeDiffCal(e.target.value);
                                    }}
                                >{projects &&
                                    projects.map((row, index) => (
                                        <MenuItem value={row.name} key={index}>
                                            {row.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography>Subproject Name</Typography>
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={isChecked ? "" : subproject.name}
                                    onChange={(e) => { setSubproject({ ...subproject, name: e.target.value }) }}
                                />
                            </FormControl>
                        </Grid>
                        {/* <Grid item md={3} xs={12} sm={12}>
                            <Typography>Choose if No subproject</Typography>
                            <FormControlLabel
                                value="None"
                                control={<Checkbox checked={isChecked}
                                    onChange={handleCheckboxChange} />}
                                label="None"
                                labelPlacement="end"
                            />
                         </Grid> */}
                    </Grid>
                        <Grid container>
                            <Grid item md={1} xs={2} sm={2}>
                                <Typography>Estimation</Typography>
                                <FormControl fullWidth size="small" >
                                    <OutlinedInput
                                        id="component-outlined"
                                        type="text"
                                        value={subproject.estimation }
                                        onChange={(e) => { setSubproject({ ...subproject, estimation:  Number(e.target.value) > typeEst ? "" : Number(e.target.value) }) }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={2} xs={10} sm={10}>
                            <Typography>Time </Typography>
                                <Select
                                    fullWidth
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={subproject.estimationtime}
                                    onChange={(e) => { setSubproject({ ...subproject, estimationtime: e.target.value }) ;
                                fetchCalculRemaining(e.target.value)}}
                                >
                                    <MenuItem value="Days"> {"Days"} </MenuItem>
                                    <MenuItem value="Month"> {"Month"} </MenuItem>
                                    <MenuItem value="Year"> {"Year"} </MenuItem>
                                </Select>
                                </Grid>
                            </Grid>
                            <Typography sx={{color:"red"}}>{typeEst} {subproject.estimationtime} is Remaining</Typography>
                  
                    <Grid item xs={12} sm={6} md={2} lg={2} marginTop={3}>
                        <Button variant='contained' color='primary' sx={{ display: "flex" }} onClick={handleSubmit}>Create New</Button>
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
                >
                    <Box sx={userStyle.dialogbox}>
                        <>
                        <form onSubmit={editSubmit}>
                        <DialogContent sx={{width:'550px', padding:'20px'}}>
                            <Grid container spacing={2}>
                                <Typography sx={userStyle.importheadtext}>Manage Sub Project</Typography>
                            </Grid><br />
                            <Grid container spacing={2}>
                                <Grid item md={12} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Project</Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={subprojid.project}
                                            onChange={(e, i) => {
                                                setSubprojid({ ...subprojid, project: e.target.value });
                                                setEditProjDropdown(e.target.value)
                                                
                                            }}
                                        >
                                            {projects &&
                                                projects.map((row,index) => (
                                                    <MenuItem value={row.name} key={index}>{row.name}</MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={12} xs={12} sm={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Name</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={subprojid.name}
                                            onChange={(e) => { setSubprojid({ ...subprojid, name: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid><br /><br />
                            <Grid container>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Typography>Estimation</Typography>
                                    <FormControl fullWidth size="small" >
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={subprojid.estimation}
                                            onChange={(e) => { setSubprojid({ ...subprojid, 
                                                estimation: Number(e.target.value) > Number(conditionTiming) ? " " : Number(e.target.value) }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Typography>Estimation Time</Typography>
                                    <Select
                                        fullWidth
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={subprojid.estimationtime}
                                        onChange={(e) => { setSubprojid({ ...subprojid, estimationtime: e.target.value });
                                        setGetEstiType(e.target.value)
                                    }}
                                    >
                                        <MenuItem value="Days"> {"Days"} </MenuItem>
                                        <MenuItem value="Month"> {"Month"} </MenuItem>
                                        <MenuItem value="Year"> {"Year"} </MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                            <Typography sx={{color:"red"}}> {editCalOverall}</Typography>
                            <br /><br />
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Button variant="contained"type="submit">Update</Button>
                                </Grid>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Button sx={userStyle.btncancel} onClick={handleCloseModEdit} >Cancel</Button>
                                </Grid>
                            </Grid>
                            </DialogContent>
                            </form>
                        </>
                    </Box>
                </Dialog>
            </Box>
            <br />
            {/* ****** Table Start ****** */}
            <>
                <Box sx={userStyle.container}>
                    { /* ******************************************************EXPORT Buttons****************************************************** */}
                    <Grid item xs={8}>
                        <Typography sx={userStyle.importheadtext}>Sub Project List</Typography>
                    </Grid>
                    <Grid container sx={{ justifyContent: "center" }} >
                        <Grid >
                            {/* {isUserRoleCompare[0].excelsupplier && (
                                <> */}
                            <ExportCSV csvData={subprojectData} fileName={fileName} />
                            {/* </>
                            )} */}
                            {/* {isUserRoleCompare[0].csvsupplier && (
                                <> */}
                            <ExportXL csvData={subprojectData} fileName={fileName} />
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
                                <MenuItem value={(subprojects.length)}>All</MenuItem>
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
                    <br /><br />
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
                                <StyledTableCell onClick={() => handleSorting('name')}><Box sx={userStyle.tableheadstyle}><Box>Subproject Time</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('name')}</Box></Box></StyledTableCell>
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
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.estimateTime}</StyledTableCell>
                                <StyledTableCell component="th" scope="row" colSpan={1}>
                                    <Grid sx={{ display: 'flex' }}>
                                        <Button sx={userStyle.buttonedit} onClick={() => {
                                            handleClickOpenEdit();
                                            getCode(row._id)
                                        }}><EditOutlinedIcon style={{ fontsize: 'large' }} /></Button>

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
                             )))  :   <StyledTableRow> <StyledTableCell colSpan={5} align="center">No Data Available</StyledTableCell> </StyledTableRow> }
                       </TableBody>
                  </Table>
                 </TableContainer>
                <Box style={userStyle.dataTablestyle}>
                    <Box>
                        Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, subprojects.length)} of {subprojects.length} entries
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
                            onClick={(e) => delSubproject(subprojectid)}
                        > OK </Button>
                    </DialogActions>
                </Dialog>

                     {/* this is info view details */}

            <Dialog
                open={openInfo}
                onClose={handleCloseinfo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={'lg'}
            >
                <Box sx={{ width: '550px', padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.HeaderText}> Project Activity log</Typography>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Added By</Typography><br/>
                                    <Table>
                                            <TableHead>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}>{"SNO"}.</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {"UserName"}</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {"Date"}</StyledTableCell>
                                            </TableHead>
                                            <TableBody>
                                            {addedby?.map((item, i) => (
                                                <StyledTableRow key={i}>
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
                                                <StyledTableRow key={i}>
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

                {/* print layout */}

                <TableContainer component={Paper} sx={userStyle.printcls}>
                    <Table sx={{ minWidth: 700, }} aria-label="customized table" id="usertable" ref={componentRef}>
                        <TableHead>
                            <TableRow>
                                <TableCell> SI.No</TableCell>
                                <TableCell> Project</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Estimation Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody align="left">
                            {subprojects &&
                                (subprojects.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{row.project}</TableCell>
                                        <TableCell>{row.name}</TableCell>
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
                maxWidth="lg"
            >
                <Box sx={{ width: "550px", padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.HeaderText}> View Sub Project</Typography>
                        <br /> <br />
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6"> Project Name</Typography>
                                    <Typography>{subprojid.project}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={12} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6"> Name</Typography>
                                    <Typography>{subprojid.name}</Typography>
                                </FormControl>
                            </Grid>
                           
                            <Grid item md={12} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Estimation Time</Typography>
                                    <Typography>{subprojid.estimation + " " +subprojid.estimationtime}</Typography>
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


export default Subproject;