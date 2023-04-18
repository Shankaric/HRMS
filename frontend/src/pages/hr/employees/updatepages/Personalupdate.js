import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Dialog, MenuItem, OutlinedInput, Checkbox, DialogContent, FormControl, DialogActions, Grid, Select, Paper, Table, TableHead, TableContainer, Button, TableBody } from "@mui/material";
import { userStyle } from "../../../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../../../components/Table";
import FormControlLabel from '@mui/material/FormControlLabel';
import EditIcon from '@mui/icons-material/Edit';
import { SERVICE } from '../../../../services/Baseservice';
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
// import { Link } from "react-router-dom";
import Selects from 'react-select';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useReactToPrint } from "react-to-print";
import $ from "jquery";
import { Country, State, City } from "country-state-city";


function Personalupdate() {

    //SELECT DROPDOWN STYLES
    const colourStyles = {
        menuList: styles => ({
            ...styles,
            background: 'white'
        }),
        option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            // color:'black',
            color: isFocused
                ? 'rgb(255 255 255, 0.5)'
                : isSelected
                    ? 'white'
                    : 'black',
            background: isFocused
                ? 'rgb(25 118 210, 0.7)'
                : isSelected
                    ? 'rgb(25 118 210, 0.5)'
                    : null,
            zIndex: 1
        }),
        menu: base => ({
            ...base,
            zIndex: 100
        })
    }

    const [empaddform, setEmpaddform] = useState({
        prefix: "", firstname: "", lastname: "", legalname: "", fathername: "", mothername: "", gender: "", maritalstatus: "", dob: "", bloodgroup: "", pdoorno: "",
        pstreet: "", parea: "", plandmark: "", ptaluk: "", ppost: "", ppincode: "", pcountry: "", pstate: "", pcity: "", cdoorno: "", cstreet: "", carea: "", clandmark: "", ctaluk: "", cpost: "", cpincode: "", ccountry: "", cstate: "", ccity: "", empcode: ""
    });

    // Country city state datas
    const [selectedCountryp, setSelectedCountryp] = useState({ label: "India", name: 'India' });
    const [selectedStatep, setSelectedStatep] = useState({ label: "Tamil Nadu", name: 'Tamil Nadu' });
    const [selectedCityp, setSelectedCityp] = useState({ label: "Tiruchirapalli", name: 'Tiruchirapalli' });

    const [selectedCountryc, setSelectedCountryc] = useState({ label: "India", name: 'India' });
    const [selectedStatec, setSelectedStatec] = useState({ label: "Tamil Nadu", name: 'Tamil Nadu' });
    const [selectedCityc, setSelectedCityc] = useState({ label: "Tiruchirapalli", name: 'Tiruchirapalli' });


    const [getrowid, setRowGetid] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [pages, setPages] = useState(1);
    const [entries, setEntries] = useState(1);
    const [search, setSearch] = useState()

    let sno = 1;

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
                prefix: String(empaddform.prefix ? empaddform.prefix : "Mr"),
                firstname: String(empaddform.firstname),
                lastname: String(empaddform.lastname),
                legalname: String(empaddform.legalname),
                fathername: String(empaddform.fathername),
                mothername: String(empaddform.mothername),
                gender: String(empaddform.gender),
                maritalstatus: String(empaddform.maritalstatus),
                dob: String(empaddform.dob),
                bloodgroup: String(empaddform.bloodgroup),
                pdoorno: String(empaddform.pdoorno),
                pstreet: String(empaddform.pstreet),
                parea: String(empaddform.parea),
                plandmark: String(empaddform.plandmark),
                ptaluk: String(empaddform.ptaluk),
                ppost: String(empaddform.ppost),
                ppincode: String(empaddform.ppincode),
                pcountry: String(selectedCountryp.name),
                pstate: String(selectedStatep.name),
                pcity: String(selectedCityp.name),
                cdoorno: String(!empaddform.samesprmnt ? empaddform.cdoorno : empaddform.pdoorno),
                cstreet: String(!empaddform.samesprmnt ? empaddform.cstreet : empaddform.pstreet),
                carea: String(!empaddform.samesprmnt ? empaddform.carea : empaddform.parea),
                clandmark: String(!empaddform.samesprmnt ? empaddform.clandmark : empaddform.plandmark),
                ctaluk: String(!empaddform.samesprmnt ? empaddform.ctaluk : empaddform.ptaluk),
                cpost: String(!empaddform.samesprmnt ? empaddform.cpost : empaddform.ppost),
                cpincode: String(!empaddform.samesprmnt ? empaddform.cpincode : empaddform.ppincode),
                ccountry: String(!empaddform.samesprmnt ? selectedCountryc.name : selectedCountryp.name),
                cstate: String(!empaddform.samesprmnt ? selectedStatec.name : selectedStatep.name),
                ccity: String(!empaddform.samesprmnt ? selectedCityc.name : selectedCityp.name),
                empcode: String(empaddform.empcode),
            });
            setEmpaddform(res.data);
            handleCloseModEdit();
            setEmpaddform({
                prefix: "", firstname: "", lastname: "", legalname: "", fathername: "", mothername: "", gender: "", maritalstatus: "", dob: "", bloodgroup: "", pdoorno: "",
                pstreet: "", parea: "", plandmark: "", ptaluk: "", ppost: "", ppincode: "", pcountry: "", pstate: "", pcity: "", cdoorno: "", cstreet: "", carea: "", clandmark: "", ctaluk: "", cpost: "", cpincode: "", ccountry: "", cstate: "", ccity: "", empcode: ""
            })

        } catch (err) {
            const messages = err.response.data;
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
        if (empaddform.firstname === "") {
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
        { title: "Name", field: "firstname" },
        { title: "FatherName", field: "fathername" },
        { title: "MotherName", field: "mothername" },
        { title: "DOB", field: "dob" },

    ];
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
        let response = await axios.get(SERVICE.USER, {});
        var data = response.data.users.map((t) => ({

            Sno: excelno++, name: t.firstname + t.lastname, fathername: t.fathername, mothername: t.mothername, dob: t.dob

        }));
        setUserData(data);
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

    let PersonLength = employees.length;
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
            <Typography sx={userStyle.HeaderText}>Personal Information Update</Typography>
            <br />
            <Box sx={userStyle.container}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography sx={userStyle.SubHeaderText}>Employees List</Typography>
                    </Grid>
                    {/* <Grid item xs={4}>
                        <Link to="/addemployee" style={{ textDecoration: 'none', color: 'white', float: 'right' }}><Button variant="contained">ADD</Button></Link>
                    </Grid> */}
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
                                <StyledTableCell>Fathername</StyledTableCell>
                                <StyledTableCell>Mothername</StyledTableCell>
                                <StyledTableCell>DOB</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                        {filteredData &&
                                        (filteredData.slice((pages * entries - entries < PersonLength ? pages * entries - entries : 0),
                                            ((pages * entries - entries <= PersonLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{sno++}</StyledTableCell>
                                        <StyledTableCell> {row.firstname + " " + row.lastname}</StyledTableCell>
                                        <StyledTableCell>{row.fathername}</StyledTableCell>
                                        <StyledTableCell>{row.mothername}</StyledTableCell>
                                        <StyledTableCell>{row.dob}</StyledTableCell>
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
                            {(pages * entries - entries <= PersonLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
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
                    maxWidth="lg"
                >
                    <Box sx={userStyle.dialogbox}>

                        <DialogContent sx={{ maxWidth: '950px', padding: '20px', overflowY: 'visible' }}>
                            <Typography sx={userStyle.SubHeaderText}> Update Personal Information </Typography>
                            <br /><br /> <br />
                            <form onSubmit={handleSubmit}>
                                <Box >
                                    <>
                                        <Grid container spacing={1}>
                                            <Grid item md={6} sm={12} xs={12}>
                                                <Typography sx={userStyle.SubHeaderText}>{empaddform.companyname}</Typography>
                                            </Grid>
                                            <Grid item md={6} sm={12} xs={12}>
                                                <Typography sx={userStyle.SubHeaderText}>{empaddform.empcode}</Typography>
                                            </Grid>
                                        </Grid><br /><br /><br />
                                        <Grid container spacing={1}>
                                            <Grid item md={6} sm={12} xs={12}>
                                                <Typography>First Name<b style={{ color: "red" }}>*</b></Typography>
                                                <Grid container sx={{ display: 'flex' }} >
                                                    <Grid item md={3} sm={3} xs={3}>
                                                        <FormControl size="small" fullWidth>
                                                            <Select
                                                                labelId="demo-select-small"
                                                                id="demo-select-small"
                                                                placeholder="Mr."
                                                                value={empaddform.prefix}
                                                                onChange={(e) => { setEmpaddform({ ...empaddform, prefix: e.target.value }) }}
                                                            >
                                                                <MenuItem value="Mr">Mr</MenuItem>
                                                                <MenuItem value="Ms">Ms</MenuItem>
                                                                <MenuItem value="Mrs">Mrs</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={9} sm={9} xs={9}>
                                                        <FormControl size="small" fullWidth>
                                                            <OutlinedInput
                                                                id="component-outlined"
                                                                type="text"
                                                                placeholder="Name"
                                                                value={empaddform.firstname}
                                                                onChange={(e) => { setEmpaddform({ ...empaddform, firstname: e.target.value }) }}

                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item md={6} sm={12} xs={12}>
                                                <FormControl fullWidth size="small">
                                                    <Typography>Last Name<b style={{ color: "red" }}>*</b></Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="text"
                                                        value={empaddform.lastname}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, lastname: e.target.value }) }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small">
                                                    <Typography>Legal Name<b style={{ color: "red" }}>*</b></Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="text"
                                                        value={empaddform.legalname}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, legalname: e.target.value }) }}

                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small">
                                                    <Typography>Father Name</Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="text"
                                                        placeholder="Father Name"
                                                        value={empaddform.fathername}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, fathername: e.target.value }) }}

                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small">
                                                    <Typography>Mother Name</Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="text"
                                                        placeholder="Mother Name"
                                                        value={empaddform.mothername}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, mothername: e.target.value }) }}

                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small">
                                                    <Typography>Gender</Typography>
                                                    <Select
                                                        labelId="shift Timimg"
                                                        id="shift Timimg"
                                                        placeholder="Female"
                                                        value={empaddform.gender}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, gender: e.target.value }) }}

                                                    >
                                                        <MenuItem value="Male">Male</MenuItem>
                                                        <MenuItem value="Female">Female</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small">
                                                    <Typography>Marital Status</Typography>
                                                    <Select
                                                        labelId="shift Timimg"
                                                        id="shift Timimg"
                                                        placeholder="Marital status"
                                                        value={empaddform.maritalstatus}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, maritalstatus: e.target.value }) }}
                                                    >
                                                        <MenuItem value="Single">Single</MenuItem>
                                                        <MenuItem value="Married">Married</MenuItem>
                                                        <MenuItem value="Divorced">Divorced</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small">
                                                    <Typography>DateOfBirth</Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        value={empaddform.dob}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, dob: e.target.value }) }}
                                                        type="date"
                                                        size="small"
                                                        name="dob"
                                                    />

                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small">
                                                    <Typography>Blood Group</Typography>
                                                    <Select
                                                        placeholder="Blood group"
                                                        value={empaddform.bloodgroup}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, bloodgroup: e.target.value }) }}
                                                    >
                                                        <MenuItem value="A+">A+</MenuItem>
                                                        <MenuItem value="A-">A-</MenuItem>
                                                        <MenuItem value="B+">B+</MenuItem>
                                                        <MenuItem value="B-">B-</MenuItem>
                                                        <MenuItem value="O+">O+</MenuItem>
                                                        <MenuItem value="O-">O-</MenuItem>
                                                        <MenuItem value="AB+">AB+</MenuItem>
                                                        <MenuItem value="AB-">AB-</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </>
                                    <br /><br /><br />
                                    <Typography sx={userStyle.SubHeaderText}> Permanent Address <b style={{ color: "red" }}>*</b></Typography>
                                    <br /><br />
                                    <>
                                        <Grid container spacing={1}>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small" >
                                                    <Typography>Door/Flat No</Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="text"
                                                        placeholder="Door/Flat No"
                                                        value={empaddform.pdoorno}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, pdoorno: e.target.value }) }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small" >
                                                    <Typography>Street/Block</Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="text"
                                                        placeholder="Street/Block"
                                                        value={empaddform.pstreet}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, pstreet: e.target.value }) }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small" >
                                                    <Typography>Area/village</Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="text"
                                                        placeholder="Area/Village"
                                                        value={empaddform.parea}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, parea: e.target.value }) }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small" >
                                                    <Typography>Landmark</Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="text"
                                                        placeholder="Landmark"
                                                        value={empaddform.plandmark}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, plandmark: e.target.value }) }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <br />
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small" >
                                                    <Typography>Thaluka</Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="text"
                                                        placeholder="Thaluka"
                                                        value={empaddform.ptaluk}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, ptaluk: e.target.value }) }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl size="small" fullWidth>
                                                    <Typography>Post</Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="text"
                                                        placeholder="Post"
                                                        value={empaddform.ppost}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, ppost: e.target.value }) }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} sm={12} sx={12}>
                                                <FormControl size="small" fullWidth>
                                                    <Typography>Pincode</Typography>
                                                    <OutlinedInput
                                                        id="component-outlined"
                                                        type="text"
                                                        placeholder="Pincode"
                                                        value={empaddform.ppincode}
                                                        onChange={(e) => { setEmpaddform({ ...empaddform, ppincode: e.target.value }) }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl size="small" fullWidth >
                                                    <Typography>Country</Typography>
                                                    <Selects
                                                        options={Country.getAllCountries()}
                                                        getOptionLabel={(options) => {
                                                            return options["name"];
                                                        }}
                                                        getOptionValue={(options) => {
                                                            return options["name"];
                                                        }}
                                                        value={selectedCountryp}

                                                        styles={colourStyles}
                                                        onChange={(item) => {
                                                            setSelectedCountryp(item);
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid><br />
                                        <Grid container spacing={1}>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small" >
                                                    <Typography>State</Typography>
                                                    <Selects
                                                        options={State?.getStatesOfCountry(selectedCountryp?.isoCode)}
                                                        getOptionLabel={(options) => {
                                                            return options["name"];
                                                        }}
                                                        getOptionValue={(options) => {
                                                            return options["name"];
                                                        }}
                                                        value={selectedStatep}

                                                        styles={colourStyles}
                                                        onChange={(item) => {
                                                            setSelectedStatep(item);
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <FormControl fullWidth size="small" >
                                                    <Typography>City</Typography>
                                                    <Selects
                                                        options={City.getCitiesOfState(
                                                            selectedStatep?.countryCode,
                                                            selectedStatep?.isoCode
                                                        )}
                                                        getOptionLabel={(options) => {
                                                            return options["name"];
                                                        }}
                                                        getOptionValue={(options) => {
                                                            return options["name"];
                                                        }}
                                                        value={selectedCityp}

                                                        styles={colourStyles}
                                                        onChange={(item) => {
                                                            setSelectedCityp(item);
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </>
                                    <br /><br /><br />
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <Typography sx={userStyle.SubHeaderText}> Current Address<b style={{ color: "red" }}>*</b> </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControlLabel control={<Checkbox checked={empaddform.samesprmnt} onChange={(e) => setEmpaddform({ ...empaddform, samesprmnt: !empaddform.samesprmnt })} />} label="Same as permananet Address" />
                                        </Grid>
                                    </Grid>
                                    <br /><br />
                                    {!empaddform.samesprmnt ?

                                        <>
                                            <Grid container spacing={1}>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>Door/Flat No</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Door/Flat No"
                                                            value={empaddform.cdoorno}
                                                            onChange={(e) => { setEmpaddform({ ...empaddform, cdoorno: e.target.value }) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>Street/Block</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Street/Block"
                                                            value={empaddform.cstreet}
                                                            onChange={(e) => { setEmpaddform({ ...empaddform, cstreet: e.target.value }) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>Area/village</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Area/Village"
                                                            value={empaddform.carea}
                                                            onChange={(e) => { setEmpaddform({ ...empaddform, carea: e.target.value }) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>Landmark</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Landmark"
                                                            value={empaddform.clandmark}
                                                            onChange={(e) => { setEmpaddform({ ...empaddform, clandmark: e.target.value }) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <br />
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>Taluk</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Taluk"
                                                            value={empaddform.ctaluk}
                                                            onChange={(e) => { setEmpaddform({ ...empaddform, ctaluk: e.target.value }) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl size="small" fullWidth>
                                                        <Typography>Post</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Post"
                                                            value={empaddform.cpost}
                                                            onChange={(e) => { setEmpaddform({ ...empaddform, cpost: e.target.value }) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl size="small" fullWidth>
                                                        <Typography>Pincode</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Pincode"
                                                            value={empaddform.cpincode}
                                                            onChange={(e) => { setEmpaddform({ ...empaddform, cpincode: e.target.value }) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>Country</Typography>
                                                        <Selects
                                                            options={Country.getAllCountries()}
                                                            getOptionLabel={(options) => {
                                                                return options["name"];
                                                            }}
                                                            getOptionValue={(options) => {
                                                                return options["name"];
                                                            }}
                                                            value={selectedCountryc}
                                                            styles={colourStyles}
                                                            onChange={(item) => {
                                                                setSelectedCountryc(item);
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid container spacing={1}>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>State</Typography>
                                                        <Selects
                                                            options={State?.getStatesOfCountry(selectedCountryc?.isoCode)}
                                                            getOptionLabel={(options) => {
                                                                return options["name"];
                                                            }}
                                                            getOptionValue={(options) => {
                                                                return options["name"];
                                                            }}
                                                            value={selectedStatec}
                                                            styles={colourStyles}
                                                            onChange={(item) => {
                                                                setSelectedStatec(item);
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>City</Typography>
                                                        <Selects
                                                            options={City.getCitiesOfState(
                                                                selectedStatec?.countryCode,
                                                                selectedStatec?.isoCode
                                                            )}
                                                            getOptionLabel={(options) => {
                                                                return options["name"];
                                                            }}
                                                            getOptionValue={(options) => {
                                                                return options["name"];
                                                            }}
                                                            value={selectedCityc}
                                                            styles={colourStyles}
                                                            onChange={(item) => {
                                                                setSelectedCityc(item);
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </>
                                        // else condition starts here
                                        :
                                        <>
                                            <Grid container spacing={1}>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>Door/Flat No</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Door/Flat No"
                                                            value={empaddform.pdoorno}

                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>Street/Block</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Street/Block"
                                                            value={empaddform.pstreet}

                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>Area/village</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Area/Village"
                                                            value={empaddform.parea}

                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>Landmark</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Landmark"
                                                            value={empaddform.plandmark}

                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <br />
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>Taluk</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Taluk"
                                                            value={empaddform.ptaluk}

                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl size="small" fullWidth>
                                                        <Typography>Post</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Post"
                                                            value={empaddform.ppost}

                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl size="small" fullWidth>
                                                        <Typography>Pincode</Typography>
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            placeholder="Pincode"
                                                            value={empaddform.ppincode}

                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl size="small" fullWidth >
                                                        <Typography>Country</Typography>
                                                        <Selects
                                                            options={Country.getAllCountries()}
                                                            getOptionLabel={(options) => {
                                                                return options["name"];
                                                            }}
                                                            getOptionValue={(options) => {
                                                                return options["name"];
                                                            }}
                                                            value={selectedCountryp}
                                                            styles={colourStyles}
                                                            onChange={(item) => {
                                                                setSelectedCountryp(item);
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid><br />
                                            <Grid container spacing={1}>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>State</Typography>
                                                        <Selects
                                                            options={State?.getStatesOfCountry(selectedCountryp?.isoCode)}
                                                            getOptionLabel={(options) => {
                                                                return options["name"];
                                                            }}
                                                            getOptionValue={(options) => {
                                                                return options["name"];
                                                            }}
                                                            value={selectedStatep}
                                                            styles={colourStyles}
                                                            onChange={(item) => {
                                                                setSelectedStatep(item);
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={3} sm={12} xs={12}>
                                                    <FormControl fullWidth size="small" >
                                                        <Typography>City</Typography>
                                                        <Selects
                                                            options={City.getCitiesOfState(
                                                                selectedStatep?.countryCode,
                                                                selectedStatep?.isoCode
                                                            )}
                                                            getOptionLabel={(options) => {
                                                                return options["name"];
                                                            }}
                                                            getOptionValue={(options) => {
                                                                return options["name"];
                                                            }}
                                                            value={selectedCityp}
                                                            styles={colourStyles}
                                                            onChange={(item) => {
                                                                setSelectedCityp(item);
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </>}
                                    <br /><br /><br /><br />
                                    <Grid container spacing={2} sx={{ textAlign: "center", justifyContent: "center", alignItems: 'center' }}>
                                        <Grid item md={1}></Grid>
                                        <Button variant="contained" onClick={editSubmit} >Update</Button>
                                        <Grid item md={1}></Grid>
                                        <Button sx={userStyle.btncancel} onClick={handleCloseModEdit} >Cancel</Button>
                                    </Grid>
                                </Box><br />
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
                        </DialogContent>
                    </Box>
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
                            <StyledTableCell>Fathername</StyledTableCell>
                            <StyledTableCell>Mothername</StyledTableCell>
                            <StyledTableCell>DOB</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {employees &&
                            (employees.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{printno++}</StyledTableCell>
                                    <StyledTableCell> {row.firstname + " " + row.lastname}</StyledTableCell>
                                    <StyledTableCell>{row.fathername}</StyledTableCell>
                                    <StyledTableCell>{row.mothername}</StyledTableCell>
                                    <StyledTableCell>{row.dob}</StyledTableCell>
                                </StyledTableRow>
                            )))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}


export default Personalupdate;