import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Dialog, Select, MenuItem, OutlinedInput, TextareaAutosize, DialogContent, InputLabel, FormControl, DialogActions, Grid, Paper, Table, TableHead, TableContainer, Button, TableBody } from "@mui/material";
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
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


function Contactupdate() {

    const handleClearImage = () => {
        setFile(null);
    };


    const [empaddform, setEmpaddform] = useState({
        prefix: "", firstname: "", lastname: "", name: "", email: "", emergencyno: "", contactno: "", details: "", profileimage: "", empcode: "", contactfamily: "", contactpersonal: "",
    });

    // Country city state datas


    const [getrowid, setRowGetid] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [pages, setPages] = useState(1);
    const [entries, setEntries] = useState(1);
    const [search, setSearch] = useState()

    const [file, setFile] = useState("")
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


    // view model
    const [openview, setOpenview] = useState(false);

    const handleClickOpenview = () => {
        setOpenview(true);
    };

    const handleCloseview = () => {
        setOpenview(false);
    };


    //EDIT POST CALL
    let logedit = getrowid._id;
    const sendRequestt = async () => {
        try {
            let res = await axios.put(`${SERVICE.USER_SINGLE_PWD}/${logedit}`, {
                prefix: String(empaddform.prefix ? empaddform.prefix : "Mr"),
                firstname: String(empaddform.firstname),
                lastname: String(empaddform.lastname),
                name: String(empaddform.name),
                email: String(empaddform.email),
                emergencyno: String(empaddform.emergencyno),
                contactno: String(empaddform.contactno),
                details: String(empaddform.details),
                profileimage: String(empaddform.profileimage),
                empcode: String(empaddform.empcode),
                contactfamily: String(empaddform.contactfamily),
                contactpersonal: String(empaddform.contactpersonal),
            });
            // setEmpaddform(res.data);
            console.log(res.data)
            handleCloseModEdit();


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
        if (empaddform.emergencyno === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
                    <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter Emergency No"}</p>
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

    
    //  PDF
    const columns = [
        // { title: "SNo", field: "sno" },
        { title: "Name", field: "firstname"},
      { title: "Email", field: "email" },
      { title: "ContactFamily", field: "contactfamily" },
      { title: "EmergencyNo", field: "emergencyno" },

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
      let excelno=1;
  
      // get particular columns for export excel
      const getexcelDatas = async () => {
          let response = await axios.get(SERVICE.USER, {
              //  headers: {
              //      'Authorization': `Bearer ${auth.APIToken}`
              //  },
          });
          var data = response.data.users.map((t) => ({
  
              Sno:excelno++,name: t.firstname + t.lastname ,email: t.email, contactfamily: t.contactfamily, emergencyno: t.emergencyno,details: t.details,
  
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
        getexcelDatas();    
    })

    // Image Upload
    function handleChangeImage(e) {
        let profileimage = document.getElementById("profileimage")
        var path = (window.URL || window.webkitURL).createObjectURL(profileimage.files[0]);
        toDataURL(path, function (dataUrl) {
            profileimage.setAttribute('value', String(dataUrl));
            setEmpaddform({ ...empaddform, profileimage: String(dataUrl) })
            return dataUrl;
        })
        setFile(URL.createObjectURL(e.target.files[0]));
    }


    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }


    let ContactLength = employees.length;
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
            <Typography sx={userStyle.HeaderText}>Contact Update</Typography>
            <br />
            <Box sx={userStyle.container}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography sx={userStyle.SubHeaderText}>Employees List</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to="/addemployee" style={{ textDecoration: 'none', color: 'white', float: 'right' }}><Button variant="contained">ADD</Button></Link>
                    </Grid>
                </Grid>
                <br /><br />
                <Grid container sx={{ justifyContent: "center" }} >
                    <Grid >

                        <ExportCSV csvData={userData}fileName={fileName} />

                        <ExportXL csvData={{userData}} fileName={fileName} />

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
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Contact(Family)</StyledTableCell>
                                <StyledTableCell>EmergencyNo</StyledTableCell>
                                <StyledTableCell>Details</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData &&
                                (filteredData.slice((pages * entries - entries < ContactLength ? pages * entries - entries : 0),
                                    ((pages * entries - entries <= ContactLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>{sno++}</StyledTableCell>
                                            <StyledTableCell> {row.firstname + " " + row.lastname}</StyledTableCell>
                                            <StyledTableCell>{row.email}</StyledTableCell>
                                            <StyledTableCell>{row.contactfamily}</StyledTableCell>
                                            <StyledTableCell>{row.emergencyno}</StyledTableCell>
                                            <StyledTableCell>{row.details}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Button variant="outlined" style={userStyle.actionbutton} onClick={() => {

                                                            getCode(row._id); handleClickOpenEdit();
                                                        }}><EditIcon style={{ fontsize: '20px' }} />
                                                        </Button>
                                                        {/* <Button
                                                        sx={userStyle.actionbutton}
                                                        onClick={(e) => {
                                                            handleClickOpenview();
                                                            getviewCode(row._id);
                                                        }}
                                                    >
                                                        <VisibilityOutlinedIcon style={{ fontsize: '20px' }} />
                                                    </Button> */}
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
                    {(pages * entries - entries <= ContactLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
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
                    fullWidth={true}
                    maxWidth="md"
                // PaperProps={{ sx: { position: "fixed", top: 10, left: 10, m: 0 } }}
                >
                    <DialogContent sx={userStyle.dialogbox} >
                        <Box >
                            <form onSubmit={handleSubmit}>
                                <Box >

                                    <Typography sx={userStyle.SubHeaderText}> Update Employee Contact</Typography>

                                    <br /><br />
                                    <>
                                        <Grid container spacing={2}>
                                            <Grid item md={3} sm={12} xs={12}>
                                                <Typography>{empaddform.companyname}</Typography>
                                            </Grid><br /><br />
                                            <Grid item md={3} sm={12} xs={12}>
                                                <Typography>{empaddform.empcode}</Typography>
                                            </Grid>
                                        </Grid>
                                        <br /><br />
                                        <Grid container spacing={2}>
                                            <Grid item md={6} sm={12} xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item md={12} sm={12} xs={12}>
                                                        <FormControl fullWidth size="small">
                                                            <Typography>Email<b style={{ color: "red" }}>*</b></Typography>
                                                            <OutlinedInput
                                                                id="component-outlined"
                                                                type="text"
                                                                placeholder="Email"
                                                                value={empaddform.email}
                                                                onChange={(e) => { setEmpaddform({ ...empaddform, email: e.target.value }) }}

                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={12} sm={12} xs={12}>
                                                        <FormControl fullWidth size="small">
                                                            <Typography>Contact(personal)</Typography>
                                                            <OutlinedInput
                                                                id="component-outlined"
                                                                type="text"
                                                                placeholder="Contact no(personal)"
                                                                value={empaddform.contactpersonal}
                                                                onChange={(e) => { setEmpaddform({ ...empaddform, contactpersonal: e.target.value }) }}

                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={12} sm={12} xs={12}>
                                                        <FormControl fullWidth size="small">
                                                            <Typography>Contact(Family)</Typography>
                                                            <OutlinedInput
                                                                id="component-outlined"
                                                                type="text"
                                                                placeholder="contact no(Family)"
                                                                value={empaddform.contactfamily}
                                                                onChange={(e) => { setEmpaddform({ ...empaddform, contactfamily: e.target.value }) }}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={12} sm={12} xs={12}>
                                                        <FormControl fullWidth size="small">
                                                            <Typography>Emergency No<b style={{ color: "red" }}>*</b></Typography>
                                                            <OutlinedInput
                                                                id="component-outlined"
                                                                type="text"
                                                                placeholder="contact no(Emergency)"
                                                                value={empaddform.emergencyno}
                                                                onChange={(e) => { setEmpaddform({ ...empaddform, emergencyno: e.target.value }) }}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Grid><br /><br /><br />
                                            <Grid item lg={6} md={3} sm={12} xs={12}>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                                    <InputLabel>Profile Image</InputLabel>
                                                </Box><br />
                                                <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", }}>
                                                    <Box sx={{ border: '1px solid black', width: "153px", height: "153px" }}>
                                                        <img src={file === "" ? empaddform.profileimage : file} alt="profile" width="100%" height="100%" />
                                                    </Box>
                                                </Grid><br />
                                                <FormControl size="small" fullWidth>
                                                    <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: "center" }}>
                                                        <Grid item>
                                                            <Button component="label" variant="contained" sx={userStyle.buttonadd}>
                                                                Upload
                                                                <input type='file' id="profileimage" name='file' hidden onChange={handleChangeImage}
                                                                />
                                                            </Button>
                                                        </Grid>
                                                        {/* {file && ( */}
                                                        <Grid item>
                                                            <Button sx={userStyle.btncancel} onClick={handleClearImage}>
                                                                Clear
                                                            </Button>
                                                        </Grid>
                                                        {/* )} */}
                                                    </Grid>
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                                        <Typography variant='body2' style={{ marginTop: "5px" }}>Max File size: 5MB</Typography>
                                                    </Box>
                                                </FormControl>
                                            </Grid>

                                        </Grid><br />

                                    </>
                                    <Grid item xs={8}>
                                        <Typography sx={userStyle.importheadtext}>Reference Details </Typography>
                                    </Grid><br />
                                    <Grid container spacing={1}>
                                        <Grid item md={6} sm={12} xs={12}>
                                            <FormControl size="small" fullWidth>
                                                <Typography>Name</Typography>
                                                <OutlinedInput
                                                    id="component-outlined"
                                                    type="text"
                                                    placeholder="Reference Name"
                                                    value={empaddform.name}
                                                    onChange={(e) => { setEmpaddform({ ...empaddform, name: e.target.value }) }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={6} sm={12} xs={12}>
                                            <FormControl size="small" fullWidth>
                                                <Typography>Contact</Typography>
                                                <OutlinedInput
                                                    id="component-outlined"
                                                    type="text"
                                                    placeholder="Contact No"
                                                    value={empaddform.contactno}
                                                    onChange={(e) => { setEmpaddform({ ...empaddform, contactno: e.target.value }) }}
                                                />
                                            </FormControl>
                                        </Grid><br />
                                        <Grid item md={12} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <Typography>Details</Typography>
                                                <TextareaAutosize aria-label="minimum height" minRows={5}
                                                    value={empaddform.details}
                                                    onChange={(e) => { setEmpaddform({ ...empaddform, details: e.target.value }) }}
                                                    placeholder="Reference Details"
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid> <br />
                                    <br />
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
                        {/* <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} /> */}
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
                        <Typography sx={userStyle.HeaderText}>View Login Details</Typography>
                        <br /> <br />
                        <form sx={{ maxWidth: '1200px' }}>
                            <Grid container spacing={3}>
                                <Grid item md={6} sm={12} xs={12}>
                                    <Typography>{empaddform.prefix + "." + empaddform.firstname + empaddform.lastname}</Typography>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <Typography>{empaddform.empcode}</Typography>
                                </Grid>
                            </Grid><br /><br /><br />
                            <Grid container spacing={4}>
                                <Grid item md={6} xs={12} sm={12} >
                                    <FormControl fullWidth size="small">
                                        <Typography sx={userStyle.SubHeaderText}>Email<b style={{ color: "red" }}>*</b></Typography>
                                        <Typography>{empaddform.email}</Typography>
                                    </FormControl><br /><br /><br />
                                    <FormControl fullWidth size="small">
                                        <Typography sx={userStyle.SubHeaderText}>per.contact</Typography>
                                        <Typography>{empaddform.contactpersonal}</Typography>
                                    </FormControl>
                                </Grid><br /><br />
                                <Grid item md={6} xs={12} sm={12} >
                                    <FormControl fullWidth size="small">
                                        <Typography >Upload Image</Typography>

                                        <Grid sx={{ border: '1px solid black', height: 153, width: 153 }}>
                                            <img src={empaddform.profileimage} alt="profile" height="150px" width="150px"></img>
                                        </Grid>
                                        <Typography></Typography>
                                    </FormControl>
                                </Grid><br /><br />
                                <Grid item md={6} xs={12} sm={12} >
                                    <FormControl fullWidth size="small">
                                        <Typography sx={userStyle.SubHeaderText}>Fam.contact</Typography>
                                        <Typography>{empaddform.contactfamily}</Typography>
                                    </FormControl>
                                </Grid><br /><br />
                                <Grid item md={6} xs={12} sm={12} >
                                    <FormControl fullWidth size="small">
                                        <Typography sx={userStyle.SubHeaderText}>Emergency.no<b style={{ color: "red" }}>*</b></Typography>
                                        <Typography>{empaddform.emergencyno}</Typography>
                                    </FormControl>
                                </Grid><br /><br />
                                <Grid item md={6} xs={12} sm={12} >
                                    <FormControl fullWidth size="small">
                                        <Typography sx={userStyle.SubHeaderText}> Name</Typography>
                                        <Typography>{empaddform.prefix + "." + empaddform.firstname}</Typography>
                                    </FormControl>
                                </Grid><br /><br />
                                <Grid item md={6} xs={12} sm={12} >
                                    <FormControl fullWidth size="small">
                                        <Typography sx={userStyle.SubHeaderText}>Details</Typography>
                                        <Typography>{empaddform.details}</Typography>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br /> <br />  <br />
                            <Grid container spacing={2} sx={{ textAlign: "center", justifyContent: "center", alignItems: 'center' }}>
                                <Button variant="contained" color="primary" onClick={handleCloseview}> Back </Button>
                            </Grid>
                        </form>
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
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Contact(Family)</StyledTableCell>
                            <StyledTableCell>EmergencyNo</StyledTableCell>
                            <StyledTableCell>Details</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {employees &&
                            (employees.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{printno++}</StyledTableCell>
                                    <StyledTableCell> {row.firstname + " " + row.lastname}</StyledTableCell>
                                    <StyledTableCell>{row.email}</StyledTableCell>
                                    <StyledTableCell>{row.contactfamily}</StyledTableCell>
                                    <StyledTableCell>{row.emergencyno}</StyledTableCell>
                                    <StyledTableCell>{row.details}</StyledTableCell>
                                </StyledTableRow>

                            )))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}


export default Contactupdate;