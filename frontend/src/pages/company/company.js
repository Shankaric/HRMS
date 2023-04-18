import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, Dialog, TableCell, Select, MenuItem, TableRow, DialogContent, TableBody, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button } from "@mui/material";
import { userStyle } from "../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
// import Headtitle from "../../components/header/Headtitle";
import $ from "jquery";
import { SERVICE } from '../../services/Baseservice';
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import moment from 'moment-timezone';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

function Company() {

  const [company, setCompany] = useState({
    code: "", assetcode: "", phone: "", email: "",
    name: "", country: "", state: "", address: "", city: "", pincode: "", addedby: "",
  });

  const [companies, setCompanies] = useState([]);
  const [areatid, setAreatid] = useState({});
  const [areaviewid, setAreaviewid] = useState({});
  const [companyinfoid, setCompanyinfoid] = useState([]);
  const [username, setUsername] = useState("");

 

  //Datatable...
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);



  // Delete model
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleClickOpen = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseMod = () => {
    setIsDeleteOpen(false);
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
    let res = await axios.get(`${SERVICE.COMPANY_SINGLE}/${e}`, {});
    setAreatid(res.data.scompany);
  };

  // get single row to edit....
  const getviewCode = async (e) => {
    let res = await axios.get(`${SERVICE.COMPANY_SINGLE}/${e}`, {});
    setAreaviewid(res.data.scompany);
  };

  // get single row to view....
  const getinfoCode = async (e) => {
    let res = await axios.get(`${SERVICE.COMPANY_SINGLE}/${e}`, {});
    setCompanyinfoid(res.data.scompany);
  };

  let areasid = areatid._id;
  // get all branches
  const fetchBranch = async () => {
    try {
      let res_branch = await axios.get(SERVICE.COMPANY, {
        // headers: {
        //     'Authorization': `Bearer ${auth.APIToken}`
        // },
      });
      setCompanies(res_branch.data.companies);
    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages);
    }
  }


  // const { auth,setAuth } = useContext(AuthContext)
  // const { isUserRoleCompare } = useContext(UserRoleAccessContext);
  const [deletebranch, setDeletebranch] = useState({});

  //  PDF
  const columns = [
    { title: "Name", field: "name" },
    { title: "Code", field: "code" },

  ]
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: companies,
    });
    doc.save("companies.pdf");
  };

  // Excel
  const fileName = "branch";
  let excelno = 1;
  const [branchData, setBranchData] = useState([]);

  // get particular columns for export excel
  const getexcelDatas = async () => {
    var data = companies.map((t, index) => ({
      Sno: index + 1, code: t.code, Name: t.name,

    }));
    setBranchData(data);
  }

  // Error Popup model
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [showAlert, setShowAlert] = useState();
  const handleClickOpenerr = () => {
    setIsErrorOpen(true);
  };
  const handleCloseerr = () => {
    setIsErrorOpen(false);
  };


  //set function to get particular row
  const rowData = async (id) => {
    try {
      let res = await axios.get(`${"http://192.168.85.8:7001/api/company"}/${id}`, {
        // headers: {
        //     'Authorization': `Bearer ${auth.APIToken}`
        // }
      });
      setDeletebranch(res.data.scompany);
    } catch (err) {
    }
  }

  // Alert delete popup
  let branchid = deletebranch._id;
  const delBranch = async () => {
    try {
      await axios.delete(`${"http://192.168.85.8:7001/api/company"}/${branchid}`, {
        // headers: {
        //     'Authorization': `Bearer ${auth.APIToken}`
        // }
      });
      handleCloseMod();
    } catch (err) {
    }
  };

  //print...
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Company",
    pageStyle: "print",
  });

  const sendRequest = async () => {
    try {
      let companies = await axios.post("http://192.168.85.8:7001/api/company/new", {

        code: String(company.code),
        name: String(company.name),
        addedby: [
          {
            name: String(username),
            date: String(new Date()),
          },
        ],

      })
      setCompany(companies.data)
      setCompany({ code: "", name: "" })

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
  }

  //id for login...

  let loginid = localStorage.LoginUserId;

  const handleSubmit = (e) => {

    e.preventDefault();
    if (company.code === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "100px", color: "orange" }}
          />
          <p style={{ fontSize: "20px", fontWeight: 900 }}>
            {"Please Enter Code"}
          </p>
        </>
      );
      handleClickOpenerr();
    } else if (company.name === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "100px", color: "orange" }}
          />
          <p style={{ fontSize: "20px", fontWeight: 900 }}>
            {"Please Enter Company Name"}
          </p>
        </>
      );
      handleClickOpenerr();
    } else {
      sendRequest();
    }
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
  }

  //floor updateby edit page...
  let updateby = areatid.updatedby;
  let addedby = areatid.addedby;
  //editing the single data...
  const sendEditRequest = async () => {
    try {
      let res = await axios.put(
        `http://192.168.85.8:7001/api/company/${areasid}`,
        {
          code: String(areatid.code),
          name: String(areatid.name),
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
      // console.log(res.data)
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


  useEffect(
    () => {
      fetchBranch();
      getexcelDatas();
      getusername();
    }
  );

  //table sorting functionality
  //table entries ..,.
  const [items, setItems] = useState([]);


  const addSerialNumber = () => {
    const itemsWithSerialNumber = companies?.map((item, index) => ({ ...item, serialNumber: index + 1 }));
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

  const totalPages = Math.ceil(companies.length / pageSize);

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
      {/* <Headtitle title={"Manual Stock Entry"} /> */}
      {/* ****** Header Content ****** */}
      <Typography sx={userStyle.HeaderText}>Company</Typography>
      <Box sx={userStyle.container}>
        <Typography sx={userStyle.SubHeaderText}> Create company</Typography>
        <br /><br />
        <>
          <Grid container spacing={2}>
            <Grid item md={3} sm={12} xs={12}>
              <FormControl fullWidth size="small" >
                <Typography>Code</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={company.code}
                  onChange={(e) => { setCompany({ ...company, code: e.target.value }) }}
                />
              </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <FormControl fullWidth size="small" >
                <Typography>Name</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={company.name}
                  onChange={(e) => { setCompany({ ...company, name: e.target.value }) }}
                />
              </FormControl>
            </Grid>

          </Grid>
          <br />
          <Grid container>
            <Button variant="contained" onClick={handleSubmit} >SUBMIT</Button>
          </Grid>
        </>
      </Box>
      <br />

      {/* ****** Table Start ****** */}
      <>
        <Box sx={userStyle.container}>
          <Typography sx={userStyle.SubHeaderText}>  Company List </Typography>
          <br /><br />
          { /* ****** Header Buttons ****** */}
          <Grid container sx={{ justifyContent: "center" }} >
            <Grid >
              {/* {isUserRoleCompare[0].excelsupplier && (
                                <> */}
              <ExportCSV csvData={branchData} fileName={fileName} />
              {/* </>
                            )} */}
              {/* {isUserRoleCompare[0].csvsupplier && (
                                <> */}
              <ExportXL csvData={branchData} fileName={fileName} />
              {/* </>
                            )} */}
              {/* {isUserRoleCompare[0].printsupplier && (
                                <> */}
              <Button sx={userStyle.buttongrp} onClick={handlePrint}>&ensp;<FaPrint />&ensp;Print&ensp;</Button>
              {/* </>
                            )} */}
              {/* {isUserRoleCompare[0].pdfsupplier && (
                                <> */}
              <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
              {/* </>
                            )} */}
            </Grid>
          </Grid><br />

          <Grid style={userStyle.dataTablestyle}>
            <Box>
              <label htmlFor="pageSizeSelect">Show entries:</label>
              <Select id="pageSizeSelect" value={pageSize} onChange={handlePageSizeChange} sx={{ width: "77px" }}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={(companies.length)}>All</MenuItem>
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
          <br /><br />
          {/* ****** Table start ****** */}
          <TableContainer component={Paper}>
            <Table
              aria-label="simple table"
              id="Customerduesreport"
            // ref={tableRef}
            >
              <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                  <StyledTableCell onClick={() => handleSorting('serialNumber')}><Box sx={userStyle.tableheadstyle}><Box>SNo</Box><Box sx={{ marginTop: '-6PX' }}>{renderSortingIcon('serialNumber')}</Box></Box></StyledTableCell>
                  <StyledTableCell onClick={() => handleSorting('code')}><Box sx={userStyle.tableheadstyle}><Box>Code</Box><Box sx={{ marginTop: '-6PX' }}>{renderSortingIcon('code')}</Box></Box></StyledTableCell>
                  <StyledTableCell onClick={() => handleSorting('name')}><Box sx={userStyle.tableheadstyle}><Box>Name</Box><Box sx={{ marginTop: '-6PX' }}>{renderSortingIcon('name')}</Box></Box></StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData?.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{row.serialNumber}</StyledTableCell>
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
                  ))) : <StyledTableRow> <StyledTableCell colSpan={4} align="center">No Data Available</StyledTableCell> </StyledTableRow>}
              </TableBody>
            </Table>
          </TableContainer>
          <Box style={userStyle.dataTablestyle}>
            <Box>
              Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, companies.length)} of {companies.length} entries
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
        <>
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
                <Button onClick={handleCloseMod} variant="outlined">Cancel</Button>
                <Button autoFocus variant="contained" color='error'
                  onClick={(e) => delBranch(branchid)}
                > OK </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </>

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
                  Manage Company
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
                    <Typography variant="h6"> Name</Typography>
                    <Typography>{areaviewid.code}</Typography>
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12} sm={12} >
                  <FormControl fullWidth size="small">
                    <Typography variant="h6">Code</Typography>
                    <Typography>{areaviewid.name}</Typography>
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
          maxWidth="lg"
        >
          <Box sx={{ width: "550px", padding: "20px 50px" }}>
            <>
              <Typography sx={userStyle.HeaderText}>
                {" "}
                Company Activity log
              </Typography>
              <br />
              <br />
              <Grid container spacing={2}>
                <Grid item md={12} xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <Typography variant="h6">addedby</Typography>
                    <br />
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
                <br />
                <Grid item md={12} xs={12} sm={12}>
                  <FormControl fullWidth size="small">
                    <Typography variant="h6">Updated by</Typography>
                    <br />
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
              <br /> <br />
              <br />
              <Grid container spacing={2}>
                <Button variant="contained" onClick={handleCloseinfo}>
                  {" "}
                  Back{" "}
                </Button>
              </Grid>
            </>
          </Box>
        </Dialog>

        {/* ******Print layout ****** */}
        <TableContainer component={Paper} sx={userStyle.printcls}>
          <Table
            aria-label="simple table"
            id="Customerduesreport"
            ref={componentRef}
          >
            <TableHead sx={{ fontWeight: "600" }}>
              <TableRow>
                <TableCell> SNO</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Code </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies &&
                (companies?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell >{index + 1}</TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.name}</TableCell>

                  </TableRow>
                )))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>

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

export default Company;