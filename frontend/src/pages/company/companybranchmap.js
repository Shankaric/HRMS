import React, { useState, useEffect, useRef } from "react";
import {  Box,  Table,  TableBody,  TableContainer,  Select,  Dialog,  DialogContent,  DialogActions,  MenuItem,  TableHead,  Paper,  Button,  Grid,  Typography,  FormControl} from "@mui/material";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { userStyle } from "../../pageStyle";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import { ExportXL, ExportCSV } from "../../components/Export";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
// import Headtitle from '../../components/header/Headtitle';
// import { UserRoleAccessContext } from '../../context/Appcontext';
import $ from "jquery";
import { SERVICE } from '../../services/Baseservice';
import Selects from "react-select";
// import { AuthContext } from '../../context/Appcontext';

function Companybranchmap() {

  const [manageCompany, setmanageCompany] = useState({
    company: "",
    branch: "",
  });

  const[companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [managescompany, setManagescompany] = useState([]);
  const [deletebranchunit, setDeletebranchunit] = useState("");
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedValueedit, setSelectedValueedit] = useState([]);

  const [getrowid, setRowGetid] = useState("");

  const [unitsdataview, setunitsdataview] = useState([]);

  const [manageCompanyedit, setmanageCompanyedit] = useState({
    branch: "",
    unit: "",
  });

  //get unit values from db
  const [selectedbranch, setselectedbranch] = useState([]);

  let sno = 1;

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
  const fetchbranches = async () => {
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

  const fetchunit = async () => {
    try {
      let productlist = await axios.get(
        SERVICE.BRANCH,
        {}
      );
      setBranches(
        productlist?.data?.branch?.map((d) => ({
          ...d,
          label: d.name,
          value: d.name,
        }))
      );
    } catch (err) {
      const messages = err.response.data.errorMessage;
      console.log(messages);
    }
  };
  const fetchManages = async () => {
    try {
      let productlist = await axios.get(
        SERVICE.MANAGECOMPANY,
        {}
      );
      setManagescompany(productlist.data.managecompany);
    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages);
    }
  };

  //print...
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Branch Unit map",
    pageStyle: "print",
  });

  // const { auth, setAuth } = useContext(AuthContext);
  // const { isUserRoleCompare } = useContext(UserRoleAccessContext);
  //  PDF
  const columns = [
    // { title: "SNO", field: "sno" },
    { title: "Company", field: "company" },
    { title: "Branch", field: "branch" },
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: managescompany,
    });
    doc.save("Branchunit.pdf");
  };

  // Excel
  const fileName = "Companybranch";
  let excelno = 1;
  const [branchunitData, setBranchunitData] = useState([]);

  // get particular columns for export excel
  const getexcelDatas = async () => {
    let response = await axios.get(SERVICE.MANAGECOMPANY, {});
    var data = response.data.managecompany.map((t) => ({
      sno: excelno++,
      company: t.company,
      branch: t.branch.toString(),
    }));
    setBranchunitData(data);
  };

  
  //Delete model
  const [isDeleteOpen, setisDeleteOpen] = useState(false);
  const handleClickOpendel = () => {
    setisDeleteOpen(true);
  };
  const handleCloseDel = () => {
    setisDeleteOpen(false);
  };

  //jquery
  $.DataTable = require("datatables.net");
  const tableRef = useRef();

  useEffect(() => {
    $(document).ready(function () {
      $.fn.dataTable.ext.errMode = "none";
      setTimeout(function () {
        $(tableRef.current).DataTable({
          language: { search: "", searchPlaceholder: "Search..." },
          lengthMenu: [
            [1,5,10, 25, 50, 100, 200, 500, -1],
            [1,5,10, 25, 50, 100, 200, 500, "All"],
          ],
        });
      }, 1000);
    });
  });

  //set function to get particular row
  const rowData = async (id) => {
    try {
      let res = await axios.get(
        `${SERVICE.MANAGECOMPANY_SINGLE}/${id}`,
        {}
      );
      setDeletebranchunit(res.data.smanagecompany);
    } catch (err) {
      console.log(err.response.data.errorMessage);
    }
  };
  // Alert delete popup

  let branchid = deletebranchunit._id;

  const deletebranch = async () => {
    try {
       await axios.delete( `${SERVICE.MANAGECOMPANY_SINGLE}/${branchid}`,
        {}
      );
    } catch (err) {
      console.log(err.response.data.errorMessage);
    }
  };

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  
  const getunitvalues = (e) => {
    setselectedbranch(
      Array.isArray(e?.branch)
        ? e?.branch?.map((x) => ({
            ...x,
            label: x,
            value: x,
          }))
        : []
    );
  };


  const getunitdataview = (e) => {

   let unitdata = e?.branch?.map((item) =>{
      return item
    })
    setunitsdataview(unitdata)

  };

  const handleChangeedit = (e) => {
    setSelectedValueedit(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  //    create branchunit map

  const sendRequest = async () => {
    try {
      let branchunits = await axios.post(
        SERVICE.MANAGECOMPANY_CREATE,
        {
          company: String(manageCompany.company),
          branch: [...selectedValue],
        }
      );
      setmanageCompany(branchunits.data);
      setmanageCompany({ company: "" });
      setSelectedValue([]);
    } catch (err) {
      setShowAlert(
        <>
            <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
            <p style={{fontSize:'20px', fontWeight:900}}>{err.response.data.errorMessage}</p>
        </>
    );
    handleClickOpenerr();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(manageCompany.company === ""){
      setShowAlert(
        <>
            <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
            <p style={{fontSize:'20px', fontWeight:900}}>{"Please Choose Branch"}</p>
        </>
    );
    handleClickOpenerr();
    }else if(selectedValue.length === 0){
      setShowAlert(
        <>
            <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
            <p style={{fontSize:'20px', fontWeight:900}}>{"Please Choose Unit"}</p>
        </>
    );
    handleClickOpenerr();
    }
    else{
      sendRequest();
    }
  };

  // get branch id globalaly
  const getCode = async (e) => {
    let res = await axios.get(`${SERVICE.MANAGECOMPANY_SINGLE}/${e}`, {});
    setmanageCompanyedit(res.data.smanagecompany);
    setRowGetid(res.data.smanagecompany);
  };

// get single row to view....
const getviewCode = async (e) => {
  let res = await axios.get(`${SERVICE.MANAGECOMPANY_SINGLE}/${e}`, {});
  setmanageCompanyedit(res.data.smanagecompany);
};

  //edit put call
  let branchunit_id = getrowid._id;
  const sendRequestEdit = async () => {
    try {
      let branches = await axios.put(
        `${SERVICE.MANAGECOMPANY_SINGLE}/${branchunit_id}`,
        {
          company: String(manageCompanyedit.branch),
          branch: [...selectedValueedit],
        }
      );
      setmanageCompanyedit(branches.data);
      handleCloseModEdit();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const editSubmit = (e) => {
    sendRequestEdit();
  };

  useEffect(() => {
    fetchunit();
    getexcelDatas();
    fetchbranches();
    fetchManages();
  });

  return (
    <Box>
      {/* <Headtitle title={'Manage Branch End Unit'} /> */}
      <Typography sx={userStyle.HeaderText}>
        Manage Comapny and Branch
        <Typography sx={userStyle.SubHeaderText}></Typography>
      </Typography>
      <Box sx={userStyle.selectcontainer}>
        <Grid container lg={12} md={12} sm={12} xs={12} spacing={1}>
          <Grid item lg={5} md={5}>
            <Grid container lg={12} md={12}>
              <Grid item lg={2} md={2}></Grid>
              <Grid item lg={10} md={10}>
                <FormControl size="small" fullWidth>
                  <Typography>Company</Typography>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={manageCompany.company}
                    onChange={(e) => {
                      setmanageCompany({
                        ...manageCompany,
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
            </Grid>
          </Grid>
          <Grid item lg={5} md={5}>
            <Grid container lg={12} md={12}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControl fullWidth>
                  <Typography>Branches</Typography>

                  <Selects
                    isMulti
                    name="units"
                    options={branches}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    // value={selectedOptions}
                    value={branches.filter((obj) =>
                      selectedValue.includes(obj.value)
                    )} // set selected values
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={2} md={2} marginTop={3}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Create New
            </Button>
          </Grid>
        </Grid>
      </Box>
      <br />

      {/* header text */}
      {/* content start */}

      <Box sx={userStyle.container}>
        {/* ****** Header Buttons ****** */}
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid>
            {/* {isUserRoleCompare[0].excelsupplier && ( */}
            <>
              <ExportCSV onClick={getexcelDatas} fileName={fileName} />
            </>
            {/* )} */}
            {/* {isUserRoleCompare[0].csvsupplier && ( */}
            <>
              <ExportXL csvData={branchunitData} fileName={fileName} />
            </>
            {/* )} */}
            {/* {isUserRoleCompare[0].printsupplier && ( */}
            <>
              <Button sx={userStyle.buttongrp} onClick={handleprint}>
                &ensp;
                <FaPrint />
                &ensp;Print&ensp;
              </Button>
            </>
            {/* )} */}
            {/* {isUserRoleCompare[0].pdfsupplier && ( */}
            <>
              <Button sx={userStyle.buttongrp} onClick={downloadPdf}>
                <FaFilePdf />
                &ensp;Export to PDF&ensp;
              </Button>
            </>
            {/* )} */}
          </Grid>
        </Grid>
        <br />
        <Box>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700 }}
              aria-label="customized table"
              id="usertable"
              ref={tableRef}
            >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell>Comapny Name</StyledTableCell>
                  <StyledTableCell>Branch</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody align="left">
                {managescompany.map((row, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{sno++}</StyledTableCell>
                      <StyledTableCell>{row.company}</StyledTableCell>
                      <StyledTableCell>{row.branch + " "}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <Grid sx={{ display: "flex" }}>
                          <Button
                            sx={userStyle.buttonedit}
                            onClick={() => {
                              handleClickOpenEdit();
                              getCode(row._id);
                              getunitvalues(row);
                            }}
                          >
                            <EditOutlinedIcon style={{ fontsize: "large" }} />
                          </Button>
                          <Button
                            sx={userStyle.buttondelete}
                            onClick={(e) => {
                              handleClickOpendel();
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
                            getunitdataview(row);
                          }}
                        >
                          <VisibilityOutlinedIcon style={{ fontsize: "large" }} />
                        </Button>
                        </Grid>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      {/* content end */}
      {/* edit DIALOG */}
      <Dialog
        open={isEditOpen}
        onClose={handleCloseModEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={userStyle.container}>
          <>
            <Typography sx={userStyle.SubHeaderText}>
              Edit Manage Company Branch
            </Typography>
            <br /> <br />
            <Grid container spacing={2}>
              <Grid item md={12} sm={12} sx={12}>
                <FormControl fullWidth size="small">
                  <Typography>Branch</Typography>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={manageCompanyedit.company}
                    onChange={(e) => {
                      setmanageCompany({
                        ...manageCompanyedit,
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
              <Grid item md={12} sm={12} sx={12}>
                <FormControl fullWidth size="small">
                  <Typography>Unit</Typography>

                  <Selects
                    isMulti
                    name="units"
                    options={branches}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    defaultValue={selectedbranch}
                    onChange={handleChangeedit}
                  />
                </FormControl>
                <br />
                <br />
              </Grid>
              <Grid container>
                <br />
                <Grid item md={0.3}></Grid>
                <Button variant="contained" onClick={editSubmit}>
                  Update
                </Button>
                <Grid item md={0.4}></Grid>
                <Button sx={userStyle.btncancel} onClick={handleCloseModEdit}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </>
        </Box>
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
              <StyledTableCell>Unit</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody align="left">
            {managescompany.map((row, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell>{sno++}</StyledTableCell>
                  <StyledTableCell>{row.branch}</StyledTableCell>
                  <StyledTableCell>{row.unit + " "}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

        {/* view model */}
        <Dialog
          open={openview}
          onClose={handleClickOpenview}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box sx={{width:"350px",padding:'20px 50px'}}>
            <>               
            <Typography sx={userStyle.HeaderText}> View Details</Typography>
              <br /> <br /> 
              <Grid container spacing={2}>
                <Grid item md={12} xs={12} sm={12} >
                  <FormControl fullWidth size="small">
                    <Typography variant="h6"> Branch</Typography>
                    <Typography>{manageCompanyedit.company}</Typography>                    
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12} sm={12} >
                  <FormControl fullWidth size="small">
                    <Typography variant="h6">Units</Typography>
                    <Typography>{unitsdataview+','}</Typography>                    
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

      {/* Delete DIALOG */}
      <Dialog
        open={isDeleteOpen}
        onClose={handleCloseDel}
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
          <Button onClick={handleCloseDel} sx={userStyle.btncancel}>
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              deletebranch(branchid);
              handleCloseDel();
            }}
            autoFocus
            variant="contained"
            color="error"
          >
            {" "}
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>

         {/* alert dialog    */}
         <Dialog
                    open={isErrorOpen}
                    onClose={handleCloseerr}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" >{showAlert}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="error" onClick={handleCloseerr}>ok</Button>
                    </DialogActions>
                </Dialog>

    </Box>
  );
}

export default Companybranchmap;
