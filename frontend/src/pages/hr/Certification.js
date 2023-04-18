import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, Dialog, Select, MenuItem, TableBody, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button } from "@mui/material";
import { userStyle } from "../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { SERVICE } from '../../services/Baseservice';
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import { useReactToPrint } from "react-to-print";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import moment from 'moment-timezone';


const Certification = () => {
  //fetch branch
  const [certifications, setCertifications] = useState([]);

  const [certification, setCertification] = useState({
    name: "",
  });
  const [getrowid, setRowGetid] = useState("");
  const [deletecertification, setDeletecertification] = useState({});
  const [certificationedit, setCertificationedit] = useState({ name: "" });
  const [entries, setEntries] = useState(1);
  const [pages, setPages] = useState(1);
  const [username, setUsername] = useState("");

  const userData = {
    name: username,
    date: new Date(),
  };
  console.log(userData);

  let sino=1;

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
  const handleClose = () => {
    setIsDeleteOpen(false);
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

  // get all branches
  const fetchUnits = async () => {
    try {
      let res_unit = await axios.get(SERVICE.CERTIFICATION, {
      });
      setCertifications(res_unit.data.certifications);
    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages);
    }
  }

  //set function to get particular row
  const rowData = async (id) => {
    try {
      let res = await axios.get(`${SERVICE.CERTIFICATION_SINGLE}/${id}`, {
        // headers: {
        //     'Authorization': `Bearer ${auth.APIToken}`
        // }
      });
      setDeletecertification(res.data.scertification);
    } catch (err) {
    }
  }

  // Alert delete popup

  let unitid = deletecertification._id;
  const delUnit = async () => {
    try {
      await axios.delete(`${SERVICE.CERTIFICATION_SINGLE}/${unitid}`, {
      });
      handleClose();
    } catch (err) {
      console.group(err.response.data.errorMessage)
    }
  };

  //datatable....
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = certifications.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );





  //  PDF
  const columns = [
    { title: "Name", field: "name" },
  ]

  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body: certifications
    })
    doc.save('Certificate.pdf')
  }

  const getCode = async (e) => {
    let res = await axios.get(`${SERVICE.CERTIFICATION_SINGLE}/${e}`, {
    })
    setCertificationedit(res.data.scertification);
    setRowGetid(res.data.scertification);
  }

  // get single row to view....
  const getviewCode = async (e) => {
    let res = await axios.get(`${SERVICE.CERTIFICATION_SINGLE}/${e}`, {});
    setCertificationedit(res.data.scertification);
  };

  // get single row to view....
  const getinfoCode = async (e) => {
    let res = await axios.get(`${SERVICE.CERTIFICATION_SINGLE}/${e}`, {});
    setCertificationedit(res.data.scertification);
  };

  let updatelist = [];
  updatelist = certificationedit?.updatedby;
  updatelist?.map((item) => {
    console.log(item.name);
    console.log(item.date);
  })



  // Excel
  const fileName = "Certificate";

  const [branchData, setBranchData] = useState([]);
  let excelno = 1;
  // get particular columns for export excel
  const getexcelDatas = async () => {
    let response = await axios.get(SERVICE.CERTIFICATION, {
      //  headers: {
      //      'Authorization': `Bearer ${auth.APIToken}`
      //  },
    });
    var data = response.data.certifications.map(t => ({
      Sno: excelno++, Name: t.name
    }));
    setBranchData(data);
  }

  //print...
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Certifications',
    pageStyle: 'print'
  });

  //add function......
  const sendRequest = async () => {
    try {
      let certifications_data = await axios.post(SERVICE.CERTIFICATION_CREATE, {
        // headers: {
        //     'Authorization':`Bearer ${auth.APIToken}`
        //     },
        name: String(certification.name),
        addedby: String(username),
      })
      setCertification(certifications_data.data)
      setCertification({ name: "", addedby: "", updatedby: "" })
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

  //id for login...
  const [aid, setAid] = useState([]);
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

  //floor updateby edit page...
  let updateby = certificationedit.updatedby;
  console.log(certificationedit.updatedby, 'updatedvalue');


  //edit post call
  let unit_id = getrowid._id
  const sendRequestEdit = async () => {
    try {
      let certifications_data = await axios.put(`${SERVICE.CERTIFICATION_SINGLE}/${unit_id}`, {
        // headers: {
        //     'Authorization':`Bearer ${auth.APIToken}`
        //     },
        name: String(certificationedit.name),
        addedby: String(username),
        updatedby: [
          ...updateby, {
            name: String(username),
            date: String(new Date()),

          },
        ],

      });
      setCertificationedit(certifications_data.data);
      handleCloseModEdit();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (certification.name === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
          <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter Name"}</p>
        </>
      );
      handleClickOpenerr();
    } else {
      sendRequest();
    }

  }

  const editSubmit = (e) => {
    e.preventDefault();
    sendRequestEdit();
  }


  useEffect(
    () => {
      fetchUnits();
      getexcelDatas();
      // getCodea();
      getusername();
    }
  );

  let certificatesLength = certifications.length;
  useEffect(
    () => {
      selectPageHandler();
    }
  );

  const selectPageHandler = (selPage) => {
    if (selPage >= 1 && selPage <= (Math.ceil(certifications.length / (Number(entries)))) && selPage !== pages)
      setPages(selPage)

  }

  let total = 0;



  return (
    <Box>
      {/* ****** Header Content ****** */}
      <Typography sx={userStyle.HeaderText}>
        Certification
      </Typography>
      <Box sx={userStyle.container}>
        <Typography sx={userStyle.SubHeaderText}>Create Certification</Typography>
        <>
          <br /> <br />
          <Grid container spacing={2}>
            <Grid item md={6} sm={12} sx={12}>
              <FormControl fullWidth size="small" >
                <Typography>Name</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={certification.name}
                  onChange={(e) => { setCertification({ ...certification, name: e.target.value }) }}
                />
              </FormControl>
            </Grid>

          </Grid>
          <br />
          <Grid item md={6} sm={12} sx={12}>
            <Button variant="contained" style={{ marginLeft: "55em" }} onClick={handleSubmit}>Create</Button>
          </Grid>
        </>
      </Box>
      <br />
      {/* ****** Table Start ****** */}
      <>
        <Box sx={userStyle.container}>
          <Typography sx={userStyle.HeaderText}>
            Certification List
          </Typography>
          { /* ****** Header Buttons ****** */}
          <Grid container sx={{ justifyContent: "center" }} >
            <Grid >

              <ExportCSV csvData={branchData} fileName={fileName} />

              <ExportXL csvData={branchData} fileName={fileName} />

              <Button sx={userStyle.buttongrp} onClick={handleprint} >&ensp;<FaPrint />&ensp;Print&ensp;</Button>

              <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}><FaFilePdf />&ensp;Export to PDF&ensp;</Button>

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
                  <MenuItem value={(certifications.length)}>All</MenuItem>
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

            >
              <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                  {/* <StyledTableCell>Sno</StyledTableCell> */}
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody align="left">
              {filteredData &&
                  (filteredData.slice((pages * entries - entries < certificatesLength ? pages * entries - entries : 0),
                    ((pages * entries - entries <= certificatesLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                      <StyledTableRow key={index}>
                        {/* <StyledTableCell>{total = ((pages * entries - entries + index + 1))}</StyledTableCell> */}
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <Grid sx={{ display: 'flex' }}>
                          <Button sx={userStyle.buttonedit} onClick={() => {
                            handleClickOpenEdit();
                            getCode(row._id)
                          }}><EditOutlinedIcon style={{ fontsize: 'large' }} /></Button>
                          <Button sx={userStyle.buttondelete} onClick={(e) => { handleClickOpen(); rowData(row._id) }}><DeleteOutlineOutlinedIcon style={{ fontSize: 'large' }} /></Button>
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
                {(pages * entries - entries <= certificatesLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                {/* {(pages * entries - entries + 1)}  */}
                to {(pages * entries) > certifications.length ? certifications.length : ((pages * entries))} of {certifications.length} entries</Typography>  </Box>
            <Box>
              {certifications && <Typography className="Pagination">
                <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(pages - 1) }}>prev</Button>

                {[...Array(Math.ceil(certifications.length / Number(entries)))].map((_, i) => {
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
      {/* Delete Modal */}
      <Box>
        {/* ALERT DIALOG */}

      </Box>
      <Box>
        {/* ALERT DIALOG */}
        <Dialog
          open={isEditOpen}
          onClose={handleCloseModEdit}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box sx={userStyle.container}>
            <>
              <Typography sx={userStyle.SubHeaderText}>Certifications unit</Typography>
              <br />    <br />
              <Grid container spacing={2}>
                <Grid item md={12} sm={12} sx={12}>
                  <FormControl fullWidth size="small" >
                    <Typography>Name</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={certificationedit.name}
                      onChange={(e) => { setCertificationedit({ ...certificationedit, name: e.target.value }) }}
                    />
                  </FormControl>
                </Grid>
              </Grid> <br /> <br />
              <Grid container>
                <br />
                <Grid item md={0.3}></Grid>
                <Button variant="contained" onClick={editSubmit} >Update</Button>
                <Grid item md={0.4}></Grid>
                <Button sx={userStyle.btncancel} onClick={handleCloseModEdit} >Cancel</Button>
              </Grid>

            </>
          </Box>
        </Dialog>
      </Box>
      <Box>
        <>
          <Box>
            {/* ALERT DIALOG */}
            <Dialog
              open={isDeleteOpen}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
                <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} />
                <Typography variant="h5" sx={{ color: 'red', textAlign: 'center' }}>Are you sure?</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} sx={userStyle.btncancel}>Cancel</Button>
                <Button onClick={(e) => delUnit(unitid)} autoFocus variant="contained" color='error'> OK </Button>
              </DialogActions>
            </Dialog>
            {/* print layout */}
            <TableContainer component={Paper} sx={userStyle.printcls}>
              <Table sx={{ minWidth: 700, }} aria-label="customized table" id="usertable" ref={componentRef}>
                <TableHead sx={{ fontWeight: "600" }}>
                  <StyledTableRow>
                    <StyledTableCell> Sno</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody align="left">
                  {certifications &&
                    (certifications.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{printsno++}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                      </StyledTableRow>
                    )))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
        {/* ALERT DIALOG */}
        {/* view model */}
        <Dialog
          open={openview}
          onClose={handleClickOpenview}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box sx={{ width: "350px", padding: '20px 50px' }}>
            <>
              <Typography sx={userStyle.HeaderText}> View Certification</Typography>
              <br /> <br />
              <Grid container spacing={2}>
                <Grid item md={12} xs={12} sm={12} >
                  <FormControl fullWidth size="small">
                    <Typography variant="h6"> Name</Typography>
                    <Typography>{certificationedit.name}</Typography>
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
              <Typography sx={userStyle.HeaderText}> Info</Typography>
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
                          <td>{sino++}.</td><br/>
                         <td>{item.name}</td> <br/>
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
    </Box>
  );
}

export default Certification;