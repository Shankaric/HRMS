import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, Select,MenuItem,Dialog, TableBody, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button } from "@mui/material";
import { userStyle } from "../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { SERVICE } from '../../services/Baseservice';
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ExportXL, ExportCSV } from "../../components/Export";
import {StyledTableRow, StyledTableCell} from "../../components/Table";
import { useReactToPrint } from "react-to-print";
import moment from 'moment-timezone';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

const Units = () => {

  //fetch branch
  const [units, setUnits] = useState([]);
  const [branches, setBranches] = useState([]);
  const [unit, setUnit] = useState({
   branch:"", name: "", code: ""
  });
  const [getrowid, setRowGetid] = useState("");
  const [deleteunit, setDeleteunit] = useState({});
  const [unitedit, setUnitedit] = useState({  branch:"", name: "", code: ""});
  const [username, setUsername] = useState("");

//Datatable
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);


  let printsno=1;
  let sino=1;

  const userData = {
    name: username,
    date: new Date(),
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
      let res_unit = await axios.get(SERVICE.UNIT, {
      });
      setUnits(res_unit.data.units);
    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages);
    }
  }

    // get all branches
    const fetchbranches = async () => {
      try {
        let res_branchunit = await axios.get(
          SERVICE.BRANCH,
          {}
        );
        setBranches(res_branchunit.data.branch);
      } catch (err) {
        const messages = err.response.data.errorMessage;
        console.log(messages);
      }
    };

  //set function to get particular row
  const rowData = async (id) => {
    try {
      let res = await axios.get(`${SERVICE.UNIT_SINGLE}/${id}`, {
        // headers: {
        //     'Authorization': `Bearer ${auth.APIToken}`
        // }
      });
      setDeleteunit(res.data.sunit);
    } catch (err) {
    }
  }

  // Alert delete popup

  let unitid = deleteunit._id;
  const delUnit = async () => {
    try {
       await axios.delete(`${SERVICE.UNIT_SINGLE}/${unitid}`, {
      });
      handleClose();
    } catch (err) {
      console.group(err.response.data.errorMessage)
    }
  };

  
  //  PDF
  const columns = [
    { title: "Code", field: "code" },
    { title: "Name", field: "name" },
    
  ]

  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.autoTable({
      theme: "grid",
      columns: columns?.map(col => ({ ...col, dataKey: col.field })),
      body: units
    })
    doc.save('unit.pdf')
  }

  const getCode = async (e) => {
    let res = await axios.get(`${SERVICE.UNIT_SINGLE}/${e}`, {
    })
    setUnitedit(res.data.sunit);
    setRowGetid(res.data.sunit);
  }

   // get single row to view....
   const getviewCode = async (e) => {
    let res = await axios.get(`${SERVICE.UNIT_SINGLE}/${e}`, {});
    setUnitedit(res.data.sunit);
  };

   // get single row to view....
  const getinfoCode = async (e) => {
    let res = await axios.get(`${SERVICE.UNIT_SINGLE}/${e}`, {});
    setUnitedit(res.data.sunit);
  };

  let updatelist =[];
  updatelist = unitedit?.updatedby;

  // Excel
  const fileName = "Units";

  const [branchData, setBranchData] = useState([]);

  // get particular columns for export excel
  const getexcelDatas = async () => {
    let response = await axios.get(SERVICE.UNIT, {
      //  headers: {
      //      'Authorization': `Bearer ${auth.APIToken}`
      //  },
    });
    var data = response.data.units?.map(t => ({
      code: t.code, Name: t.name
    }));
    setBranchData(data);
  }

  //print...
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Units',
    pageStyle: 'print'
  });
 //add page....
  const sendRequest = async () => {
    try {
      let units = await axios.post(SERVICE.UNIT_CREATE, {
        // headers: {
        //     'Authorization':`Bearer ${auth.APIToken}`
        //     },
        code: String(unit.code),
        name: String(unit.name),
        branch: String(unit.branch),
        addedby: String(username),
        addedby:[
        {
          name: String(username),
          date: String(new Date()),
            
          },]
      })
      setUnit(units.data)
      setUnit({ name: "", code: "" })
    } catch (error) {
      setShowAlert(
        <>
            <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
            <p style={{fontSize:'20px', fontWeight:900}}>{error.response.data.errorMessage}</p>
        </>
    );
    handleClickOpenerr();
    }
  }

   //id for login...

   let loginid = localStorage.LoginUserId;
 
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

   //unit updateby edit page...
  let updateby = unitedit.updatedby;
  let addedby = unitedit.addedby;

  //edit post call
  let unit_id = getrowid._id
  const sendRequestEdit = async () => {
    try {
      let branches = await axios.put(`${SERVICE.UNIT_SINGLE}/${unit_id}`, {
        // headers: {
        //     'Authorization':`Bearer ${auth.APIToken}`
        //     },
        code: String(unitedit.code),
        name: String(unitedit.name),
        branch: String(unitedit.branch),
        updatedby:[
          ...updateby,{
          name: String(username),
          date: String(new Date()),
            
          },
      ],
      })
      setUnitedit(branches.data);
      handleCloseModEdit();
    } catch (error) {
      setShowAlert(
        <>
            <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
            <p style={{fontSize:'20px', fontWeight:900}}>{error.response.data.errorMessage}</p>
        </>
    );
    handleClickOpenerr();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(unit.code === ""){
      setShowAlert(
        <>
            <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
            <p style={{fontSize:'20px', fontWeight:900}}>{"Please enter code name"}</p>
        </>
    );
    handleClickOpenerr();
    }
    else if(unit.name === ""){
      setShowAlert(
        <>
            <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
            <p style={{fontSize:'20px', fontWeight:900}}>{"Please enter unit name"}</p>
        </>
    );
    handleClickOpenerr();
    }else{
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
      fetchbranches();
      getusername();
      
    }
  );

  let total = 0;
  const [items, setItems] = useState([]);

  const addSerialNumber = () => {
    const itemsWithSerialNumber = units?.map((item, index) => ({ ...item, serialNumber: index + 1 }));
    setItems(itemsWithSerialNumber);
  }

  useEffect(()=>{
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
                <Box sx={{ color:'#bbb6b6'}}>
                    <Grid sx={{height:'6px',fontSize:'1.6rem'}}>
                        <ArrowDropUpOutlinedIcon/>
                    </Grid>
                    <Grid sx={{height:'6px',fontSize:'1.6rem'}}>
                        <ArrowDropDownOutlinedIcon/>
                    </Grid>
                </Box>
            </>;
        } else if (sorting.direction === 'asc') {
            return <>
                <Box >
                    <Grid sx={{height:'6px'}}>
                        <ArrowDropUpOutlinedIcon style={{ color:'black',fontSize:'1.6rem'}}/>
                    </Grid>
                    <Grid sx={{height:'6px'}}>
                        <ArrowDropDownOutlinedIcon style={{ color:'#bbb6b6',fontSize:'1.6rem'}}/>
                    </Grid>
                </Box>
            </>;
        } else {
            return  <>
                <Box >
                    <Grid sx={{height:'6px'}}>
                        <ArrowDropUpOutlinedIcon style={{ color:'#bbb6b6',fontSize:'1.6rem'}}/>
                    </Grid>
                    <Grid sx={{height:'6px'}}>
                        <ArrowDropDownOutlinedIcon style={{ color:'black',fontSize:'1.6rem'}}/>
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

  const totalPages = Math.ceil(units.length / pageSize);

  const visiblePages = Math.min(totalPages, 3);

  const firstVisiblePage = Math.max(1, page - 1);
  const lastVisiblePage = Math.min(firstVisiblePage + visiblePages - 1, totalPages);

  const pageNumbers = [];

  const indexOfLastItem = page * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;

  for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
    pageNumbers.push(i);
  }

       //table sorting end
let sno=1;

  return (
    <div>

<Typography sx={userStyle.HeaderText}>
        Unit
      </Typography>
      <Box sx={userStyle.container}>
        <Typography sx={userStyle.SubHeaderText}>Create Unit</Typography>
        <>
        <br /> <br />
          <Grid container spacing={2}>
          <Grid item md={4} sm={12} sx={12}>
               <FormControl size="small" fullWidth>
                  <Typography>Branch</Typography>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={unit.branch}
                    onChange={(e) => {
                      setUnit({
                        ...unit,
                        branch: e.target.value,
                      });
                    }}
                  >
                    {branches &&
                      branches?.map((row, index) => (
                        <MenuItem value={row.name} key={index}>
                          {row.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            <Grid item md={4} sm={12} sx={12}>
              <FormControl fullWidth size="small" >
                <Typography>Code</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={unit.code}
                  onChange={(e) => { setUnit({ ...unit, code: e.target.value }) }}
                />
              </FormControl>
            </Grid>
            <Grid item md={4} sm={12} sx={12}>
              <FormControl fullWidth size="small" >
                <Typography>Name</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={unit.name}
                  onChange={(e) => { setUnit({ ...unit, name: e.target.value }) }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <Grid container>
            <Button variant="contained" style={{ marginLeft: "55em" }} onClick={handleSubmit}>Create</Button>
          </Grid>
        </>
      </Box>
      <br />
      <Box sx={userStyle.container}>
          <Typography sx={userStyle.HeaderText}>
            Unit List
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
                  <MenuItem value={(units.length)}>All</MenuItem>
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
     
             <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700, }}
              aria-label="customized table"
              id="usertable"
              // ref={tableRef}
            >
              <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                  <StyledTableCell onClick={() => handleSorting('serialNumber')}><Box sx={userStyle.tableheadstyle}><Box>SNo</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('sno')}</Box></Box></StyledTableCell>
                  <StyledTableCell onClick={() => handleSorting('branch')}><Box sx={userStyle.tableheadstyle}><Box>Branch</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('branch')}</Box></Box></StyledTableCell>
                  <StyledTableCell onClick={() => handleSorting('name')}><Box sx={userStyle.tableheadstyle}><Box>Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('name')}</Box></Box></StyledTableCell>
                  <StyledTableCell onClick={() => handleSorting('code')}><Box sx={userStyle.tableheadstyle}><Box>Code</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('code')}</Box></Box></StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody align="left">
              {filteredData?.map((row, index) => (
                  <StyledTableRow key={index}>
                      <StyledTableCell>{row.serialNumber}</StyledTableCell>
                      <StyledTableCell>{row.branch}</StyledTableCell>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>{row.code}</StyledTableCell>
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
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box style={userStyle.dataTablestyle}>
          <Box>
              Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, units.length)} of {units.length} entries
            </Box>
            <Box>
              <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1} sx={{textTransform:'capitalize',color:'black'}}>
                Prev
              </Button>
              {pageNumbers?.map((pageNumber) => (
                <Button key={pageNumber} sx={userStyle.paginationbtn} onClick={() => handlePageChange(pageNumber)} className={((page )) === pageNumber ? 'active' : ''} disabled={page === pageNumber}>
                  {pageNumber}
                </Button>
              ))}
              {lastVisiblePage < totalPages && <span>...</span>}
              <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} sx={{textTransform:'capitalize',color:'black'}}>
                Next
              </Button>
            </Box>           
          
         </Box>
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
            <Typography sx={userStyle.SubHeaderText}>Edit unit</Typography>
            <br />    <br />
              <Grid container spacing={2}>
              <Grid item md={12} sm={12} sx={12}>
               <FormControl size="small" fullWidth>
                  <Typography>Branch</Typography>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={unitedit.branch}
                    onChange={(e) => {
                      setUnitedit({
                        ...unitedit,
                        branch: e.target.value,
                      });
                    }}
                  >
                    {branches &&
                      branches?.map((row, index) => (
                        <MenuItem value={row.name} key={index}>
                          {row.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
                <Grid item md={12} sm={12} sx={12}>
                  <FormControl fullWidth size="small" >
                    <Typography>Code</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={unitedit.code}
                      onChange={(e) => { setUnitedit({ ...unitedit, code: e.target.value }) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={12} sm={12} sx={12}>
                  <FormControl fullWidth size="small" >
                    <Typography>Name</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={unitedit.name}
                      onChange={(e) => { setUnitedit({ ...unitedit, name: e.target.value }) }}
                    />
                  </FormControl><br /><br />
                </Grid>
                <Grid container>
                  <br />
                  <Grid item md={0.3}></Grid>
                  <Button variant="contained" onClick={editSubmit} >Update</Button>
                  <Grid item md={0.4}></Grid>
                  <Button sx={userStyle.btncancel} onClick={handleCloseModEdit} >Cancel</Button>
                </Grid>
              </Grid>
            </>
          </Box>
        </Dialog>
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
            <TableContainer  component={Paper} sx={userStyle.printcls}>
            <Table sx={{ minWidth: 700, }} aria-label="customized table" id="usertable" ref={componentRef}>
              <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                  <StyledTableCell> Sno</StyledTableCell>
                  <StyledTableCell>Branch </StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Code </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody align="left">
                {units &&
                  (units?.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{printsno++}</StyledTableCell>
                      <StyledTableCell>{row.branch} </StyledTableCell>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>{row.code}</StyledTableCell>
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
          maxWidth="lg"
        >
          <Box sx={{width:"550px",padding:'20px 50px'}}>
            <>               
            <Typography sx={userStyle.HeaderText}> View Unit Details</Typography>
              <br /> <br /> 
              <Grid container spacing={2}>
              <Grid item md={12} xs={12} sm={12} >
                  <FormControl fullWidth size="small">
                    <Typography variant="h6"> Branch </Typography>
                    <Typography>{unitedit.name}</Typography>                    
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12} sm={12} >
                  <FormControl fullWidth size="small">
                    <Typography variant="h6">Unit Name</Typography>
                    <Typography>{unitedit.name}</Typography>                    
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12} sm={12} >
                  <FormControl fullWidth size="small">
                    <Typography variant="h6">Code</Typography>
                    <Typography>{unitedit.code}</Typography>                    
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
        maxWidth='lg'
      >
        <Box sx={{ width: '550px', padding: '20px 50px' }}>
          <>
            <Typography sx={userStyle.HeaderText}> Manage Unit</Typography>
            <br /><br />
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} sm={12}>
                <FormControl fullWidth size="small">
                  <Typography variant="h6">addedby</Typography>
                  <br/>
                  <Table>
                      <TableHead>
                              <StyledTableCell align="center" sx={{padding:'5px 10px !important'}}>{"SNO"}.</StyledTableCell>
                              <StyledTableCell align="center" sx={{padding:'5px 10px !important'}}> {"UserName"}</StyledTableCell>
                              <StyledTableCell align="center" sx={{padding:'5px 10px !important'}}> {"Date"}</StyledTableCell>
                      </TableHead>
                    <TableBody>
                    {addedby?.map((item, i) => (                  
                        <StyledTableRow key={i}>
                            <StyledTableCell align="center">{i+1}</StyledTableCell>
                            <StyledTableCell align="center">{item.name}</StyledTableCell> 
                            <StyledTableCell align="center">{moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</StyledTableCell>
                          </StyledTableRow>
                          ))}
                    </TableBody>
                    </Table>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12} sm={12}>
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Updated by</Typography>
                  <br />
                  <Table>
                      <TableHead>
                              <StyledTableCell align="center" sx={{padding:'5px 10px !important'}}>{"SNO"}.</StyledTableCell>
                              <StyledTableCell align="center" sx={{padding:'5px 10px !important'}}> {"UserName"}</StyledTableCell>
                              <StyledTableCell align="center" sx={{padding:'5px 10px !important'}}> {"Date"}</StyledTableCell>
                      </TableHead>
                    <TableBody>
                    {updateby?.map((item, i) => (                  
                        <StyledTableRow key={i}>
                            <StyledTableCell align="center">{i+1}</StyledTableCell>
                            <StyledTableCell align="center">{item.name}</StyledTableCell> 
                            <StyledTableCell align="center">{moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</StyledTableCell>
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
    </div>
  );
};

export default Units;


