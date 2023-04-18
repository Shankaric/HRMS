import React, { useState, useEffect, useRef } from "react";
import {
  Box, Typography, DialogContent, Dialog, MenuItem, DialogActions, OutlinedInput, Select, FormControl, TextareaAutosize, Grid,
  Paper, Table, TableBody, TableHead, TableContainer, Button,
} from "@mui/material";
import { userStyle } from "../../pageStyle";
import axios from "axios";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import 'jspdf-autotable'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { SERVICE } from "../../services/Baseservice";
import jsPDF from "jspdf";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import moment from 'moment-timezone';


function Teams() {

  const [teams, setTeams] = useState({
    branch: "",
    teamname: "",
    department: "",
    description: "",
  });
  const [deletebranch, setDeletebranch] = useState(false);
  const [teamsdata, setTeamsData] = useState([]);
  const [branches, setBranches] = useState([]);
  const [getrowid, setRowGetid] = useState("");
  const [teamsdatas, setTeamsdatas] = useState({ branch: "", teamname: "", department: "", description: "" });
  const [departments, setDepartments] = useState([]);
  const [entries, setEntries] = useState(1);
  const [pages, setPages] = useState(1);
  const [username, setUsername] = useState("");

  const userData = {
    name: username,
    date: new Date(),
  };
  console.log(userData);

  let sino = 1;
  let filename = 'Teams';
  let printsno = 1;

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

  // Error Popup model
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [showAlert, setShowAlert] = useState()
  const handleClickOpenerr = () => {
    setIsErrorOpen(true);
  };
  const handleClose = () => {
    setIsErrorOpen(false);
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

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleClickOpen = () => {
    setIsDeleteOpen(true);
  };
  const handleCloseMod = () => {
    setIsDeleteOpen(false);
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
      console.log(messages)
    }
  };

  //set function to get particular row
  const rowData = async (id) => {
    try {
      let res = await axios.get(`${SERVICE.TEAMS_SINGLE}/${id}`);
      setDeletebranch(res.data.steamsdetails);
    } catch (err) { }
  };
  // Alert delete popup
  let branchid = deletebranch._id;
  const delBranch = async () => {
    try {
      await axios.delete(`${SERVICE.TEAMS_SINGLE}/${branchid}`);
      handleCloseMod();
    } catch (err) { }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = teamsdata.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const fetchteams = async () => {
    try {
      let teams = await axios.get(SERVICE.TEAMS);
      setTeamsData(teams.data.teamsdetails);
    } catch (error) {
      console.log(error.response.data.errorMessage)
    }
  };


  const fetchDepartments = async () => {
    try {
      let teams = await axios.get(SERVICE.DEPARTMENT);
      setDepartments(teams.data.departmentdetails);
    } catch (error) {
      console.log(error.response.data.errorMessage)
    }
  };


  const sendRequest = async () => {
    try {
      let qualifications = await axios.post(
        SERVICE.TEAMS_CREATE,
        {
          branch: String(teams.branch),
          teamname: String(teams.teamname),
          department: String(teams.department),
          description: String(teams.description),
          addedby: String(username),

        }
      );

      setTeams(qualifications);
      setTeams({ branch: "", teamname: "", department: "", description: "" });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    if (teams.teamname === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
          <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter team name"}</p>
        </>
      );
      handleClickOpenerr();
    } else if (teams.branch === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
          <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter branch name"}</p>
        </>
      );
      handleClickOpenerr();
    }
    else {
      sendRequest();
    }
  };

  // Print
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Qualification',
    pageStyle: 'print'
  });

  //    PDF
  const columns = [
    { title: "Branch", field: "branch" },
    { title: "Teamname", field: "teamname" },
    { title: "Department", field: "department" },
    { title: "Description", field: "description" },
  ]
  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body: teamsdata
    })
    doc.save('Teams.pdf')
  }


  // Excel
  let excelno = 1;
  const [exceldata, setExceldata] = useState([]);

  // get perticular columns for export excel
  const getexcelDatas = async () => {

    let Dep = await axios.get(SERVICE.TEAMS)

    var data = Dep.data.teamsdetails.map(t => ({
      Sno: excelno++, Branch: t.branch,
      Name: t.teamname, Department: t.department, Description: t.description

    }));
    setExceldata(data);
  }


  //get single row to edit
  const getCode = async (e) => {
    let res = await axios.get(`${SERVICE.TEAMS_SINGLE}/${e}`, {});

    setTeamsdatas(res.data.steamsdetails);
    setRowGetid(res.data.steamsdetails);
  };

  // get single row to view....
  const getviewCode = async (e) => {
    let res = await axios.get(`${SERVICE.TEAMS_SINGLE}/${e}`, {});
    setTeamsdatas(res.data.steamsdetails);
  };

  // get single row to view....
  const getinfoCode = async (e) => {
    let res = await axios.get(`${SERVICE.TEAMS_SINGLE}/${e}`, {});
    setTeamsdatas(res.data.steamsdetails);
  };

  let updatelist = [];
  updatelist = teamsdatas?.updatedby;
  updatelist?.map((item) => {
    console.log(item.name);
    console.log(item.date);
  })


  //Teams updateby edit page...
  let updateby = teamsdatas.updatedby;
  console.log(teamsdatas.updatedby, 'updatedvalue');

  //editing the single data

  let branch_id = getrowid._id;
  const sendEditRequest = async () => {
    try {
      let res = await axios.put(
        `${SERVICE.TEAMS_SINGLE}/${branch_id}`,
        {
          branch: String(teamsdatas.branch),
          teamname: String(teamsdatas.teamname),
          department: String(teamsdatas.department),
          description: String(teamsdatas.description),
          addedby: String(username),
          updatedby: [
            ...updateby, {
              name: String(username),
              date: String(new Date()),
            },
          ],
        }
      );
      setTeamsdatas(res.data);
      handleCloseModEdit();
    } catch (err) { }
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


  const editSubmit = (e) => {
    e.preventDefault();
    sendEditRequest();
  };

  useEffect(() => {
    fetchBranch();

  }, []);

  useEffect(() => {
    fetchteams();
    getexcelDatas();
    fetchDepartments();
    getusername();
  });


  let TeamsLength = teamsdata.length;
  useEffect(
    () => {
      selectPageHandler();
    }
  );


  const selectPageHandler = (selPage) => {
    if (selPage >= 1 && selPage <= (Math.ceil(teamsdata.length / (Number(entries)))) && selPage !== pages)
      setPages(selPage)

  };
  let total = 0;

  return (
    <Box>
      {/* <Headtitle title={"Teams"} /> */}
      {/* ****** Header Content ****** */}
      <Typography sx={userStyle.HeaderText}>Manage Teams</Typography>
      <Box sx={userStyle.container}>
        <Typography sx={userStyle.SubHeaderText}>Teams Create</Typography>
        <br /> <br />
        <>
          <Grid container spacing={2}>
            <Grid item md={6} sx={12}>
              <Typography>Branch</Typography>
              <FormControl size="small" fullWidth>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={teams.branch}
                  onChange={(e, i) => {
                    setTeams({ ...teams, branch: e.target.value });
                  }}
                >
                  {branches &&
                    branches.map((row) => (
                      <MenuItem value={row.name}>{row.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item md={3} sx={12}>
              <Typography>Team Name</Typography>
              <FormControl size="small" fullWidth>
                <OutlinedInput
                  sx={userStyle.input}
                  id="component-outlined"
                  //   label="Team name"
                  value={teams.teamname}
                  onChange={(e) => {
                    setTeams({ ...teams, teamname: e.target.value });
                  }}
                  type="text"
                />
              </FormControl>
            </Grid>
            <Grid item md={3} sx={12}>
              <Typography>Department</Typography>
              <FormControl size="small" fullWidth>

                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={teams.department}
                  onChange={(e, i) => {
                    setTeams({ ...teams, department: e.target.value });
                  }}
                >
                  {departments &&
                    departments.map((row) => (
                      <MenuItem value={row.deptname}>{row.deptname}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <Grid item md={6} sx={12}>
            <FormControl size="small">
              <Typography>Description</Typography>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={4}
                style={{ minWidth: "550px" }}
                value={teams.description}
                onChange={(e) => {
                  setTeams({ ...teams, description: e.target.value });
                }}
              />
            </FormControl>
          </Grid>
          <br />
          <br />
          <Grid container>

            <Button
              variant="contained"
              sx={userStyle.buttonadd}
              onClick={handleSubmit}
            >
              Create
            </Button>

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
            <Typography sx={userStyle.SubHeaderText}>Teams Edit</Typography>
            <>
              <br /><br />
              <Grid container spacing={2}>
                <Grid item md={12} sx={12}>
                  <Typography>Branch</Typography>
                  <FormControl size="small" fullWidth>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={teamsdatas.branch}
                      onChange={(e, i) => {
                        setTeamsdatas({
                          ...teamsdatas,
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
              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid item md={6} sx={12}>
                  <Typography>Team Name :</Typography>
                  <FormControl size="small" fullWidth>
                    <OutlinedInput
                      sx={userStyle.input}
                      id="component-outlined"
                      label="Teamname"
                      value={teamsdatas.teamname}
                      onChange={(e) => {
                        setTeamsdatas({
                          ...teamsdatas,
                          teamname: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} sx={12}>
                  <Typography>Department</Typography>
                  <FormControl size="small" fullWidth>
                    <OutlinedInput
                      sx={userStyle.input}
                      id="component-outlined"
                      label="Branch"
                      value={teamsdatas.department}
                      onChange={(e) => {
                        setTeamsdatas({
                          ...teamsdatas,
                          department: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br />
              <Grid item md={6} sx={12}>
                <FormControl fullWidth size="small">
                  <Typography>Description</Typography>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={4}
                    style={{ width: '100%' }}
                    value={teamsdatas.description}
                    onChange={(e) => {
                      setTeamsdatas({
                        ...teamsdatas,
                        description: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              </Grid>
              <br />
              <br />
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <Button
                    variant="contained"

                    sx={userStyle.buttonadd}
                    onClick={editSubmit}
                  >
                    Update
                  </Button>
                </Grid>
                <Grid item md={4}>
                  <Button
                    sx={userStyle.btncancel}
                    onClick={handleCloseModEdit}
                  >
                    Cancel
                  </Button>
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
          <Typography sx={userStyle.SubHeaderText}>Teams List</Typography>
          {/* ****** Header Buttons ****** */}
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid >
              {/* {isUserRoleCompare[0].excelsupplier && (
                                <> */}
              <ExportCSV csvData={exceldata} fileName={filename} />
              {/* </>
                            )} */}
              {/* {isUserRoleCompare[0].csvsupplier && (
                                <> */}
              <ExportXL csvData={exceldata} fileName={filename} />
              {/* </>
                            )} */}
              {/* {isUserRoleCompare[0].printsupplier && (
                                <> */}
              <Button sx={userStyle.buttongrp} onClick={handleprint} >&ensp;<FaPrint />&ensp;Print&ensp;</Button>
              {/* </>
                            )} */}
              {/* {isUserRoleCompare[0].pdfsupplier && (
                                <> */}
              <Button sx={userStyle.buttongrp} onClick={downloadPdf} ><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
              {/* </>
                            )} */}
            </Grid>
          </Grid>
          <br />
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
                  <MenuItem value={(teamsdata.length)}>All</MenuItem>
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
          {/* ****** Table start ****** */}
          <TableContainer component={Paper}>
            <Table sx={{}} aria-label="simple table" id="teams" >
              <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                  {/* <StyledTableCell>S.No</StyledTableCell> */}
                  <StyledTableCell>Branch</StyledTableCell>
                  <StyledTableCell>Team Name</StyledTableCell>
                  <StyledTableCell>Department</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filteredData &&
                  (filteredData.slice((pages * entries - entries < TeamsLength ? pages * entries - entries : 0),
                    ((pages * entries - entries <= TeamsLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                      <StyledTableRow key={index}>
                        {/* <StyledTableCell>{total = ((pages * entries - entries + index + 1))}</StyledTableCell> */}
                        <StyledTableCell align="left">{row.branch}</StyledTableCell>
                        <StyledTableCell align="left">{row.teamname}</StyledTableCell>
                        <StyledTableCell align="left">{row.department}</StyledTableCell>
                        <StyledTableCell align="left">{row.description}</StyledTableCell>
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
                                {(pages * entries - entries <= TeamsLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                                {/* {(pages * entries - entries + 1)}  */}
                                to {(pages * entries) > teamsdata.length ? teamsdata.length : ((pages * entries))} of {teamsdata.length} entries</Typography>  </Box>
                        <Box>
                            {teamsdata && <Typography className="Pagination">
                                <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(pages - 1) }}>prev</Button>

                                {[...Array(Math.ceil(teamsdata.length / Number(entries)))].map((_, i) => {
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
      {/* view model */}
      <Dialog
        open={openview}
        onClose={handleClickOpenview}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ width: "450px", padding: '20px 50px' }}>
          <>
            <Typography sx={userStyle.HeaderText}> View Team details</Typography>
            <br /> <br />
            <Grid container spacing={2}>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6"> Branch</Typography>
                  <Typography>{teamsdatas.branch}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6"> Team Name</Typography>
                  <Typography>{teamsdatas.teamname}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6"> Department</Typography>
                  <Typography>{teamsdatas.department}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Description</Typography>
                  <Typography>{teamsdatas.description}</Typography>
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

      {/* ALERT DIALOG */}
      <Box>
        <Dialog
          open={isErrorOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
            {/* <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} /> */}
            <Typography variant="h6" >{showAlert}</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>ok</Button>
          </DialogActions>
        </Dialog>
      </Box>
      {/* ****** Print layout  ****** */}
      <TableContainer component={Paper} sx={userStyle.printcls}>
        <Table sx={{}} aria-label="simple table" id="teams" ref={componentRef}>
          <TableHead sx={{ fontWeight: "600" }}>
            <StyledTableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell>Branch</StyledTableCell>
              <StyledTableCell>Team Name</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>

            </StyledTableRow>
          </TableHead>
          <TableBody>
            {teamsdata &&
              teamsdata.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{printsno++}</StyledTableCell>
                  <StyledTableCell align="left">{row.branch}</StyledTableCell>
                  <StyledTableCell align="left">{row.teamname}</StyledTableCell>
                  <StyledTableCell align="left">{row.department}</StyledTableCell>
                  <StyledTableCell align="left">{row.description}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Teams;
