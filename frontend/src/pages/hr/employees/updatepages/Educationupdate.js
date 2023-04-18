import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Dialog, DialogContent, Select, FormControl, OutlinedInput, MenuItem, Grid, Paper, Table, TableHead, TableContainer, Button, TableBody } from "@mui/material";
import { userStyle } from "../../../../pageStyle";
import { StyledTableRow, StyledTableCell } from "../../../../components/Table";
import EditIcon from '@mui/icons-material/Edit';
import { FaPlus } from 'react-icons/fa';
import { SERVICE } from '../../../../services/Baseservice';
import axios from "axios";
import { AiOutlineClose } from 'react-icons/ai';
import $ from "jquery";
import 'jspdf-autotable';

function Educatioupdate() {


    const [qualification, setQualification] = useState("");
    const [passedyear, setPassedyear] = useState("");
    const [cgpa, setCgpa] = useState("");
    const [eduTodo, setEduTodo] = useState([]);
    const [qualiDetails, setQualiDetails] = useState([]);
    const [institution, setInstitution] = useState("");
    const [qualinames, setQualinames] = useState("");
    const [getemployees, setEmployees] = useState([])
    const [AddiDetails, setAddiDetails] = useState([])
    const [getrowid, setRowGetid] = useState("");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [pages, setPages] = useState(1);
    const [entries, setEntries] = useState(1);
    const [search, setSearch] = useState()

    let sno = 1;

    //get all employees list details fro user
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

    //Qulalification Dropdowns 
    const fetchqualification = async () => {
        try {
            let req = await axios.get(SERVICE.QUALIFICATIONS);
            setQualinames(
                req?.data?.qualificationdetails?.map((d) => ({
                    ...d,
                    label: d.qualiname,
                    value: d.qualiname,
                }))
            );
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    };

    //Submit function for TODO Education
    const handleSubmittodo = (e) => {
        e.preventDefault();
        setEduTodo([...eduTodo, { qualification, institution, passedyear, cgpa }]);
        setQualification("");
        setInstitution("");
        setPassedyear("");
        setCgpa("");
    };

    //Delete for Education 
    const handleDelete = (index) => {
        const newTodos = [...eduTodo];
        newTodos.splice(index, 1);
        setEduTodo(newTodos);
    };

    const editSubmit = (e) => {
        e.preventDefault();
        sendRequestt();
    }

    // Edit model
    const handleClickOpenEdit = () => {
        setIsEditOpen(true);
    };
    const handleCloseModEdit = (e, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setIsEditOpen(false);
    };

    //get am single id to get an particular row
    const getCode = async (e) => {
        let res = await axios.get(`${SERVICE.USER_SINGLE}/${e}`, {
        })
        setQualiDetails(res.data.suser);
        setEduTodo(res.data.suser.eduTodo);
        setRowGetid(res.data.suser);
    }

    //edit post call 
    let logedit = getrowid._id;
    const sendRequestt = async () => {
        try {
            let res = await axios.put(`${SERVICE.USER_SINGLE_PWD}/${logedit}`, {
                companyname: String(qualiDetails.companyname),
                empcode: String(qualiDetails.empcode),
                location: String(qualiDetails.location),
                firstname: String(qualiDetails.firstname),
                lastname: String(qualiDetails.lastname),
                eduTodo: [...eduTodo]
            });
            setAddiDetails(res.data);
            handleCloseModEdit();

        } catch (err) {
            const messages = err.response.data.errorMessage;
            console.log(messages);
        }
    }

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredData = getemployees.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    useEffect(
        () => {
            fetchEmployee();
            fetchqualification();
        }, []
    );

    let EducationLength = getemployees.length;
    useEffect(
        () => {
            selectPageHandler();
        }
    );

    const selectPageHandler = (selPage) => {
        if (selPage >= 1 && selPage <= (Math.ceil(getemployees.length / (Number(entries)))) && selPage !== pages)
            setPages(selPage)
    }

    return (
        <Box>
            {/* ****** Header Content ****** */}
            <Box >
                <form >
                    <Box sx={userStyle.container}>
                        <Typography sx={userStyle.HeaderText}> Educational Qualification Update </Typography>
                        <br /><br /><br />
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
                                        <MenuItem value={(getemployees.length)}>All</MenuItem>
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
                                id="workhistory"
                            // ref={tableRef}
                            >
                                <TableHead sx={{ fontWeight: "600" }}>
                                    <StyledTableRow>
                                        <StyledTableCell align="center">SI.NO</StyledTableCell>
                                        <StyledTableCell align="center">Employee Code </StyledTableCell>
                                        <StyledTableCell align="center">UserName</StyledTableCell>
                                        <StyledTableCell align="center">Action</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredData &&
                                        (filteredData.slice((pages * entries - entries < EducationLength ? pages * entries - entries : 0),
                                            ((pages * entries - entries <= EducationLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell align="center">{sno++}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.empcode} </StyledTableCell>
                                                    <StyledTableCell align="center">{row.username}</StyledTableCell>
                                                    <StyledTableCell align="center" component="th" scope="row">
                                                        <Button variant="outlined" style={userStyle.actionbutton} onClick={() => {
                                                            handleClickOpenEdit();
                                                            getCode(row._id)
                                                        }}><EditIcon style={{ fontsize: '20px' }} />
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid style={userStyle.dataTablestyle}>
                        <Typography>Showing
                            {(pages * entries - entries <= EducationLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                            {/* {(pages * entries - entries + 1)}  */}
                            to {(pages * entries) > getemployees.length ? getemployees.length : ((pages * entries))} of {getemployees.length} entries</Typography>
                        {getemployees && <Typography className="Pagination">
                            <Button onClick={() => { selectPageHandler(pages - 1) }}>prev</Button>

                            {[...Array(Math.ceil(getemployees.length / Number(entries)))].map((_, i) => {
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

                    {/* ALERT DIALOG */}
                    <Box>
                        {/* ALERT DIALOG */}
                        <Dialog
                            open={isEditOpen}
                            onClose={handleCloseModEdit}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            sx={{ overflowY: "visible" }}
                        >
                            <DialogContent sx={{ overflowY: "visible" }}>
                                {/* <Box sx={userStyle.dialogbox}> */}

                                <Typography sx={userStyle.SubHeaderText}>Educational Qualification Details</Typography><br /><br />
                                <Grid container spacing={2}>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <Typography>{(AddiDetails.companyname)}</Typography>
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <Typography>{AddiDetails.empcode}</Typography>
                                    </Grid><br></br><br></br>
                                    <Grid item md={5} sm={12} xs={12}>
                                        <FormControl fullWidth size="small" >
                                            <Typography>Qualification </Typography>
                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                value={qualification}
                                                onChange={(e, i) => {
                                                    setQualification(e.target.value);
                                                }}
                                            >
                                                {qualinames &&
                                                    qualinames.map((row) => (
                                                        <MenuItem value={row.qualiname}>{row.qualiname}</MenuItem>
                                                    ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={5} sm={12} xs={12}>
                                        <FormControl fullWidth size="small" >
                                            <Typography> Institution </Typography>
                                            <OutlinedInput
                                                id="component-outlined"
                                                type="text"
                                                value={institution}
                                                onChange={(e) => setInstitution(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={5} sm={12} xs={12}>
                                        <FormControl fullWidth size="small" >
                                            <Typography>Past Year</Typography>
                                            <OutlinedInput
                                                id="component-outlined"
                                                type="text"
                                                value={passedyear}
                                                onChange={(e) => setPassedyear(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={5} sm={12} xs={12}>
                                        <FormControl fullWidth size="small" >
                                            <Typography> CGPA</Typography>
                                            <OutlinedInput
                                                id="component-outlined"
                                                type="text"
                                                value={cgpa}
                                                onChange={(e) => setCgpa(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    {/* <Grid item md={4} sm={12} xs={12}>
                                            
                                        </Grid> */}
                                    <Grid item md={1} sm={12} xs={12}>
                                        <FormControl size="small" >
                                            <Button variant="contained" color="success" type="button" onClick={handleSubmittodo} sx={userStyle.Todoadd}><FaPlus /></Button>&nbsp;
                                        </FormControl>
                                    </Grid>
                                    <br />
                                </Grid><br></br><br></br>

                                {/* <Box sx={userStyle.container}> */}
                                <Typography sx={userStyle.SubHeaderText}>Educational Qualification Update</Typography>
                                <br /><br /><br />
                                {/* ****** Table start ****** */}
                                <TableContainer component={Paper} >
                                    <Table
                                        aria-label="simple table"
                                        id="workhistory"
                                    //  ref={tableRef}
                                    >
                                        <TableHead sx={{ fontWeight: "600" }}>
                                            <StyledTableRow>
                                                <StyledTableCell align="center">SI.NO</StyledTableCell>
                                                <StyledTableCell align="center">Qualification</StyledTableCell>
                                                <StyledTableCell align="center">Institution</StyledTableCell>
                                                <StyledTableCell align="center">Passed Year</StyledTableCell>
                                                <StyledTableCell align="center">% or cgpa</StyledTableCell>
                                                <StyledTableCell align="center">Action</StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(eduTodo && eduTodo.map((todo, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell align="center">{sno++}</StyledTableCell>
                                                    <StyledTableCell align="left">{todo.qualification}</StyledTableCell>
                                                    <StyledTableCell align="center">{todo.institution}</StyledTableCell>
                                                    <StyledTableCell align="center">{todo.passedyear}</StyledTableCell>
                                                    <StyledTableCell align="center">{todo.cgpa}</StyledTableCell>
                                                    <StyledTableCell align="center">{
                                                        <Button variant="contained" color="error" type="button" onClick={() => handleDelete(index)} sx={userStyle.Todoadd}><AiOutlineClose /></Button>
                                                    }</StyledTableCell>
                                                </StyledTableRow>
                                            )))}
                                        </TableBody>
                                    </Table>
                                </TableContainer><br></br><br></br>
                                <>
                                    <Grid container>

                                        <Grid item md={1}></Grid>
                                        <Button variant="contained" onClick={editSubmit} >Update</Button>
                                        <Grid item md={1}></Grid>
                                        <Button sx={userStyle.btncancel} onClick={handleCloseModEdit} >Cancel</Button>
                                    </Grid>
                                </>
                            </DialogContent>
                            <br />
                        </Dialog>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default Educatioupdate;