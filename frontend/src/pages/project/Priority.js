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
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useReactToPrint } from "react-to-print";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import moment from 'moment-timezone';

function Priority() {

  const [priority, setPriority] = useState({  name: ""});
  const [priorities, setPriorities] = useState([]);
  const [priorityid, setPriorityid] = useState({ name: "" });
  const [username, setUsername] = useState("");

  //Datatable
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

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

  //set function to get particular row
  const [deletepriority, setDeletepriority] = useState({});
  const rowData = async (id) => {
    try {
      let res = await axios.get(`${SERVICE.PRIORITY_SINGLE}/${id}`, {
        // headers: {
        //     'Authorization': `Bearer ${auth.APIToken}`
        // }
      });
      setDeletepriority(res.data.spriority);
    } catch (err) { }
  };
  // Alert delete popup
  let prioritieid = deletepriority._id;
  const delPriority = async () => {
    try {
      await axios.delete(
        `${SERVICE.PRIORITY_SINGLE}/${prioritieid}`, {});
      handleCloseMod();
    } catch (err) { }
  };

  //add function...
  const sendRequest = async () => {
    try {
      let priorities = await axios.post(SERVICE.PRIORITY_CREATE, {
        name: String(priority.name),
        addedby: [
          {
            name: String(username),
            date: String(new Date()),

          },
        ],
      });
      setPriority(priorities);
      setPriority({ name: "" });
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
    if (priority.name === "") {
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

  //id for login...
  const [aid, setAid] = useState([]);
  let loginid = localStorage.LoginUserId;


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
        if (loginid === data._id) {
          setUsername(data.username)
          return data

        }
      })

    }
    catch (err) {
      console.log(err.response.data.errormessage)
    }

  }


  //get single row to edit....
  const getCode = async (e) => {
    let res = await axios.get(`${SERVICE.PRIORITY_SINGLE}/${e}`, {});
    setPriorityid(res.data.spriority);
  };
  // get single row to view....
  const getviewCode = async (e) => {
    let res = await axios.get(`${SERVICE.PRIORITY_SINGLE}/${e}`, {});
    setPriorityid(res.data.spriority);
  };

  // get single row to view....
  const getinfoCode = async (e) => {
    let res = await axios.get(`${SERVICE.PRIORITY_SINGLE}/${e}`, {});
    setPriorityid(res.data.spriority);
  };

  //priority updateby edit page...
  let updateby = priorityid.updatedby;
  let addedby = priorityid.addedby;



  let prioritetsid = priorityid._id;
  //editing the single data...
  const sendEditRequest = async () => {
    try {
      let res = await axios.put(
        `${SERVICE.PRIORITY_SINGLE}/${prioritetsid}`,
        {

          name: String(priorityid.name),
          updatedby: [
            ...updateby, {
              name: String(username),
              date: String(new Date()),

            },
          ],
        }
      );
      setPriorityid(res.data);
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


  // get all shifts
  const fetchAllPriority = async () => {
    try {
      let res_priority = await axios.get(SERVICE.PRIORITY, {

      });
      setPriorities(res_priority.data.priorities);

    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages)
    }
  };
  //pdf....
  const columns = [
    // { title: "SNo", field: "sno" },
    { title: "Name", field: "name" },
  ];
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: priorities,
    });
    doc.save("Priority.pdf");
  };

  // Excel
  const fileName = "priorities";

  const [priorityData, setPriorityData] = useState([]);

  let excelno = 1;

  // get particular columns for export excel
  const getexcelDatas = async () => {
    let response = await axios.get(SERVICE.PRIORITY, {
      //  headers: {
      //      'Authorization': `Bearer ${auth.APIToken}`
      //  },
    });
    var data = response.data.priorities.map((t) => ({
      Sno: excelno++,
      name: t.name,
    }));
    setPriorityData(data);
  };

  //print...
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Priority",
    pageStyle: "print",
  });

  useEffect(() => {
    fetchAllPriority();
    getexcelDatas();
    getCodea();
    getusername();
  });


  const [items, setItems] = useState([]);

  const addSerialNumber = () => {
    const itemsWithSerialNumber = priorities?.map((item, index) => ({ ...item, serialNumber: index + 1 }));
    setItems(itemsWithSerialNumber);
  }

  useEffect(() => {
    addSerialNumber();
  })

  //table sorting
  const [sorting, setSorting] = useState({ column: '', direction: '' });

  const handleSorting = (column) => {
    const direction = sorting.column === column && sorting.direction === 'asc' ? 'desc' : 'asc';
    setSorting({ column, direction });
  };

  const sortedData = items.sort((a, b) => {
    if (sorting.direction === 'asc') {
      return a[sorting.column] > b[sorting.column] ? 1 : -1;
    } else if (sorting.direction === 'desc') {
      return a[sorting.column] < b[sorting.column] ? 1 : -1;
    }
    return 0;
  });

  const renderSortingIcon = (column) => {
    if (sorting.column !== column) {
      return <>
        <Box sx={{ color: '#bbb6b6' }}>
          <Grid sx={{ height: '6px', fontSize: '1.6rem' }}>
            <ArrowDropUpOutlinedIcon />
          </Grid>
          <Grid sx={{ height: '6px', fontSize: '1.6rem' }}>
            <ArrowDropDownOutlinedIcon />
          </Grid>
        </Box>
      </>;
    } else if (sorting.direction === 'asc') {
      return <>
        <Box >
          <Grid sx={{ height: '6px' }}>
            <ArrowDropUpOutlinedIcon style={{ color: 'black', fontSize: '1.6rem' }} />
          </Grid>
          <Grid sx={{ height: '6px' }}>
            <ArrowDropDownOutlinedIcon style={{ color: '#bbb6b6', fontSize: '1.6rem' }} />
          </Grid>
        </Box>
      </>;
    } else {
      return <>
        <Box >
          <Grid sx={{ height: '6px' }}>
            <ArrowDropUpOutlinedIcon style={{ color: '#bbb6b6', fontSize: '1.6rem' }} />
          </Grid>
          <Grid sx={{ height: '6px' }}>
            <ArrowDropDownOutlinedIcon style={{ color: 'black', fontSize: '1.6rem' }} />
          </Grid>
        </Box>
      </>;
    }
  };
  //Datatable
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

  //datatable....
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredDatas = items.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredData = filteredDatas.slice((page - 1) * pageSize, page * pageSize);

  const totalPages = Math.ceil(priorities.length / pageSize);

  const visiblePages = Math.min(totalPages, 3);

  const firstVisiblePage = Math.max(1, page - 1);
  const lastVisiblePage = Math.min(firstVisiblePage + visiblePages - 1, totalPages);

  const pageNumbers = [];

  const indexOfLastItem = page * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;

  for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      {/* ****** Header Content ****** */}
      <Typography sx={userStyle.HeaderText}>Priority </Typography>
      <Box sx={userStyle.container}>
        <>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography sx={userStyle.importheadtext}>Manage Priority</Typography>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item md={4} xs={12} sm={12}>
              <FormControl fullWidth size="small">
                <Typography>Name</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={priority.name}
                  onChange={(e) => {
                    setPriority({ ...priority, name: e.target.value });
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
                SUBMIT
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
                  Manage Priority
                </Typography>

              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid item md={12} xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <Typography>Name</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={priorityid.name}
                      onChange={(e) => {
                        setPriorityid({ ...priorityid, name: e.target.value });
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br /> <br />
              <Grid container spacing={2}>
                <Grid item md={6} xs={12} sm={12}>
                  <Button variant="contained" onClick={editSubmit}>  Update</Button>
                </Grid><br />
                <Grid item md={6} xs={12} sm={12}>
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
            <Typography sx={userStyle.importheadtext}>Priority List</Typography>
          </Grid>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid>
              <ExportCSV csvData={priorityData} fileName={fileName} />

              <ExportXL csvData={priorityData} fileName={fileName} />

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
          <br />
         
          <Grid style={userStyle.dataTablestyle}>
                        <Box>
                            <label htmlFor="pageSizeSelect">Show entries:</label>
                            <Select id="pageSizeSelect" value={pageSize} onChange={handlePageSizeChange} sx={{width:"77px"}}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                            <MenuItem value={(priorities.length)}>All</MenuItem>
                            </Select>
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
          {/* ****** Table Grid Container ****** */}
        
          {/* ****** Table start ****** */}
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700 }}
              aria-label="customized table"
              id="usertable"
            >
              <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                  <StyledTableCell onClick={() => handleSorting('serialNumber')}><Box sx={userStyle.tableheadstyle}><Box>SNo</Box><Box sx={{ marginTop: '-6PX' }}>{renderSortingIcon('serialNumber')}</Box></Box></StyledTableCell>
                  <StyledTableCell onClick={() => handleSorting('name')}><Box sx={userStyle.tableheadstyle}><Box>Name</Box><Box sx={{ marginTop: '-6PX' }}>{renderSortingIcon('name')}</Box></Box></StyledTableCell>

                  <StyledTableCell>Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody align="left">
                {filteredData.length > 0 ? (
                  filteredData?.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{row.serialNumber}</StyledTableCell>
                      <StyledTableCell>{row.name}</StyledTableCell>
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
                  ))) : <StyledTableRow> <StyledTableCell colSpan={3} align="center">No Data Available</StyledTableCell> </StyledTableRow>}
              </TableBody>
            </Table>
          </TableContainer>
          <Box style={userStyle.dataTablestyle}>
            <Box>
              Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, priorities.length)} of {priorities.length} entries
            </Box>
            <Box>
              <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1} sx={{ textTransform: 'capitalize', color: 'black' }}>
                Prev
              </Button>
              {pageNumbers?.map((pageNumber) => (
                <Button key={pageNumber} sx={userStyle.paginationbtn} onClick={() => handlePageChange(pageNumber)} className={((page)) === pageNumber ? 'active' : ''} disabled={page === pageNumber}>
                  {pageNumber}
                </Button>
              ))}
              {lastVisiblePage < totalPages && <span>...</span>}
              <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} sx={{ textTransform: 'capitalize', color: 'black' }}>
                Next
              </Button>
            </Box>
          </Box>
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
              onClick={(e) => delPriority(prioritieid)}
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
                <StyledTableCell>Name</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody >
              {priorities &&
                priorities.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
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
            <Typography sx={userStyle.HeaderText}> Manage Priority</Typography>
            <br /><br />
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} sm={12}>
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Name</Typography>
                  <Typography>{priorityid.name}</Typography>
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
            <Typography sx={userStyle.HeaderText}> Manage Area</Typography>
            <br /><br />
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} sm={12}>
                <FormControl fullWidth size="small">
                  <Typography variant="h6">addedby</Typography><br />
                  <Table>
                    <TableHead>
                      <StyledTableCell sx={{ padding: '5px 10px !important' }}>{"SNO"}.</StyledTableCell>
                      <StyledTableCell sx={{ padding: '5px 10px !important' }}> {"UserName"}</StyledTableCell>
                      <StyledTableCell sx={{ padding: '5px 10px !important' }}> {"Date"}</StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {addedby?.map((item, i) => (
                        <StyledTableRow>
                          <StyledTableCell sx={{ padding: '5px 10px !important' }}>{i + 1}.</StyledTableCell>
                          <StyledTableCell sx={{ padding: '5px 10px !important' }}> {item.name}</StyledTableCell>
                          <StyledTableCell sx={{ padding: '5px 10px !important' }}> {moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12} sm={12}>
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Updated by</Typography><br />
                  <Table>
                    <TableHead>
                      <StyledTableCell sx={{ padding: '5px 10px !important' }}>{"SNO"}.</StyledTableCell>
                      <StyledTableCell sx={{ padding: '5px 10px !important' }}> {"UserName"}</StyledTableCell>
                      <StyledTableCell sx={{ padding: '5px 10px !important' }}> {"Date"}</StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {updateby?.map((item, i) => (
                        <StyledTableRow>
                          <StyledTableCell sx={{ padding: '5px 10px !important' }}>{i + 1}.</StyledTableCell>
                          <StyledTableCell sx={{ padding: '5px 10px !important' }}> {item.name}</StyledTableCell>
                          <StyledTableCell sx={{ padding: '5px 10px !important' }}> {moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
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
          <DialogContent  sx={{ width: "350px", textAlign: "center", alignItems: "center" }} >
            <Typography variant="h6">{showAlert}</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleCloseerr}>  ok </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Priority;