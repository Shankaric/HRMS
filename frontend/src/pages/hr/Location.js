
import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, TableBody, Select, MenuItem, Dialog, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button } from "@mui/material";
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
import moment from 'moment-timezone';


function Location() {

    const [location, setLocation] = useState({
        code: "", name: ""

    });
    const [locatid, setLocatid] = useState({})
    const [locations, setLocations] = useState([]);
    const [entries, setEntries] = useState(1);
    const [pages, setPages] = useState(1);
    const [username, setUsername] = useState("");

    const userData = {
        name: username,
        date: new Date(),
    };
    console.log(userData);

    let sino = 1;
    let printsno = 1;

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

    const [deletelocation, setDeletelocation] = useState("");
    //set function to get particular row

    const rowData = async (id) => {
        try {
            let res = await axios.get(`${SERVICE.LOCATION_SINGLE}/${id}`, {
                // headers: {
                //     'Authorization': `Bearer ${auth.APIToken}`
                // }
            });
            setDeletelocation(res.data.slocationdetails);
        } catch (err) {
        }
    };
    // Alert delete popup
    let locationid = deletelocation._id;
    const delLocation = async () => {
        try {
            await axios.delete(`${SERVICE.LOCATION_SINGLE}/${locationid}`, {
                // headers: {
                //     'Authorization': `Bearer ${auth.APIToken}`
                // }
            });
            handleCloseMod();
        } catch (err) {
        }
    };

    //datatable....
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredData = locations.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    //add function 
    const sendRequest = async () => {
        try {
            let locationscreate = await axios.post(SERVICE.LOCATION_CREATE, {
                // headers: {
                //     'Authorization':`Bearer ${auth.APIToken}`
                //     }

                code: String(location.code),
                name: String(location.name),
                addedby: String(username),
                // updatedby: String(localStorage.LoginUserId),
            })
            setLocation(locationscreate.data)
            setLocation({ code: "", name: "" })
        } catch (error) {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
                    <p style={{ fontSize: '20px', fontWeight: 900 }}>{error.response.data.errorMessage}</p>
                </>
            );
            handleClickOpenerr();
        }
    };

    //submit option for saving
    const handleSubmit = (e) => {
        e.preventDefault();

        if (location.code === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
                    <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter Code"}</p>
                </>
            );
            handleClickOpenerr();
        } else if (location.name === "") {
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


    //id for login
    
    let loginid = localStorage.LoginUserId;
    console.log(localStorage);


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
    console.log(username);


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

    //get single row to edit....
    const getCode = async (e) => {
        let res = await axios.get(`${SERVICE.LOCATION_SINGLE}/${e}`, {
        })
        setLocatid(res.data.slocationdetails)
    }

    // get single row to view....
    const getviewCode = async (e) => {
        let res = await axios.get(`${SERVICE.LOCATION_SINGLE}/${e}`, {});
        setLocatid(res.data.slocationdetails);
    };


    // get single row to view....
    const getinfoCode = async (e) => {
        let res = await axios.get(`${SERVICE.LOCATION_SINGLE}/${e}`, {});
        setLocatid(res.data.slocationdetails);
    };

    let updatelist = [];
    updatelist = locatid?.updatedby;
    updatelist?.map((item) => {
        console.log(item.name);
        console.log(item.date);
    })

    let locationsid = locatid._id;

    //location updateby edit page....
    let updateby = locatid.updatedby;
    console.log(locatid.updatedby, 'updatedvalue');


    //editing the single data...
    const sendEditRequest = async () => {
        try {
            let res = await axios.put(`${SERVICE.LOCATION_SINGLE}/${locationsid}`, {
                code: String(locatid.code),
                name: String(locatid.name),
                addedby: String(username),
                updatedby: [
                    ...updateby, {
                        name: String(username),
                        date: String(new Date()),

                    },
                ],
            });
            setLocatid(res.data);
            handleCloseModEdit();
        } catch (err) {
            console.log(err.response.data.message)
        }
    }

    const editSubmit = (e) => {
        e.preventDefault();
        sendEditRequest();
    }
    //get all locations.
    const fetchAllLocation = async () => {
        try {
            let res_location = await axios.get("http://192.168.85.8:7001/api/locations", {
            });
            setLocations(res_location.data.locationdetails);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    }

    // pdf.....
    const columns = [
        { title: "Code", field: "code" },
        { title: "Name", field: "name" },

    ]
    const downloadPdf = () => {
        const doc = new jsPDF()
        doc.autoTable({
            theme: "grid",
            columns: columns.map(col => ({ ...col, dataKey: col.field })),
            body: locations,
        })
        doc.save('location.pdf')
    }

    // Excel
    const fileName = "locations";

    const [locationData, setLocationData] = useState([]);
    let excelno = 1;

    // // get particular columns for export excel
    const getexcelDatas = async () => {
        let response = await axios.get("http://192.168.85.8:7001/api/locations", {
            //  headers: {
            //      'Authorization': `Bearer ${auth.APIToken}`
            //  },
        });
        var data = response.data.locationdetails.map(t => ({
            Sno: excelno++,
            code: t.code, Name: t.name
        }));
        setLocationData(data);
    }

    //print...
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Location',
        pageStyle: 'print'
    });


    useEffect(
        () => {
            fetchAllLocation();
            getexcelDatas();
            getusername();
        }
    );

    let locationLength = locations.length;
    useEffect(
        () => {
            selectPageHandler();
        }
    );

    const selectPageHandler = (selPage) => {
        if (selPage >= 1 && selPage <= (Math.ceil(locations.length / (Number(entries)))) && selPage !== pages)
            setPages(selPage)
    };
    let total = 0;

    return (
        <Box>
            {/* ****** Header Content ****** */}
            <Typography sx={userStyle.HeaderText}>Location </Typography>
            <Box sx={userStyle.container}>

                <>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography sx={userStyle.importheadtext}>Manage Location</Typography>
                        </Grid>
                    </Grid><br />
                    <Grid container sx={{ justifyContent: "center" }} spacing={1}>
                        <Grid item md={3} sx={12}>
                            <FormControl fullWidth size="small" >
                                <Typography>Code</Typography>
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={location.code}
                                    onChange={(e) => { setLocation({ ...location, code: e.target.value }) }}

                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sx={12}>
                            <FormControl fullWidth size="small" >
                                <Typography>Name</Typography>
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={location.name}
                                    onChange={(e) => { setLocation({ ...location, name: e.target.value }) }}
                                />
                            </FormControl>
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
                >
                    <Box sx={userStyle.container}>

                        <>
                            <Grid container spacing={2}>

                                <Typography sx={userStyle.importheadtext}>Manage Location</Typography>

                            </Grid><br />
                            <Grid container spacing={2}>
                                <Grid item md={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Code</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={locatid.code}
                                            onChange={(e) => { setLocatid({ ...locatid, code: e.target.value }) }}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Name</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={locatid.name}
                                            onChange={(e) => { setLocatid({ ...locatid, name: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br /><br />
                            <Grid container spacing={2}>
                                <Grid item md={4} sx={12}>
                                    <Button variant="contained" onClick={editSubmit} >Update</Button>
                                </Grid>
                                <Grid item md={4} sx={12}>
                                    <Button sx={userStyle.btncancel} onClick={handleCloseModEdit} >Cancel</Button>
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
                    { /* ******************************************************EXPORT Buttons****************************************************** */}
                    {/*       
          <Box sx={userStyle.container} > */}
                    <Grid item xs={8}>
                        <Typography sx={userStyle.importheadtext}>Location List</Typography>
                    </Grid>
                    <Grid container sx={{ justifyContent: "center" }} >
                        <Grid >
                            {/* {isUserRoleCompare[0].excelsupplier && (
                                <> */}
                            <ExportCSV csvData={locationData} fileName={fileName} />
                            {/* </>
                            )} */}
                            {/* {isUserRoleCompare[0].csvsupplier && (
                                <> */}
                            <ExportXL csvData={locationData} fileName={fileName} />
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
                    <Grid sx={userStyle.dataTablestyle}>
                        <Box>
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
                                    <MenuItem value={(locations.length)}>All</MenuItem>
                                </Select>
                            </FormControl>
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
                    <Grid container>
                        <Grid md={4} sm={2} xs={1}></Grid>
                        <Grid md={8} sm={10} xs={10} sx={{ align: "center" }}></Grid>
                    </Grid>
                    <br />
                    {/* ****** Table start ****** */}
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 700, }}
                            aria-label="customized table"
                            id="usertable"
                        //ref={tableRef}
                        >
                            <TableHead sx={{ fontWeight: "600" }}>
                                <StyledTableRow>
                                    {/* <StyledTableCell> SI.No</StyledTableCell> */}
                                    <StyledTableCell>Code</StyledTableCell>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Action</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody align="left">
                            {filteredData &&
                  (filteredData.slice((pages * entries - entries < locationLength ? pages * entries - entries : 0),
                    ((pages * entries - entries <= locationLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                      <StyledTableRow key={index}>
                        {/* <StyledTableCell>{total = ((pages * entries - entries + index + 1))}</StyledTableCell> */}
                                            <StyledTableCell>{row.code}</StyledTableCell>
                                            <StyledTableCell>{row.name}</StyledTableCell>
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
                                    )))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid style={userStyle.dataTablestyle}>
            <Box >
              <Typography>Showing
                {(pages * entries - entries <= locationLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                {/* {(pages * entries - entries + 1)}  */}
                to {(pages * entries) > locations.length ? locations.length : ((pages * entries))} of {locations.length} entries</Typography>  </Box>
            <Box>
              {locations && <Typography className="Pagination">
                <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(pages - 1) }}>prev</Button>

                {[...Array(Math.ceil(locations.length / Number(entries)))].map((_, i) => {
                  if (entries == 1) {
                    if (i <= 5) {
                      return <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(i + 1) }}>{(i + 1)}</Button>
                    }
                  }
                  else {
                    return <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(i + 1) }}>{i + 1}</Button>
                  }
                })}

                <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(pages + 1) }}>Next</Button>
              </Typography>}
              {/* ****** Table End ****** */}

            </Box>
          </Grid>
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
                            onClick={(e) => delLocation(locationid)}
                        > OK </Button>
                    </DialogActions>
                </Dialog>
                {/* print layout */}

                <TableContainer component={Paper} sx={userStyle.printcls}>
                    <Table sx={{ minWidth: 700, }} aria-label="customized table" id="usertable" ref={componentRef}>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell> SI.No</StyledTableCell>
                                <StyledTableCell>Code</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                {/* <StyledTableCell >Action</StyledTableCell> */}
                            </StyledTableRow>
                        </TableHead>
                        <TableBody align="left">
                            {locations &&
                                (locations.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{printsno++}</StyledTableCell>
                                        <StyledTableCell>{row.code}</StyledTableCell>
                                        <StyledTableCell>{row.name}</StyledTableCell>
                                        <StyledTableCell ></StyledTableCell>
                                    </StyledTableRow>
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
                <Box sx={{ width: "350px", padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.HeaderText}> View Location</Typography>
                        <br /> <br />
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6"> Name</Typography>
                                    <Typography>{locatid.name}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={12} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Code</Typography>
                                    <Typography>{locatid.code}</Typography>
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
                <Box sx={{ width: '350px', padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.HeaderText}>Info</Typography>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">addedby</Typography>
                                    <Typography >{username}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Updated by</Typography>
                                    {updateby?.map((item, i) => (
                                        <table>
                                            <thead></thead>
                                            <tbody>
                                                <tr>
                                                    <td>{sino++}.</td><br />
                                                    <td>{item.name}</td> <br />
                                                    <td>{moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ))}
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


export default Location;