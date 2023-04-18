import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Dialog, OutlinedInput, DialogContent, MenuItem, FormControl, DialogActions, Grid, Select, Paper, Table, TableHead, TableContainer, Button, TableBody } from "@mui/material";
import { userStyle } from "../../../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../../../components/Table";
import EditIcon from '@mui/icons-material/Edit';
import { SERVICE } from '../../../../services/Baseservice';
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { Link } from "react-router-dom";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useReactToPrint } from "react-to-print";
import $ from "jquery";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function Editpage() {

    const [empaddform, setEmpaddform] = useState({
        prefix: "", firstname: "", lastname: "", empcode: "", branch: "", dop: "", doj: ""
    });

    const [branchNames, setBranchNames] = useState();
    const [getrowid, setRowGetid] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [pages, setPages] = useState(1);
    const [entries, setEntries] = useState(1);
    const [search, setSearch] = useState()

    let sno = 1;


    // view model
    const [openview, setOpenview] = useState(false);

    const handleClickOpenview = () => {
        setOpenview(true);
    };

    const handleCloseview = () => {
        setOpenview(false);
    };

    const getviewCode = async (e) => {
        let res = await axios.get(`${SERVICE.USER_SINGLE}/${e}`, {
        })
        setEmpaddform(res.data.suser);
    }


    // Branch Dropdowns
    const fetchbranchNames = async () => {
        try {
            let res_branch = await axios.get(
                SERVICE.BRANCH,
                {
                    // headers: {
                    //     'Authorization': `Bearer ${auth.APIToken}`
                    // },
                }
            );
            setBranchNames(res_branch.data.branch);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages);
        }
    };



    // Edit model
    const [isEditOpen, setIsEditOpen] = useState(false);
    const handleClickOpenEdit = () => {
        setIsEditOpen(true);
    };
    const handleCloseModEdit = (e, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setIsEditOpen(false);
    };

    const getCode = async (e) => {
        let res = await axios.get(`${SERVICE.USER_SINGLE}/${e}`, {
        })
        setEmpaddform(res.data.suser);
        setRowGetid(res.data.suser)
    }
    // Error Popup model
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [setShowAlert] = useState()
    const handleClickOpenerr = () => {
        setIsErrorOpen(true);
    };
    const handleCloseerr = () => {
        setIsErrorOpen(false);
    };


    //EDIT POST CALL
    let logedit = getrowid._id;
    const sendRequestt = async () => {
        try {
            let res = await axios.put(`${SERVICE.USER_SINGLE_PWD}/${logedit}`, {

                branch: String(empaddform.branch),
                doj: String(empaddform.doj),
                dot: String(empaddform.dot),
                empcode: String(empaddform.empcode),
            });
            setEmpaddform(res.data);
            handleCloseModEdit();
            setEmpaddform({
                prefix: "", firstname: "", lastname: "", empcode: "", branch: "", dop: "", doj: ""
            })

        } catch (err) {
            const messages = err.response.data.errorMessage;
            console.log(messages);
        }
    }

    const editSubmit = (e) => {
        e.preventDefault();
        sendRequestt();
    }

    //get all employees list details
    const fetchHandler = async () => {
        try {
            let res_employee = await axios.get(SERVICE.USER, {
            });
            setEmployees(res_employee.data.users);
        }
        catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (empaddform.code === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
                    <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter name"}</p>
                </>
            );
            handleClickOpenerr();
        } else if (empaddform.name === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
                    <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter Name"}</p>
                </>
            );
            handleClickOpenerr();
        }
        else {
            sendRequestt();
        }
    }
    useEffect(
        () => {
            fetchHandler();
            fetchbranchNames();
        })
    // let sno=1;
    let printno = 1;

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredData = employees.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    //  PDF
    const columns = [
        // { title: "SNo", field: "sno" },
       { title: "Name", field: "firstname"},
       { title: "Branch", field: "branch" },
       { title: "DOJ", field: "doj" },
       { title: "DOT", field: "dot" },
       { title: "EmpCode", field: "empcode" },

   ]


   const downloadPdf = () => {
       const doc = new jsPDF();
       doc.autoTable({
           theme: "grid",
           columns: columns.map((col) => ({ ...col, dataKey: col.field })),
           body: employees,
       });
       doc.save("users.pdf");
   };



   // Excel
   const fileName = "useredit";

   const [userData, setUserData] = useState([]);
   let excelno = 1;

   // get particular columns for export excel
   const getexcelDatas = async () => {
       let response = await axios.get(SERVICE.USER, {
           //  headers: {
           //      'Authorization': `Bearer ${auth.APIToken}`
           //  },
       });
       var data = response.data.users.map((t) => ({

           Sno:excelno++, name: t.firstname + t.lastname , branch:t.branch , doj:t.doj ,dot:t.dot , empcode :t.empcode,

       }));
       setUserData(data)
    }

   //print...
   const componentRef = useRef();
   const handleprint = useReactToPrint({
       content: () => componentRef.current,
       documentTitle: "User",
       pageStyle: "print",
   });

   useEffect(() => {
       getexcelDatas();
   })

    let JoiningLength = employees.length;
    useEffect(
        () => {
            selectPageHandler();
        }
    );

    const selectPageHandler = (selPage) => {
        if (selPage >= 1 && selPage <= (Math.ceil(employees.length / (Number(entries)))) && selPage !== pages)
            setPages(selPage)
    }


    return (
        <Box>
            {/* ****** Header Content ****** */}
            <Typography sx={userStyle.HeaderText}>Joining Update</Typography>
            <br />
            <Box sx={userStyle.container}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography sx={userStyle.SubHeaderText}>Joining Update List</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to="/addemployee" style={{ textDecoration: 'none', color: 'white', float: 'right' }}><Button variant="contained">ADD</Button></Link>
                    </Grid>
                </Grid>
                <br /><br />
                <Grid container sx={{ justifyContent: "center" }} >
                    <Grid >
                       
                        <ExportCSV csvData={userData} fileName={fileName} />
                       
                        <ExportXL csvData={userData} fileName={fileName} />
                       
                        <Button sx={userStyle.buttongrp} onClick={handleprint}>&ensp;<FaPrint />&ensp;Print&ensp;</Button>
                      
                        <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
                        
                    </Grid>
                </Grid><br />
                {/* added to the pagination grid */}
                <Grid container spacing={2}>
                    <Grid item md={1.5} sm={12} sx={12}>
                        <FormControl size="small" fullWidth>
                            <Typography>Show Entries</Typography>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={entries}
                                onChange={(e) => {
                                    setEntries(e.target.value);
                                }}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={(employees.length)}>All</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={7.5} sm={12} sx={12}></Grid>
                    <Grid item md={3} sm={12} sx={12}>
                        <FormControl fullWidth size="small" >
                            <Typography>Search</Typography>
                            <OutlinedInput
                                id="component-outlined"
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <br />
                {/* ****** Table Grid Container ****** */}
                <Grid container>
                    <Grid md={4} sm={2} xs={1}></Grid>
                    <Grid md={8} sm={10} xs={10} sx={{ align: "center" }}></Grid>
                </Grid>
                <br />
                {/* ****** Table start ****** */}
                <TableContainer component={Paper} >
                    <Table
                        aria-label="simple table"
                        id="branch"
                    // ref={tableRef}
                    >
                        <TableHead sx={{ fontWeight: "600" }}>
                            <StyledTableRow>
                                <StyledTableCell>SI.NO</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Branch</StyledTableCell>
                                <StyledTableCell>DOT</StyledTableCell>
                                <StyledTableCell>DOJ</StyledTableCell>
                                <StyledTableCell>Empcode</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData &&
                                (filteredData.slice((pages * entries - entries < JoiningLength ? pages * entries - entries : 0),
                                    ((pages * entries - entries <= JoiningLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>{sno++}</StyledTableCell>
                                            <StyledTableCell> {row.companyname}</StyledTableCell>
                                            <StyledTableCell>{row.branch}</StyledTableCell>
                                            <StyledTableCell>{row.dot}</StyledTableCell>
                                            <StyledTableCell>{row.doj}</StyledTableCell>
                                            <StyledTableCell>{row.empcode}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Button variant="outlined" style={userStyle.actionbutton} onClick={() => {

                                                            getCode(row._id); handleClickOpenEdit();
                                                        }}><EditIcon style={{ fontsize: '20px' }} />
                                                        </Button>

                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>
                                        </StyledTableRow>

                                    )))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid style={userStyle.dataTablestyle}>
                <Typography>Showing
                    {(pages * entries - entries <= JoiningLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                    {/* {(pages * entries - entries + 1)}  */}
                    to {(pages * entries) > employees.length ? employees.length : ((pages * entries))} of {employees.length} entries</Typography>
                {employees && <Typography className="Pagination">
                    <Button onClick={() => { selectPageHandler(pages - 1) }}>prev</Button>

                    {[...Array(Math.ceil(employees.length / Number(entries)))].map((_, i) => {
                        if (entries == 1) {
                            if (i <= 5) {
                                return <Button onClick={() => { selectPageHandler(i + 1) }}>{(i + 1)}</Button>
                            }
                        }
                        else {
                            return <Button onClick={() => { selectPageHandler(i + 1) }}>{i + 1}</Button>
                        }
                    })}

                    <Button onClick={() => { selectPageHandler(pages + 1) }}>Next</Button>
                </Typography>}
                </Grid>
            </Box><br />
            {/* ****** Table End ****** */}
            <Box>
                {/* Edit DIALOG */}
                <Dialog
                    open={isEditOpen}
                    onClose={handleCloseModEdit}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent sx={userStyle.dialogbox}>
                        <Box >
                            <form onSubmit={handleSubmit}>
                                <Box >

                                    <Typography sx={userStyle.SubHeaderText}> Update Employee Joining Date</Typography>

                                    <br /><br />
                                    <>
                                        <Grid container spacing={2}>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <Typography>{empaddform.prefix + "." + empaddform.firstname + empaddform.lastname}</Typography>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <Typography>{empaddform.empcode}</Typography>
                                            </Grid>
                                        </Grid><br></br><br></br>
                                        <Grid item xs={8}>
                                            <Typography sx={userStyle.importheadtext}>Joing Detail Update </Typography>
                                        </Grid><br /><br /><br />
                                        <Grid container spacing={2}>
                                            <Grid item md={6} sm={12} xs={12}>
                                                <FormControl fullWidth size="small" >
                                                    <Typography>Branch</Typography>
                                                    <Select
                                                        labelId="demo-select-small"
                                                        id="demo-select-small"
                                                        value={empaddform.branch}
                                                        onChange={(e, i) => {
                                                            setEmpaddform({ ...empaddform, branch: e.target.value });
                                                        }}
                                                    >
                                                        {branchNames &&
                                                            branchNames.map((row) => (
                                                                <MenuItem value={row.name}>{row.name}</MenuItem>
                                                            ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={6} sm={12} xs={12} >
                                                <FormControl fullWidth size="small">
                                                    <Typography>DOT</Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="date"
                                                        placeholder="DOT"
                                                        value={empaddform.dot}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, dot: e.target.value }) }}

                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={6} sm={12} xs={12}>
                                                <FormControl fullWidth size="small">
                                                    <Typography>DOJ</Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="date"
                                                        placeholder="DOJ"
                                                        value={empaddform.doj}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, doj: e.target.value }) }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={6} sm={12} xs={12}>
                                                <FormControl size="small" fullWidth>
                                                    <Typography>EmpCode <b style={{ color: "red" }}>*</b></Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="text"
                                                        disabled
                                                        placeholder="EmpCode"
                                                        value={empaddform.empcode}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, empcode: e.target.value }) }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </>
                                    <br /><br /><br /><br />
                                    <Grid container spacing={2} sx={{ textAlign: "center", justifyContent: "center", alignItems: 'center' }}>
                                        <Grid item md={1}></Grid>
                                        <Button variant="contained" onClick={editSubmit} >Update</Button>
                                        <Grid item md={1}></Grid>
                                        <Button sx={userStyle.btncancel} onClick={handleCloseModEdit} >Cancel</Button>
                                    </Grid>
                                </Box><br />

                                {/* ****** Table End ****** */}

                                <Box>
                                    <Dialog
                                        open={isErrorOpen}
                                        onClose={handleCloseerr}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
                                            <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} />
                                            <Typography variant="h6" ></Typography>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button variant="contained" color="error" >ok</Button>
                                        </DialogActions>
                                    </Dialog>
                                </Box>
                            </form>
                        </Box>
                    </DialogContent>
                </Dialog>
            </Box>
            <Box>
                <Dialog
                    open={isErrorOpen}
                    onClose={handleCloseerr}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" ></Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="error" >ok</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            {/* view model */}
            <Dialog
                open={openview}
                onClose={handleClickOpenview}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{ width: "450px", padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.HeaderText}>View Details</Typography>
                        <br /> <br />
                        <Grid container spacing={3}>
                            <Grid item md={6} sm={12} xs={12}>
                                <Typography>{empaddform.prefix + "." + empaddform.firstname + empaddform.lastname}</Typography>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                                <Typography>{empaddform.empcode}</Typography>
                            </Grid>
                        </Grid><br /><br /><br />
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography sx={userStyle.SubHeaderText}>Branch</Typography>
                                    <Typography>{empaddform.branch}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography sx={userStyle.SubHeaderText} >DOP</Typography>
                                    <Typography>{empaddform.dop}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography sx={userStyle.SubHeaderText} >DOJ</Typography>
                                    <Typography>{empaddform.doj}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography sx={userStyle.SubHeaderText}>EmpCode <b style={{ color: "red" }}>*</b></Typography>
                                    <Typography>{empaddform.empcode}</Typography>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br /> <br />  <br />
                        <Grid container spacing={2} sx={{ textAlign: "center", justifyContent: "center", alignItems: 'center' }}>
                            <Button variant="contained" color="primary" onClick={handleCloseview}> Back </Button>
                        </Grid>
                    </>
                </Box>
            </Dialog>
             {/* print layout */}
             <TableContainer component={Paper} sx={userStyle.printcls}>
                <Table
                    aria-label="simple table"
                    id="branch"
                    ref={componentRef}
                >
                    <TableHead sx={{ fontWeight: "600" }}>
                        <StyledTableRow>
                            <StyledTableCell>SI.NO</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Branch</StyledTableCell>
                            <StyledTableCell>DOJ</StyledTableCell>
                            <StyledTableCell>DOT</StyledTableCell>
                            <StyledTableCell>Empcode</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {employees &&
                            (employees.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{printno++}</StyledTableCell>
                                    <StyledTableCell> {row.firstname + " " + row.lastname}</StyledTableCell>
                                    <StyledTableCell>{row.branch}</StyledTableCell>
                                    <StyledTableCell>{row.doj}</StyledTableCell>
                                    <StyledTableCell>{row.dot}</StyledTableCell>
                                    <StyledTableCell>{row.empcode}</StyledTableCell>
                                </StyledTableRow>

                            )))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}


export default Editpage;