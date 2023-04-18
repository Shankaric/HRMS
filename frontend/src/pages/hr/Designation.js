import React, { useState, useEffect, useRef } from "react";
import { Box, Table, TableBody, TableContainer, MenuItem, TableHead, Select, DialogActions, Dialog, DialogContent, TextareaAutosize, OutlinedInput, Paper, Button, Grid, Typography, FormControl, } from "@mui/material";
import { userStyle } from "../../pageStyle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import 'jspdf-autotable'
import axios from "axios";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import $ from "jquery";
import { SERVICE } from '../../services/Baseservice';
import { useReactToPrint } from "react-to-print";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import moment from 'moment-timezone';

function Designation() {
  const [designation, setDesignation] = useState({
    branch: "",
    group: "",
    name: "",
    description: "",
  });

  const [branches, setBranches] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [designationgrp, setdesignationgrp] = useState([])
  const [showAlert, setShowAlert] = useState();
  const [entries, setEntries] = useState(1);
  const [pages, setPages] = useState(1);
  const [username, setUsername] = useState("");

  const handleClickOpenerr = () => {
    setIsErrorOpen(true);
  };
  const handleClose = () => {
    setIsErrorOpen(false);
  };

  let sno = 1;
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


  //Delete model
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleClickOpen = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseMod = () => {
    setIsDeleteOpen(false);
  };


  // info model
  const [openInfo, setOpeninfo] = useState(false);

  const handleClickOpeninfo = () => {
    setOpeninfo(true);
  };

  const handleCloseinfo = () => {
    setOpeninfo(false);
  };

  // get all designation
  const fetchDesignation = async () => {
    try {
      let res_designation = await axios.get(
        SERVICE.DESIGNATION,
        {}
      );
      setDesignations(res_designation.data.designation);
    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages)
    }
  };

  //for select dropdowns
  const fetchBranch = async () => {
    try {
      let res_branch = await axios.get(
        SERVICE.BRANCH,
        {
          // headers: {
          //     'Authorization': `Bearer ${auth.APIToken}`
          // },
        }
      );
      setBranches(res_branch.data.branch);
    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages);
    }
  };

  //for select group dropdowns
  const fetchGroup = async () => {
    try {
      let res_branch = await axios.get(
        SERVICE.DESIGNATIONGRP,
        {
          // headers: {
          //     'Authorization': `Bearer ${auth.APIToken}`
          // },
        }
      );
      setdesignationgrp(res_branch.data.desiggroup);
    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages);
    }
  };

  // const { auth, setAuth } = useContext(AuthContext);
  // const { isUserRoleCompare } = useContext(UserRoleAccessContext);
  const [deletedesignation, setDeletedesignation] = useState({});
  //  PDF
  const columns = [
    { title: "Branch", field: "branch" },
    { title: "Name", field: "name" },
    { title: "Group", field: "group" },
    { title: "Description", field: "description" },
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: designations,
    });
    doc.save("Designation.pdf");
  };

  // Excel
  const fileName = "Designation";

  // const [designationData, setDesignationData] = useState([]);
  const [exceldata, setExceldata] = useState([]);

  let excelno = 1;

  // get particular columns for export excel
  const getexcelDatas = async () => {
    let response = await axios.get(SERVICE.DESIGNATION, {
      //  headers: {
      //      'Authorization': `Bearer ${auth.APIToken}`
      //  },
    });
    var data = response.data.designation.map((t) => ({
      Sno: excelno++,
      branch: t.branch,
      group: t.group,
      name: t.name,
      description: t.description,
    }));
    setExceldata(data);
  };

  // Print
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Designation",
    pageStyle: "print",
  });



  //set function to get particular row
  const rowData = async (id) => {
    try {
      let res = await axios.get(
        `${SERVICE.DESIGNATION_SINGLE}/${id}`,
        {
          // headers: {
          //     'Authorization': `Bearer ${auth.APIToken}`
          // }
        }
      );
      setDeletedesignation(res.data.sdesiggroup);
    } catch (err) { }
  };
  // Alert delete popup
  let designationid = deletedesignation._id;
  const delDesignation = async () => {
    try {
      await axios.delete(
        `${SERVICE.DESIGNATION_SINGLE}/${designationid}`,
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

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //datatable....
  const filteredData = designations.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  //this is add database
  const sendRequest = async () => {
    try {
      let designations = await axios.post(
        SERVICE.DESIGNATION_CREATE,
        {
          // headers: {
          //     'Authorization':`Bearer ${auth.APIToken}`
          //     }

          branch: String(designation.branch),
          group: String(designation.group),
          name: String(designation.name),
          description: String(designation.description),
          addedby: String(username),

        }
      );
      setDesignation(designations);
      setDesignation({ branch: "", group: "", name: "", description: "" });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    if (designation.name === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "100px", color: "orange" }}
          />
          <p style={{ fontSize: "20px", fontWeight: 900 }}>
            {"Please enter name"}
          </p>
        </>
      );
      handleClickOpenerr();
    } else if (designation.branch === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "100px", color: "orange" }}
          />
          <p style={{ fontSize: "20px", fontWeight: 900 }}>
            {"Please select branch"}
          </p>
        </>
      );
      handleClickOpenerr();
    } else {
      sendRequest();
    }
  };

  const [getrowid, setRowGetid] = useState("");

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


  //id for login...
 
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


  //Edit functiona --->> getCode, sendEditRequest , editSubmit
  const [desinationid, setDesignationid] = useState({
    branch: "",
    group: "",
    name: "",
    description: "",
  });
  //get single row to edit
  const getCode = async (e) => {
    let res = await axios.get(
      `${SERVICE.DESIGNATION_SINGLE}/${e}`,
      {}
    );
    setDesignationid(res.data.sdesiggroup);
    setRowGetid(res.data.sdesiggroup);
  };

  // get single row to view....
  const getviewCode = async (e) => {
    let res = await axios.get(`${SERVICE.DESIGNATION_SINGLE}/${e}`, {});
    setDesignationid(res.data.sdesiggroup);
  };

  // get single row to view....
  const getinfoCode = async (e) => {
    let res = await axios.get(`${SERVICE.FLOOR_SINGLE}/${e}`, {});
    setDesignationid(res.data.sdesiggroup);
  };

  let updatelist = [];
  updatelist = desinationid?.updatedby;
  updatelist?.map((item) => {
    console.log(item.name);
    console.log(item.date);
  })


  //Desigantion updateby edit page...
  let updateby = desinationid.updatedby;
  console.log(desinationid.updatedby, 'updatedvalue');


  let desigid = getrowid._id;
  //editing the single data
  const sendEditRequest = async () => {
    try {
      let res = await axios.put(
        `${SERVICE.DESIGNATION_SINGLE}/${desigid}`,
        {
          branch: String(desinationid.branch),
          group: String(desinationid.group),
          name: String(desinationid.name),
          description: String(desinationid.description),
          addedby: String(username),
          updatedby: [
            ...updateby, {
              name: String(username),
              date: String(new Date()),

            },
          ],
        }
      );
      setDesignation(res.data);
      handleCloseModEdit();
    } catch (err) {
      console.log(err.data.message);
    }
  };

  const editSubmit = (e) => {
    e.preventDefault();
    sendEditRequest(e);
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  useEffect(() => {
    fetchDesignation();
    fetchGroup();
    getexcelDatas();
    getusername();
  });
  let designationLength = designations.length;
  useEffect(
    () => {
      selectPageHandler();
    }
  );

  const selectPageHandler = (selPage) => {
    if (selPage >= 1 && selPage <= (Math.ceil(designations.length / (Number(entries)))) && selPage !== pages)
      setPages(selPage)


  }

  let total = 0;

  return (
    <Box>
      {/* <Headtitle title={'Designation'} /> */}
      <Typography sx={userStyle.HeaderText}>  Designation  </Typography>

      <Box sx={userStyle.selectcontainer}>
        <Typography sx={userStyle.SubHeaderText}>Create Designation</Typography><br /><br />
        <Grid container spacing={4}>
          <Grid item md={6} xs={12} sm={12}>
            <FormControl size="small" fullWidth>
              <Typography>Branch</Typography>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={designation.branch}
                onChange={(e, i) => {
                  setDesignation({ ...designation, branch: e.target.value });
                }}
              >
                {branches &&
                  branches.map((row) => (
                    <MenuItem value={row.name}>{row.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12} sm={12}>
            <FormControl size="small" fullWidth>
              <Typography>Group</Typography>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={designation.group}
                onChange={(e, i) => {
                  setDesignation({ ...designation, group: e.target.value });
                }}
              >
                {designationgrp &&
                  designationgrp.map((row) => (
                    <MenuItem value={row.name}>{row.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item md={6} xs={12} sm={12}>
            <FormControl fullWidth size="small">
              <Typography>Name</Typography>
              <OutlinedInput
                id="component-outlined"
                type="text"
                value={designation.name}
                onChange={(e) => {
                  setDesignation({ ...designation, name: e.target.value });
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12} sm={12}>
            <FormControl fullWidth size="small">
              <Typography>Description</Typography>
              <TextareaAutosize
                aria-label="maximum height"
                minRows={5}
                style={{ width: "100%" }}
                value={designation.description}
                onChange={(e) => {
                  setDesignation({
                    ...designation,
                    description: e.target.value,
                  });
                }}
              />
            </FormControl>
          </Grid>
        </Grid><br />
        <Grid container>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create New
          </Button>
        </Grid>
      </Box>
      <br />

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
              <Typography sx={userStyle.SubHeaderText}>
                Edit Designation
              </Typography>
              <br /> <br />
              <Grid container spacing={2}>
                <Grid item md={12} xs={12} sm={12}>
                  <FormControl size="small" fullWidth>
                    <Typography>Branch</Typography>
                    {/* <InputLabel id="demo-select-small">Country</InputLabel> */}
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      //   label="Branch"
                      value={desinationid.branch}
                      onChange={(e, i) => {
                        setDesignationid({
                          ...desinationid,
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
                <Grid item md={12} xs={12} sm={12}>
                  <FormControl size="small" fullWidth>
                    <Typography>Group</Typography>
                    {/* <InputLabel id="demo-select-small">Country</InputLabel> */}
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={desinationid.group}
                      onChange={(e, i) => {
                        setDesignation({ ...desinationid, group: e.target.value });
                      }}
                    >
                      {designationgrp &&
                        designationgrp.map((row) => (
                          <MenuItem value={row.name}>{row.name}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid item md={12} xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <Typography>Name</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={desinationid.name}
                      onChange={(e) => {
                        setDesignationid({
                          ...desinationid,
                          name: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <Typography>Description</Typography>
                    <TextareaAutosize
                      aria-label="maximum height"
                      minRows={5}
                      style={{ width: "100%" }}
                      value={desinationid.description}
                      onChange={(e) => {
                        setDesignationid({
                          ...desinationid,
                          description: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid item md={4} xs={12} sm={12}>
                  <Button variant="contained" onClick={editSubmit}>
                    Update
                  </Button>
                </Grid>
                <Grid item md={4} xs={12} sm={12}>
                  <Button sx={userStyle.btncancel} onClick={handleCloseModEdit}>
                    Cancel
                  </Button>
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
        <Typography sx={userStyle.HeaderText}>Designation List</Typography>
        <br></br>
        {/* ****** Header Buttons ****** */}
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid>
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
            <Button sx={userStyle.buttongrp} onClick={handleprint}>
              &ensp;
              <FaPrint />
              &ensp;Print&ensp;
            </Button>
            {/* </>
                            )} */}
            {/* {isUserRoleCompare[0].pdfsupplier && (
                                <> */}
            <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}>
              <FaFilePdf />
              &ensp;Export to PDF&ensp;
            </Button>
            {/* </>
                            )} */}
          </Grid>
        </Grid>
        <br /><br />
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
                <MenuItem value={(designations.length)}>All</MenuItem>
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
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700 }}
              aria-label="customized table"
              id="usertable"

            >
              <TableHead>
                <StyledTableRow>
                  {/* <StyledTableCell>S.No</StyledTableCell> */}
                  <StyledTableCell>Branch Name</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Group Name</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
              {filteredData &&
                  (filteredData.slice((pages * entries - entries < designationLength ? pages * entries - entries : 0),
                    ((pages * entries - entries <= designationLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                      <StyledTableRow key={index}>
                        {/* <StyledTableCell>{total = ((pages * entries - entries + index + 1))}</StyledTableCell> */}
                      <StyledTableCell>{row.branch}</StyledTableCell>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>{row.description}</StyledTableCell>
                      <StyledTableCell>{row.group}</StyledTableCell>
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
                {(pages * entries - entries <= designationLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                {/* {(pages * entries - entries + 1)}  */}
                to {(pages * entries) > designation.length ? designations.length : ((pages * entries))} of {designations.length} entries</Typography>  </Box>
            <Box>
              {designation && <Typography className="Pagination">
                <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(pages - 1) }}>prev</Button>

                {[...Array(Math.ceil(designations.length / Number(entries)))].map((_, i) => {
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
          <Button onClick={handleCloseMod} variant="outlined">
            Cancel
          </Button>
          <Button
            autoFocus
            variant="contained"
            color="error"
            onClick={(e) => delDesignation(designationid)}
          >
            {" "}
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>

      {/* view model */}
      <Dialog
        open={openview}
        onClose={handleClickOpenview}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ width: "450px", padding: '20px 50px' }}>
          <>
            <Typography sx={userStyle.HeaderText}> View Company</Typography>
            <br /> <br />
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6"> Branch</Typography>
                  <Typography>{desinationid.branch}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Group</Typography>
                  <Typography>{desinationid.group}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Name</Typography>
                  <Typography>{desinationid.name}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Description</Typography>
                  <Typography>{desinationid.description}</Typography>
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

      {/* ALERT DIALOG */}
      <Dialog
        open={isErrorOpen}
        onClose={handleClose}
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
          <Button variant="contained" color="error" onClick={handleClose}>
            ok
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
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell>Branch Name</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Group Name</StyledTableCell>
              {/* <StyledTableCell >Action</StyledTableCell> */}
            </StyledTableRow>
          </TableHead>
          <TableBody align="left">
            {designations &&
              designations.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{printsno++}</StyledTableCell>
                  <StyledTableCell>{row.branch}</StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default Designation;
