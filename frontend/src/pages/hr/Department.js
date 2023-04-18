import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, Dialog, Select, MenuItem, DialogContent, DialogActions, FormControl, Checkbox, TextareaAutosize, Grid, FormGroup, FormControlLabel, Paper, Table, TableHead, TableContainer, Button, TableBody, } from "@mui/material";
import { userStyle } from "../../pageStyle";
import axios from "axios";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import jsPDF from "jspdf";
import 'jspdf-autotable'
import { useReactToPrint } from "react-to-print";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import $ from "jquery";
import { SERVICE } from "../../services/Baseservice";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import moment from 'moment-timezone';


function Department() {

  let sno = 1;
  let printsno = 1;
  const [depart, setDepart] = useState({
    deptname: "",
    descrip: "",
    deduction: "",
    era: "",
    penalty: "",
    prod: "",
    target: "",
    tax: "",
  });
  const [getrowid, setRowGetid] = useState("");
  const [deletebranch, setDeletebranch] = useState({});
  const [entries, setEntries] = useState(1);
  const [pages, setPages] = useState(1);
  const [username, setUsername] = useState("");

  const userData = {
    name: username,
    date: new Date(),
  };
  console.log(userData);

  let sino = 1;
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


  // Delete model
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  //handle click open and close functions
  const handleClickOpen = () => {
    setIsDeleteOpen(true);
  };
  const handleCloseMod = () => {
    setIsDeleteOpen(false);
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



  //edit function state...
  const [langid, setLangid] = useState({});
  //overall set functions
  const [department, setDeparttment] = useState([]);

  const sendRequest = async () => {
    try {
      let req = await axios.post(
        SERVICE.DEPARTMENT_CREATE,
        {
          deptname: String(depart.deptname),
          descrip: String(depart.descrip),
          deduction: Boolean(depart.deduction),
          era: Boolean(depart.era),
          penalty: Boolean(depart.penalty),
          prod: Boolean(depart.prod),
          target: Boolean(depart.target),
          tax: Boolean(depart.tax),
          addedby: String(username),
        }
      );
      setDepart(req.data);
      setDepart({
        deptname: "",
        descrip: "",
        deduction: "",
        era: "",
        penalty: "",
        prod: "",
        target: "",
        tax: "",
      });
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
    if (depart.deptname === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
          <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter Department Name"}</p>
        </>
      );
      handleClickOpenerr();
    }
    else {
      sendRequest();
    }
  };

  //fetching departments whole list
  const fetchDepartments = async () => {
    try {
      let dep = await axios.get(SERVICE.DEPARTMENT);
      setDeparttment(dep.data.departmentdetails);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //  PDF
  const columns = [
    { title: "Name", field: "deptname" },
    { title: "Description", field: "descrip" },
    { title: "Deduction", field: "deduction" },
    { title: "ERA", field: "era" },
    { title: "Penalty", field: "penalty" },
    { title: "Prod", field: "prod" },
    { title: "Target", field: "target" },
    { title: "Tax", field: "tax" },

  ]

  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body: department
    })
    doc.save('Department.pdf')
  }

  // Excel
  const fileName = "Department";

  const [exceldata, setExceldata] = useState([]);

  let excelno = 1;


  // get particular columns for export excel
  const getexcelDatas = async () => {
    let response = await axios.get(SERVICE.DEPARTMENT, {
      //  headers: {
      //      'Authorization': `Bearer ${auth.APIToken}`
      //  },
    });
    var data = response.data.departmentdetails.map(t => ({
      Sno: excelno++,
      deptname: t.deptname, descrip: t.descrip, deduction: t.deduction, era: t.era,
      penalty: t.penalty, prod: t.prod, target: t.target, tax: t.tax
    }));
    setExceldata(data);
  }

  // Print
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Department',
    pageStyle: 'print'
  });


  //set function to get particular row
  const rowData = async (id) => {
    try {
      let res = await axios.get(
        `${SERVICE.DEPARTMENT_SINGLE}/${id}`,
        {
          // headers: {
          //     'Authorization': `Bearer ${auth.APIToken}`
          // }
        }
      );
      setDeletebranch(res.data.sdepartmentdetails);
    } catch (err) { }
  };


  //id for login...
  const [aid, setAid] = useState([]);
  let loginid = localStorage.LoginUserId;
  console.log(localStorage);

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

  //get single row to edit
  const getCode = async (e) => {
    let res = await axios.get(
      `${SERVICE.DEPARTMENT_SINGLE}/${e}`,
      {}
    );
    setLangid(res.data.sdepartmentdetails);
    setRowGetid(res.data.sdepartmentdetails);
  };

  // get single row to view....
  const getviewCode = async (e) => {
    let res = await axios.get(`${SERVICE.DEPARTMENT_SINGLE}/${e}`, {});
    setLangid(res.data.sdepartmentdetails);
  };

  // get single row to view....
  const getinfoCode = async (e) => {
    let res = await axios.get(`${SERVICE.DEPARTMENT_SINGLE}/${e}`, {});
    setLangid(res.data.sdepartmentdetails);
  };

  let updatelist = [];
  updatelist = langid?.updatedby;
  updatelist?.map((item) => {
    console.log(item.name);
    console.log(item.date);
  })


  let deptid = getrowid._id;

  //department updateby edit page...
  let updateby = langid.updatedby;
  console.log(langid.updatedby, 'updatedvalue');

  //editing the single data
  const sendEditRequest = async () => {
    try {
      let res = await axios.put(
        `${SERVICE.DEPARTMENT_SINGLE}/${deptid}`,
        {
          deptname: String(langid.deptname),
          descrip: String(langid.descrip),
          deduction: Boolean(langid.deduction),
          era: Boolean(langid.era),
          penalty: Boolean(langid.penalty),
          prod: Boolean(langid.prod),
          target: Boolean(langid.target),
          tax: Boolean(langid.tax),
          addedby: String(username),
          updatedby: [
            ...updateby, {
              name: String(username),
              date: String(new Date()),

            },
          ],
        }
      );
      setLangid(res.data);
      handleCloseModEdit();
    } catch (err) {
      console.log(err.data.message);
    }
  };
  //update button
  const editSubmit = (e) => {
    e.preventDefault();

    sendEditRequest(e);
  };

  // Alert delete popup
  let branchid = deletebranch._id;
  const delBranch = async () => {
    try {
      await axios.delete(`${SERVICE.DEPARTMENT_SINGLE}/${branchid}`,
        {
          // headers: {
          //     'Authorization': `Bearer ${auth.APIToken}`
          // }
        }
      );
      handleCloseMod();
    } catch (err) { }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = department.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );


  useEffect(() => {
    fetchDepartments();
    getexcelDatas();
    getusername();
  });


  let departmentLength = department.length;
  useEffect(
    () => {
      selectPageHandler();
    }
  );

  const selectPageHandler = (selPage) => {
    if (selPage >= 1 && selPage <= (Math.ceil(department.length / (Number(entries)))) && selPage !== pages)
      setPages(selPage)


  }

  let total = 0;


  return (
    <Box>
      {/* <Headtitle title={"Department"} /> */}
      {/* ****** Header Content ****** */}
      <Typography sx={userStyle.HeaderText}>Manage Department</Typography>
      <Box sx={userStyle.container}>
        <Typography sx={userStyle.SubHeaderText}>Create Department </Typography>
        <br /> <br />
        <>
          <Grid container spacing={2}>
            <Grid item md={5} sx={12}>
              <Typography>Name</Typography>
              <FormControl fullWidth size="small">
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={depart.deptname}
                  onChange={(e) => {
                    setDepart({ ...depart, deptname: e.target.value });
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item md={7} sx={12}>
              <FormControl fullWidth size="small">
                <Typography>Description</Typography>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={5}
                  value={depart.descrip}
                  onChange={(e) => {
                    setDepart({ ...depart, descrip: e.target.value });
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item md={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={depart.deduction}
                      onChange={(e) =>
                        setDepart({ ...depart, deduction: !depart.deduction })
                      }
                    />
                  }
                  label="Deduction"
                />
              </FormGroup>
            </Grid>
            <Grid item md={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={depart.era}
                      onChange={(e) =>
                        setDepart({ ...depart, era: !depart.era })
                      }
                    />
                  }
                  label="ERA"
                />
              </FormGroup>
            </Grid>
            <Grid item md={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={depart.penalty}
                      onChange={(e) =>
                        setDepart({ ...depart, penalty: !depart.penalty })
                      }
                    />
                  }
                  label="Penalty"
                />
              </FormGroup>
            </Grid>
            <Grid item md={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={depart.prod}
                      onChange={(e) =>
                        setDepart({ ...depart, prod: !depart.prod })
                      }
                    />
                  }
                  label="Prod"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={depart.target}
                      onChange={(e) =>
                        setDepart({ ...depart, target: !depart.target })
                      }
                    />
                  }
                  label="Target"
                />
              </FormGroup>
            </Grid>
            <Grid item md={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={depart.tax}
                      onChange={(e) =>
                        setDepart({ ...depart, tax: !depart.tax })
                      }
                    />
                  }
                  label="Tax"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <br />
          <Grid container>
            <Grid item md={4}></Grid>
            <Button
              variant="contained"
              style={{ marginLeft: "5em" }}
              onClick={handleSubmit}
            >
              Create
            </Button>
            <Grid item md={4}></Grid>
            <Grid item md={4}></Grid>
          </Grid>
        </>
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
              <Typography sx={userStyle.SubHeaderText}>Edit Department</Typography>
              <br /><br />
              <Grid container spacing={2}>
                <Grid item md={12} xs={12} sm={12}>
                  <Typography>Name</Typography>
                  <FormControl fullWidth size="small">
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={langid.deptname}
                      onChange={(e) => {
                        setLangid({ ...langid, deptname: e.target.value });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <Typography>Description</Typography>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={3}
                      value={langid.descrip}
                      onChange={(e) => {
                        setLangid({ ...langid, descrip: e.target.value });
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid item md={3} xs={12} sm={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(langid.deduction)}
                          onChange={(e) =>
                            setLangid({
                              ...langid,
                              deduction: !langid.deduction,
                            })
                          }
                        />
                      }
                      label="Deduction"
                    />
                  </FormGroup>
                </Grid>
                <Grid item md={3} xs={12} sm={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(langid.era)}
                          onChange={(e) =>
                            setLangid({ ...langid, era: !langid.era })
                          }
                        />
                      }
                      label="ERA"
                    />
                  </FormGroup>
                </Grid>
                <Grid item md={3} xs={12} sm={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(langid.penalty)}
                          onChange={(e) =>
                            setLangid({ ...langid, penalty: !langid.penalty })
                          }
                        />
                      }
                      label="Penalty"
                    />
                  </FormGroup>
                </Grid>
                <Grid item md={3} xs={12} sm={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(langid.prod)}
                          onChange={(e) =>
                            setLangid({ ...langid, prod: !langid.prod })
                          }
                        />
                      }
                      label="Prod"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item md={3} xs={12} sm={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(langid.target)}
                          onChange={(e) =>
                            setLangid({ ...langid, target: !langid.target })
                          }
                        />
                      }
                      label="Target"
                    />
                  </FormGroup>
                </Grid>
                <Grid item md={3} xs={12} sm={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(langid.tax)}
                          onChange={(e) =>
                            setLangid({ ...langid, tax: !langid.tax })
                          }
                        />
                      }
                      label="Tax"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <br />

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
          <Typography sx={userStyle.SubHeaderText}>Department List</Typography>
          <br /> <br />
          {/* ****** Header Buttons ****** */}
          <Grid container sx={{ justifyContent: "center" }} >
            <Grid >
              {/* {isUserRoleCompare[0].excelsupplier && (
                                <> */}
              <ExportCSV csvData={exceldata} fileName={fileName} />
              {/* </>
                            )}
                            {isUserRoleCompare[0].csvsupplier && (
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
                  <MenuItem value={(department.length)}>All</MenuItem>
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
          {/* ****** Table start ****** */}
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700, }} aria-label="customized table" id="departmenttable"
            >
              <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                  {/* <StyledTableCell>S.No</StyledTableCell> */}
                  <StyledTableCell> Name</StyledTableCell>
                  <StyledTableCell>Decription</StyledTableCell>
                  <StyledTableCell>Deduction</StyledTableCell>
                  <StyledTableCell>ERA</StyledTableCell>
                  <StyledTableCell>Penalty</StyledTableCell>
                  <StyledTableCell>Prod</StyledTableCell>
                  <StyledTableCell>Target</StyledTableCell>
                  <StyledTableCell>Tax</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
              {filteredData &&
                  (filteredData.slice((pages * entries - entries < departmentLength ? pages * entries - entries : 0),
                    ((pages * entries - entries <= departmentLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                      <StyledTableRow key={index}>
                        {/* <StyledTableCell>{total = ((pages * entries - entries + index + 1))}</StyledTableCell> */}
                      <StyledTableCell align="left">{row.deptname}</StyledTableCell>
                      <StyledTableCell align="left">{row.descrip}</StyledTableCell>
                      <StyledTableCell align="left">{String(row.deduction)}</StyledTableCell>
                      <StyledTableCell align="left">{String(row.era)}</StyledTableCell>
                      <StyledTableCell align="left">{String(row.penalty)}</StyledTableCell>
                      <StyledTableCell align="left">{String(row.prod)}</StyledTableCell>
                      <StyledTableCell align="left">{String(row.target)}</StyledTableCell>
                      <StyledTableCell align="left">{String(row.tax)}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
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
                              style={{ fontSize: "large" }}
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
                {(pages * entries - entries <= departmentLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                {/* {(pages * entries - entries + 1)}  */}
                to {(pages * entries) > department.length ? department.length : ((pages * entries))} of {department.length} entries</Typography>  </Box>
            <Box>
              {department && <Typography className="Pagination">
                <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(pages - 1) }}>prev</Button>

                {[...Array(Math.ceil(department.length / Number(entries)))].map((_, i) => {
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
              onClick={(e) => delBranch(branchid)}
            >
              {" "}
              OK{" "}
            </Button>
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
        <Box sx={{ width: "350px", padding: '20px 50px' }}>
          <>
            <Typography sx={userStyle.HeaderText}> View Department</Typography>
            <br /> <br />
            <Grid container spacing={2}>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6"> Name</Typography>
                  <Typography>{langid.deptname}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Description</Typography>
                  <Typography>{langid.descrip}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Deduction</Typography>
                  <Typography>{langid.deduction === true ? "yes" : "no"}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">penalty</Typography>
                  <Typography>{langid.penalty === true ? "yes" : "no"}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">ERA</Typography>
                  <Typography>{langid.era === true ? "yes" : "no"}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Production</Typography>
                  <Typography>{langid.prod === true ? "yes" : "no"}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Target</Typography>
                  <Typography>{langid.target === true ? "yes" : "no"}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Tax</Typography>
                  <Typography>{langid.tax === true ? "yes" : "no"}</Typography>
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


      {/* print layout */}

      <TableContainer component={Paper} sx={userStyle.printcls}>
        <Table sx={{ minWidth: 700, }} aria-label="customized table" id="usertable" ref={componentRef}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell> Name</StyledTableCell>
              <StyledTableCell>Decription</StyledTableCell>
              <StyledTableCell>Deduction</StyledTableCell>
              <StyledTableCell>ERA</StyledTableCell>
              <StyledTableCell>Penalty</StyledTableCell>
              <StyledTableCell>Prod</StyledTableCell>
              <StyledTableCell>Target</StyledTableCell>
              <StyledTableCell>Tax</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          {department &&
            department.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="left">{printsno++}</StyledTableCell>
                <StyledTableCell align="left">{row.deptname}</StyledTableCell>
                <StyledTableCell align="left">{row.descrip}</StyledTableCell>
                <StyledTableCell align="left">{String(row.deduction)}</StyledTableCell>
                <StyledTableCell align="left">{String(row.era)}</StyledTableCell>
                <StyledTableCell align="left">{String(row.penalty)}</StyledTableCell>
                <StyledTableCell align="left">{String(row.prod)}</StyledTableCell>
                <StyledTableCell align="left">{String(row.target)}</StyledTableCell>
                <StyledTableCell align="left">{String(row.tax)}</StyledTableCell>

              </StyledTableRow>
            ))}
        </Table>
      </TableContainer>
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

export default Department;