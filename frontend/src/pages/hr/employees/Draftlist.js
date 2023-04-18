import React, { useState, useEffect, useRef } from "react";
import { Box, Typography,  Dialog, DialogContent, DialogActions, Grid,  Paper, Table, TableHead, TableContainer, Button, TableBody } from "@mui/material";
import { userStyle } from "../../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../../components/Table";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SERVICE } from '../../../services/Baseservice';
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { Link } from "react-router-dom";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useReactToPrint } from "react-to-print";
import $ from "jquery";
function DraftList() {
    const [employees, setEmployees] = useState([]);
    const [deleteuser, setDeleteuser] = useState([]);
    const [exceldata, setexceldata] = useState([]);
    let sno=1;
    let printno=1;
    //Delete model
    const [isDeleteOpen, setisDeleteOpen] = useState(false);
    const handleClickOpendel = () => {
        setisDeleteOpen(true);
    };
    const handleCloseDel = () => {
        setisDeleteOpen(false);
    };
    // Alert delete popup
    let userid = deleteuser._id;
    const delAddemployee = async () => {
        try {
            await axios.delete(`${SERVICE.DRAFT_SINGLE}/${userid}`, {
            });
        } catch (err) {
            console.log(err.response.data.errorMessage)
        }
    };
    //set function to get particular row
    const rowData = async (id) => {
        try {
            let res = await axios.get(`${SERVICE.DRAFT_SINGLE}/${id}`, {
            });
            setDeleteuser(res.data.sdraft);
        } catch (err) {
            console.log(err.response.data.errorMessage)
        }
    }
    //get all employees list details
    const fetchEmployee = async () => {
        try {
            let res_employee = await axios.get(SERVICE.DRAFT, {
            });
            setEmployees(res_employee.data.drafts);
            // setMonth()
        }
        catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    }
    //jquery
    $.DataTable = require('datatables.net')
    const tableRef = useRef()
    //jquery
    useEffect(() => {
        $(document).ready(function () {
            $.fn.dataTable.ext.errMode = 'none';
            setTimeout(function () {
                $(tableRef.current).DataTable({
                    language: { search: '', searchPlaceholder: "Search..." },
                    lengthMenu: [
                        [1, 5, 10, 25, 50, 100, 200, 500, -1],
                        [1, 5, 10, 25, 50, 100, 200, 500, "All"],
                    ],
                });
            }, 1000);
        });
    })
    //  PDF
    const columns = [
       
        { title: "Id", field: "empcode" },
        { title: "Employee Name", field: "firstname" },
        { title: "Username", field: "username" },
        { title: "Email", field: "email" },
    ]
    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.autoTable({
            theme: "grid",
            columns: columns.map((col) => ({ ...col, dataKey: col.field })),
            body: employees,
        });
        doc.save("Employeelist.pdf");
    };
    // Excel
    const fileName = "List";
    let excelno = 1;
    // get particular columns for export excel
    const getexcelDatas = async () => {
        let response = await axios.get(SERVICE.USER, {});
        var data = response.data.users.map(t => ({Sno:excelno++,Empcode:t.empcode,Username:t.username,Firstname:t.firstname,Lastname:t.lastname,Legalname:t.legalname,Fathername:t.fathername,
            Mothername:t.mothername,Gender:t.gender,maritalstatus:t.maritalstatus,dob:t.dob,bloodgroup:t.bloodgroup,location:t.location,email:t.email,contactpersonal:t.contactpersonal,
            contactfamily:t.contactfamily,emergencyno:t.emergencyno,doj:t.doj,dot:t.dot,referencename:t.name,contactno:t.contactno,details:t.details,companyname:t.companyname,
            pdoorno:t.pdoorno,pstreet:t.pstreet,parea:t.parea,plandmark:t.plandmark,ptaluk:t.ptaluk,ppincode:t.ppincode,pcountry:t.pcountry,pstate:t.pstate,pcity:t.pcity,
            cdoorno:t.cdoorno,cstreet:t.cstreet,carea:t.carea,clandmark:t.clandmark,ctaluk:t.ctaluk,cpost:t.cpost,cpincode:t.cpincode,ccountry:t.ccountry,cstate:t.cstate,
            ccity:t.ccity,branch:t.branch,floor:t.floor,department:t.department,team:t.team,designation:t.designation,shifttiming:t.shifttiming,reportingto:t.reportingto,
        }));
        setexceldata(data)
    }
    //print...
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Employeelist",
        pageStyle: "print",
    });
    useEffect(() => {
        fetchEmployee();
        getexcelDatas();
    })
    return (
        <Box>
            {/* ****** Header Content ****** */}
            <Typography sx={userStyle.HeaderText}>Draft List</Typography>
            <br />
            <Box sx={userStyle.container}>
            <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography sx={userStyle.SubHeaderText}>Draft List</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to="/addemployee" style={{ textDecoration: 'none', color: 'white', float:'right' }}><Button variant="contained">ADD</Button></Link>
                    </Grid>
                </Grid>
                <br /><br />
                <Grid container sx={{ justifyContent: "center" }} >
                    <Grid >
                     
                        <ExportCSV csvData={exceldata} fileName={fileName}/>
                     
                        <ExportXL csvData={exceldata} fileName={fileName} />
                       
                        <Button sx={userStyle.buttongrp} onClick={handleprint}>&ensp;<FaPrint />&ensp;Print&ensp;</Button>
                      
                        <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
                       
                    </Grid>
                </Grid><br />
                {/* ****** Table start ****** */}
                <TableContainer component={Paper} >
                    <Table
                        aria-label="simple table"
                        id="branch"
                        ref={tableRef}
                    >
                        <TableHead sx={{ fontWeight: "600" }}>
                            <StyledTableRow>
                                <StyledTableCell>SI.NO</StyledTableCell>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Employee Name</StyledTableCell>
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Months</StyledTableCell>
                                <StyledTableCell>DOJ</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {employees &&
                                (employees.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{sno++}</StyledTableCell>
                                    <StyledTableCell>{row.empcode} </StyledTableCell>
                                    <StyledTableCell> {row.firstname +" "+ row.lastname}</StyledTableCell>
                                    <StyledTableCell>{row.username}</StyledTableCell>
                                    <StyledTableCell>{row.email}</StyledTableCell>
                                    <StyledTableCell>{  
                                    (Math.round((new Date().getTime()-new Date(row.doj).getTime())/(1000 * 60 * 60 * 24 * 30.44))) > 0 ? 
                                    (Math.round((new Date().getTime()-new Date(row.doj).getTime())/(1000 * 60 * 60 * 24 * 30.44))) : 0
                                    }</StyledTableCell>
                                  
                                    <StyledTableCell>{row.doj}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <Link to={`/edit/${row._id}`}>
                                                        <Button variant="outlined"  size="small" style={userStyle.actionbutton} >
                                                            <EditIcon style={{ fontSize: '20px' }} />
                                                    </Button>
                                                    </Link>
                                                </Grid>
                                                <Grid item>
                                                     <Button size="small" variant="outlined" style={userStyle.actionbutton} onClick={(e) => { handleClickOpendel(); rowData(row._id) }}><DeleteIcon style={{ fontSize: '20px' }}/></Button>
                                                </Grid>
                                                <Grid item>
                                                <Link to={`/view/${row._id}`} style={{ textDecoration: 'none', color: '#fff'}}>
                                                    <Button  size="small" variant="outlined" style={userStyle.actionbutton} ><VisibilityIcon style={{ fontSize: '20px' }} /></Button>
                                                </Link>
                                                </Grid>
                                            </Grid>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
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
                        <Button onClick={(e) => { delAddemployee(userid); handleCloseDel() }} autoFocus variant="contained" color='error'> OK </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <Box>
                <Dialog
                    // open={isErrorOpen}
                    // onClose={handleCloseerr}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
                        {/* <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} /> */}
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
                            <StyledTableCell>Employee Name</StyledTableCell>
                            <StyledTableCell>Username</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {employees &&
                            (employees.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{printno++}</StyledTableCell>
                                    <StyledTableCell>{row.empcode} </StyledTableCell>
                                    <StyledTableCell> {row.firstname +" "+ row.lastname}</StyledTableCell>
                                    <StyledTableCell>{row.username}</StyledTableCell>
                                    <StyledTableCell>{row.email}</StyledTableCell>
                                </StyledTableRow>
                            )))}
                    </TableBody>
                </Table>
            </TableContainer>
       
        </Box>
    );
}
export default DraftList;