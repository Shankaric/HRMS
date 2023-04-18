import React, { useState, useEffect, useRef } from 'react';
import { Box, Table, TableBody, TableContainer, Select, MenuItem, TableHead, DialogActions, Dialog, DialogContent, OutlinedInput, Paper, Button, Grid, Typography, FormControl } from '@mui/material';
import { FaPrint, FaFilePdf } from 'react-icons/fa';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { userStyle } from '../../pageStyle';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useReactToPrint } from "react-to-print";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import jsPDF from "jspdf";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import 'jspdf-autotable';
import axios from 'axios';
import { SERVICE } from '../../services/Baseservice';
// import Headtitle from '../../components/header/Headtitle';
// import { UserRoleAccessContext } from '../../context/Appcontext';
import { format } from 'date-fns';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import moment from 'moment-timezone';



function Designationgroup() {

  // const { auth, setAuth } = useContext(AuthContext);
  // const { isUserRoleCompare } = useContext(UserRoleAccessContext);

  const [designationgroup, setDesignationgroup] = useState({
    name: ""

  });
  const [desiggroup, setDesiggroup] = useState([]);
  const [entries, setEntries] = useState(1);
  const [pages, setPages] = useState(1);
  const [username, setUsername] = useState("");

  let sino = 1;
  let printsno = 1;

  const userData = {
    name: username,
    date: new Date(),
  };
  console.log(userData);




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


  //Delete model
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleClickOpen = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseMod = () => {
    setIsDeleteOpen(false);
  };

  // get all designation
  const fetchDesignationgroup = async () => {
    try {
      let res_designationgroup = await axios.get(SERVICE.DESIGNATIONGRP, {
      });
      setDesiggroup(res_designationgroup.data.desiggroup);
    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages);
    }
  }


  // const { auth, setAuth } = useContext(AuthContext);
  // const { isUserRoleCompare } = useContext(UserRoleAccessContext);
  const [deletedesignationgrp, setDeletedesignationgrp] = useState({});
  //  PDF
  const columns = [

    { title: "Designation Group name", field: "name" },
  ]

  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body: desiggroup,
    })
    doc.save('designationgroup.pdf')
  }


  // Excel
  const fileName = "Designationgroup";

  const [exceldata, setExceldata] = useState([]);

  // get particular columns for export excel
  const getexcelDatas = async () => {
    let response = await axios.get(SERVICE.DESIGNATIONGRP, {
      //  headers: {
      //      'Authorization': `Bearer ${auth.APIToken}`
      //  },
    });
    var data = response.data.desiggroup.map(t => ({
      "Designation Group name": t.name,
    }));
    setExceldata(data);
  }

  // Print
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Designationgroup',
    pageStyle: 'print'
  });




  //set function to get particular row
  const rowData = async (id) => {
    try {
      let res = await axios.get(`${SERVICE.DESIGNATIONGRP_SINGLE}/${id}`, {
        // headers: {
        //     'Authorization': `Bearer ${auth.APIToken}`
        // }
      });
      setDeletedesignationgrp(res.data.sdesiggroup);
    } catch (err) {
    }
  }

  // Alert delete popup
  let designationgrpid = deletedesignationgrp._id;
  const delDesignationgrp = async () => {
    try {
      await axios.delete(`${SERVICE.DESIGNATIONGRP_SINGLE}/${designationgrpid}`, {
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
  const filteredData = desiggroup.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  //this is add database
  const sendRequest = async () => {
    try {
      let designationgrp = await axios.post(SERVICE.DESIGNATIONGRP_CREATE, {
        // headers: {
        //     'Authorization':`Bearer ${auth.APIToken}`
        //     }

        name: String(designationgroup.name),
        addedby: String(username),


      })
      setDesignationgroup(designationgrp.data)
      setDesignationgroup({ name: "" })
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  //id for login...
  const [aid, setAid] = useState([]);
  let loginid = localStorage.LoginUserId;
  console.log(localStorage);

  const handleSubmit = (e) => {
    sendRequest();
  }

  //get single row to edit....
  const getCodea = async () => {
    try {
      let res = await axios.get(`${SERVICE.AREA_SINGLE}/${loginid}`, {
      })
      setAid(res.data.sarea)
    }
    catch (err) {
      console.log(err.response.data.errormessage)
    }
    // console.log(res.data.sarea)
  }

  //get user row  edit  function
  const getusername = async () => {
    try {
      let res = await axios.get(`${SERVICE.USER}`)
      let user = res.data.users.filter((data) => {
        if (loginid == data._id) {
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


  useEffect(
    () => {
      fetchDesignationgroup();
      getexcelDatas();
      getCodea();
      getCodea();
      getusername();
    }
  );


  useEffect(
    () => {
      selectPageHandler();
    }
  );

  const selectPageHandler = (selPage) => {
    if (selPage >= 1 && selPage <= (Math.ceil(desiggroup.length / (Number(entries)))) && selPage !== pages)
      setPages(selPage)
  };
  let total = 0;

  const [getrowid, setRowGetid] = useState('');

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

  //Edit functiona --->> getCode, sendEditRequest , editSubmit
  const [desiggrpid, setDesiggrpid] = useState({
    name: ""

  })

  //get single row to edit
  const getCode = async (e) => {
    let res = await axios.get(`${SERVICE.DESIGNATIONGRP_SINGLE}/${e}`, {
    })
    setDesiggrpid(res.data.sdesiggroup)
    setRowGetid(res.data.sdesiggroup)
  }
  // get single row to view....
  const getviewCode = async (e) => {
    let res = await axios.get(`${SERVICE.DESIGNATIONGRP_SINGLE}/${e}`, {});
    setDesiggrpid(res.data.sdesiggroup);
  };

  // get single row to view....
  const getinfoCode = async (e) => {
    let res = await axios.get(`${SERVICE.DESIGNATIONGRP_SINGLE}/${e}`, {});
    setDesiggrpid(res.data.sdesiggroup);
  };

  let updatelist = [];
  updatelist = desiggrpid?.updatedby;
  updatelist?.map((item) => {
    console.log(item.name);
    console.log(item.date);
  })

  //floor updateby edit page...
  let updateby = desiggrpid.updatedby;
  console.log(desiggrpid.updatedby, 'updatedvalue');

  let desiggroupid = getrowid._id;
  //editing the single data 
  const sendEditRequest = async () => {
    try {
      let res = await axios.put(`${SERVICE.DESIGNATIONGRP_SINGLE}/${desiggroupid}`, {
        name: String(desiggrpid.name),
        addedby: String(username),
        updatedby: [
          ...updateby, {
            name: String(username),
            date: String(new Date()),

          },
        ],

      });
      setDesignationgroup(res.data);
      handleCloseModEdit();
    } catch (err) {
      console.log(err.data.message)
    }
  }

  const editSubmit = (e) => {
    e.preventDefault();
    sendEditRequest(e);
  }

  let designationgroupLength = desiggroup.length;
  useEffect(
    () => {
      fetchDesignationgroup();
      getexcelDatas();
    })




  return (
    <Box>
      {/* <Headtitle title={'Designation Group'} /> */}
      <Typography sx={userStyle.HeaderText}>Manage Designation Group<Typography sx={userStyle.SubHeaderText}></Typography></Typography>
      <Box sx={userStyle.container} >
        <Grid container lg={12} md={12} sm={12} xs={12} sx={{ justifyContent: "center" }} spacing={1}>
          <Grid item lg={5} md={5}>
            <Grid container lg={12} md={12} >
              <Grid item lg={2} md={2}>
                {/* <Typography sx={{ marginTop: 1 }}>Name</Typography> */}
              </Grid>
              <Grid item lg={9} md={10} sx={{ display: 'flex' }}>
                {/* <Grid sx={userStyle.spanIcons}><CalendarMonthOutlinedIcon /></Grid> */}
                <FormControl fullWidth size="small" >
                  <Typography>Name</Typography>
                  <OutlinedInput
                    id="component-outlined"
                    type="text"
                    value={designationgroup.name}
                    onChange={(e) => { setDesignationgroup({ ...designationgroup, name: e.target.value }) }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={2} md={2} marginTop={3}>
            <Button variant='contained' color='primary' onClick={handleSubmit}>Create New</Button>
          </Grid>
        </Grid>
      </Box><br />

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
              <Typography sx={userStyle.SubHeaderText}>Edit Designation Group</Typography>
              <br /> <br />
              <Grid container spacing={2}  >
                <Grid item md={12} sx={12} >
                  <FormControl fullWidth size="small" >
                    <Typography>Name</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={desiggrpid.name}
                      onChange={(e) => { setDesiggrpid({ ...desiggrpid, name: e.target.value }) }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br />   <br />

              <Grid container spacing={2}>
                <Grid item md={6} xs={12} sm={12}>
                  <Button variant="contained" onClick={editSubmit}>Update</Button>
                </Grid>
                <Grid item md={6} xs={12} sm={12}>
                  <Button sx={userStyle.btncancel} onClick={handleCloseModEdit} >Cancel</Button>
                </Grid>


              </Grid>

            </>

          </Box>
        </Dialog>
      </Box>
      <br />

      {/* header text */}
      {/* content start */}
      <Box sx={userStyle.container}>
        {/* <Grid container sx={userStyle.gridcontainer}> */}
        <Typography sx={userStyle.HeaderText}>Designation Group List</Typography><br></br>
        { /* ****** Header Buttons ****** */}
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
                <MenuItem value={(desiggroup.length)}>All</MenuItem>
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
        <br /><br />
        <Box>
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 700, }} aria-label="customized table" id="usertable" >
              <TableHead>
                <StyledTableRow>
                  {/* <StyledTableCell>S.No</StyledTableCell> */}
                  <StyledTableCell >Group Name</StyledTableCell>
                  <StyledTableCell >Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody align="left">
              {filteredData &&
                  (filteredData.slice((pages * entries - entries < designationgroupLength ? pages * entries - entries : 0),
                    ((pages * entries - entries <= designationgroupLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                      <StyledTableRow key={index}>
                        {/* <StyledTableCell>{total = ((pages * entries - entries + index + 1))}</StyledTableCell> */}
                      <StyledTableCell >{row.name}</StyledTableCell>
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
                {(pages * entries - entries <= designationgroupLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                {/* {(pages * entries - entries + 1)}  */}
                to {(pages * entries) > desiggroup.length ? desiggroup.length : ((pages * entries))} of {desiggroup.length} entries</Typography>  </Box>
            <Box>
              {desiggroup && <Typography className="Pagination">
                <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(pages - 1) }}>prev</Button>

                {[...Array(Math.ceil(desiggroup.length / Number(entries)))].map((_, i) => {
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
        </Box>
      </Box>
      {/* content end */}
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
            onClick={(e) => delDesignationgrp(designationgrpid)}
          > OK </Button>
        </DialogActions>
      </Dialog>

      {/* view model */}
      <Dialog
        open={openview}
        onClose={handleClickOpenview}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ width: "350px", padding: '20px 50px' }}>
          <>
            <Typography sx={userStyle.HeaderText}> View Designation</Typography>
            <br /> <br />
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6"> Name</Typography>
                  <Typography>{desiggrpid.name}</Typography>
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
            <Typography sx={userStyle.HeaderText}> Manage Area</Typography>
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

      {/* print layout */}

      <TableContainer component={Paper} sx={userStyle.printcls}>
        <Table sx={{ minWidth: 700, }} aria-label="customized table" id="usertable" ref={componentRef}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell >Group Name</StyledTableCell>
              {/* <StyledTableCell >Action</StyledTableCell> */}
            </StyledTableRow>
          </TableHead>
          <TableBody align="left">
            {desiggroup &&
              (desiggroup.map((row, index) => (

                <StyledTableRow key={index}>
                  <StyledTableCell >{printsno++}</StyledTableCell>
                  <StyledTableCell >{row.name}</StyledTableCell>

                </StyledTableRow>
              )))}
          </TableBody>
        </Table>
      </TableContainer>


    </Box>
  );
}
export default Designationgroup;