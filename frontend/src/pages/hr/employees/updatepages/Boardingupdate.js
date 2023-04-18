import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Dialog, DialogContent, Select, OutlinedInput, FormControl, MenuItem, DialogActions, Grid, Paper, Table, TableHead, TableContainer, Button, TableBody } from "@mui/material";
import { userStyle } from "../../../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../../../components/Table";
import EditIcon from '@mui/icons-material/Edit';
import { SERVICE } from '../../../../services/Baseservice';
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { useReactToPrint } from "react-to-print";
import $ from "jquery";


function Boardingupdate() {
    const [employees, setEmployees] = useState([]);
    const [branchNames, setBranchNames] = useState();
    const [companies, setCompanies] = useState([]);
    const [unitNames, setUnitNames] = useState([]);
    const [floorNames, setFloorNames] = useState();
    const [department, setDepartment] = useState();
    const [team, setTeam] = useState();
    const [designation, setDesignation] = useState();
    const [shifttiming, setShiftTiming] = useState();
    const [reporting, setReporting] = useState();
    const [pages, setPages] = useState(1);
    const [entries, setEntries] = useState(1);
    const [search, setSearch] = useState()

    const [empaddform, setEmpaddform] = useState({
         branch: "", floor: "", department: "", company: "", unit: "",
        team: "", designation: "", shifttiming: "", reportingto: ""
    });
    // const [selectedbranch, setselectedbranch] = useState([]);
    const [exceldata, setexceldata] = useState([]);
    let sno = 1;
    let printno = 1;

    const getCode = async (e) => {
        let res = await axios.get(`${SERVICE.USER_SINGLE}/${e}`, {
        })
        setEmpaddform(res.data.suser);
    }


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

    let unitcheck = empaddform.branch;

    // Unit Dropdowns
    // const fetchUnitNames = async () => {
    //     try {
    //         let req = await axios.get(SERVICE.UNIT);
    //         let req_data = req.data.units.filter((item) => {
    //             if (unitcheck == item.branch)
    //                 return item
    //         })
    //         setUnitNames(req_data)
    //     } catch (err) {
    //         const messages = err.response.data.message;
    //         console.log(messages);
    //     }
    // };
    const[getbranchname, setgetbranchname] = useState("")

    const fetchUnithNameschange = async () => {
        console.log(getbranchname,'getbranchname')
        let branchname = getbranchname ? getbranchname : empaddform.branch;
    
        try {
            let req = await axios.get(SERVICE.UNIT);
            let req_data = req.data.units.filter((item) => {
                if (branchname == item.branch)
                    return item
            })

            setUnitNames(req_data);
         
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    };
console.log(getbranchname)

    useEffect(() => {
        fetchUnithNameschange()
    })

    let branchcheck = empaddform.company;


    // Branch Dropdowns
    const fetchbranchNames = async () => {
        try {
            let req = await axios.get(SERVICE.BRANCH);
            let req_data = req.data.branch.filter((item) => {
                if (branchcheck == item.company)
                    return item
            })

            setBranchNames(req_data);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    };
    const fetchbranchNameschange = async (e) => {
       
        try {
            let req = await axios.get(SERVICE.BRANCH);
            let req_data = req.data.branch.filter((item) => {
                if (e == item.company)
                    return item
            })

            setBranchNames(req_data);
            console.log(branchcheck)
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    };

    useEffect(() => {
        fetchbranchNameschange()
    },[])

    //get all employees list details
    const fetchEmployee = async () => {
        try {
            let res_employee = await axios.get(SERVICE.USER, {
            });
            setEmployees(res_employee.data.users);
        }
        catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    }

    //edit post call
    let boredit = empaddform._id;
    const sendRequestt = async () => {
        try {
            let res = await axios.put(`${SERVICE.USER_SINGLE_PWD}/${boredit}`, {
                branch: String(empaddform.branch),
                unit: String(empaddform.unit),
                floor: String(empaddform.floor),
                department: String(empaddform.department),
                team: String(empaddform.team),
                designation: String(empaddform.designation),
                shifttiming: String(empaddform.shifttiming),
                reportingto: String(empaddform.reportingto),
                company: String(empaddform.company),
                firstname: String(empaddform.firstname),
                lastname: String(empaddform.lastname),
                empcode: String(empaddform.empcode),

            });
            setEmpaddform(res.data);
            handleCloseModEdit();


        } catch (err) {
            const messages = err.response.data.errorMessage;
            console.log(messages);
        }
    }


    const editSubmit = (e) => {
        e.preventDefault();
        sendRequestt();
    }


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
    }

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

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredData = employees.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

      //  PDF
      const columns = [

        { title: "Id", field: "Empcode" },
        { title: "Employee Name", field: "companyname" },
        { title: "branch", field: "branch" },
        { title: "floor", field: "floor" },
        { title: "department", field: "department" },
        { title: "team", field: "team" },
        { title: "designation", field: "designation" },
        { title: "shifttiming", field: "shifttiming" },
        { title: "reportingto", field: "reportingto" },
    ]

    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.autoTable({
            theme: "grid",
            columns: columns.map((col) => ({ ...col, dataKey: col.field })),
            body: exceldata,
        });
        doc.save("Boardingeditlist.pdf");
    };

    // Excel
    const fileName = "Boardingedit";
    let excelno = 1;

    // get particular columns for export excel
    const getexcelDatas = async () => {
        let response = await axios.get(SERVICE.USER, {
            //  headers: {
            //      'Authorization': `Bearer ${auth.APIToken}`
            //  },
        });
        var data = response.data.users.map(t => ({
            Sno: excelno++, Empcode: t.empcode, companyname: t.companyname, branch: t.branch, floor: t.floor, department: t.department,
            team: t.team, designation: t.designation, shifttiming: t.shifttiming, reportingto: t.reportingto,

        }));
        setexceldata(data)
    }

    //print...
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Boardeditlist",
        pageStyle: "print",
    });


    useEffect(() => {
        fetchEmployee();
        fetchbranchNames();
        // fetchUnitNames();
        fetchfloorNames();
        fetchDepartments();
        fetchteamdropdowns();
        fetchReportingUser();
        fetchDesignation();
        getexcelDatas();
        fetchShift();
        fetchCompanies();
    })

    let BoardingLength = employees.length;
    useEffect(
        () => {
            selectPageHandler();
        }
    );

    const selectPageHandler = (selPage) => {
        if (selPage >= 1 && selPage <= (Math.ceil(employees.length / (Number(entries)))) && selPage !== pages)
            setPages(selPage)


    }

    return (
        <Box>
            {/* ****** Header Content ****** */}
            <Typography sx={userStyle.HeaderText}>Boarding Information</Typography>
            <br />
            <Box sx={userStyle.container}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography sx={userStyle.SubHeaderText}>Boarding Information details</Typography>
                    </Grid>
                    {/* <Grid item xs={4}>
                        <Link to="/addemployee" style={{ textDecoration: 'none', color: 'white', float: 'right' }}><Button variant="contained">ADD</Button></Link>
                    </Grid> */}
                </Grid>
                <br /><br />
                <Grid container sx={{ justifyContent: "center" }} >
                    <Grid >
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
                {/* added to the pagination grid */}
                <Grid container spacing={2}>
                    <Grid item md={1.5} sm={12} sx={12}>
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
                                <MenuItem value={(employees.length)}>All</MenuItem>


                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={7.5} sm={12} sx={12}></Grid>
                    <Grid item md={3} sm={12} sx={12}>
                        <FormControl fullWidth size="small" >
                            <Typography>Search</Typography>
                            <OutlinedInput
                                id="component-outlined"
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <br />
                {/* ****** Table Grid Container ****** */}
                <Grid container>
                    <Grid md={4} sm={2} xs={1}></Grid>
                    <Grid md={8} sm={10} xs={10} sx={{ align: "center" }}></Grid>
                </Grid>
                <br />

                {/* ****** Table start ****** */}
                <TableContainer component={Paper} >
                    <Table
                        aria-label="simple table"
                        id="branch"
                    // ref={tableRef}
                    >
                        <TableHead sx={{ fontWeight: "600" }}>
                            <StyledTableRow>
                                {/* <StyledTableCell>SI.NO</StyledTableCell> */}
                                <StyledTableCell>Company</StyledTableCell>
                                <StyledTableCell>Branch</StyledTableCell>
                                <StyledTableCell>Floor </StyledTableCell>
                                <StyledTableCell>Department</StyledTableCell>
                                <StyledTableCell>Team</StyledTableCell>
                                <StyledTableCell>Designation</StyledTableCell>
                                <StyledTableCell>Shift Timing</StyledTableCell>
                                <StyledTableCell>Reporting To</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData &&
                                (filteredData.slice((pages * entries - entries < BoardingLength ? pages * entries - entries : 0),
                                    ((pages * entries - entries <= BoardingLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                                        <StyledTableRow key={index}>
                                            {/* <StyledTableCell>{sno++}</StyledTableCell> */}
                                            <StyledTableCell>{row.company} </StyledTableCell>
                                            <StyledTableCell>{row.branch} </StyledTableCell>
                                            <StyledTableCell> {row.floor}</StyledTableCell>
                                            <StyledTableCell>{row.department}</StyledTableCell>
                                            <StyledTableCell>{row.team}</StyledTableCell>
                                            <StyledTableCell>{row.designation}</StyledTableCell>
                                            <StyledTableCell>{row.shifttiming}</StyledTableCell>
                                            <StyledTableCell>{row.reportingto}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Button variant="outlined" style={userStyle.actionbutton} onClick={() => {
                                                            handleClickOpenEdit();
                                                            getCode(row._id)
                                                        }}><EditIcon style={{ fontsize: '20px' }} />
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>
                                        </StyledTableRow>

                                    )))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid style={userStyle.dataTablestyle}>
                <Typography>Showing
                    {(pages * entries - entries <= BoardingLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                    {/* {(pages * entries - entries + 1)}  */}
                    to {(pages * entries) > employees.length ? employees.length : ((pages * entries))} of {employees.length} entries</Typography>
                {employees && <Typography className="Pagination">
                    <Button onClick={() => { selectPageHandler(pages - 1) }}>prev</Button>

                    {[...Array(Math.ceil(employees.length / Number(entries)))].map((_, i) => {
                        if (entries == 1) {
                            if (i <= 5) {
                                return <Button onClick={() => { selectPageHandler(i + 1) }}>{(i + 1)}</Button>
                            }
                        }
                        else {
                            return <Button onClick={() => { selectPageHandler(i + 1) }}>{i + 1}</Button>
                        }
                    })}

                    <Button onClick={() => { selectPageHandler(pages + 1) }}>Next</Button>
                </Typography>}
                </Grid>
            </Box><br />
            {/* ****** Table End ****** */}

            {/* Delete Modal */}


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
                            <Typography sx={userStyle.SubHeaderText}>Update Boarding Information</Typography>
                            <br /><br />
                            <Grid container spacing={2}>
                                <Grid item md={6} sm={12} xs={12}>
                                    <Typography>{(empaddform.companyname)}</Typography>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <Typography>{empaddform.empcode}</Typography>
                                </Grid>
                            </Grid>     <br /><br />
                            <Grid container spacing={2}>
                                <Grid item md={6} sm={12} xs={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Comapny</Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={empaddform.company}
                                            onChange={(e) => {
                                                setEmpaddform({
                                                    ...empaddform,
                                                    company: e.target.value,
                                                }); 
                                                // fetchbranchNameschange(e.target.value ? e.target.value  : empaddform.company);
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
                                <Grid item md={6} sm={12} xs={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Branch</Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={empaddform.branch}
                                            onChange={(e, i) => {
                                                setEmpaddform({ ...empaddform, branch: e.target.value }); 
                                                setgetbranchname(e.target.value)
                                                // fetchUnithNameschange();
                                            }}
                                        >
                                            {branchNames &&
                                                branchNames.map((row) => (
                                                    <MenuItem value={row.name}>{row.name}</MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Unit</Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={empaddform.unit}
                                            onChange={(e, i) => {
                                                setEmpaddform({ ...empaddform, unit: e.target.value });
                                            }}
                                        >
                                            {unitNames &&
                                                unitNames.map((row) => (
                                                    <MenuItem value={row.name}>{row.name}</MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
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
                                <Grid item md={6} sm={12} xs={12}>
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
                                <Grid item md={6} sm={12} xs={12}>
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
                                <Grid item md={6} sm={12} xs={12}>
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
                                <Grid item md={6} sm={12} xs={12}>
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
                                <Grid item md={6} sm={12} xs={12}>
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
                                                    <MenuItem value={row.companyname}>{row.companyname}</MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <br /></Grid>   <br />   <br />   <br />
                            <Grid container>
                                <Grid item md={1}></Grid>
                                <Button variant="contained" onClick={editSubmit} >Update</Button>
                                <Grid item md={1}></Grid>
                                <Button sx={userStyle.btncancel} onClick={handleCloseModEdit} >Cancel</Button>
                            </Grid>
                        </>
                    </Box>
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
                        <StyledTableRow>
                            <StyledTableCell>SI.NO</StyledTableCell>
                            <StyledTableCell>Branch</StyledTableCell>
                            <StyledTableCell>Floor </StyledTableCell>
                            <StyledTableCell>Department</StyledTableCell>
                            <StyledTableCell>Team</StyledTableCell>
                            <StyledTableCell>Designation</StyledTableCell>
                            <StyledTableCell>Shift Timing</StyledTableCell>
                            <StyledTableCell>Reporting To</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {employees &&
                            (employees.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{printno++}</StyledTableCell>
                                    <StyledTableCell>{row.branch} </StyledTableCell>
                                    <StyledTableCell> {row.floor}</StyledTableCell>
                                    <StyledTableCell>{row.department}</StyledTableCell>
                                    <StyledTableCell>{row.team}</StyledTableCell>
                                    <StyledTableCell>{row.designation}</StyledTableCell>
                                    <StyledTableCell>{row.shifttiming}</StyledTableCell>
                                    <StyledTableCell>{row.reportingto}</StyledTableCell>
                                </StyledTableRow>

                            )))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}


export default Boardingupdate;