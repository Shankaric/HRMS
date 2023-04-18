import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, Dialog, Select, MenuItem, TableBody, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button } from "@mui/material";
import { userStyle } from "../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import { SERVICE } from '../../services/Baseservice';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import axios from "axios";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useReactToPrint } from "react-to-print";
import moment from 'moment-timezone';


function Area() {

  const [area, setArea] = useState({
    code: "",
    name: "", addedby: ""
  });
  const [areas, setAreas] = useState([]);
  const [areatid, setAreatid] = useState({ code: "", name: "", addedby: "", updateby: [] });
  const [entries, setEntries] = useState(1);
  const [pages, setPages] = useState(1);
  //its a username added details
  const [username, setUsername] = useState("");

  //updated by field..
  let sino = 1;
  let printsno = 1;

  //updatedby details data
  const userData = {
    name: username,
    date: new Date(),
  };

  console.log(userData);

  // Error Popup model
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [showAlert, setShowAlert] = useState();
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


  //get all areas.
  const fetchAllArea = async () => {
    try {
      let res_area = await axios.get(SERVICE.AREAS, {});
      setAreas(res_area.data.areas);

    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages)
    }
  };

  //set function to get particular row
  const [deletearea, setDeletearea] = useState({});
  const rowData = async (id) => {
    try {
      let res = await axios.get(`${SERVICE.AREA_SINGLE}/${id}`, {
        // headers: {
        //     'Authorization': `Bearer ${auth.APIToken}`
        // }
      });
      setDeletearea(res.data.sarea);
    } catch (err) { }
  };
  // Alert delete popup
  let areaid = deletearea._id;

  // let oldupdateby = deletearea;
  const delArea = async () => {
    try {
      await axios.delete(
        `${SERVICE.AREA_SINGLE}/${areaid}`, {});
      handleCloseMod();
    } catch (err) { }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = areas.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  //add function...
  const sendRequest = async () => {
    try {
      let areas = await axios.post(SERVICE.AREA_CREATE, {
        code: String(area.code),
        name: String(area.name),
        addedby: String(username),
      });
      setArea(areas);
      setArea({ code: "", name: "" });
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
    if (area.code === "") {
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
    } else if (area.name === "") {
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


  //id for login...

  let loginid = localStorage.LoginUserId;
  // console.log(localStorage);

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
  // console.log(username);


  //get single row to edit....
  const getCode = async (e) => {
    let res = await axios.get(`${SERVICE.AREA_SINGLE}/${e}`, {});
    setAreatid(res.data.sarea);
  };

  //updated by data added
  let updateby = areatid.updatedby;
  // console.log(areatid.updatedby, 'areatidupdatedby')

  // get single row to view....
  const getviewCode = async (e) => {
    let res = await axios.get(`${SERVICE.AREA_SINGLE}/${e}`, {});
    setAreatid(res.data.sarea);
  };

  // get single row to view....
  const getinfoCode = async (e) => {
    let res = await axios.get(`${SERVICE.AREA_SINGLE}/${e}`, {});
    setAreatid(res.data.sarea);
  };

  let updatelist = [];
  updatelist = areatid?.updatedby;
  updatelist?.map((item) => {
    console.log(item.name)
    console.log(item.date)
  })
  // console.log(areatid, 'areatid')
  let areasid = areatid._id;

  //editing the single data...
  const sendEditRequest = async () => {
    try {
      let res = await axios.put(
        `${SERVICE.AREA_SINGLE}/${areasid}`,
        {
          code: String(areatid.code),
          name: String(areatid.name),
          addedby: String(username),
          updatedby: [
            ...updateby, {
              name: String(username),
              date: String(new Date()),
            },
          ],
        }
      );
      setAreatid(res.data);
      handleCloseModEdit();
    } catch (err) {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "100px", color: "orange" }}
          />
          <p style={{ fontSize: "20px", fontWeight: 900 }}>
            {err.response.data.errorMessage}
          </p>
        </>
      );
      handleClickOpenerr();
    }
  };
  const editSubmit = (e) => {
    e.preventDefault();
    sendEditRequest();
  };


  //pdf....
  const columns = [
    // { title: "SNo", field: "sno" },
    { title: "Code", field: "code" },
    { title: "Name", field: "name" },
  ];
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: areas,
    });
    doc.save("Area.pdf");
  };

  // Excel
  const fileName = "areas";

  const [areaData, setAreaData] = useState([]);

  let excelno = 1;

  // get particular columns for export excel
  const getexcelDatas = async () => {
    let response = await axios.get(SERVICE.AREAS, {
      //  headers: {
      //      'Authorization': `Bearer ${auth.APIToken}`
      //  },
    });
    var data = response.data.areas.map((t) => ({
      Sno: excelno++,
      code: t.code,
      name: t.name,
    }));
    setAreaData(data);
  };

  //print...
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Area",
    pageStyle: "print",
  });

  useEffect(() => {
    fetchAllArea();
    getexcelDatas();
    getusername();
  });

  let areasLength = areas.length;
  useEffect(
    () => {
      selectPageHandler();
    }
  );

  const selectPageHandler = (selPage) => {
    if (selPage >= 1 && selPage <= (Math.ceil(areas.length / (Number(entries)))) && selPage !== pages)
      setPages(selPage)

  }

  let total = 0;

  return (
    <Box>
      {/* ****** Header Content ****** */}
      <Typography sx={userStyle.HeaderText}>Area </Typography>
      <Box sx={userStyle.container}>
        <>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography sx={userStyle.importheadtext}>Manage Area</Typography>
            </Grid>
          </Grid>
          <br />
          <Grid container sx={{ justifyContent: "center" }} spacing={1}>
            <Grid item md={3} sx={12}>
              <FormControl fullWidth size="small">
                <Typography>Code</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={area.code}
                  onChange={(e) => {
                    setArea({ ...area, code: e.target.value });
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
                  value={area.name}
                  onChange={(e) => {
                    setArea({ ...area, name: e.target.value });
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
        {/* edit model */}
        <Dialog
          open={isEditOpen}
          onClose={handleCloseModEdit}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box sx={userStyle.container}>
            <>
              <Grid container spacing={2}>

                <Typography sx={userStyle.importheadtext}>
                  Manage Area
                </Typography>

              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid item md={12} xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <Typography>Code</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={areatid.code}
                      onChange={(e) => {
                        setAreatid({ ...areatid, code: e.target.value });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <Typography>Name</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={areatid.name}
                      onChange={(e) => {
                        setAreatid({ ...areatid, name: e.target.value });
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br /> <br />
              <Grid container spacing={2}>
                <Grid item md={4} xs={12} sm={12}>
                  <Button variant="contained" onClick={editSubmit}>  Update</Button>
                </Grid>
                <Grid item md={4} xs={12} sm={12}>
                  <Button sx={userStyle.btncancel} onClick={handleCloseModEdit}> Cancel </Button>
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
          {/* ******************************************************EXPORT Buttons****************************************************** */}
          {/*       
          <Box sx={userStyle.container} > */}
          <Grid item xs={8}>
            <Typography sx={userStyle.importheadtext}>Area List</Typography>
          </Grid>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid>
              <ExportCSV csvData={areaData} fileName={fileName} />

              <ExportXL csvData={areaData} fileName={fileName} />

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
                  <MenuItem value={(areas.length)}>All</MenuItem>
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
            // ref={tableRef}
            >
              <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                  {/* <StyledTableCell>SI.No</StyledTableCell> */}
                  <StyledTableCell>Code</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filteredData &&
                  (filteredData.slice((pages * entries - entries < areasLength ? pages * entries - entries : 0),
                    ((pages * entries - entries <= areasLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                      <StyledTableRow key={index}>
                        {/* <StyledTableCell>{total = ((pages * entries - entries + index + 1))}</StyledTableCell> */}
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
                {(pages * entries - entries <= areasLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                {/* {(pages * entries - entries + 1)}  */}
                to {(pages * entries) > areas.length ? areas.length : ((pages * entries))} of {areas.length} entries</Typography>  </Box>
            <Box>
              {areas && <Typography className="Pagination">
                <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(pages - 1) }}>prev</Button>

                {[...Array(Math.ceil(areas.length / Number(entries)))].map((_, i) => {
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
              onClick={(e) => delArea(areaid)}
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
                <StyledTableCell>Code</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody >
              {areas &&
                areas.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{printsno++}</StyledTableCell>
                    <StyledTableCell>{row.code}</StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* view model */}
      {/* edit model */}
      <Dialog
        open={openview}
        onClose={handleCloseview}
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
                  <Typography variant="h6">Code</Typography>
                  <Typography >{areatid.code}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12} sm={12}>
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Name</Typography>
                  <Typography>{areatid.name}</Typography>
                </FormControl>
              </Grid>
            </Grid>
            <br /> <br /><br />
            <Grid container spacing={2}>
              <Button variant="contained" onClick={handleCloseview}> Back </Button>
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

export default Area;