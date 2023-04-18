import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, Dialog, DialogContent, Select, InputLabel, DialogActions, FormControl, Grid, TextareaAutosize, Paper, Table, TableHead, TableContainer, Button, TableBody, MenuItem } from "@mui/material";
import { userStyle } from "../../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../../components/Table";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { SERVICE } from '../../../services/Baseservice';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Selects from 'react-select';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Country, State, City } from "country-state-city";
import { useReactToPrint } from "react-to-print";
import $ from "jquery";
import { FaPlus } from 'react-icons/fa';


const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
}));

function AddEmployee() {

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

    

  
    const id = useParams().id

    const fetchHandler = async () => {
        try {
            let response = await axios.get(`${SERVICE.USER_SINGLE}/${id}`, {
                // headers: {
                //     'Authorization': `Bearer ${auth.APIToken}`
                // }
            });
            setEmpaddform(response.data.suser);
            setFiles(response.data.suser.files)
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages);
        }
    }

    const handleClearImage = () => {
        setFile(null);
    };

    const [empaddform, setEmpaddform] = useState({
        prefix: "Mr", firstname: "", lastname: "", legalname: "", fathername: "", mothername: "", gender: "", maritalstatus: "", dob: "",
        bloodgroup: "", profileimage: "", location: "", email: "", contactpersonal: "", contactfamily: "", emergencyno: "", doj: "", dop: "", name: "", contactno: "", details: "", username: "",
        password: "", companyname: "", pdoorno: "", pstreet: "", parea: "", plandmark: "", ptaluk: "", ppos: "", ppincode: "", pcountry: "", state: "", city: "", branch: "", floor: "", department: "",
        team: "", designation: "", shifttiming: "", reportingto: "", empcode: "", remark: ""
    });




    // Country city state datas
    const [selectedCountry, setSelectedCountry] = useState(" ");
    const [selectedState, setSelectedState] = useState(" ");
    const [selectedCity, setSelectedCity] = useState(" ");


    const [file, setFile] = useState("")
    const [employees, setEmployees] = useState([]);
    const [getrowid, setRowGetid] = useState("");
    const [employeeeedit, setEmployeeedit] = useState({});
    const [deleteemployee, setDeleteemployee] = useState({});
    const [excelData, setExcelData] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);
    const [branchNames, setBranchNames] = useState();
    const [floorNames, setFloorNames] = useState();
    const [department, setDepartment] = useState();
    const [team, setTeam] = useState();
    const [designation, setDesignation] = useState();
    const [shifttiming, setShiftTiming] = useState();
    const [reporting, setReporting] = useState();

    let sno = 1;
    let printsno = 1;

    // Error Popup model
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [showAlert, setShowAlert] = useState()
    const handleClickOpenerr = () => {
        setIsErrorOpen(true);
    };
    const handleCloseerr = () => {
        setIsErrorOpen(false);
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
    const handleCloseModEdit = () => {
        setIsEditOpen(false);
    };

    //get all employees
    const fetchEmployee = async () => {
        try {
            let res_employee = await axios.get(SERVICE.USER, {
            });
            setEmployees(res_employee.data.employee);
           
        }
        catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    }


    // Branch Dropdowns
    const fetchbranchNames = async () => {
        try {
            let res_branch = await axios.get(
                SERVICE.BRANCH,
                {
                    // headers: {
                    //     'Authorization': `Bearer ${auth.APIToken}`
                    // },
                }
            );
            setBranchNames(res_branch.data.branch);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages);
        }
    };


    // Floor Dropdowns
    const fetchfloorNames = async () => {
        try {
            let res_floor = await axios.get(SERVICE.FLOOR,
                {
                    // headers: {
                    //     'Authorization': `Bearer ${auth.APIToken}`
                    // },
                }
            );
            setFloorNames(res_floor.data.floors);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages);
        }
    };

    // Departments Dropdowns
    const fetchDepartments = async () => {
        try {
            let res_department = await axios.get(SERVICE.DEPARTMENT,
                {
                    // headers: {
                    //     'Authorization': `Bearer ${auth.APIToken}`
                    // },
                }
            );
            setDepartment(res_department.data.departmentdetails);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages);
        }
    };


    // Team Dropdowns
    const fetchteamdropdowns = async () => {
        try {
            let res_team = await axios.get(SERVICE.TEAMS,
                {
                    // headers: {
                    //     'Authorization': `Bearer ${auth.APIToken}`
                    // },
                }
            );
            setTeam(res_team.data.teamsdetails);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages);
        }
    };

    // Designation Dropdowns
    const fetchDesignation = async () => {
        try {
            let res_designation = await axios.get(SERVICE.DESIGNATION,
                {
                    // headers: {
                    //     'Authorization': `Bearer ${auth.APIToken}`
                    // },
                }
            );
            setDesignation(res_designation.data.designation);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages);
        }
    };

    // Shift Dropdowns
    const fetchShift = async () => {
        try {
            let res_shift = await axios.get(SERVICE.SHIFT,
                {
                    // headers: {
                    //     'Authorization': `Bearer ${auth.APIToken}`
                    // },
                }
            );
            setShiftTiming(res_shift.data.shifts);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages);
        }
    };

    // Reporting Dropdowns
    const fetchReportingUser = async () => {
        try {
            let res_reporting = await axios.get(SERVICE.USER,
                {
                    // headers: {
                    //     'Authorization': `Bearer ${auth.APIToken}`
                    // },
                }
            );
            setReporting(res_reporting.data.users);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages);
        }
    };
    //fetching companies 
    const fetchCompanies = async () => {
        try {
            let productlist = await axios.get(
                SERVICE.COMPANY,
                {}
            );
            setCompanies(
                productlist?.data?.companies?.map((d) => ({
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

    // fetch company normal dropdown
    const fetchCompany = async () => {
        try {
            let res_company = await axios.get(SERVICE.COMPANY,
                {
                    // headers: {
                    //     'Authorization': `Bearer ${auth.APIToken}`
                    // },
                }
            );
            setCompany(res_company.data.companies);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages);
        }
    };
    // FETCH COMPANIES
    // handle onChange event of the dropdown
    const handleChange = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
    };

   


    //jquery
    $.DataTable = require('datatables.net')
    const tableRef = useRef()


    //jquery
    useEffect(() => {
        $(document).ready(function () {
            $.fn.dataTable.ext.errMode = 'none';
            setTimeout(function () {
                $(tableRef.current).DataTable({
                    language: { search: '', searchPlaceholder: "Search..." },
                    lengthMenu: [
                        [10, 25, 50, 100, 200, 500, -1],
                        [10, 25, 50, 100, 200, 500, 'All'],
                    ],
                });
            }, 1000);
        });
    })


    //pdf...
    const columns = [
        // { title: "SNO", field: "sno" },
        { title: "Name", field: "name" },
        { title: "Code", field: "code" },
        { title: "Asset Code", field: 'assetcode' },
        { title: "Address", field: 'address', },
        { title: "Phone", field: 'phone' },
        { title: "Email", field: 'email', },
    ]

    // const { auth,setAuth } = useContext(AuthContext)
    // const { isUserRoleCompare } = useContext(UserRoleAccessContext);
    //  PDF


    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.autoTable({
            theme: "grid",
            columns: columns.map((col) => ({ ...col, dataKey: col.field })),
            body: employees,
        });
        doc.save("Employee.pdf");
    };

    // Excel
    const fileName = "branch";
    let excelno = 1;

    // get particular columns for export excel
    const getexcelDatas = async () => {
        let response = await axios.get(SERVICE.ADDEMPLOYEE, {
            //  headers: {
            //      'Authorization': `Bearer ${auth.APIToken}`
            //  },
        });
        var data = response.data.branch.map(t => ({

        }));
    }

    const getCode = async (e) => {
        let res = await axios.get(`${SERVICE.ADDEMPLOYEE_SINGLE}/${e}`, {
        })
        setEmployeeedit(res.data.saddemployee);
        setRowGetid(res.data.saddemployee);
    }

    //set function to get particular row
    const rowData = async (id) => {
        try {
            let res = await axios.get(`${SERVICE.ADDEMPLOYEE_SINGLE}/${id}`, {
                // headers: {
                //     'Authorization': `Bearer ${auth.APIToken}`
                // }
            });
            setDeleteemployee(res.data.saddemployee);
        } catch (err) {
            console.log(err.response.data.errorMessage)
        }
    }

    // Alert delete popup

    let employeeid = deleteemployee._id;

    const delEmployee = async () => {
        try {
            await axios.delete(`${SERVICE.ADDEMPLOYEE_SINGLE}/${employeeid}`, {
            });

        } catch (err) {
            console.log(err.response.data.errorMessage)
        }
    };




    const backPage = useNavigate();

    const sendRequestt = async () => {
        try {
            let res = await axios.put(`${SERVICE.USER_SINGLE}/${id}`, {
                prefix: String(empaddform.prefix),
                firstname: String(empaddform.firstname),
                lastname: String(empaddform.lastname),
                legalname: String(empaddform.legalname),
                fathername: String(empaddform.fathername),
                mothername: String(empaddform.mothername),
                gender: String(empaddform.gender),
                maritalstatus: String(empaddform.maritalstatus),
                dob: String(empaddform.dob),
                bloodgroup: String(empaddform.bloodgroup),
                profileimage: String(empaddform.profileimage),
                location: String(empaddform.location),
                email: String(empaddform.email),
                contactpersonal: String(empaddform.contactpersonal),
                contactfamily: String(empaddform.contactfamily),
                emergencyno: String(empaddform.emergencyno),
                doj: String(empaddform.doj),
                dop: String(empaddform.dop),
                name: String(empaddform.name),
                contactno: String(empaddform.contactno),
                details: String(empaddform.details),
                loginname: String(empaddform.loginname),
                password: String(empaddform.password),
                companyname: String(empaddform.companyname),
                pdoorno: String(empaddform.pdoorno),
                pstreet: String(empaddform.pstreet),
                parea: String(empaddform.parea),
                plandmark: String(empaddform.plandmark),
                ptaluk: String(empaddform.ptaluk),
                ppost: String(empaddform.ppost),
                ppincode: String(empaddform.ppincode),
                pcountry: String(selectedCountry.name ? selectedCountry.name : ""),
                state: String(empaddform.state),
                city: String(empaddform.city),
                companyname: String(empaddform.companyname),
                branch: String(empaddform.branch),
                floor: String(empaddform.floor),
                department: String(empaddform.department),
                team: String(empaddform.team),
                designation: String(empaddform.designation),
                shifttiming: String(empaddform.shifttiming),
                reportingto: String(empaddform.reportingto),
                empcode: String(empaddform.empcode),
                files: [...files]

            });
            setEmpaddform(res.data);
            backPage("/list");
           
        } catch (err) {
            const messages = err.response.data.errorMessage;
            console.log(messages);
        }
    }


    const [files, setFiles] = useState();
   
    const handleFileUpload = (event) => {
      const files = event.target.files;
      const reader = new FileReader();
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        reader.readAsDataURL(file);
        reader.onload = () => {
          setFiles((prevFiles) => [
            ...prevFiles,
            { name: file.name, data: reader.result.split(',')[1], remark: '' ,},
          ]);
        };
      }
    };
 
  console.log(files, 'all')

    const handleFileDelete = (index) => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };
  
    const handleRemarkChange = (index, remark) => {
      setFiles((prevFiles) =>
        prevFiles.map((file, i) => (i === index ? { ...file, remark } : file))
      );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequestt();
        // if (employee.code == "") {
        //     setShowAlert(
        //         <>
        //             <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
        //             <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter name"}</p>
        //         </>
        //     );
        //     handleClickOpenerr();
        // } else if (employee.name == "") {
        //     setShowAlert(
        //         <>
        //             <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
        //             <p style={{ fontSize: '20px', fontWeight: 900 }}>{"Please enter Name"}</p>
        //         </>
        //     );
        //     handleClickOpenerr();
        // }
        // else {
        //     sendRequest();
        // }
    }

    useEffect(
        () => {
            fetchEmployee();
            getexcelDatas();
            fetchCompanies();
            fetchbranchNames();
            fetchfloorNames();
            fetchDepartments();
            fetchteamdropdowns();
            fetchDesignation();
            fetchShift();
            fetchReportingUser();
            fetchHandler();
        }, []
    );

    //print...
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "address",
        pageStyle: "print",
    });

    // Image Upload
    function handleChangeImage(e) {
        let profileimage = document.getElementById("profileimage")
        var path = (window.URL || window.webkitURL).createObjectURL(profileimage.files[0]);
        toDataURL(path, function (dataUrl) {
            profileimage.setAttribute('value', String(dataUrl));
            setEmpaddform({ ...empaddform, profileimage: String(dataUrl) })
            return dataUrl;
        })
        setFile(URL.createObjectURL(e.target.files[0]));
    }


    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    function handleClear(e) {
        setFile(URL.createObjectURL(""));
    }
    return (
        <Box>
            {/* <Headtitle title={"Manual Stock Entry"} /> */}
            {/* ****** Header Content ****** */}
            <Typography sx={userStyle.HeaderText}>Edit Employee</Typography>
            <Box >
                <form onSubmit={handleSubmit}>
                    <Box sx={userStyle.selectcontainer}>
                        <Typography sx={userStyle.SubHeaderText}>Personal Information </Typography>
                        <br /><br />
                        <>
                            <Grid container spacing={2}>
                                <Grid item md={6} sm={12} sx={12}>
                                    <Typography>First Name<b style={{ color: "red" }}>*</b></Typography>
                                    <Grid container sx={{ display: 'flex' }} >
                                        <Grid item md={3} sm={12} sx={12}>
                                            <FormControl size="small" fullWidth>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    placeholder="Mr."
                                                    value={empaddform.prefix}
                                                    onChange={(e) => { setEmpaddform({ ...empaddform, prefix: e.target.value }) }}
                                                >
                                                    <MenuItem value="Mr">Mr</MenuItem>
                                                    <MenuItem value="Ms">Ms</MenuItem>
                                                    <MenuItem value="Mrs">Mrs</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={9} sm={12} sx={12}>
                                            <FormControl size="small" fullWidth>
                                                <OutlinedInput
                                                    id="component-outlined"
                                                    type="text"
                                                    placeholder="Name"
                                                    value={empaddform.firstname}
                                                    onChange={(e) => { setEmpaddform({ ...empaddform, firstname: e.target.value }) }}

                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={6} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Last Name<b style={{ color: "red" }}>*</b></Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={empaddform.lastname}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, lastname: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Legal Name<b style={{ color: "red" }}>*</b></Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={empaddform.legalname}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, legalname: e.target.value }) }}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Father Name</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Father Name"
                                            value={empaddform.fathername}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, fathername: e.target.value }) }}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Mother Name</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Mother Name"
                                            value={empaddform.mothername}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, mothername: e.target.value }) }}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Gender</Typography>
                                        <Select
                                            labelId="shift Timimg"
                                            id="shift Timimg"
                                            placeholder="Female"
                                            value={empaddform.gender}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, gender: e.target.value }) }}

                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Marital Status</Typography>
                                        <Select
                                            labelId="shift Timimg"
                                            id="shift Timimg"
                                            placeholder="Marital status"
                                            value={empaddform.maritalstatus}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, maritalstatus: e.target.value }) }}
                                        >
                                            <MenuItem value="Single">Single</MenuItem>
                                            <MenuItem value="Married">Married</MenuItem>
                                            <MenuItem value="Divorced">Divorced</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>DateOfBirth</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            value={empaddform.dob}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, dob: e.target.value }) }}
                                            type="date"
                                            size="small"
                                            name="dob"
                                        />

                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Blood Group</Typography>
                                        <Select
                                            placeholder="O+ve"
                                            value={empaddform.bloodgroup}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, bloodgroup: e.target.value }) }}
                                        >
                                            <MenuItem value="A+">A+</MenuItem>
                                            <MenuItem value="A-">A-</MenuItem>
                                            <MenuItem value="B+">B+</MenuItem>
                                            <MenuItem value="B-">B-</MenuItem>
                                            <MenuItem value="O+">O+</MenuItem>
                                            <MenuItem value="O-">O-</MenuItem>
                                            <MenuItem value="AB+">AB+</MenuItem>
                                            <MenuItem value="AB-">AB-</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/* <Grid item lg={3} md={3} sm={4} xs={12}>
                                    {image && (
                                        <Grid item>
                                            <img src={empaddform.profileimage} alt="uploaded" height="80px" width="80px" />
                                            <Typography variant="body1">{image.name}</Typography>
                                        </Grid>
                                    )}

                                    <Grid item>
                                        <input
                                            accept="image/*" className={classes.input} id="image-upload" type="file" onChange={handleImageChange}
                                        />
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <label htmlFor="image-upload">
                                                    
                                                    <Button variant="contained" color="primary" component="span"  
                                            //         value={empaddform.profileimage}
                                            // onChange={(e) => { setEmpaddform({ ...empaddform, profileimage: e.target.value }) }} 
                                            >
                                                        Upload
                                                    </Button>
                                                </label>
                                            </Grid>
                                            <Grid item>
                                                {image && (
                                                    <Button sx={userStyle.btncancel} onClick={handleClearImage}>
                                                        Clear
                                                    </Button>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid> */}
                                <Grid item lg={3} md={3} sm={4} xs={12}>
                                    <InputLabel sx={{ m: 1 }}>Profile Image</InputLabel>
                                    <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <img src={file == "" ? empaddform.profileimage : file} style={{ width: '50%' }} height="80px" />
                                    </Grid><br />
                                    <FormControl size="small" fullWidth>
                                        <Grid sx={{ display: 'flex' }}>
                                            <Button component="label" sx={userStyle.buttonadd}>
                                                Upload
                                                <input type='file' id="profileimage" name='file' hidden onChange={handleChangeImage}
                                                />
                                            </Button>
                                            {file && (
                                                <Button sx={userStyle.buttoncancel} onClick={handleClearImage}>
                                                    Clear
                                                </Button>
                                            )}
                                        </Grid>
                                        <Typography variant='body2' style={{ marginTop: "5px" }}>Max File size: 5MB</Typography>
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Location</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Location"
                                            value={empaddform.location}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, location: e.target.value }) }}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Email<b style={{ color: "red" }}>*</b></Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Email"
                                            value={empaddform.email}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, email: e.target.value }) }}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Contact(personal)</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Contact no(personal)"
                                            value={empaddform.contactpersonal}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, contactpersonal: e.target.value }) }}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Contact(Family)</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="contact no(Family)"
                                            value={empaddform.contactfamily}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, contactfamily: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>Emergency No<b style={{ color: "red" }}>*</b></Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="contact no(Emergency)"
                                            value={empaddform.emergencyno}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, emergencyno: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>DOJ</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="date"
                                            placeholder="DOJ"
                                            value={empaddform.doj}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, doj: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small">
                                        <Typography>DOP</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="date"
                                            placeholder="DOP"
                                            value={empaddform.dop}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, dop: e.target.value }) }}

                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </>
                        <br />
                    </Box>
                    <br />
                    <Box sx={userStyle.selectcontainer}>
                        <Grid item xs={8}>
                            <Typography sx={userStyle.importheadtext}>Reference Details </Typography>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item md={4} sm={12} sx={12}>
                                <FormControl size="small" fullWidth>
                                    <Typography>Name</Typography>
                                    <OutlinedInput
                                        id="component-outlined"
                                        type="text"
                                        placeholder="Reference Name"
                                        value={empaddform.name}
                                        onChange={(e) => { setEmpaddform({ ...empaddform, name: e.target.value }) }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={4} sm={12} sx={12}>
                                <FormControl size="small" fullWidth>
                                    <Typography>Contact</Typography>
                                    <OutlinedInput
                                        id="component-outlined"
                                        type="text"
                                        placeholder="Contact No"
                                        value={empaddform.contactno}
                                        onChange={(e) => { setEmpaddform({ ...empaddform, contactno: e.target.value }) }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={4} sm={12} sx={12}>
                                <FormControl fullWidth>
                                    <Typography>Details</Typography>
                                    <TextareaAutosize aria-label="minimum height" minRows={5}
                                        value={empaddform.details}
                                        onChange={(e) => { setEmpaddform({ ...empaddform, details: e.target.value }) }}
                                        placeholder="Reference Details"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid> <br />
                    </Box><br />
                    <Box sx={userStyle.selectcontainer}>
                        <Grid item xs={8}>
                            <Typography sx={userStyle.importheadtext}>Login Details </Typography>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item md={3} sm={12} sx={12}>
                                <FormControl size="small" fullWidth>
                                    <Typography>Login Name<b style={{ color: "red" }}>*</b></Typography>
                                    <OutlinedInput
                                        id="component-outlined"
                                        type="text"
                                        placeholder="Login Name"
                                        disabled
                                        value={empaddform.username}
                                        onChange={(e) => { setEmpaddform({ ...empaddform, username: e.target.value }) }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={3} sm={12} sx={12}>
                                <FormControl size="small" fullWidth>
                                    <Typography>Password</Typography>
                                    <OutlinedInput
                                        id="component-outlined"
                                        type="text"
                                        placeholder="Passsword"
                                    // value={empaddform.password}
                                    // onChange={(e) => { setEmpaddform({ ...empaddform, password: e.target.value }) }}
                                    />
                                </FormControl>
                                {/* <Typography variant="caption" color="red">If want to change a password</Typography> */}
                            </Grid>
                            <Grid item md={3} sm={12} sx={12}>
                                <FormControl size="small" fullWidth>
                                    <Typography>company Name<b style={{ color: "red" }}>*</b></Typography>
                                    <Select
                                        value={empaddform.companyname}
                                        onChange={(e) => { setEmpaddform({ ...empaddform, companyname: e.target.value }) }}

                                    >
                                        {companies &&
                                            companies.map((row) => (
                                                <MenuItem value={row.name}>{row.name}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} sm={12} sx={12}>
                                <FormControl size="small" fullWidth>
                                    <Typography>Allowed access company<b style={{ color: "red" }}>*</b></Typography>
                                    <Selects
                                        isMulti
                                        name="units"
                                        options={companies}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        value={companies.filter((obj) =>
                                            selectedValue.includes(obj.value)
                                        )} // set selected values
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid> <br />
                    </Box><br />
                    <Box sx={userStyle.selectcontainer}>
                        <Typography sx={userStyle.SubHeaderText}> Permanent Address <b style={{ color: "red" }}>*</b></Typography>
                        <br /><br />

                        <>
                            <Grid container spacing={2}>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Door/Flat No</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Door/Flat No"
                                            value={empaddform.pdoorno}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, pdoorno: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Street/Block</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Street/Block"
                                            value={empaddform.pstreet}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, pstreet: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Area/village</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Area/Village"
                                            value={empaddform.parea}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, parea: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Landmark</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Landmark"
                                            value={empaddform.plandmark}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, plandmark: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <br />
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Thaluka</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Thaluka"
                                            value={empaddform.ptaluk}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, ptaluk: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl size="small" fullWidth>
                                        <Typography>Post</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Post"
                                            value={empaddform.ppost}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, ppost: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl size="small" fullWidth>
                                        <Typography>Pincode</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Pincode"
                                            value={empaddform.ppincode}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, ppincode: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl size="small" fullWidth >
                                        <Typography>Country</Typography>
                                        <Selects
                                            options={Country.getAllCountries()}
                                            getOptionLabel={(options) => {
                                                return options["name"];
                                            }}
                                            getOptionValue={(options) => {
                                                return options["name"];
                                            }}
                                            // value={selectedCountry}
                                            value={Country.getAllCountries()?.find(op => {
                                                return op.value === empaddform.pcountry
                                            })}
                                            styles={colourStyles}
                                            onChange={(item) => {
                                                setSelectedCountry(item);
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>State</Typography>
                                        <Selects
                                            options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                                            getOptionLabel={(options) => {
                                                return options["name"];
                                            }}
                                            getOptionValue={(options) => {
                                                return options["name"];
                                            }}
                                            // value={selectedState}
                                            value={State?.getStatesOfCountry()?.find(op => {
                                                return op.value === empaddform.state
                                            })}
                                            styles={colourStyles}
                                            onChange={(item) => {
                                                setSelectedState(item);
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
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
                            </Grid>
                        </>

                        <br /><br />
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography sx={userStyle.SubHeaderText}> Current Address<b style={{ color: "red" }}>*</b> </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel control={<Checkbox Checked sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }} />} label="Same as permananet Address" />
                            </Grid>
                        </Grid>
                        <br /><br />

                        <>
                            <Grid container spacing={2}>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Door/Flat No</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Door/Flat No"
                                            value={empaddform.pdoorno}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, pdoorno: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Street/Block</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Street/Block"
                                            value={empaddform.pstreet}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, pstreet: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Area/village</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Area/Village"
                                            value={empaddform.parea}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, parea: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Landmark</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Landmark"
                                            value={empaddform.plandmark}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, plandmark: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <br />
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Thaluka</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Thaluka"
                                            value={empaddform.ptaluk}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, ptaluk: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl size="small" fullWidth>
                                        <Typography>Post</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Post"
                                            value={empaddform.ppost}
                                            onChange={(e) => { setEmpaddform({ ...empaddform, ppost: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl size="small" fullWidth>
                                        <Typography>Pincode</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            placeholder="Pincode"
                                            value={empaddform.ppincode}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Country</Typography>
                                        <Selects
                                            options={Country.getAllCountries()}
                                            getOptionLabel={(options) => {
                                                return options["name"];
                                            }}
                                            getOptionValue={(options) => {
                                                return options["name"];
                                            }}
                                            // value={selectedCountry}
                                            value={Country.getAllCountries()?.find(op => {
                                                return op.value === empaddform.pcountry
                                            })}
                                            styles={colourStyles}
                                            onChange={(item) => {
                                                setSelectedCountry(item);
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={2}>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>State</Typography>
                                        <Selects
                                            options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                                            getOptionLabel={(options) => {
                                                return options["name"];
                                            }}
                                            getOptionValue={(options) => {
                                                return options["name"];
                                            }}
                                            // value={selectedState}
                                            value={State?.getStatesOfCountry()?.find(op => {
                                                return op.value === empaddform.state
                                            })}
                                            styles={colourStyles}
                                            onChange={(item) => {
                                                setSelectedState(item);
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={12} sx={12}>
                                    <FormControl fullWidth size="small" >
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
                            </Grid>
                        </>
                    </Box>
                    <br />
                    <Box sx={userStyle.container}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Typography sx={userStyle.importheadtext}>Available </Typography>
                            </Grid>
                            {/* <Grid item xs={4}>
                                <FormControl size="small" fullWidth>
                                    <Typography>Company Name <b style={{ color: "red" }}>*</b></Typography>
                                    <Select
                                        value={empaddform.availcompany}
                                    >
                                        {companies &&
                                            companies.map((row) => (
                                                <MenuItem value={row.name}>{row.name}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid> <br /> */}
                        </Grid> <br />
                        <Grid item xs={8}>
                            <Typography sx={userStyle.importheadtext}>Boarding Information</Typography>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item md={3} sm={12} sx={12}>
                                <FormControl fullWidth size="small" >
                                    <Typography>Branch</Typography>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={empaddform.branch}
                                        onChange={(e, i) => {
                                            setEmpaddform({ ...empaddform, branch: e.target.value });
                                        }}
                                    >
                                        {branchNames &&
                                            branchNames.map((row) => (
                                                <MenuItem value={row.name}>{row.name}</MenuItem>
                                            ))}
                                    </Select>
                                    {/* <Selects
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        placeholder="choose Branch"
                                        value={employee.branch}
                                        onChange={(e) => { setEmployee({ ...employee, branch: e.target.value }) }}
                                    /> */}
                                </FormControl>
                            </Grid>
                            <Grid item md={3} sm={12} sx={12}>
                                <FormControl fullWidth size="small" >
                                    <Typography>Floor</Typography>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={empaddform.floor}
                                        onChange={(e, i) => {
                                            setEmpaddform({ ...empaddform, floor: e.target.value });
                                        }}
                                    >
                                        {floorNames &&
                                            floorNames.map((row) => (
                                                <MenuItem value={row.name}>{row.name}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} sm={12} sx={12}>
                                <FormControl fullWidth size="small" >
                                    <Typography>Department</Typography>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={empaddform.department}
                                        onChange={(e, i) => {
                                            setEmpaddform({ ...empaddform, department: e.target.value });
                                        }}
                                    >
                                        {department &&
                                            department.map((row) => (
                                                <MenuItem value={row.deptname}>{row.deptname}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} sm={12} sx={12}>
                                <FormControl fullWidth size="small" >
                                    <Typography>Team</Typography>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={empaddform.team}
                                        onChange={(e, i) => {
                                            setEmpaddform({ ...empaddform, team: e.target.value });
                                        }}
                                    >
                                        {team &&
                                            team?.map((row) => (
                                                <MenuItem value={row.teamname}>{row.teamname}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} sm={12} sx={12}>
                                <FormControl fullWidth size="small" >
                                    <Typography>Designation</Typography>

                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={empaddform.designation}
                                        onChange={(e, i) => {
                                            setEmpaddform({ ...empaddform, designation: e.target.value });
                                        }}
                                    >
                                        {designation &&
                                            designation.map((row) => (
                                                <MenuItem value={row.name}>{row.name}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} sm={12} sx={12}>
                                <FormControl fullWidth size="small" >
                                    <Typography>Shift Timing</Typography>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={empaddform.shifttiming}
                                        onChange={(e, i) => {
                                            setEmpaddform({ ...empaddform, shifttiming: e.target.value });
                                        }}
                                    >
                                        {shifttiming &&
                                            shifttiming.map((row) => (
                                                <MenuItem value={row.name}>{row.name}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} sm={12} sx={12}>
                                <FormControl fullWidth size="small" >
                                    <Typography>Reporting To </Typography>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={empaddform.reportingto}
                                        onChange={(e, i) => {
                                            setEmpaddform({ ...empaddform, reportingto: e.target.value });
                                        }}
                                    >
                                        {reporting &&
                                            reporting.map((row) => (
                                                <MenuItem value={row.firstname}>{row.firstname}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} sm={12} sx={12}>
                                <FormControl size="small" fullWidth>
                                    <Typography>EmpCode <b style={{ color: "red" }}>*</b></Typography>
                                    <OutlinedInput
                                        id="component-outlined"
                                        type="text"
                                        disabled
                                        placeholder="EmpCode"
                                        value={empaddform.empcode}
                                        onChange={(e) => { setEmpaddform({ ...empaddform, empcode: e.target.value }) }}
                                    />
                                </FormControl>
                                <Typography variant="caption">Last Employee Id is TEMPTL230213257</Typography>
                            </Grid>
                        </Grid>
                    </Box><br />
                    <Box sx={userStyle.container} >
                        <Grid item xs={8}>
                            <Typography sx={userStyle.importheadtext}>Document</Typography>
                        </Grid>
                        <input type="file" multiple onChange={handleFileUpload} />
                     
                    </Box><br />
                    <Box sx={userStyle.container}>
                        <Typography sx={userStyle.SubHeaderText}>  Document List </Typography>
                        <br /><br />
                    
                        {/* ****** Table start ****** */}
                        <TableContainer component={Paper} >
                            <Table
                                aria-label="simple table"
                                id="branch"
                                // ref={tableRef}
                            >
                                <TableHead sx={{ fontWeight: "600" }}>
                                    <StyledTableRow>
                                        <StyledTableCell>SI.NO</StyledTableCell>
                                        <StyledTableCell>Document</StyledTableCell>
                                        <StyledTableCell>Remarks</StyledTableCell>
                                        <StyledTableCell>View</StyledTableCell>
                                        <StyledTableCell>Action</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>

                                    {files &&
                                        (files.map((file, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell>{sno++}</StyledTableCell>
                                                <StyledTableCell>{file.name}</StyledTableCell>
                                                <StyledTableCell>  
                                                    <input
                                                    type="text"
                                                    value={file.remark}
                                                    onChange={(event) =>
                                                    handleRemarkChange(index, event.target.value)
                                                    }   />  
                                                </StyledTableCell>
                                     
                                                <StyledTableCell component="th" scope="row">
                                               
                                                     <a
                                                        href={`data:application/octet-stream;base64,${file.data}`}
                                                        download={file.name}
                                                    >
                                                        Download
                                                    </a>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                <button onClick={() => handleFileDelete(index)}>
                                                        Delete
                                                    </button>

                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Box>
                    <Box sx={userStyle.container} >
                        <>
                            <Grid container sx={{ justifyContent: "center", display: "flex" }} spacing={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </>
                    </Box><br />

                    {/* ****** Table End ****** */}

                    <Box>
                        <Dialog
                            open={isErrorOpen}
                            onClose={handleCloseerr}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
                                <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} />
                                <Typography variant="h6" ></Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color="error" >ok</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}


export default AddEmployee;