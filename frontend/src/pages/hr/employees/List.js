import React, { useState, useEffect, useRef } from "react";
import { Box, Typography,  Dialog,TableRow,TableCell, DialogContent,OutlinedInput, DialogActions, Grid,Select,MenuItem, FormControl, Paper, Table, TableHead, TableContainer, Button, TableBody } from "@mui/material";
import { userStyle } from "../../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../../components/Table";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SERVICE } from '../../../services/Baseservice';
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { Link } from "react-router-dom";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useReactToPrint } from "react-to-print";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

function List() {


    const [employees, setEmployees] = useState([]);
    const [deleteuser, setDeleteuser] = useState([]);
    const [exceldata, setexceldata] = useState([]);
    //Datatable
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);

    //Delete model
    const [isDeleteOpen, setisDeleteOpen] = useState(false);
    const handleClickOpendel = () => {
        setisDeleteOpen(true);
    };
    const handleCloseDel = () => {
        setisDeleteOpen(false);
    };

    // info model
    const [openInfo, setOpeninfo] = useState(false);

    const handleClickOpeninfo = () => {
        setOpeninfo(true);
    };

    const handleCloseinfo = () => {
        setOpeninfo(false);
    };

    // Alert delete popup

    let userid = deleteuser._id;

    const delAddemployee = async () => {
        try {
            await axios.delete(`${SERVICE.USER_SINGLE}/${userid}`, {
            });

        } catch (err) {
            console.log(err.response.data.errorMessage)
        }
    };

    //set function to get particular row
    const rowData = async (id) => {
        try {
            let res = await axios.get(`${SERVICE.USER_SINGLE}/${id}`, {
            });
            setDeleteuser(res.data.suser);
        } catch (err) {
            console.log(err.response.data.errorMessage)
        }
    }



    //get all employees list details
    const fetchEmployee = async () => {
        try {
            let res_employee = await axios.get(SERVICE.USER, {
            });
            setEmployees(res_employee.data.users);
            // setMonth()
        }
        catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    }



    //  PDF
    const columns = [
       
        { title: "Id", field: "empcode" },
        { title: "Employee Name", field: "firstname" },
        { title: "Username", field: "username" },
        { title: "Email", field: "email" },

    ]


    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.autoTable({
            theme: "grid",
            columns: columns.map((col) => ({ ...col, dataKey: col.field })),
            body: employees,
        });
        doc.save("Employeelist.pdf");
    };


    // Excel
    const fileName = "branch";
    let excelno = 1;

    // get particular columns for export excel
    const getexcelDatas = async () => {
    
        var data = employees.map(t => ({Sno:excelno++,Empcode:t.empcode,Username:t.username,Firstname:t.firstname,Lastname:t.lastname,Legalname:t.legalname,Fathername:t.fathername,
            Mothername:t.mothername,Gender:t.gender,maritalstatus:t.maritalstatus,dob:t.dob,bloodgroup:t.bloodgroup,location:t.location,email:t.email,contactpersonal:t.contactpersonal,
            contactfamily:t.contactfamily,emergencyno:t.emergencyno,doj:t.doj,dop:t.dop,name:t.name,contactno:t.contactno,details:t.details,companyname:t.companyname,
            pdoorno:t.pdoorno,pstreet:t.pstreet,parea:t.parea,plandmark:t.plandmark,ptaluk:t.ptaluk,ppincode:t.ppincode,pcountry:t.pcountry,pstate:t.pstate,pcity:t.pcity,
            cdoorno:t.cdoorno,cstreet:t.cstreet,carea:t.carea,clandmark:t.clandmark,ctaluk:t.ctaluk,cpost:t.cpost,cpincode:t.cpincode,ccountry:t.ccountry,cstate:t.cstate,
            ccity:t.ccity,branch:t.branch,floor:t.floor,department:t.department,team:t.team,designation:t.designation,shifttiming:t.shifttiming,reportingto:t.reportingto,
            // accesslocation:t.accesslocation.toString()
        }));
        setexceldata(data)
    }



    //print...
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Employeelist",
        pageStyle: "print",
    });

    useEffect(() => {
        fetchEmployee();
        getexcelDatas();
    })
    const [items, setItems] = useState([]);

    const addSerialNumber = () => {
      const itemsWithSerialNumber = employees?.map((item, index) => ({ ...item, serialNumber: index + 1 }));
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
  
    const totalPages = Math.ceil(employees.length / pageSize);
  
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
            <Typography sx={userStyle.HeaderText}>Employee Details</Typography>
            <br />
            <Box sx={userStyle.container}>
            <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography sx={userStyle.SubHeaderText}>Employees List</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to="/addemployee" style={{ textDecoration: 'none', color: 'white', float:'right' }}><Button variant="contained">ADD</Button></Link>
                    </Grid>
                </Grid>
                <br /><br />
                <Grid container sx={{ justifyContent: "center" }} >
                    <Grid >
                        {/* {isUserRoleCompare[0].excelsupplier && (
                                <> */}
                        <ExportCSV csvData={exceldata} fileName={fileName}/>
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
                  <MenuItem value={(employees.length)}>All</MenuItem>
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
                {/* ****** Table start ****** */}
                <TableContainer component={Paper} >
                    <Table
                        aria-label="simple table"
                        id="branch"
                    >
                        <TableHead sx={{ fontWeight: "600" }}>
                            <StyledTableRow>
                            <StyledTableCell onClick={() => handleSorting('serialNumber')}><Box sx={userStyle.tableheadstyle}><Box>SNo</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('serialNumber')}</Box></Box></StyledTableCell>
                            <StyledTableCell onClick={() => handleSorting('status')}><Box sx={userStyle.tableheadstyle}><Box>Status</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('status')}</Box></Box></StyledTableCell>
                            <StyledTableCell onClick={() => handleSorting('percentage')}><Box sx={userStyle.tableheadstyle}><Box>Percentage</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('percentage')}</Box></Box></StyledTableCell>
                            <StyledTableCell onClick={() => handleSorting('empcode')}><Box sx={userStyle.tableheadstyle}><Box>Emp Code</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('empcode')}</Box></Box></StyledTableCell>
                            <StyledTableCell onClick={() => handleSorting('companyname')}><Box sx={userStyle.tableheadstyle}><Box>Company Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('companyname')}</Box></Box></StyledTableCell>
                            <StyledTableCell onClick={() => handleSorting('username')}><Box sx={userStyle.tableheadstyle}><Box>Company Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('username')}</Box></Box></StyledTableCell>
                            <StyledTableCell onClick={() => handleSorting('email')}><Box sx={userStyle.tableheadstyle}><Box>Email</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('email')}</Box></Box></StyledTableCell>
                            <StyledTableCell onClick={() => handleSorting('branch')}><Box sx={userStyle.tableheadstyle}><Box>Branch</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('branch')}</Box></Box></StyledTableCell>
                            <StyledTableCell onClick={() => handleSorting('designation')}><Box sx={userStyle.tableheadstyle}><Box>Designation</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('designation')}</Box></Box></StyledTableCell>                
                            <StyledTableCell onClick={() => handleSorting('team')}><Box sx={userStyle.tableheadstyle}><Box>Team</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('team')}</Box></Box></StyledTableCell>
                            <StyledTableCell onClick={() => handleSorting('shift')}><Box sx={userStyle.tableheadstyle}><Box>Shift</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('shift')}</Box></Box></StyledTableCell>
                            <StyledTableCell onClick={() => handleSorting('experience')}><Box sx={userStyle.tableheadstyle}><Box>Experience</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('experience')}</Box></Box></StyledTableCell>
                            <StyledTableCell onClick={() => handleSorting('doj')}><Box sx={userStyle.tableheadstyle}><Box>DOJ</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('doj')}</Box></Box></StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody align="left">
              {filteredData.length > 0 ? (
              filteredData?.map((row, index) => (
                                            <StyledTableRow key={index}>
                                    <StyledTableCell>{row.serialNumber}</StyledTableCell> 
                                        <StyledTableCell >{    
                                     <Typography color={row.status == "incomplete" ? "error" : "green"} variant ="contained" sx={{padding:'5px'}}>{row.status }</Typography> 
                                    }</StyledTableCell>                                            
                                    <StyledTableCell>{row.percentage ?  row.percentage + "%" : " " } </StyledTableCell>
                                    <StyledTableCell>{row.empcode} </StyledTableCell>
                                    <StyledTableCell> {row.companyname}</StyledTableCell>
                                    <StyledTableCell>{row.username}</StyledTableCell>
                                    <StyledTableCell>{row.email}</StyledTableCell>
                                    <StyledTableCell>{row.branch}</StyledTableCell>
                                    <StyledTableCell>{row.designation}</StyledTableCell>
                                    <StyledTableCell>{row.team}</StyledTableCell>
                                    <StyledTableCell>{row.shift}</StyledTableCell>
                                    <StyledTableCell>{row.experience}</StyledTableCell>                                  
                                    <StyledTableCell>{row.doj}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                                                    <Link to={`/edit/${row._id}`}>
                                                        <Button variant="outlined" size="small" style={userStyle.actionbutton} >
                                                            <EditIcon style={{ fontSize: '20px' }} />
                                                    </Button>
                                                    </Link>
                                                    <Link to="">
                                                     <Button size="small" variant="outlined" style={userStyle.actionbutton} onClick={(e) => { handleClickOpendel(); rowData(row._id) }}>
                                                        <DeleteIcon style={{ fontSize: '20px' }}/></Button>
                                                        </Link>
                                                     <Link to={`/view/${row._id}`} style={{ textDecoration: 'none', color: '#fff'}}>
                                                    <Button  size="small" variant="outlined" style={userStyle.actionbutton} ><VisibilityIcon style={{ fontSize: '20px' }} /></Button>
                                                </Link>
                                                {/* <Button
                                                            sx={userStyle.buttonedit}
                                                            // onClick={() => {
                                                            //     handleClickOpeninfo();
                                                            //     getinfoCode(row._id);
                                                            // }}
                                                        >
                                                            <InfoOutlinedIcon style={{ fontsize: "large" }} />
                                                        </Button> */}

                                               
                                            </Box>
                                        </StyledTableCell>
                                    </StyledTableRow>

                                )))  :   <StyledTableRow> <StyledTableCell colSpan={4} align="center">No Data Available</StyledTableCell> </StyledTableRow> }
                                </TableBody>
                                </Table>
                                </TableContainer>
                                <Box style={userStyle.dataTablestyle}>
                                        <Box>
                                        Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, employees.length)} of {employees.length} entries
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
            {/* ****** Table End ****** */}

            {/* Delete Modal */}
            <Box>
                {/* ALERT DIALOG */}
                <Dialog
                    open={isDeleteOpen}
                    onClose={handleCloseDel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
                        <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} />
                        <Typography variant="h5" sx={{ color: 'red', textAlign: 'center' }}>Are you sure?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDel} sx={userStyle.btncancel}>Cancel</Button>
                        <Button onClick={(e) => { delAddemployee(userid); handleCloseDel() }} autoFocus variant="contained" color='error'> OK </Button>
                    </DialogActions>
                </Dialog>
            </Box>


            <Box>
                <Dialog
                    // open={isErrorOpen}
                    // onClose={handleCloseerr}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
                        {/* <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} /> */}
                        <Typography variant="h6" ></Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="error" >ok</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            {/* print layout */}
            <TableContainer component={Paper} sx={userStyle.printcls}>
                <Table
                    aria-label="simple table"
                    id="branch"
                    ref={componentRef}
                >
                    <TableHead sx={{ fontWeight: "600" }}>
                        <TableRow>
                            <TableCell>SI.NO</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees &&
                            (employees.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index+1}</TableCell>
                                    <StyledTableCell>{row.empcode} </StyledTableCell>
                                    <TableCell> {row.firstname +" "+ row.lastname}</TableCell>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                </TableRow>

                            )))}
                    </TableBody>
                </Table>
            </TableContainer>
       
        </Box>
    );
}


export default List;