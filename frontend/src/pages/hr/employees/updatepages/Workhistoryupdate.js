import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, Dialog, DialogContent, FormControl, Select, MenuItem, Grid, Paper, Table, TableHead, TableContainer, Button, TableBody } from "@mui/material";
import { userStyle } from "../../../../pageStyle";
import { StyledTableRow, StyledTableCell } from "../../../../components/Table";
import { SERVICE } from '../../../../services/Baseservice';
import axios from "axios";
import 'jspdf-autotable';
import { AiOutlineClose } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import $ from "jquery";
import EditIcon from '@mui/icons-material/Edit';

function EmpWorkHistory() {

    const [empNameTodo, setEmpNameTodo] = useState("")
    const [desigTodo, setDesigTodo] = useState("")
    const [joindateTodo, setJoindateTodo] = useState("")
    const [leavedateTodo, setLeavedateTodo] = useState("")
    const [dutiesTodo, setDutiesTodo] = useState("")
    const [reasonTodo, setReasonTodo] = useState("")
    const [workhistTodo, setWorkhistTodo] = useState([])
    const [getemployees, setEmployees] = useState([])
    const [workHisDetails, setWorkHisDetails] = useState([])
    const [getrowid, setRowGetid] = useState("");
    const [pages, setPages] = useState(1);
    const [entries, setEntries] = useState(1);
    const [search, setSearch] = useState()
    const [isEditOpen, setIsEditOpen] = useState(false);

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

    //Submit function for Work History
    const handleSubmitWorkSubmit = (e) => {
        e.preventDefault();
        setWorkhistTodo([...workhistTodo, { empNameTodo, desigTodo, joindateTodo, leavedateTodo, dutiesTodo, reasonTodo }]);
        setEmpNameTodo("");
        setDesigTodo("");
        setJoindateTodo("");
        setLeavedateTodo("");
        setDutiesTodo("");
        setReasonTodo("");
    };

    //Delete for  Work History
    const handleWorkHisDelete = (index) => {
        const newWorkHisTodo = [...workhistTodo];
        newWorkHisTodo.splice(index, 1);
        setWorkhistTodo(newWorkHisTodo);
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
        setWorkHisDetails(res.data.suser);
        setWorkhistTodo(res.data.suser.workhistTodo);
        setRowGetid(res.data.suser);
    }

    //edit post call 
    let logedit = getrowid._id;
    const sendRequestt = async () => {
        try {
            let res = await axios.put(`${SERVICE.USER_SINGLE}/${logedit}`, {
                companyname: String(workHisDetails.companyname),
                empcode: String(workHisDetails.empcode),
                location: String(workHisDetails.location),
                firstname: String(workHisDetails.firstname),
                lastname: String(workHisDetails.lastname),
                workhistTodo: [...workhistTodo]

            });
            setWorkHisDetails(res.data);
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
        }, []
    );


    let WorkhistoryLength = getemployees.length;
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
                        <Typography sx={userStyle.HeaderText}>  Work History Update Details </Typography>
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
                                        (filteredData.slice((pages * entries - entries < WorkhistoryLength ? pages * entries - entries : 0),
                                            ((pages * entries - entries <= WorkhistoryLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
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
                                {(pages * entries - entries <= WorkhistoryLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
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

                                <Typography sx={userStyle.SubHeaderText}>Work History</Typography><br /><br />
                                <Grid container spacing={2}>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <Typography>{(workHisDetails.companyname)}</Typography>
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <Typography>{workHisDetails.empcode}</Typography>
                                    </Grid><br></br><br></br>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <FormControl fullWidth size="small" >
                                            <Typography> Employee Name</Typography>
                                            <OutlinedInput
                                                id="component-outlined"
                                                type="text"
                                                value={empNameTodo}
                                                onChange={(e) => setEmpNameTodo(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <FormControl fullWidth size="small" >
                                            <Typography> Designation </Typography>
                                            <OutlinedInput
                                                id="component-outlined"
                                                type="text"
                                                value={desigTodo}
                                                onChange={(e) => { setDesigTodo(e.target.value); console.log(desigTodo) }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <FormControl fullWidth size="small" >
                                            <Typography> Joined On </Typography>
                                            <OutlinedInput
                                                id="component-outlined"
                                                type="date"
                                                value={joindateTodo}
                                                onChange={(e) => { setJoindateTodo(e.target.value); console.log(e) }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <FormControl fullWidth size="small" >
                                            <Typography> Leave On</Typography>
                                            <OutlinedInput
                                                id="component-outlined"
                                                type="date"
                                                value={leavedateTodo}
                                                onChange={(e) => setLeavedateTodo(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={3} sm={12} xs={12}>
                                        <FormControl fullWidth size="small" >
                                            <Typography> Duties</Typography>
                                            <OutlinedInput
                                                id="component-outlined"
                                                type="text"
                                                value={dutiesTodo}
                                                onChange={(e) => setDutiesTodo(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <FormControl fullWidth size="small" >
                                            <Typography> Reason for Leaving</Typography>
                                            <OutlinedInput
                                                id="component-outlined"
                                                type="text"
                                                value={reasonTodo}
                                                onChange={(e) => setReasonTodo(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={1} sm={12} xs={12}>
                                        <FormControl size="small" >
                                            <Button variant="contained" color="success" type="button" onClick={handleSubmitWorkSubmit} sx={userStyle.Todoadd}><FaPlus /></Button>&nbsp;
                                        </FormControl>
                                    </Grid>
                                    <br />
                                </Grid><br></br><br></br>

                                {/* <Box sx={userStyle.container}> */}
                                <Typography sx={userStyle.SubHeaderText}>  Work History Details </Typography>
                                <br /><br /><br />
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
                                                <StyledTableCell align="center">Employee Name</StyledTableCell>
                                                <StyledTableCell align="center">Designation</StyledTableCell>
                                                <StyledTableCell align="center">Joined On</StyledTableCell>
                                                <StyledTableCell align="center">Leave On</StyledTableCell>
                                                <StyledTableCell align="center">Duties</StyledTableCell>
                                                <StyledTableCell align="center">Reason for Leaving</StyledTableCell>
                                                <StyledTableCell align="center">Action</StyledTableCell>

                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(workhistTodo && workhistTodo.map((todo, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell align="center">{sno++}</StyledTableCell>
                                                    <StyledTableCell align="left">{todo.empNameTodo}</StyledTableCell>
                                                    <StyledTableCell align="center">{todo.desigTodo}</StyledTableCell>
                                                    <StyledTableCell align="center">{todo.joindateTodo}</StyledTableCell>
                                                    <StyledTableCell align="center">{todo.leavedateTodo}</StyledTableCell>
                                                    <StyledTableCell align="center">{todo.dutiesTodo}</StyledTableCell>
                                                    <StyledTableCell align="center">{todo.reasonTodo}</StyledTableCell>
                                                    <StyledTableCell align="center">{
                                                        <Button variant="contained" color="error" type="button" onClick={() => handleWorkHisDelete(index)} sx={userStyle.Todoadd}><AiOutlineClose /></Button>
                                                    }</StyledTableCell>
                                                </StyledTableRow>
                                            )))}
                                        </TableBody>
                                    </Table>
                                </TableContainer><br></br><br></br>
                                {/* </Box><br /> */}
                                {/* <Box sx={userStyle.container} > */}
                                <>
                                    <Grid container>
                                        <Grid item md={1}></Grid>
                                        <Button variant="contained" onClick={editSubmit} >Update</Button>
                                        <Grid item md={1}></Grid>
                                        <Button sx={userStyle.btncancel} onClick={handleCloseModEdit} >Cancel</Button>
                                    </Grid>
                                </>
                                {/* </Box><br /> */}
                                {/* </Box> */}
                            </DialogContent>
                            <br />
                        </Dialog>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}


export default EmpWorkHistory;