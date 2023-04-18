import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, Dialog, DialogContent, Select, MenuItem, DialogActions, FormControl, Grid, TextareaAutosize, Paper, Table, TableHead, TableContainer, Button, TableBody } from "@mui/material";
import { userStyle } from "../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import { SERVICE } from '../../services/Baseservice';
import axios from "axios";
import Selects from 'react-select';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Country, State, City } from "country-state-city";
import { useReactToPrint } from "react-to-print";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import moment from 'moment-timezone';



function Branch() {

  // SELECT DROPDOWN STYLES
  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: 'white'
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      // color:'black',
      color: isFocused
        ? 'rgb(255 255 255, 0.5)'
        : isSelected
          ? 'white'
          : 'black',
      background: isFocused
        ? 'rgb(25 118 210, 0.7)'
        : isSelected
          ? 'rgb(25 118 210, 0.5)'
          : null,
      zIndex: 1
    }),
    menu: base => ({
      ...base,
      zIndex: 100
    })
  }

  //updated by field...
  let sino = 1;


  const [branch, setBranch] = useState({
    code: "", assetcode: "", phone: "", email: "", company: "",
    name: "", country: "", state: "", address: "", city: "", pincode: ""
  });

  // Country city state datas
  const [selectedCountry, setSelectedCountry] = useState({ label: "India", name: 'India' });
  const [selectedState, setSelectedState] = useState({ label: "Tamil Nadu", name: 'Tamil Nadu' });
  const [selectedCity, setSelectedCity] = useState({ label: "Tiruchirapalli", name: 'Tiruchirapalli' });

  const [branches, setBranches] = useState([]);
  const [getrowid, setRowGetid] = useState("");
  const [branchedit, setBranchedit] = useState({
    code: "", assetcode: "", phone: "", email: "", company: "",
    name: "", country: "", state: "", address: "", city: "", pincode: ""
  });
  const [deletebranch, setDeletebranch] = useState({});
  const [excelData, setExcelData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [username, setUsername] = useState("");

  //Datatable
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

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
  const [showAlert, setShowAlert] = useState()
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
  const [isDeleteOpen, setisDeleteOpen] = useState(false);
  const handleClickOpendel = () => {
    setisDeleteOpen(true);
  };
  const handleCloseDel = () => {
    setisDeleteOpen(false);
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
  const fetchBranch = async () => {
    try {
      let res_branch = await axios.get(SERVICE.BRANCH, {

      });
      setBranches(res_branch.data.branch);
    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages)
    }
  }


  // get all branches
  const fetchComapnies = async () => {
    try {
      let res_branchunit = await axios.get(
        SERVICE.COMPANY,
        {}
      );
      setCompanies(res_branchunit.data.companies);
    } catch (err) {
      const messages = err.response.data.errorMessage;
      console.log(messages);
    }
  };

  //  PDF
  const columns = [
    // { title: "SNO", field: "sno" },
    { title: "Name", field: "name" },
    { title: "Code", field: "code" },
    { title: "Asset Code", field: 'assetcode' },
    { title: "Address", field: 'address', },
    { title: "Phone", field: 'phone' },
    { title: "Email", field: 'email', },
  ]


  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: branches,
    });
    doc.save("branch.pdf");
  };

  // Excel
  const fileName = "branch";
  let excelno = 1;

  // get particular columns for export excel
  const getexcelDatas = async () => {

    var data = branches.map(t => ({
      SNo: excelno++, code: t.code, assetcode: t.assetcode,
      phone: t.phone, email: t.email, name: t.name,
      country: t.country, state: t.state, addres: t.addres, city: t.city, pincode: t.pincode
    }));
    setExcelData(data);
  }

  const getCode = async (e) => {
    let res = await axios.get(`${SERVICE.BRANCH_SINGLE}/${e}`, {
    })
    setBranchedit(res.data.sbranch);
    setRowGetid(res.data.sbranch);
  }

  // get single row to edit....
  const getviewCode = async (e) => {
    let res = await axios.get(`${SERVICE.BRANCH_SINGLE}/${e}`, {});
    setBranchedit(res.data.sbranch);
  };

  // get single row to view....
  const getinfoCode = async (e) => {
    let res = await axios.get(`${SERVICE.BRANCH_SINGLE}/${e}`, {});
    setBranchedit(res.data.sbranch);
  };


  //set function to get particular row
  const rowData = async (id) => {
    try {
      let res = await axios.get(`${SERVICE.BRANCH_SINGLE}/${id}`, {
        // headers: {
        //     'Authorization': `Bearer ${auth.APIToken}`
        // }
      });
      setDeletebranch(res.data.sbranch);
    } catch (err) {
      console.log(err.response.data.errorMessage)
    }
  }

  // Alert delete popup

  let branchid = deletebranch._id;

  const delBranch = async () => {
    try {
      await axios.delete(`${SERVICE.BRANCH_SINGLE}/${branchid}`, {
      });

    } catch (err) {
      console.log(err.response.data.errorMessage)
    }
  };


  //add function....

  const sendRequest = async () => {
    try {
      let branches = await axios.post(SERVICE.BRANCH_CREATE, {
        code: String(branch.code),
        assetcode: String(branch.assetcode),
        phone: String(branch.phone),
        email: String(branch.email),
        name: String(branch.name),
        company: String(branch.company),
        country: String(selectedCountry.name ? selectedCountry.name : ""),
        state: String(selectedState.name ? selectedState.name : ""),
        city: String(selectedCity.name ? selectedCity.name : ""),
        address: String(branch.address),
        pincode: String(branch.pincode),
        addedby: [
          {
            name: String(username),
            date: String(new Date()),

          },
        ],

      })
      setBranch(branches.data);
      setBranch({
        code: "", assetcode: "", phone: "", email: "",
        name: "", country: "", state: "", address: "", city: "", pincode: "", addedby: "", updatedby: ""
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
  }
  const handlePhone = (e) => {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.slice(0, 10)
      setBranch({ phone: e.target.value.replace(/^0+/, '') });
    }
  }
  //submit option for saving....
  const handleSubmit = (e) => {
    e.preventDefault();
    if (branch.code === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
          <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter Code"}</p>
        </>
      );
      handleClickOpenerr();
    } else if (branch.name === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
          <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter Name"}</p>
        </>
      );
      handleClickOpenerr();
    }
    else {
      sendRequest();
    }
  }


  //id for login

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
  console.log(username);

  //branch updatedby edit page....
  let updateby = branchedit.updatedby;
  console.log(branchedit.updatedby, 'updatedvalue');


  //edit post call
  let branch_id = getrowid._id
  const sendRequestEdit = async () => {
    try {
      let branches = await axios.put(`${SERVICE.BRANCH_SINGLE}/${branch_id}`, {
        // headers: {
        //     'Authorization':`Bearer ${auth.APIToken}`
        //     },
        code: String(branchedit.code),
        assetcode: String(branchedit.assetcode),
        phone: String(branchedit.phone),
        email: String(branchedit.email),
        name: String(branchedit.name),
        address: String(branchedit.address),
        company: String(branchedit.company),
        country: String(selectedCountry.name ? selectedCountry.name : ""),
        state: String(selectedState.name ? selectedState.name : ""),
        city: String(selectedCity.name ? selectedCity.name : ""),
        pincode: String(branchedit.pincode),
        updatedby: [
          ...updateby, {
            name: String(username),
            date: String(new Date()),

          },
        ],
      })
      setBranchedit(branches.data);
      handleCloseModEdit();
    } catch (error) {
      console.log(error.response.data.message)
    }
  }



  const editSubmit = (e) => {
    e.preventDefault();
    sendRequestEdit();
  }


  useEffect(
    () => {
      fetchBranch();
      getexcelDatas();
      fetchComapnies();
      getusername();
    }
  );

  //print...
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Branch",
    pageStyle: "print",
  });


  // Country city state datas
  const [selectedCountryedit, setSelectedCountryedit] = useState({ label: "India", name: "India" });
  const [selectedStateedit, setSelectedStateedit] = useState({ label: "Tamil Nadu", name: 'Tamil Nadu' });
  const [selectedCityedit, setSelectedCityedit] = useState({ label: "Tiruchirapalli", name: 'Tiruchirapalli' });

  const [items, setItems] = useState([]);

    const addSerialNumber = () => {
    const itemsWithSerialNumber = branches?.map((item, index) => ({ ...item, serialNumber: index + 1 }));
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

    const totalPages = Math.ceil(branches.length / pageSize);

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
      <Typography sx={userStyle.HeaderText}>Branch</Typography>
      <Box sx={userStyle.container}>
        <Typography sx={userStyle.SubHeaderText}> Create Branch</Typography>
        <br /><br />

        <>
          <Grid container spacing={2}>
            <Grid item md={3} sm={12} sx={12}>
              <FormControl fullWidth size="small" >
                <Typography>Code</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={branch.code}
                  onChange={(e) => { setBranch({ ...branch, code: e.target.value }) }}
                />
              </FormControl>
            </Grid>
            <Grid item md={3} sm={12} sx={12}>
              <FormControl fullWidth size="small" >
                <Typography>Asset Code</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={branch.assetcode}
                  onChange={(e) => { setBranch({ ...branch, assetcode: e.target.value }) }}
                />
              </FormControl>
            </Grid>
            <Grid item md={3} sm={12} sx={12}>
              <FormControl fullWidth size="small" >
                <Typography>Phone</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="Number"
                  sx={userStyle.input}
                  value={branch.phone}
                  onChange={(e) => { setBranch({ ...branch, phone: e.target.value }); handlePhone(e) }}
                />
              </FormControl>
            </Grid>
            <Grid item md={3} sm={12} sx={12}>
              <FormControl fullWidth size="small" >
                <Typography>Email</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="email"
                  value={branch.email}
                  onChange={(e) => { setBranch({ ...branch, email: e.target.value }) }}
                />
              </FormControl>
            </Grid>
            <br />
            <Grid item md={3} sm={12} sx={12}>
              <FormControl fullWidth size="small" >
                <Typography>Name</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={branch.name}
                  onChange={(e) => { setBranch({ ...branch, name: e.target.value }) }}
                />
              </FormControl>
            </Grid>
            <Grid item md={3} sm={12} sx={12}>
              <FormControl fullWidth size="small" >
                <Typography>Company</Typography>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={branch.company}
                  onChange={(e) => {
                    setBranch({
                      ...branch,
                      company: e.target.value,
                    });
                  }}
                >
                  {companies &&
                    companies.map((row, index) => (
                      <MenuItem value={row.name} key={index}>
                        {row.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={3} sm={12} sx={12}>
              <FormControl size="small" fullWidth>
                <Typography>Country</Typography>
                <Selects
                  options={Country.getAllCountries()}
                  getOptionLabel={(options) => {
                    return options["name"];
                  }}
                  getOptionValue={(options) => {
                    return options["name"];
                  }}
                  value={selectedCountry}
                  // value={{label:"India", name:'India'}}
                  styles={colourStyles}
                  onChange={(item) => {
                    setSelectedCountry(item);
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item md={3} sm={12} sx={12}>
              <FormControl size="small" fullWidth>
                <Typography>State</Typography>
                <Selects
                  options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                  getOptionLabel={(options) => {
                    return options["name"];
                  }}
                  getOptionValue={(options) => {
                    return options["name"];
                  }}
                  value={selectedState}
                  styles={colourStyles}
                  onChange={(item) => {
                    setSelectedState(item);
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} sm={12} sx={12}>
              <FormControl fullWidth>
                <Typography>Address</Typography>
                <TextareaAutosize aria-label="minimum height" minRows={5}
                  value={branch.address}
                  onChange={(e) => { setBranch({ ...branch, address: e.target.value }) }}
                />
              </FormControl>
            </Grid>

            <Grid item md={3} sm={12} sx={12}>
              <FormControl size="small" fullWidth>
                <Typography>City</Typography>
                <Selects
                  options={City.getCitiesOfState(
                    selectedState?.countryCode,
                    selectedState?.isoCode
                  )}
                  getOptionLabel={(options) => {
                    return options["name"];
                  }}
                  getOptionValue={(options) => {
                    return options["name"];
                  }}
                  value={selectedCity}
                  styles={colourStyles}
                  onChange={(item) => {
                    setSelectedCity(item);
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item md={3} sm={12} sx={12}>
              <FormControl fullWidth size="small" >
                <Typography>Pincode</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="Number"
                  sx={userStyle.input}
                  value={branch.pincode}
                  onChange={(e) => { setBranch({ ...branch, pincode: e.target.value }) }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <Grid container>
            <Button variant="contained" onClick={handleSubmit}>Create</Button>
          </Grid>
        </>
        <br />
      </Box>
      <br />
      {/* ****** Table Start ****** */}
      <>
        <Box sx={userStyle.container}>
          <Typography sx={userStyle.SubHeaderText}>  Branch List </Typography>
          <br /><br />
          { /* ****** Header Buttons ****** */}
          <Grid container sx={{ justifyContent: "center" }} >
            <Grid >
              {/* {isUserRoleCompare[0].excelsupplier && (
                                <> */}
              <ExportCSV csvData={excelData} fileName={fileName} />
              {/* </>
                            )} */}
              {/* {isUserRoleCompare[0].csvsupplier && (
                                <> */}
              <ExportXL csvData={excelData} fileName={fileName} />
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
                            <MenuItem value={(branches.length)}>All</MenuItem>
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
            //ref={tableRef}
            >
              <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                <StyledTableCell     StyledTableCell onClick={() => handleSorting('serialNumber')}><Box sx={userStyle.tableheadstyle}><Box>SNo</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('serialNumber')}</Box></Box></StyledTableCell>
                      <StyledTableCell onClick={() => handleSorting('name')}><Box sx={userStyle.tableheadstyle}><Box>Project Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('name')}</Box></Box></StyledTableCell>
                      <StyledTableCell onClick={() => handleSorting('code')}><Box sx={userStyle.tableheadstyle}><Box>SubProject Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('code')}</Box></Box></StyledTableCell>
                      <StyledTableCell onClick={() => handleSorting('assetcode')}><Box sx={userStyle.tableheadstyle}><Box>Module Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('assetcode')}</Box></Box></StyledTableCell>
                      <StyledTableCell onClick={() => handleSorting('address')}><Box sx={userStyle.tableheadstyle}><Box>Submodule Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('address')}</Box></Box></StyledTableCell>
                      <StyledTableCell onClick={() => handleSorting('phone')}><Box sx={userStyle.tableheadstyle}><Box>Mainpage Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('phone')}</Box></Box></StyledTableCell>
                      <StyledTableCell onClick={() => handleSorting('email')}><Box sx={userStyle.tableheadstyle}><Box>Subpageone Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('email')}</Box></Box></StyledTableCell>
                      <StyledTableCell>Action</StyledTableCell>
                      </StyledTableRow>
                  </TableHead>
                  <TableBody align="left">
                  {filteredData.length > 0 ? (
                  filteredData?.map((row, index) => (
                      <StyledTableRow key={index}>
                        {/* <StyledTableCell>{total = ((pages * entries - entries + index + 1))}</StyledTableCell> */}
                      <StyledTableCell>{row.name} </StyledTableCell>
                      <StyledTableCell>{row.code} </StyledTableCell>
                      <StyledTableCell>{row.assetcode}</StyledTableCell>
                      <StyledTableCell>{row.address}</StyledTableCell>
                      <StyledTableCell>{row.phone} </StyledTableCell>
                      <StyledTableCell>{row.email}</StyledTableCell>
                      <StyledTableCell component="th" scope="row" colSpan={1}>
                        <Grid sx={{ display: "flex" }}>
                          <Button sx={userStyle.buttonedit} onClick={() => {
                            handleClickOpenEdit();
                            getCode(row._id)
                          }}>
                            <EditOutlinedIcon style={{ fontsize: "large" }} />
                          </Button>
                          <Button sx={userStyle.buttondelete} onClick={(e) => { handleClickOpendel(); rowData(row._id) }}> <DeleteOutlineOutlinedIcon
                            style={{ fontsize: "large" }}
                          /></Button>
                          <Button
                            sx={userStyle.buttonedit}
                            variant="outlined"
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
                   )))  :   <StyledTableRow> <StyledTableCell colSpan={9} align="center">No Data Available</StyledTableCell> </StyledTableRow> }
                   </TableBody>
                 </Table>
               </TableContainer>
               <Box style={userStyle.dataTablestyle}>
                 <Box>
                     Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, branches.length)} of {branches.length} entries
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
                <Button onClick={(e) => { delBranch(branchid); handleCloseDel() }} autoFocus variant="contained" color='error'> OK </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </>
        {/* ALERT DIALOG */}
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
              <Typography sx={userStyle.SubHeaderText}> Create Branch</Typography>
              <br /><br />
              <Grid container spacing={2}>
                <Grid item md={6} sm={12} sx={12}>
                  <FormControl fullWidth size="small" >
                    <Typography>Code</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={branchedit.code}
                      onChange={(e) => { setBranchedit({ ...branchedit, code: e.target.value }) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={12} sx={12}>
                  <FormControl fullWidth size="small" >
                    <Typography>Asset Code</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={branchedit.assetcode}
                      onChange={(e) => { setBranchedit({ ...branchedit, assetcode: e.target.value }) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={12} sx={12}>
                  <FormControl fullWidth size="small" >
                    <Typography>Phone</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={branchedit.phone}
                      onChange={(e) => { setBranchedit({ ...branchedit, phone: e.target.value }) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={12} sx={12}>
                  <FormControl fullWidth size="small" >
                    <Typography>Email</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={branchedit.email}
                      onChange={(e) => { setBranchedit({ ...branchedit, email: e.target.value }) }}
                    />
                  </FormControl>
                </Grid>
                <br />
                <Grid item md={6} sm={12} sx={12}>
                  <FormControl fullWidth size="small" >
                    <Typography>Name</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={branchedit.name}
                      onChange={(e) => { setBranchedit({ ...branchedit, name: e.target.value }) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={12} sx={12}>
                  <FormControl fullWidth size="small" >
                    <Typography>Comapny</Typography>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={branchedit.company}
                      onChange={(e) => {
                        setBranchedit({
                          ...branchedit,
                          company: e.target.value,
                        });
                      }}
                    >
                      {companies &&
                        companies.map((row, index) => (
                          <MenuItem value={row.name} key={index}>
                            {row.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={12} sx={12}>
                  <FormControl fullWidth>
                    <Typography>Address</Typography>
                    <TextareaAutosize aria-label="minimum height" minRows={2}
                      value={branchedit.address}
                      onChange={(e) => { setBranchedit({ ...branchedit, address: e.target.value }) }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={12} sx={12}>
                  <FormControl size="small" fullWidth>
                    <Typography>Country</Typography>
                    <Selects
                      options={Country.getAllCountries()}
                      getOptionLabel={(options) => {
                        return options["name"];
                      }}
                      getOptionValue={(options) => {
                        return options["name"];
                      }}
                      // value={"India"}
                      value={selectedCountryedit}
                      styles={colourStyles}
                      onChange={(item) => {
                        setSelectedCountryedit(item);
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={12} sx={12}>
                  <FormControl size="small" fullWidth>
                    <Typography>State</Typography>
                    <Selects
                      options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                      getOptionLabel={(options) => {
                        return options["name"];
                      }}
                      getOptionValue={(options) => {
                        return options["name"];
                      }}
                      //   value={State?.getStatesOfCountry()?.find(op => {
                      //     return op.value === branchedit.state
                      //  })}
                      value={selectedStateedit}
                      styles={colourStyles}
                      onChange={(item) => {
                        setSelectedStateedit(item);
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={12} sx={12}>
                  <FormControl size="small" fullWidth>
                    <Typography>City</Typography>
                    <Selects
                      options={City.getCitiesOfState(
                        selectedStateedit?.countryCode,
                        selectedStateedit?.isoCode
                      )}
                      getOptionLabel={(options) => {
                        return options["name"];
                      }}
                      getOptionValue={(options) => {
                        return options["name"];
                      }}
                      value={selectedCityedit}
                      styles={colourStyles}
                      onChange={(item) => {
                        setSelectedCityedit(item);
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={12} sx={12}>
                  <FormControl fullWidth size="small" >
                    <Typography>Pincode</Typography>
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      label="Pincode"
                      value={branchedit.pincode}
                      onChange={(e) => { setBranchedit({ ...branchedit, pincode: e.target.value }) }}
                    />
                  </FormControl><br /><br />
                </Grid>
                <Grid container>
                  <br />
                  <Grid item md={1}></Grid>
                  <Button variant="contained" onClick={editSubmit} >Update</Button>
                  <Grid item md={1}></Grid>
                  <Button sx={userStyle.btncancel} onClick={handleCloseModEdit} >Cancel</Button>
                </Grid>
              </Grid>
            </>
          </Box>
        </Dialog>
      </Box>

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

      {/* print layout */}
      <TableContainer component={Paper} sx={userStyle.printcls}>
        <Table
          aria-label="simple table"
          id="branch"
          ref={componentRef}
        >
          <TableHead sx={{ fontWeight: "600" }}>
            <StyledTableRow>
              <StyledTableCell>SI.NO</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Code </StyledTableCell>
              <StyledTableCell>Asset Code </StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>

            </StyledTableRow>
          </TableHead>
          {branches &&
            (branches.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index+1}</StyledTableCell>
                <StyledTableCell>{row.name} </StyledTableCell>
                <StyledTableCell>{row.code} </StyledTableCell>
                <StyledTableCell>{row.assetcode}</StyledTableCell>
                <StyledTableCell>{row.address}</StyledTableCell>
                <StyledTableCell>{row.phone} </StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>

              </StyledTableRow>
            )))}
        </Table>
      </TableContainer>

      {/* view model */}
      <Dialog
        open={openview}
        onClose={handleClickOpenview}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ width: "550px", padding: '20px 50px' }}>
          <>
            <Typography sx={userStyle.HeaderText}> View Branch Details</Typography>
            <br /> <br />
            <Grid container spacing={2}>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6"> Name</Typography>
                  <Typography>{branchedit.name}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Code</Typography>
                  <Typography>{branchedit.code}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Assetcode</Typography>
                  <Typography>{branchedit.assetcode}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Address</Typography>
                  <Typography>{branchedit.address}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Country</Typography>
                  <Typography>{branchedit.country}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">State</Typography>
                  <Typography>{branchedit.state}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">City</Typography>
                  <Typography>{branchedit.city}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Pincode</Typography>
                  <Typography>{branchedit.pincode}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Phone Number</Typography>
                  <Typography>{branchedit.phone}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} sm={12} >
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Email</Typography>
                  <Typography>{branchedit.email}</Typography>
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


    </Box>
  );
}


export default Branch;