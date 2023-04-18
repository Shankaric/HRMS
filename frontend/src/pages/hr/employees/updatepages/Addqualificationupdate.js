import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Dialog, DialogContent, Select, FormControl, OutlinedInput, MenuItem, Grid, Paper, Table, TableHead, TableContainer, Button, TableBody } from "@mui/material";
import { userStyle } from "../../../../pageStyle";
import { StyledTableRow, StyledTableCell } from "../../../../components/Table";
import EditIcon from '@mui/icons-material/Edit';
import { FaPlus } from 'react-icons/fa';
import { SERVICE } from '../../../../services/Baseservice';
import axios from "axios";
import { AiOutlineClose } from 'react-icons/ai';
import 'jspdf-autotable';
import $ from "jquery";


function AddQualificationupdate() {



    const [addAddQuaTodo, setAddQuaTodo] = useState("")
    const [addQual, setAddQual] = useState("")
    const [skillSet, setSkillSet] = useState("")
    const [duration, setDuration] = useState("")
    const [addInst, setAddInst] = useState("")
    const [remarks, setRemarks] = useState("")
    const [pages, setPages] = useState(1);
    const [getemployees, setEmployees] = useState([])
    const [AddiDetails, setAddiDetails] = useState([])
    const [getrowid, setRowGetid] = useState("");
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

    //SkillSet DropDowns
    const fetchSkillSet = async () => {
        try {
            let req = await axios.get(SERVICE.SKILLSET);
            setSkillSet(
                req?.data?.skillsets?.map((d) => ({
                    ...d,
                    label: d.name,
                    value: d.name,
                }))
            );
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    };

    //Submit function for Additional Qualification
    const handleSubmitAddtodo = (e) => {
        e.preventDefault();
        setAddQuaTodo([...addAddQuaTodo, { addQual, addInst, duration, remarks }]);
        setAddQual("");
        setAddInst("");
        setDuration("");
        setRemarks("");
    };

    //Delete for Additional Qualification
    const handleAddDelete = (index) => {
        const newTodosed = [...addAddQuaTodo];
        newTodosed.splice(index, 1);
        setAddQuaTodo(newTodosed);
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
        setAddiDetails(res.data.suser);
        setAddQuaTodo(res.data.suser.addAddQuaTodo);
        setRowGetid(res.data.suser);
    }

    //edit post call 
    let logedit = getrowid._id;
    const sendRequestt = async () => {
        try {
            let res = await axios.put(`${SERVICE.USER_SINGLE_PWD}/${logedit}`, {
                companyname: String(AddiDetails.companyname),
                empcode: String(AddiDetails.empcode),
                location: String(AddiDetails.location),
                firstname: String(AddiDetails.firstname),
                lastname: String(AddiDetails.lastname),
                addAddQuaTodo: [...addAddQuaTodo]
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
            fetchSkillSet();
        }, []
    );

    let AddiDetailsLength = getemployees.length;
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
                        <Typography sx={userStyle.HeaderText}> Additional Qualification Update </Typography>
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
                                        (filteredData.slice((pages * entries - entries < AddiDetailsLength ? pages * entries - entries : 0),
                                            ((pages * entries - entries <= AddiDetailsLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
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
                            {(pages * entries - entries <= AddiDetailsLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
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
                                <Typography sx={userStyle.SubHeaderText}>Additional Qualification Details</Typography><br /><br />
                                <Grid container spacing={2}>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <Typography>{(AddiDetails.companyname)}</Typography>
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <Typography>{AddiDetails.empcode}</Typography>
                                    </Grid><br></br><br></br>
                                    <Grid item md={5} sm={12} xs={12}>
                                        <FormControl fullWidth size="small" >
                                            <Typography> Addtl. Qualification </Typography>
                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                value={addQual}
                                                onChange={(e, i) => {
                                                    setAddQual(e.target.value);
                                                }}
                                            >
                                                {skillSet &&
                                                    skillSet.map((row) => (
                                                        <MenuItem value={row.name}>{row.name}</MenuItem>
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
                                                value={addInst}
                                                onChange={(e) => setAddInst(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={5} sm={12} xs={12}>
                                        <FormControl fullWidth size="small" >
                                            <Typography>Durartion</Typography>
                                            <OutlinedInput
                                                id="component-outlined"
                                                type="text"
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={5} sm={12} xs={12}>
                                        <FormControl fullWidth size="small" >
                                            <Typography> Remarks</Typography>
                                            <OutlinedInput
                                                id="component-outlined"
                                                type="text"
                                                value={remarks}
                                                onChange={(e) => setRemarks(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={1} sm={12} xs={12}>
                                        <FormControl size="small" >
                                            <Button variant="contained" color="success" type="button" onClick={handleSubmitAddtodo} sx={userStyle.Todoadd}><FaPlus /></Button>&nbsp;
                                        </FormControl>
                                    </Grid>
                                    <br />
                                </Grid><br></br><br></br>
                                <Typography sx={userStyle.SubHeaderText}> Additional Qualification Update</Typography>
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
                                                <StyledTableCell align="center">Addl. Qualification</StyledTableCell>
                                                <StyledTableCell align="center">Institution</StyledTableCell>
                                                <StyledTableCell align="center">Duration</StyledTableCell>
                                                <StyledTableCell align="center">Remarks</StyledTableCell>
                                                <StyledTableCell align="center">Action</StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(addAddQuaTodo && addAddQuaTodo.map((todo, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell align="center">{sno++}</StyledTableCell>
                                                    <StyledTableCell align="left">{todo.addQual}</StyledTableCell>
                                                    <StyledTableCell align="center">{todo.addInst}</StyledTableCell>
                                                    <StyledTableCell align="center">{todo.duration}</StyledTableCell>
                                                    <StyledTableCell align="center">{todo.remarks}</StyledTableCell>
                                                    <StyledTableCell align="center">{
                                                        <Button variant="contained" color="error" type="button" onClick={() => handleAddDelete(index)} sx={userStyle.Todoadd}><AiOutlineClose /></Button>
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


export default AddQualificationupdate;