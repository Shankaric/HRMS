import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, Dialog, Select, MenuItem, TableBody, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button, } from "@mui/material";
import { userStyle } from "../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import jsPDF from "jspdf";
import 'jspdf-autotable'
import { useReactToPrint } from "react-to-print";
import { SERVICE } from '../../services/Baseservice';
import axios from "axios";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import moment from 'moment-timezone';


function Floor() {
  const [floor, setFloor] = useState({
    branch: "",
    code: "",
    name: "",
  });
  const [floors, setFloors] = useState([]);
  const [floorsid, setfloorsid] = useState({});
  const [branches, setBranches] = useState([]);
  const [entries, setEntries] = useState(1);
  const [pages, setPages] = useState(1);
  const [username, setUsername] = useState("");

  const userData = {
    name: username,
    date: new Date(),
  };
  console.log(userData);

  // Send userData to backend server
  // Use appropriate database query language to insert userData into database


  console.log(localStorage);

  let printsno = 1;
  //si.no for updated by 
  let sino = 1;

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
  const [showAlert, setShowAlert] = useState();
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

  const [deletefloor, setDeletefloor] = useState("");

  //set function to get particular row...
  const rowData = async (id) => {
    try {
      let res = await axios.get(`${SERVICE.FLOOR_SINGLE}/${id}`, {
        // headers: {
        //     'Authorization': `Bearer ${auth.APIToken}`
        // }
      });
      setDeletefloor(res.data.sfloor);
    } catch (err) { }
  };


  // Alert delete popup
  let floorid = deletefloor._id;
  const delFloor = async () => {
    try {
      await axios.delete(
        `${SERVICE.FLOOR_SINGLE}/${floorid}`,
        {
          // headers: {
          //     'Authorization': `Bearer ${auth.APIToken}`
          // }
        }
      );
      handleCloseMod();
    } catch (err) {
      console.log(err.response.data.errorMessage)
    }
  };

  //datatable....
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = floors.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );


  //add function....
  const sendRequest = async () => {
    try {
      let floorscreate = await axios.post(
        SERVICE.FLOOR_CREATE,
        {
          branch: String(floor.branch),
          code: String(floor.code),
          name: String(floor.name),
          addedby: String(username),
        }
      );
      setFloor(floorscreate.data);
      setFloor({ branch: "", code: "", name: "" })
    } catch (error) {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "100px", color: "orange" }}
          />
          <p style={{ fontSize: "20px", fontWeight: 900 }}>
            {error.response.data.errorMessage}
          </p>
        </>
      );
      handleClickOpenerr();
    }
  };

  //submit option for saving
  const handleSubmit = (e) => {
    e.preventDefault();
    if (floor.branch === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "100px", color: "orange" }}
          />
          <p style={{ fontSize: "20px", fontWeight: 900 }}>
            {"Please enter Branch name"}
          </p>
        </>
      );
      handleClickOpenerr();
    } else if (floor.code === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "100px", color: "orange" }}
          />
          <p style={{ fontSize: "20px", fontWeight: 900 }}>
            {"Please enter Code"}
          </p>
        </>
      );
      handleClickOpenerr();
    } else if (floor.name === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "100px", color: "orange" }}
          />
          <p style={{ fontSize: "20px", fontWeight: 900 }}>
            {"Please enter Name"}
          </p>
        </>
      );
      handleClickOpenerr();
    } else {
      sendRequest();
    }
  };

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

  //id for login...;
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

  //get localstorage....


  //get single row to edit....
  const getCode = async (e) => {
    let res = await axios.get(`${SERVICE.FLOOR_SINGLE}/${e}`, {});
    setfloorsid(res.data.sfloor);
  };


  // get single row to view....
  const getviewCode = async (e) => {
    let res = await axios.get(`${SERVICE.FLOOR_SINGLE}/${e}`, {});
    setfloorsid(res.data.sfloor);
  };

  // get single row to view....
  const getinfoCode = async (e) => {
    let res = await axios.get(`${SERVICE.FLOOR_SINGLE}/${e}`, {});
    setfloorsid(res.data.sfloor);
  };

  let updatelist = [];
  updatelist = floorsid?.updatedby;
  updatelist?.map((item) => {
    console.log(item.name);
    console.log(item.date);
  })


  //floor updateby edit page...
  let updateby = floorsid.updatedby;
  console.log(updateby, 'updatevalue');

  //editing the single data...
  let flooresid = floorsid._id;
  const sendEditRequest = async () => {
    try {
      let res = await axios.put(
        `${SERVICE.FLOOR_SINGLE}/${flooresid}`,
        {
          branch: String(floorsid.branch),
          code: String(floorsid.code),
          name: String(floorsid.name),
          addedby: String(username),
          updatedby: [
            ...updateby, {
              name: String(username),
              date: String(new Date()),

            },
          ],
        }
      );
      setfloorsid(res.data);
      handleCloseModEdit();
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const editSubmit = (e) => {
    e.preventDefault();
    sendEditRequest();
  };


  //get all floors.
  const fetchAllFloor = async () => {
    try {
      let res_floor = await axios.get(
        SERVICE.FLOOR,
        {}
      );
      setFloors(res_floor.data.floors);
    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages);
    }
  };


  //get all branches.
  const fetchAllBranches = async () => {
    try {
      let res_floor = await axios.get(SERVICE.BRANCH);
      setBranches(res_floor.data.branch);
    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages);
    }
  };


  //pdf
  const columns = [
    { title: "Branch", field: "branch" },
    { title: "Name", field: "name" },
    { title: "Code", field: "code" },
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: floors,
    });
    doc.save("Floor.pdf");
  };

  //print...
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Floor",
    pageStyle: "print",
  });

  // Excel
  const fileName = "floors";

  const [floorData, setFloorData] = useState([]);
  let excelno = 1;

  // // get particular columns for export excel
  const getexcelDatas = async () => {
    let response = await axios.get(SERVICE.FLOOR, {
      //  headers: {
      //      'Authorization': `Bearer ${auth.APIToken}`
      //  },
    });
    var data = response.data.floors.map((t) => ({
      Sno: excelno++,
      branch: t.branch,
      code: t.code,
      name: t.name,
    }));
    setFloorData(data);
  };


  //set function to get particular row
  useEffect(() => {
    fetchAllFloor();
    getexcelDatas();
    fetchAllBranches();
    getusername();
  });

  let floorLength = floors.length;
  useEffect(
    () => {
      selectPageHandler();
    }
  );
  //datatable functionality..
  const selectPageHandler = (selPage) => {
    if (selPage >= 1 && selPage <= (Math.ceil(floors.length / (Number(entries)))) && selPage !== pages)
      setPages(selPage)
  };

  let total = 0;

  return (
    <Box>
      {/* ****** Header Content ****** */}
      <Typography sx={userStyle.HeaderText}>Floor </Typography>
      <Box sx={userStyle.container}>
        <>
          <Typography sx={userStyle.importheadtext}>Manage Floor </Typography>
          <br /><br />
          <Grid container sx={{ justifyContent: "center" }} spacing={1}>
            <Grid item lg={3} md={3} sx={12}>
              <Typography>Branch</Typography>
              <FormControl size="small" fullWidth>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={floor.branch}
                  onChange={(e, i) => {
                    setFloor({
                      ...floor,
                      branch: e.target.value,
                    });
                  }}
                >
                  {branches &&
                    branches.map((row) => (
                      <MenuItem value={row.name}>{row.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={3} sx={12}>
              <FormControl fullWidth size="small">
                <Typography>Code</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={floor.code}
                  onChange={(e) => {
                    setFloor({ ...floor, code: e.target.value });
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item md={3} sx={12}>
              <FormControl fullWidth size="small">
                <Typography>Name</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={floor.name}
                  onChange={(e) => {
                    setFloor({ ...floor, name: e.target.value });
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2} marginTop={3}>
              <Button
                variant="contained"
                color="primary"
                sx={{ display: "flex" }}
                onClick={handleSubmit}
              >
                Create New
              </Button>
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

                <Typography sx={userStyle.SubHeaderText}>
                  Edit Floor
                </Typography>

              </Grid>
              <br />
              <Grid container spacing={1}>
                <Grid item lg={12} md={12} xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <Typography>Branch</Typography>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={floorsid.branch}
                      onChange={(e, i) => {
                        setfloorsid({
                          ...floorsid,
                          branch: e.target.value,
                        });
                      }}
                    >
                      {branches &&
                        branches.map((row) => (
                          <MenuItem value={row.name}>{row.name}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item lg={12} md={12} xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <Typography>Code</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={floorsid.code}
                      onChange={(e) => {
                        setfloorsid({ ...floorsid, code: e.target.value });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={12} md={12} xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <Typography>Name</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={floorsid.name}
                      onChange={(e) => {
                        setfloorsid({ ...floorsid, name: e.target.value });
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br />   <br />
              <Grid container spacing={2}>
                <Grid item lg={4} md={4} xs={12} sm={12}>
                  <Button variant="contained" onClick={editSubmit}> Update</Button>
                </Grid>
                <Grid item lg={4} md={4} xs={12} sm={12}>
                  <Button sx={userStyle.btncancel} onClick={handleCloseModEdit}>  Cancel</Button>
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
          <Grid item xs={8}>
            <Typography sx={userStyle.importheadtext}>Floor List</Typography>
          </Grid>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid>
              <ExportCSV csvData={floorData} fileName={fileName} />
              <ExportXL csvData={floorData} fileName={fileName} />
              <Button sx={userStyle.buttongrp} onClick={handleprint}>
                &ensp;
                <FaPrint />
                &ensp;Print&ensp;
              </Button>
              <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}>
                <FaFilePdf />
                &ensp;Export to PDF&ensp;
              </Button>
            </Grid>
          </Grid>
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
                  <MenuItem value={(floors.length)}>All</MenuItem>
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
              sx={{ minWidth: 700 }}
              aria-label="customized table"
              id="usertable"
            >
              <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                  {/* <StyledTableCell> SI.No</StyledTableCell> */}
                  <StyledTableCell>Branch</StyledTableCell>
                  <StyledTableCell>Code</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody align="left">
                {filteredData &&
                  (filteredData.slice((pages * entries - entries < floorLength ? pages * entries - entries : 0),
                    ((pages * entries - entries <= floorLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                      <StyledTableRow key={index}>
                        {/* <StyledTableCell>{total = ((pages * entries - entries + index + 1))}</StyledTableCell> */}
                        <StyledTableCell>{row.branch}</StyledTableCell>
                        <StyledTableCell>{row.code}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell component="th" scope="row" colSpan={1}>
                          <Grid sx={{ display: "flex" }}>
                            <Button
                              sx={userStyle.buttonedit}
                              onClick={() => {
                                handleClickOpenEdit();
                                getCode(row._id);
                              }}
                            >
                              <EditOutlinedIcon style={{ fontsize: "large" }} />
                            </Button>
                            <Button
                              sx={userStyle.buttondelete}
                              onClick={(e) => {
                                handleClickOpen();
                                rowData(row._id);
                              }}
                            >
                              <DeleteOutlineOutlinedIcon
                                style={{ fontsize: "large" }}
                              />
                            </Button>
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
                {(pages * entries - entries <= floorLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                {/* {(pages * entries - entries + 1)}  */}
                to {(pages * entries) > floors.length ? floors.length : ((pages * entries))} of {floors.length} entries</Typography>  </Box>
            <Box>
              {floors && <Typography className="Pagination">
                <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(pages - 1) }}>prev</Button>

                {[...Array(Math.ceil(floors.length / Number(entries)))].map((_, i) => {
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
          <DialogContent
            sx={{ width: "350px", textAlign: "center", alignItems: "center" }}
          >
            <ErrorOutlineOutlinedIcon
              sx={{ fontSize: "80px", color: "orange" }}
            />
            <Typography variant="h5" sx={{ color: "red", textAlign: "center" }}>
              Are you sure?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMod} sx={userStyle.btncancel}>
              Cancel
            </Button>
            <Button
              autoFocus
              variant="contained"
              color="error"
              onClick={(e) => delFloor(floorid)}
            >
              {" "}
              OK{" "}
            </Button>
          </DialogActions>
        </Dialog>
        {/* print layout */}
        <TableContainer component={Paper} sx={userStyle.printcls}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
            id="usertable"
            ref={componentRef}
          >
            <TableHead sx={{ fontWeight: "600" }}>
              <StyledTableRow>
                <StyledTableCell> SI.No</StyledTableCell>
                <StyledTableCell>Branch</StyledTableCell>
                <StyledTableCell>Code</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                {/* <StyledTableCell>Action</StyledTableCell> */}
              </StyledTableRow>
            </TableHead>
            <TableBody align="left">
              {floors &&
                floors.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{printsno++}</StyledTableCell>
                    <StyledTableCell>{row.branch}</StyledTableCell>
                    <StyledTableCell>{row.code}</StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                ))}
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
            <Typography sx={userStyle.HeaderText}> View Company</Typography>
            <br /> <br />
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Branch</Typography>
                  <Typography>{floorsid.branch}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Code</Typography>
                  <Typography>{floorsid.code}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Name</Typography>
                  <Typography>{floorsid.name}</Typography>
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
            <Typography sx={userStyle.HeaderText}> Info </Typography>
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
          <DialogContent
            sx={{ width: "350px", textAlign: "center", alignItems: "center" }}
          >
            {/* <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} /> */}
            <Typography variant="h6">{showAlert}</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleCloseerr}>
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Floor;