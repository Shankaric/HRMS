import React, { useState, useEffect, useRef } from "react";
import {
    Box, Typography, OutlinedInput, FormControl, Select, MenuItem, TableBody, DialogContent, Grid, Dialog, DialogActions, Paper, Table, TableHead, TableContainer, Button,
} from "@mui/material";
import { userStyle } from "../../pageStyle";
import axios from "axios";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import { useReactToPrint } from "react-to-print";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import $ from "jquery";
import { SERVICE } from "../../services/Baseservice";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import moment from 'moment-timezone';


function Qualification() {
    // const { isUserRoleCompare } = useContext(UserRoleAccessContext);
    // const { auth, setAuth } = useContext(AuthContext);
    const [deletebranch, setDeletebranch] = useState(false);
    const [getrowid, setRowGetid] = useState("");
    const [language, setLanguage] = useState({
        qualiname: "",
    });
    const [langid, setLangid] = useState({});
    const [lang, setLang] = useState([]);
    const [entries, setEntries] = useState(1);
    const [pages, setPages] = useState(1);
    const [username, setUsername] = useState("");

    const userData = {
        name: username,
        date: new Date(),
    };
    console.log(userData);

    let sino = 1;
    let printsno = 1;

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

    //submitting the form
    const sendRequest = async () => {
        try {
            let req = await axios.post(
                SERVICE.QUALIFICATION_CREATE,
                {
                    qualiname: String(language.qualiname),
                    addedby: String(username),
                }
            );
            setLanguage(req.data);
            setLanguage({ qualiname: "" });
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    //fetching departments whole list
    const fetchQualifications = async () => {
        try {
            let dep = await axios.get(SERVICE.QUALIFICATIONS);

            setLang(dep.data.qualificationdetails);
        } catch (error) {
            console.log(error.response.data);
        }
    };
    //submitting the forms
    const handleSubmit = (e) => {
        sendRequest();
    };


    //get single row to edit
    const getCode = async (e) => {
        setRowGetid(e);
        let res = await axios.get(
            `${SERVICE.QUALIFICATION_SINGLE}/${e}`,
            {}
        );

        setLangid(res.data.squalificationdetails);
        setRowGetid(res.data.squalificationdetails);
    };

    // get single row to view....
    const getviewCode = async (e) => {
        let res = await axios.get(`${SERVICE.QUALIFICATION_SINGLE}/${e}`, {});
        setLangid(res.data.squalificationdetails);
    };


    // get single row to view....
    const getinfoCode = async (e) => {
        let res = await axios.get(`${SERVICE.QUALIFICATION_SINGLE}/${e}`, {});
        setLangid(res.data.squalificationdetails);
    };

    let updatelist = [];
    updatelist = langid?.updatedby;
    updatelist?.map((item) => {
        console.log(item.name);
        console.log(item.date);
    })
    //Qualification updateby edit page...
    let updateby = langid.updatedby;
    console.log(langid.updatedby, 'updatedvalue');

    //editing the single data

    let lang_id = getrowid._id;
    const sendEditRequest = async () => {
        try {
            let res = await axios.put(
                `${SERVICE.QUALIFICATION_SINGLE}/${lang_id}`,
                {
                    qualiname: String(langid.qualiname),
                    addedby: String(username),
                    updatedby: [
                        ...updateby, {
                            name: String(username),
                            date: String(new Date()),

                        },
                    ],
                }
            );
            setLangid(res.data);
            handleCloseModEdit();
        } catch (err) {
            console.log(err.response.data.message)
        }
    };

    const editSubmit = (e) => {
        e.preventDefault();
        sendEditRequest();
    };

    //    PDF
    const columns = [
        { title: "Name", field: "qualiname" },
    ]
    const downloadPdf = () => {
        const doc = new jsPDF()
        doc.autoTable({
            theme: "grid",
            columns: columns.map(col => ({ ...col, dataKey: col.field })),
            body: lang
        })
        doc.save('Qualification.pdf')
    }


    // Excel
    const fileName = "Qualification";
    let excelno = 1;

    const [exceldata, setExceldata] = useState([]);

    // get perticular columns for export excel
    const getexcelDatas = async () => {

        let Dep = await axios.get(SERVICE.QUALIFICATIONS)

        var data = Dep.data.qualificationdetails.map(t => ({
            SNo: excelno++,
            Name: t.qualiname,

        }));
        setExceldata(data);
    }

    // Print
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Qualification',
        pageStyle: 'print'
    });

    // Delete model
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const handleClickOpen = () => {
        setIsDeleteOpen(true);
    };
    const handleCloseMod = () => {
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

    //set function to get particular row
    const rowData = async (id) => {
        try {
            let res = await axios.get(
                `${SERVICE.QUALIFICATION_SINGLE}/${id}`
            );
            setDeletebranch(res.data.squalificationdetails);
        } catch (err) { }
    };

    // Alert delete popup
    let branchid = deletebranch._id;
    const delBranch = async () => {
        try {
            await axios.delete(`${SERVICE.QUALIFICATION_SINGLE}/${branchid}`);
            handleCloseMod();
        } catch (err) {
            console.log(err.response.data.errorMessage)
        }
    };


    //datatables....
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredData = lang.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    //pagination......
    const selectPageHandler = (selPage) => {
        if (selPage >= 1 && selPage <= (Math.ceil(lang.length / (Number(entries)))) && selPage !== pages)
            setPages(selPage)

    };

    //id for login...
    let loginid = localStorage.LoginUserId;
    console.log(localStorage);


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
        // console.log(res.data.sarea)
    }
    console.log(username);
    let total = 0;

    useEffect(() => {
        fetchQualifications();
        getexcelDatas();
        getusername();
    });


    let qualificationLength = lang.length;

    useEffect(
        () => {
            selectPageHandler();
        }
    );


    return (
        <Box>
            {/* <Headtitle title={"Qualification"} /> */}
            {/* ****** Header Content ****** */}
            <Typography sx={userStyle.HeaderText}>Manage Languages </Typography>

            <Box sx={userStyle.container}>
                <>
                    <Grid container spacing={2}>
                        <Grid item md={6} sx={12}>
                            <Typography>Name</Typography>

                            <FormControl fullWidth size="small">
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={language.qualiname}
                                    onChange={(e) => {
                                        setLanguage({ ...language, qualiname: e.target.value });
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sx={12}></Grid>
                        <Grid item md={3} sx={12}>
                            <Button variant="contained" onClick={handleSubmit}>
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                </>

                <>
                    <Box>
                        {/* ALERT DIALOG */}
                        <Dialog
                            open={isEditOpen}
                            onClose={handleCloseModEdit}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <Box sx={userStyle.container}>
                                <Typography sx={userStyle.SubHeaderText}>  Manage Floor </Typography>
                                <br /><br />
                                <Grid container >
                                    <Grid item md={12} sx={12}>
                                        <Typography>Name</Typography>

                                        <FormControl fullWidth size="small">
                                            <OutlinedInput
                                                id="component-outlined"
                                                type="text"
                                                value={langid.qualiname}
                                                onChange={(e) => {
                                                    setLangid({ ...langid, qualiname: e.target.value });
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <br /><br />
                                <Grid container>
                                    <Grid item md={6} sx={12}>
                                        <Button variant="contained" onClick={editSubmit}> Update </Button>
                                    </Grid>
                                    <Grid item md={6} sx={12}>
                                        <Button sx={userStyle.btncancel} onClick={handleCloseModEdit}> cancel </Button>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Dialog>
                    </Box>
                </>
            </Box>
            <br />
            {/* ****** Table Start ****** */}
            <>
                <Box sx={userStyle.container}>
                    { /* ****** Header Buttons ****** */}
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
                    <Grid sx={userStyle.dataTablestyle}>
                        <Box>
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
                                    <MenuItem value={(lang.length)}>All</MenuItem>
                                </Select>
                            </FormControl>
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
                            sx={{}}
                            aria-label="simple table"
                            id="Qualificationreport"
                        >
                            <TableHead sx={{ fontWeight: "600" }}>
                                <StyledTableRow>
                                    {/* <StyledTableCell> S.NO</StyledTableCell> */}
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Actions</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData &&
                                    (filteredData.slice((pages * entries - entries < qualificationLength ? pages * entries - entries : 0),
                                        ((pages * entries - entries <= qualificationLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                                            <StyledTableRow key={index}>
                                                {/* <StyledTableCell>{total = ((pages * entries - entries + index + 1))}</StyledTableCell> */}
                                                <StyledTableCell align="left">{row.qualiname}</StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
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
                                                                style={{ fontSize: "large" }}
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
                                        )))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid style={userStyle.dataTablestyle}>
                        <Box >
                            <Typography>Showing
                                {(pages * entries - entries <= qualificationLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                                {/* {(pages * entries - entries + 1)}  */}
                                to {(pages * entries) > lang.length ? lang.length : ((pages * entries))} of {lang.length} entries</Typography>  </Box>
                        <Box>
                            {lang && <Typography className="Pagination">
                                <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(pages - 1) }}>prev</Button>

                                {[...Array(Math.ceil(lang.length / Number(entries)))].map((_, i) => {
                                    if (entries == 1) {
                                        if (i <= 5) {
                                            return <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(i + 1) }}>{(i + 1)}</Button>
                                        }
                                    }
                                    else {
                                        return <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(i + 1) }}>{i + 1}</Button>
                                    }
                                })}

                                <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(pages + 1) }}>Next</Button>
                            </Typography>}
                            {/* ****** Table End ****** */}

                        </Box>
                    </Grid>
                    {/* ****** Table End ****** */}
                </Box>
            </>
            {/* ****** Table End ****** */}

            {/* Delete Modal */}
            <Box>
                {/* ALERT DIALOG */}
                <Dialog
                    open={isDeleteOpen}
                    onClose={handleCloseMod}
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
                        <Button onClick={handleCloseMod} sx={userStyle.btncancel}>
                            Cancel
                        </Button>
                        <Button
                            autoFocus
                            variant="contained"
                            color="error"
                            onClick={(e) => delBranch(branchid)}
                        >
                            {" "}
                            OK{" "}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            {/* view model */}
            <Dialog
                open={openview}
                onClose={handleClickOpenview}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{ width: "350px", padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.HeaderText}> View Languages</Typography>
                        <br /> <br />
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6"> Name</Typography>
                                    <Typography>{langid.qualiname}</Typography>
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
                        <Typography sx={userStyle.HeaderText}> Manage Area</Typography>
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


            {/* print layout */}

            <TableContainer component={Paper} sx={userStyle.printcls}>
                <Table sx={{ minWidth: 700, }} aria-label="customized table" id="usertable" ref={componentRef}>

                    <TableHead sx={{ fontWeight: "600" }}>
                        <StyledTableRow>
                            <StyledTableCell> S.NO</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    {lang &&
                        lang.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="left">{printsno++}</StyledTableCell>
                                <StyledTableCell align="left">{row.qualiname}</StyledTableCell>

                            </StyledTableRow>
                        ))}
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Qualification;