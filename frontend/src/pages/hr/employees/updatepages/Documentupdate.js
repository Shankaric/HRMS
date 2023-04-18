import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Dialog, MenuItem, Select, DialogContent, FormControl, OutlinedInput, DialogActions, Grid, Paper, Table, TableHead, TableContainer, Button, TableBody } from "@mui/material";
import { userStyle } from "../../../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../../../components/Table";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SERVICE } from '../../../../services/Baseservice';
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { Link } from "react-router-dom";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useReactToPrint } from "react-to-print";
import $ from "jquery";

function Documentedit() {
    const [employees, setEmployees] = useState([]);
    const [empaddform, setEmpaddform] = useState({
        username: "", password: "", companyname: "", empcode: "",
    });
    const [getrowid, setRowGetid] = useState("");
    const [exceldata, setexceldata] = useState([]);
    const [pages, setPages] = useState(1);
    const [entries, setEntries] = useState(1);
    const [search, setSearch] = useState()
    const [files, setFiles] = useState([]);
    let sno = 1;
    let printno = 1;

    const getCode = async (e) => {
        let res = await axios.get(`${SERVICE.USER_SINGLE}/${e}`, {
        })
        setEmpaddform(res.data.suser);
        setFiles(res.data.suser.files);
        setRowGetid(res.data.suser);
    }

    // console.log(files, 'fil')

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

    //Delete model
    const [isDeleteOpen, setisDeleteOpen] = useState(false);
    const handleCloseDel = () => {
        setisDeleteOpen(false);
    };

    //get all employees list details
    const fetchEmployee = async () => {
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

    //edit post call
    let logedit = getrowid._id;
    const sendRequestt = async () => {
        try {
            let res = await axios.put(`${SERVICE.USER_SINGLE_PWD}/${logedit}`, {
                companyname: String(empaddform.companyname),
                empcode: String(empaddform.empcode),
                location: String(empaddform.location),
                firstname: String(empaddform.firstname),
                lastname: String(empaddform.lastname),
                files: [...files]

            });
            setEmpaddform(res.data);
            handleCloseModEdit();
            setEmpaddform({
                username: "", password: "", companyname: "", empcode: "",
                firstname: "", lastname: "", remark: ""
            })

        } catch (err) {
            const messages = err.response.data.errorMessage;
            console.log(messages);
        }
    }

    const handleFileUpload = (event) => {
        const files = event.target.files;
        const reader = new FileReader();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFiles((prevFiles) => [
                    ...prevFiles,
                    { name: file.name, data: reader.result.split(',')[1], remark: '', },
                ]);
            };
        }
    };

    console.log(files, 'all')

    const handleFileDelete = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleRemarkChange = (index, remark) => {
        setFiles((prevFiles) =>
            prevFiles.map((file, i) => (i === index ? { ...file, remark } : file))
        );
    };


    const editSubmit = (e) => {
        e.preventDefault();
        sendRequestt();
    }


    
    //  PDF
    const columns = [

        { title: "Id", field: "empcode" },
        { title: "Username", field: "username" },
    ]

    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.autoTable({
            theme: "grid",
            columns: columns.map((col) => ({ ...col, dataKey: col.field })),
            body: employees,
        });
        doc.save("Documenteditlist.pdf");
    };

    // Excel
    const fileName = "DocumentEditlist";
    let excelno = 1;

    // get particular columns for export excel
    const getexcelDatas = async () => {
        let response = await axios.get(SERVICE.USER, {
            //  headers: {
            //      'Authorization': `Bearer ${auth.APIToken}`
            //  },
        });
        var data = response.data.users.map(t => ({
            Sno: excelno++, Empcode: t.empcode, Username: t.username
        }));
        setexceldata(data)
    }

    //print...
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Documenteditlist",
        pageStyle: "print",
    });


    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredData = employees.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    

    useEffect(() => {
        fetchEmployee();   
        getexcelDatas();    
    })

    let DocumentLength = employees.length;
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
            <Typography sx={userStyle.HeaderText}>Document Details</Typography>
            <br />
            <Box sx={userStyle.container}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography sx={userStyle.SubHeaderText}>Document details in Employees </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to="/addemployee" style={{ textDecoration: 'none', color: 'white', float: 'right' }}><Button variant="contained">ADD</Button></Link>
                    </Grid>
                </Grid>
                <br /><br />
                <Grid container sx={{ justifyContent: "center" }} >
                    <Grid >
                        {/* {isUserRoleCompare[0].excelsupplier && (
                                <> */}
                        <ExportCSV csvData={exceldata} fileName={fileName} />
                        {/* </>
                            )} */}
                        {/* {isUserRoleCompare[0].csvsupplier && (
                                <> */}
                        <ExportXL csvData={exceldata} fileName={fileName} />
                        {/* </>
                            )} */}
                        {/* {isUserRoleCompare[0].printsupplier && (
                                <> */}
                        <Button sx={userStyle.buttongrp} onClick={handleprint}>&ensp;<FaPrint />&ensp;Print&ensp;</Button>
                        {/* </>
                            )} */}
                        {/* {isUserRoleCompare[0].pdfsupplier && (
                                <> */}
                        <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
                        {/* </>
                            )} */}
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
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData &&
                                (filteredData.slice((pages * entries - entries < DocumentLength ? pages * entries - entries : 0),
                                    ((pages * entries - entries <= DocumentLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>{sno++}</StyledTableCell>
                                            <StyledTableCell>{row.empcode} </StyledTableCell>
                                            <StyledTableCell>{row.username}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Button variant="outlined" style={userStyle.actionbutton} onClick={() => {
                                                            handleClickOpenEdit();
                                                            getCode(row._id)
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
                    {(pages * entries - entries <= DocumentLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
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

            {/* Delete Modal */}
            <Box>
                {/* ALERT DIALOG */}
                <Dialog
                    open={isDeleteOpen}
                    onClose={handleCloseDel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
                        <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} />
                        <Typography variant="h5" sx={{ color: 'red', textAlign: 'center' }}>Are you sure?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDel} sx={userStyle.btncancel}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Box>
                {/* Edit DIALOG */}
                <Dialog
                    open={isEditOpen}
                    onClose={handleCloseModEdit}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Box sx={userStyle.container}>
                        <>
                            <Typography sx={userStyle.SubHeaderText}> Update Doument</Typography>
                            <br /><br /><br></br>
                            <Grid container spacing={2}>
                                <Grid item md={6} sm={12} xs={12}>
                                    <Typography>{(empaddform.firstname) + '.' + (empaddform.lastname)}</Typography>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <Typography>{empaddform.empcode}</Typography>
                                </Grid><br></br><br></br><br></br>
                                <Grid item md={6} sm={12} xs={12}>
                                    <Button variant="outlined" component="label">
                                        <CloudUploadIcon sx={{ fontSize: "21px" }} /> &ensp;Upload Documents
                                        <input hidden type="file" multiple onChange={handleFileUpload} />
                                    </Button>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Box >
                                        <Typography >  Document List </Typography>
                                        <br /><br />

                                        {/* ****** Table start ****** */}
                                        <TableContainer component={Paper} >
                                            <Table
                                                aria-label="simple table"
                                                id="branch"
                                            >
                                                <TableHead sx={{ fontWeight: "600" }}>
                                                    <StyledTableRow>
                                                        <StyledTableCell>SI.NO</StyledTableCell>
                                                        <StyledTableCell>Document</StyledTableCell>
                                                        <StyledTableCell>Remarks</StyledTableCell>
                                                        <StyledTableCell>View</StyledTableCell>
                                                        <StyledTableCell>Action</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {files &&
                                                        (files.map((file, index) => (
                                                            <StyledTableRow key={index}>
                                                                <StyledTableCell align="center">{sno++}</StyledTableCell>
                                                                <StyledTableCell align="left">{file.name}</StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                    <FormControl >
                                                                        <OutlinedInput
                                                                            sx={{ height: '30px !important', background: 'white', border: '1px solid rgb(0 0 0 / 48%)' }}
                                                                            size="small"
                                                                            type="text"
                                                                            value={file.remark}
                                                                            onChange={(event) =>
                                                                                handleRemarkChange(index, event.target.value)

                                                                            } />
                                                                    </FormControl>
                                                                </StyledTableCell>

                                                                <StyledTableCell component="th" scope="row" align="center" >

                                                                    <a style={{ color: "#357ae8" }}
                                                                        href={`data:application/octet-stream;base64,${file.data}`}
                                                                        download={file.name}
                                                                    >
                                                                        Download
                                                                    </a>
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                    <Button onClick={() => handleFileDelete(index)} variant="contained" size="small" sx={{ textTransform: "capitalize", minWidth: '0px' }}><DeleteIcon style={{ fontSize: '20px' }} /></Button>                                                               </StyledTableCell>
                                                            </StyledTableRow>
                                                        )))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Grid>
                                <br /></Grid>   <br />   <br />   <br />
                            <Grid container>

                                <Grid item md={1}></Grid>
                                <Button variant="contained" onClick={editSubmit} >Update</Button>
                                <Grid item md={1}></Grid>
                                <Button sx={userStyle.btncancel} onClick={handleCloseModEdit} >Cancel</Button>
                            </Grid>

                        </>
                    </Box>
                </Dialog>
            </Box>
            <Box>
                <Dialog
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
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Username</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {employees &&
                            (employees.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{printno++}</StyledTableCell>
                                    <StyledTableCell>{row.empcode} </StyledTableCell>
                                    <StyledTableCell>{row.username}</StyledTableCell>
                                </StyledTableRow>

                            )))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}


export default Documentedit;