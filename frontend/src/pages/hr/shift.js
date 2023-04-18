import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, Dialog, Select, MenuItem, TableBody, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button, } from "@mui/material";
import { userStyle } from "../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import $ from "jquery";
import jsPDF from "jspdf";
import 'jspdf-autotable'
import { useReactToPrint } from "react-to-print";
import { SERVICE } from '../../services/Baseservice';
import axios from "axios";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import moment from 'moment-timezone';


function ShiftDetails() {
    const [shift, setShift] = useState({
        name: "",
        fromhour: "",
        tohour: "",
        frommin: "",
        tomin: "",
        fromtime: "AM",
        totime: "PM",
        shiftallowance: "",
        payhours: "",
        breakhours: "",
    });
    const [shifts, setShifts] = useState([]);
    const [shiftsid, setShiftsid] = useState({});
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

    // Error Popup model
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [showAlert, setShowAlert] = useState();
    const handleClickOpenerr = () => {
        setIsErrorOpen(true);
    };
    const handleCloseerr = () => {
        setIsErrorOpen(false);
    };


    //Delete model
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleClickOpen = () => {
        setIsDeleteOpen(true);
    };
    const handleCloseMod = () => {
        setIsDeleteOpen(false);
    };

    const [deleteshift, setDeleteshift] = useState("");
    // set function to get particular row....
    const rowData = async (id) => {
        try {
            let res = await axios.get(`${SERVICE.SHIFT_SINGLE}/${id}`, {
                // headers: {
                //     'Authorization': `Bearer ${auth.APIToken}`
                // }
            });
            setDeleteshift(res.data.sshift);
        } catch (err) { }
    };

    // Alert delete popup
    let shiftid = deleteshift._id;
    const delShift = async () => {
        try {
            await axios.delete(
                `${SERVICE.SHIFT_SINGLE}/${shiftid}`,
                {
                    // headers: {
                    //     'Authorization': `Bearer ${auth.APIToken}`
                    // }
                }
            );
            handleCloseMod();
        } catch (err) {

        }
    };

    //datatable....
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredData = shifts.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    //add function....
    const sendRequest = async () => {
        try {
            let shiftcreate = await axios.post(
                SERVICE.SHIFT_CREATE,
                {
                    name: String(shift.name),
                    fromhour: String(shift.fromhour),
                    tohour: String(shift.tohour),
                    frommin: String(shift.frommin),
                    tomin: String(shift.tomin),
                    fromtime: String(shift.fromtime),
                    totime: String(shift.totime),
                    isallowance: String(shift.isallowance),
                    payhours: Number(shift.payhours),
                    breakhours: Number(shift.breakhours),
                    addedby: String(username),
                }
            );
            setShift(shiftcreate.data);
            setShift({ name: "", fromtime: "", totime: "", shiftallowance: "", payhours: "", breakhours: "" })
        } catch (error) {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {error.response.data.errorMessage}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
    };

    //submit option for saving
    const handleSubmit = (e) => {
        e.preventDefault();
        if (shift.name === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please enter name"}
                    </p>
                </>
            );
            handleClickOpenerr();
        } else {
            sendRequest();
        }
    };

    //Edit model...
    const [isEditOpen, setIsEditOpen] = useState(false);
    const handleClickOpenEdit = () => {
        setIsEditOpen(true);
    };
    const handleCloseModEdit = (e, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setIsEditOpen(false);
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

    //get single row to edit....
    const getCode = async (e) => {
        let res = await axios.get(`${SERVICE.SHIFT_SINGLE}/${e}`, {});
        setShiftsid(res.data.sshift);
    };

    // get single row to view....
    const getinfoCode = async (e) => {
        let res = await axios.get(`${SERVICE.SHIFT_SINGLE}/${e}`, {});
        setShiftsid(res.data.sshift);
    };

    let updatelist = [];
    updatelist = shiftsid?.updatedby;
    updatelist?.map((item) => {
        console.log(item.name);
        console.log(item.date);
    })

    //shift updateby edit page...
    let updateby = shiftsid.updatedby;
    console.log(shiftsid.updatedby, 'updatedvalue');

    let shiftedid = shiftsid._id;
    //editing the single data....
    const sendEditRequest = async () => {
        try {
            let res = await axios.put(
                `${SERVICE.SHIFT_SINGLE}/${shiftedid}`,
                {
                    name: String(shiftsid.name),
                    fromhour: String(shiftsid.fromhour),
                    tohour: String(shiftsid.tohour),
                    frommin: String(shiftsid.frommin),
                    tomin: String(shiftsid.tomin),
                    fromtime: String(shiftsid.fromtime),
                    totime: String(shiftsid.totime),
                    isallowance: String(shiftsid.isallowance),
                    payhours: Number(shiftsid.payhours),
                    breakhours: Number(shiftsid.breakhours),
                    addedby: String(username),
                    updatedby: [
                        ...updateby, {
                            name: String(username),
                            date: String(new Date()),

                        },
                    ],
                }
            );
            setShiftsid(res.data);
            handleCloseModEdit();
        } catch (err) {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {err.response.data.errorMessage}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
    };
    const editSubmit = (e) => {
        e.preventDefault();
        sendEditRequest();
    };

    // get all shifts
    const fetchShift = async () => {
        try {
            let res_shift = await axios.get(SERVICE.SHIFT, {

            });
            setShifts(res_shift.data.shifts);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages)
        }
    };

    //pdf..
    const columns = [
        { title: "Name", field: "name" },
        { title: "Fromhour", field: "fromhour" },
        { title: "Tohour", field: "tohour" },
        { title: "Frommin", field: "frommin" },
        { title: "Tomin", field: "tomin" },
        { title: "Fromtime", field: "fromtime" },
        { title: "Totime", field: "totime" },
        { title: "Shiftallowance", field: "isallowance" },
        { title: "Payhours", field: "payhours" },
        { title: "Breakhours", field: "breakhours" },
    ]

    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.autoTable({
            theme: "grid",
            columns: columns.map((col) => ({ ...col, dataKey: col.field })),
            body: shifts,
        });
        doc.save("shift.pdf");
    };

    //Excel..
    const fileName = "shifts";

    const [shiftData, setShiftData] = useState([]);
    let excelno = 1;

    //get particular columns for export excel..
    const getexcelDatas = async () => {
        let response = await axios.get(SERVICE.SHIFT, {
            //  headers: {
            //      'Authorization': `Bearer ${auth.APIToken}`
            //  },
        });
        var data = response.data.shifts.map((t) => ({
            Sno: excelno++,
            name: t.name,
            fromhour: t.fromtime,
            tohour: t.totime,
            frommin: t.frommin,
            tomin: t.tomin,
            fromtime: t.fromtime,
            totime: t.totime,
            isallowance: t.isallowance,
            payhours: t.payhours,
            breakhours: t.breakhours,
        }));
        setShiftData(data);
    };

    //print...
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Shift",
        pageStyle: "print",
    });


    //set function to get particular row
    useEffect(() => {
        fetchShift();
        getexcelDatas();
        getusername();
    });

    let shiftLength = shifts.length;
    useEffect(
        () => {
            selectPageHandler();
        }
    );

    const selectPageHandler = (selPage) => {
        if (selPage >= 1 && selPage <= (Math.ceil(shifts.length / (Number(entries)))) && selPage !== pages)
            setPages(selPage)


    }

    let total = 0;

    return (
        <Box>
            {/* ****** Header Content ****** */}
            <Typography sx={userStyle.HeaderText}>Create shift</Typography>
            <Box sx={userStyle.container}>
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography sx={userStyle.importheadtext}>Manage Shift</Typography>
                        </Grid>
                    </Grid><br />
                    <Grid container lg={12} md={12} sm={12} xs={12} spacing={1}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth size="small" >
                                <Typography>Name</Typography>
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={shift.name}
                                    onChange={(e) => { setShift({ ...shift, name: e.target.value }) }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item lg={6} md={6} sx={12}>
                            <Typography>From Time</Typography>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={2}>
                                    <FormControl size="small" fullWidth>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={shift.fromhour}
                                            MenuProps={{
                                                PaperProps: {
                                                  style: {
                                                    maxHeight: 200,
                                                    width: 80,
                                                  },
                                                },
                                              }}
                                            onChange={(e) => { setShift({ ...shift, fromhour: e.target.value }) }}
                                        >
                                            <MenuItem value={"01"}>01</MenuItem>
                                            <MenuItem value={"02"}>02</MenuItem>
                                            <MenuItem value={"03"}>03</MenuItem>
                                            <MenuItem value={"04"}>04</MenuItem>
                                            <MenuItem value={"05"}>05</MenuItem>
                                            <MenuItem value={"06"}>06</MenuItem>
                                            <MenuItem value={"07"}>07</MenuItem>
                                            <MenuItem value={"08"}>08</MenuItem>
                                            <MenuItem value={"09"}>09</MenuItem>
                                            <MenuItem value={"10"}>10</MenuItem>
                                            <MenuItem value={11}>11</MenuItem>
                                            <MenuItem value={12}>12</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={2}>
                                    <FormControl size="small" fullWidth>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={shift.frommin}
                                            MenuProps={{
                                                PaperProps: {
                                                  style: {
                                                    maxHeight: 200,
                                                    width: 80,
                                                  },
                                                },
                                              }}
                                            onChange={(e) => { setShift({ ...shift, frommin: e.target.value }) }}
                                        >
                                            <MenuItem value={"00"}>00</MenuItem>
                                            <MenuItem value={"01"}>01</MenuItem>
                                            <MenuItem value={"02"}>02</MenuItem>
                                            <MenuItem value={"03"}>03</MenuItem>
                                            <MenuItem value={"04"}>04</MenuItem>
                                            <MenuItem value={"05"}>05</MenuItem>
                                            <MenuItem value={"06"}>06</MenuItem>
                                            <MenuItem value={"07"}>07</MenuItem>
                                            <MenuItem value={"08"}>08</MenuItem>
                                            <MenuItem value={"09"}>09</MenuItem>
                                            <MenuItem value={"10"}>10</MenuItem>
                                            <MenuItem value={11}>11</MenuItem>
                                            <MenuItem value={12}>12</MenuItem>
                                            <MenuItem value={13}>13</MenuItem>
                                            <MenuItem value={14}>14</MenuItem>
                                            <MenuItem value={15}>15</MenuItem>
                                            <MenuItem value={16}>16</MenuItem>
                                            <MenuItem value={17}>17</MenuItem>
                                            <MenuItem value={18}>18</MenuItem>
                                            <MenuItem value={19}>19</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                            <MenuItem value={21}>21</MenuItem>
                                            <MenuItem value={22}>22</MenuItem>
                                            <MenuItem value={23}>23</MenuItem>
                                            <MenuItem value={24}>24</MenuItem>
                                            <MenuItem value={25}>25</MenuItem>
                                            <MenuItem value={26}>26</MenuItem>
                                            <MenuItem value={27}>27</MenuItem>
                                            <MenuItem value={28}>28</MenuItem>
                                            <MenuItem value={29}>29</MenuItem>
                                            <MenuItem value={30}>30</MenuItem>
                                            <MenuItem value={31}>31</MenuItem>
                                            <MenuItem value={32}>32</MenuItem>
                                            <MenuItem value={33}>33</MenuItem>
                                            <MenuItem value={34}>34</MenuItem>
                                            <MenuItem value={35}>35</MenuItem>
                                            <MenuItem value={36}>36</MenuItem>
                                            <MenuItem value={37}>37</MenuItem>
                                            <MenuItem value={38}>38</MenuItem>
                                            <MenuItem value={39}>39</MenuItem>
                                            <MenuItem value={40}>40</MenuItem>
                                            <MenuItem value={41}>41</MenuItem>
                                            <MenuItem value={42}>42</MenuItem>
                                            <MenuItem value={43}>43</MenuItem>
                                            <MenuItem value={44}>44</MenuItem>
                                            <MenuItem value={45}>45</MenuItem>
                                            <MenuItem value={46}>46</MenuItem>
                                            <MenuItem value={47}>47</MenuItem>
                                            <MenuItem value={48}>48</MenuItem>
                                            <MenuItem value={49}>49</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                            <MenuItem value={51}>51</MenuItem>
                                            <MenuItem value={52}>52</MenuItem>
                                            <MenuItem value={53}>53</MenuItem>
                                            <MenuItem value={54}>54</MenuItem>
                                            <MenuItem value={55}>55</MenuItem>
                                            <MenuItem value={56}>56</MenuItem>
                                            <MenuItem value={57}>57</MenuItem>
                                            <MenuItem value={58}>58</MenuItem>
                                            <MenuItem value={59}>59</MenuItem>
                                            <MenuItem value={60}>60</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={2}>
                                    <FormControl size="small" fullWidth>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={shift.fromtime}
                                            onChange={(e) => { setShift({ ...shift, fromtime: e.target.value }) }}
                                        >
                                            <MenuItem value={"AM"}>AM</MenuItem>
                                            <MenuItem value={"PM"}>PM</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item lg={6} md={6} sx={12}>
                            <Typography>To Time</Typography>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={2}>
                                    <FormControl size="small" fullWidth>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={shift.tohour}
                                            MenuProps={{
                                                PaperProps: {
                                                  style: {
                                                    maxHeight: 200,
                                                    width: 80,
                                                  },
                                                },
                                              }}
                                            onChange={(e) => { setShift({ ...shift, tohour: e.target.value }) }}
                                        >
                                            <MenuItem value={"01"}>01</MenuItem>
                                            <MenuItem value={"02"}>02</MenuItem>
                                            <MenuItem value={"03"}>03</MenuItem>
                                            <MenuItem value={"04"}>04</MenuItem>
                                            <MenuItem value={"05"}>05</MenuItem>
                                            <MenuItem value={"06"}>06</MenuItem>
                                            <MenuItem value={"07"}>07</MenuItem>
                                            <MenuItem value={"08"}>08</MenuItem>
                                            <MenuItem value={"09"}>09</MenuItem>
                                            <MenuItem value={"10"}>10</MenuItem>
                                            <MenuItem value={11}>11</MenuItem>
                                            <MenuItem value={12}>12</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={2}>
                                    <FormControl size="small" fullWidth>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={shift.tomin}
                                            MenuProps={{
                                                PaperProps: {
                                                  style: {
                                                    maxHeight: 200,
                                                    width: 80,
                                                  },
                                                },
                                              }}
                                            onChange={(e) => { setShift({ ...shift, tomin: e.target.value }) }}
                                        >
                                            <MenuItem value={"00"}>00</MenuItem>
                                            <MenuItem value={"01"}>01</MenuItem>
                                            <MenuItem value={"02"}>02</MenuItem>
                                            <MenuItem value={"03"}>03</MenuItem>
                                            <MenuItem value={"04"}>04</MenuItem>
                                            <MenuItem value={"05"}>05</MenuItem>
                                            <MenuItem value={"06"}>06</MenuItem>
                                            <MenuItem value={"07"}>07</MenuItem>
                                            <MenuItem value={"08"}>08</MenuItem>
                                            <MenuItem value={"09"}>09</MenuItem>
                                            <MenuItem value={"10"}>10</MenuItem>
                                            <MenuItem value={11}>11</MenuItem>
                                            <MenuItem value={12}>12</MenuItem>
                                            <MenuItem value={13}>13</MenuItem>
                                            <MenuItem value={14}>14</MenuItem>
                                            <MenuItem value={15}>15</MenuItem>
                                            <MenuItem value={16}>16</MenuItem>
                                            <MenuItem value={17}>17</MenuItem>
                                            <MenuItem value={18}>18</MenuItem>
                                            <MenuItem value={19}>19</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                            <MenuItem value={21}>21</MenuItem>
                                            <MenuItem value={22}>22</MenuItem>
                                            <MenuItem value={23}>23</MenuItem>
                                            <MenuItem value={24}>24</MenuItem>
                                            <MenuItem value={25}>25</MenuItem>
                                            <MenuItem value={26}>26</MenuItem>
                                            <MenuItem value={27}>27</MenuItem>
                                            <MenuItem value={28}>28</MenuItem>
                                            <MenuItem value={29}>29</MenuItem>
                                            <MenuItem value={30}>30</MenuItem>
                                            <MenuItem value={31}>31</MenuItem>
                                            <MenuItem value={32}>32</MenuItem>
                                            <MenuItem value={33}>33</MenuItem>
                                            <MenuItem value={34}>34</MenuItem>
                                            <MenuItem value={35}>35</MenuItem>
                                            <MenuItem value={36}>36</MenuItem>
                                            <MenuItem value={37}>37</MenuItem>
                                            <MenuItem value={38}>38</MenuItem>
                                            <MenuItem value={39}>39</MenuItem>
                                            <MenuItem value={40}>40</MenuItem>
                                            <MenuItem value={41}>41</MenuItem>
                                            <MenuItem value={42}>42</MenuItem>
                                            <MenuItem value={43}>43</MenuItem>
                                            <MenuItem value={44}>44</MenuItem>
                                            <MenuItem value={45}>45</MenuItem>
                                            <MenuItem value={46}>46</MenuItem>
                                            <MenuItem value={47}>47</MenuItem>
                                            <MenuItem value={48}>48</MenuItem>
                                            <MenuItem value={49}>49</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                            <MenuItem value={51}>51</MenuItem>
                                            <MenuItem value={52}>52</MenuItem>
                                            <MenuItem value={53}>53</MenuItem>
                                            <MenuItem value={54}>54</MenuItem>
                                            <MenuItem value={55}>55</MenuItem>
                                            <MenuItem value={56}>56</MenuItem>
                                            <MenuItem value={57}>57</MenuItem>
                                            <MenuItem value={58}>58</MenuItem>
                                            <MenuItem value={59}>59</MenuItem>
                                            <MenuItem value={60}>60</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={2}>
                                    <FormControl size="small" fullWidth>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={shift.totime}
                                            onChange={(e) => { setShift({ ...shift, totime: e.target.value }) }}
                                        >
                                            <MenuItem value={"AM"}>AM</MenuItem>
                                            <MenuItem value={"PM"}>PM</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item lg={3} md={3} sx={12}>
                            <Typography>Shift Allowance</Typography>
                            <FormControl size="small" fullWidth>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={shift.isallowance}
                                    onChange={(e) => { setShift({ ...shift, isallowance: e.target.value }) }}
                                >
                                    <MenuItem value="Enable">Enable</MenuItem>
                                    <MenuItem value="Disable">Disable</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sx={12}>
                            <Typography>PayHours</Typography>
                            <FormControl fullWidth size="small" >
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={shift.payhours}
                                    onChange={(e) => {
                                        setShift({ ...shift, payhours: e.target.value });
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sx={12}>
                            <FormControl fullWidth size="small" >
                                <Typography>Breakhours</Typography>
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={shift.breakhours}
                                    onChange={(e) => {
                                        setShift({ ...shift, breakhours: e.target.value });
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} lg={2} marginTop={3}>
                        <Button variant="contained"
                            color="primary"
                            sx={{ display: "flex" }}
                            onClick={handleSubmit}
                        >Create New</Button>
                    </Grid>
                </>
            </Box>
            <Box>
                {/* edit model */}
                <Dialog
                    open={isEditOpen}
                    onClose={handleCloseModEdit}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Box sx={userStyle.container}>
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography sx={userStyle.importheadtext}>Manage Shift</Typography>
                                </Grid>
                            </Grid><br />
                            <Grid container lg={12} md={12} sm={12} xs={12} spacing={1}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Name</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={shiftsid.name}
                                            onChange={(e) => { setShiftsid({ ...shiftsid, name: e.target.value }) }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item lg={6} md={6} sx={12}>
                                    <Typography>From Time</Typography>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <FormControl size="small" fullWidth>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={shiftsid.fromhour}
                                                    MenuProps={{
                                                        PaperProps: {
                                                          style: {
                                                            maxHeight: 200,
                                                            width: 80,
                                                          },
                                                        },
                                                      }}
                                                    onChange={(e) => { setShiftsid({ ...shiftsid, fromhour: e.target.value }) }}
                                                >
                                                    <MenuItem value={"01"}>01</MenuItem>
                                                    <MenuItem value={"02"}>02</MenuItem>
                                                    <MenuItem value={"03"}>03</MenuItem>
                                                    <MenuItem value={"04"}>04</MenuItem>
                                                    <MenuItem value={"05"}>05</MenuItem>
                                                    <MenuItem value={"06"}>06</MenuItem>
                                                    <MenuItem value={"07"}>07</MenuItem>
                                                    <MenuItem value={"08"}>08</MenuItem>
                                                    <MenuItem value={"09"}>09</MenuItem>
                                                    <MenuItem value={"10"}>10</MenuItem>
                                                    <MenuItem value={"11"}>11</MenuItem>
                                                    <MenuItem value={"12"}>12</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <FormControl size="small" fullWidth>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={shiftsid.frommin}
                                                    MenuProps={{
                                                        PaperProps: {
                                                          style: {
                                                            maxHeight: 200,
                                                            width: 80,
                                                          },
                                                        },
                                                      }}
                                                    onChange={(e) => { setShiftsid({ ...shiftsid, frommin: e.target.value }) }}
                                                >
                                                    <MenuItem value={"00"}>00</MenuItem>
                                                    <MenuItem value={"01"}>01</MenuItem>
                                                    <MenuItem value={"02"}>02</MenuItem>
                                                    <MenuItem value={"03"}>03</MenuItem>
                                                    <MenuItem value={"04"}>04</MenuItem>
                                                    <MenuItem value={"05"}>05</MenuItem>
                                                    <MenuItem value={"06"}>06</MenuItem>
                                                    <MenuItem value={"07"}>07</MenuItem>
                                                    <MenuItem value={"08"}>08</MenuItem>
                                                    <MenuItem value={"09"}>09</MenuItem>
                                                    <MenuItem value={"10"}>10</MenuItem>
                                                    <MenuItem value={11}>11</MenuItem>
                                                    <MenuItem value={12}>12</MenuItem>
                                                    <MenuItem value={13}>13</MenuItem>
                                                    <MenuItem value={14}>14</MenuItem>
                                                    <MenuItem value={15}>15</MenuItem>
                                                    <MenuItem value={16}>16</MenuItem>
                                                    <MenuItem value={17}>17</MenuItem>
                                                    <MenuItem value={18}>18</MenuItem>
                                                    <MenuItem value={19}>19</MenuItem>
                                                    <MenuItem value={20}>20</MenuItem>
                                                    <MenuItem value={21}>21</MenuItem>
                                                    <MenuItem value={22}>22</MenuItem>
                                                    <MenuItem value={23}>23</MenuItem>
                                                    <MenuItem value={24}>24</MenuItem>
                                                    <MenuItem value={25}>25</MenuItem>
                                                    <MenuItem value={26}>26</MenuItem>
                                                    <MenuItem value={27}>27</MenuItem>
                                                    <MenuItem value={28}>28</MenuItem>
                                                    <MenuItem value={29}>29</MenuItem>
                                                    <MenuItem value={30}>30</MenuItem>
                                                    <MenuItem value={31}>31</MenuItem>
                                                    <MenuItem value={32}>32</MenuItem>
                                                    <MenuItem value={33}>33</MenuItem>
                                                    <MenuItem value={34}>34</MenuItem>
                                                    <MenuItem value={35}>35</MenuItem>
                                                    <MenuItem value={36}>36</MenuItem>
                                                    <MenuItem value={37}>37</MenuItem>
                                                    <MenuItem value={38}>38</MenuItem>
                                                    <MenuItem value={39}>39</MenuItem>
                                                    <MenuItem value={40}>40</MenuItem>
                                                    <MenuItem value={41}>41</MenuItem>
                                                    <MenuItem value={42}>42</MenuItem>
                                                    <MenuItem value={43}>43</MenuItem>
                                                    <MenuItem value={44}>44</MenuItem>
                                                    <MenuItem value={45}>45</MenuItem>
                                                    <MenuItem value={46}>46</MenuItem>
                                                    <MenuItem value={47}>47</MenuItem>
                                                    <MenuItem value={48}>48</MenuItem>
                                                    <MenuItem value={49}>49</MenuItem>
                                                    <MenuItem value={50}>50</MenuItem>
                                                    <MenuItem value={51}>51</MenuItem>
                                                    <MenuItem value={52}>52</MenuItem>
                                                    <MenuItem value={53}>53</MenuItem>
                                                    <MenuItem value={54}>54</MenuItem>
                                                    <MenuItem value={55}>55</MenuItem>
                                                    <MenuItem value={56}>56</MenuItem>
                                                    <MenuItem value={57}>57</MenuItem>
                                                    <MenuItem value={58}>58</MenuItem>
                                                    <MenuItem value={59}>59</MenuItem>
                                                    <MenuItem value={60}>60</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <FormControl size="small" fullWidth>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={shiftsid.fromtime}
                                                    onChange={(e) => { setShiftsid({ ...shiftsid, fromtime: e.target.value }) }}
                                                >
                                                    <MenuItem value={"AM"}>AM</MenuItem>
                                                    <MenuItem value={"PM"}>PM</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item lg={6} md={6} sx={12}>
                                    <Typography>To Time</Typography>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <FormControl size="small" fullWidth>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={shiftsid.tohour}
                                                    MenuProps={{
                                                        PaperProps: {
                                                          style: {
                                                            maxHeight: 200,
                                                            width: 80,
                                                          },
                                                        },
                                                      }}
                                                    onChange={(e) => { setShiftsid({ ...shiftsid, tohour: e.target.value }) }}
                                                >
                                                    <MenuItem value={"00"}>00</MenuItem>
                                                    <MenuItem value={"01"}>01</MenuItem>
                                                    <MenuItem value={"02"}>02</MenuItem>
                                                    <MenuItem value={"03"}>03</MenuItem>
                                                    <MenuItem value={"04"}>04</MenuItem>
                                                    <MenuItem value={"05"}>05</MenuItem>
                                                    <MenuItem value={"06"}>06</MenuItem>
                                                    <MenuItem value={"07"}>07</MenuItem>
                                                    <MenuItem value={"08"}>08</MenuItem>
                                                    <MenuItem value={"09"}>09</MenuItem>
                                                    <MenuItem value={10}>10</MenuItem>
                                                    <MenuItem value={11}>11</MenuItem>
                                                    <MenuItem value={12}>12</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <FormControl size="small" fullWidth>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={shiftsid.tomin}
                                                    MenuProps={{
                                                        PaperProps: {
                                                          style: {
                                                            maxHeight: 200,
                                                            width: 80,
                                                          },
                                                        },
                                                      }}
                                                    onChange={(e) => { setShiftsid({ ...shiftsid, tomin: e.target.value }) }}
                                                >
                                                    <MenuItem value={"00"}>00</MenuItem>
                                                    <MenuItem value={"01"}>01</MenuItem>
                                                    <MenuItem value={"02"}>02</MenuItem>
                                                    <MenuItem value={"03"}>03</MenuItem>
                                                    <MenuItem value={"04"}>04</MenuItem>
                                                    <MenuItem value={"05"}>05</MenuItem>
                                                    <MenuItem value={"06"}>06</MenuItem>
                                                    <MenuItem value={"07"}>07</MenuItem>
                                                    <MenuItem value={"08"}>08</MenuItem>
                                                    <MenuItem value={"09"}>09</MenuItem>
                                                    <MenuItem value={10}>10</MenuItem>
                                                    <MenuItem value={11}>11</MenuItem>
                                                    <MenuItem value={12}>12</MenuItem>
                                                    <MenuItem value={13}>13</MenuItem>
                                                    <MenuItem value={14}>14</MenuItem>
                                                    <MenuItem value={15}>15</MenuItem>
                                                    <MenuItem value={16}>16</MenuItem>
                                                    <MenuItem value={17}>17</MenuItem>
                                                    <MenuItem value={18}>18</MenuItem>
                                                    <MenuItem value={19}>19</MenuItem>
                                                    <MenuItem value={20}>20</MenuItem>
                                                    <MenuItem value={21}>21</MenuItem>
                                                    <MenuItem value={22}>22</MenuItem>
                                                    <MenuItem value={23}>23</MenuItem>
                                                    <MenuItem value={24}>24</MenuItem>
                                                    <MenuItem value={25}>25</MenuItem>
                                                    <MenuItem value={26}>26</MenuItem>
                                                    <MenuItem value={27}>27</MenuItem>
                                                    <MenuItem value={28}>28</MenuItem>
                                                    <MenuItem value={29}>29</MenuItem>
                                                    <MenuItem value={30}>30</MenuItem>
                                                    <MenuItem value={31}>31</MenuItem>
                                                    <MenuItem value={32}>32</MenuItem>
                                                    <MenuItem value={33}>33</MenuItem>
                                                    <MenuItem value={34}>34</MenuItem>
                                                    <MenuItem value={35}>35</MenuItem>
                                                    <MenuItem value={36}>36</MenuItem>
                                                    <MenuItem value={37}>37</MenuItem>
                                                    <MenuItem value={38}>38</MenuItem>
                                                    <MenuItem value={39}>39</MenuItem>
                                                    <MenuItem value={40}>40</MenuItem>
                                                    <MenuItem value={41}>41</MenuItem>
                                                    <MenuItem value={42}>42</MenuItem>
                                                    <MenuItem value={43}>43</MenuItem>
                                                    <MenuItem value={44}>44</MenuItem>
                                                    <MenuItem value={45}>45</MenuItem>
                                                    <MenuItem value={46}>46</MenuItem>
                                                    <MenuItem value={47}>47</MenuItem>
                                                    <MenuItem value={48}>48</MenuItem>
                                                    <MenuItem value={49}>49</MenuItem>
                                                    <MenuItem value={50}>50</MenuItem>
                                                    <MenuItem value={51}>51</MenuItem>
                                                    <MenuItem value={52}>52</MenuItem>
                                                    <MenuItem value={53}>53</MenuItem>
                                                    <MenuItem value={54}>54</MenuItem>
                                                    <MenuItem value={55}>55</MenuItem>
                                                    <MenuItem value={56}>56</MenuItem>
                                                    <MenuItem value={57}>57</MenuItem>
                                                    <MenuItem value={58}>58</MenuItem>
                                                    <MenuItem value={59}>59</MenuItem>
                                                    <MenuItem value={60}>60</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <FormControl size="small" fullWidth>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={shiftsid.totime}
                                                    onChange={(e) => { setShiftsid({ ...shiftsid, totime: e.target.value }) }}
                                                >
                                                    <MenuItem value={"AM"}>AM</MenuItem>
                                                    <MenuItem value={"PM"}>PM</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item lg={3} md={3} sx={12}>
                                    <Typography>Shift Allowance</Typography>
                                    <FormControl size="small" fullWidth>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={shiftsid.isallowance}
                                            onChange={(e) => { setShiftsid({ ...shiftsid, isallowance: e.target.value }) }}
                                        >
                                            <MenuItem value="Enable">Enable</MenuItem>
                                            <MenuItem value="Disable">Disable</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sx={12}>
                                    <Typography>PayHours</Typography>
                                    <FormControl fullWidth size="small" >
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={shiftsid.payhours}
                                            onChange={(e) => {
                                                setShiftsid({ ...shiftsid, payhours: e.target.value });
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sx={12}>
                                    <FormControl fullWidth size="small" >
                                        <Typography>Breakhours</Typography>
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            value={shiftsid.breakhours}
                                            onChange={(e) => {
                                                setShiftsid({ ...shiftsid, breakhours: e.target.value });
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br /> <br />
                            <Grid container spacing={2}>
                                <Grid item md={4} xs={12} sm={12}>
                                    <Button variant="contained" onClick={editSubmit}>  Update</Button>
                                </Grid>
                                <Grid item md={4} xs={12} sm={12}>
                                    <Button sx={userStyle.btncancel} onClick={handleCloseModEdit}> Cancel </Button>
                                </Grid>
                            </Grid>
                        </>
                    </Box>
                </Dialog>
            </Box>
            <br />
            {/* ****** Table Start ****** */}
            <>
                <Box sx={userStyle.container}>
                    { /* ******************************************************EXPORT Buttons****************************************************** */}
                    {/*       
          <Box sx={userStyle.container} > */}
                    <Grid item xs={8}>
                        <Typography sx={userStyle.importheadtext}>Shift List</Typography>
                    </Grid>
                    <Grid container sx={{ justifyContent: "center" }}>
                        <Grid>
                            <ExportCSV csvData={shiftData} fileName={fileName} />

                            <ExportXL csvData={shiftData} fileName={fileName} />

                            <Button sx={userStyle.buttongrp} onClick={handleprint}>
                                &ensp;
                                <FaPrint />
                                &ensp;Print&ensp;
                            </Button>

                            <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}>
                                <FaFilePdf />
                                &ensp;Export to PDF&ensp;
                            </Button>
                        </Grid>
                    </Grid>
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
                                    <MenuItem value={(shifts.length)}>All</MenuItem>
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
                    <br />
                    {/* ****** Table Grid Container ****** */}
                    <Grid container>
                        <Grid md={4} sm={2} xs={1}></Grid>
                        <Grid md={8} sm={10} xs={10} sx={{ align: "center" }}></Grid>
                    </Grid>
                    <br />
                    {/* ****** Table start ****** */}
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 700 }}
                            aria-label="customized table"
                            id="usertable"


                        >
                            <TableHead sx={{ fontWeight: "600" }}>
                                <StyledTableRow>
                                    {/* <StyledTableCell>SI.No</StyledTableCell> */}
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>FromTime</StyledTableCell>
                                    <StyledTableCell>ToTime</StyledTableCell>
                                    <StyledTableCell>PayHours</StyledTableCell>
                                    <StyledTableCell>BreakHours</StyledTableCell>
                                    <StyledTableCell>ShiftAllowance</StyledTableCell>
                                    <StyledTableCell>Action</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody align="left">
                            {filteredData &&
                                    (filteredData.slice((pages * entries - entries < shiftLength ? pages * entries - entries : 0),
                                        ((pages * entries - entries <= shiftLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                                            <StyledTableRow key={index}>
                                                {/* <StyledTableCell>{total = ((pages * entries - entries + index + 1))}</StyledTableCell> */}
                                            <StyledTableCell>{row.name}</StyledTableCell>
                                            <StyledTableCell>{row.fromhour + ":" + row.frommin + "" + row.fromtime}</StyledTableCell>
                                            <StyledTableCell>{row.tohour + ":" + row.tomin + "" + row.totime}</StyledTableCell>
                                            <StyledTableCell>{row.payhours}</StyledTableCell>
                                            <StyledTableCell>{row.breakhours}</StyledTableCell>
                                            <StyledTableCell>{row.isallowance}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row" colSpan={1}>
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
                                                            style={{ fontsize: "large" }}
                                                        />
                                                    </Button>
                                                    <Button
                                                        sx={userStyle.buttonedit}
                                                        onClick={() => {
                                                            handleClickOpenview();
                                                            getCode(row._id);
                                                        }}
                                                    > <VisibilityOutlinedIcon style={{ fontsize: "large" }} />
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
                                {(pages * entries - entries <= shiftLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                                {/* {(pages * entries - entries + 1)}  */}
                                to {(pages * entries) > shifts.length ? shifts.length : ((pages * entries))} of {shifts.length} entries</Typography>  </Box>
                        <Box>
                            {shifts && <Typography className="Pagination">
                                <Button sx={userStyle.paginationbtn} onClick={() => { selectPageHandler(pages - 1) }}>prev</Button>

                                {[...Array(Math.ceil(shifts.length / Number(entries)))].map((_, i) => {
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
                            onClick={(e) => delShift(shiftsid)}
                        >
                            {" "}
                            OK{" "}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* print layout */}
                <TableContainer component={Paper} sx={userStyle.printcls}>
                    <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                        id="usertable"
                        ref={componentRef}

                    >
                        <TableHead sx={{ fontWeight: "600" }}>
                            <StyledTableRow>
                                <StyledTableCell>SI.No</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>FromTime</StyledTableCell>
                                <StyledTableCell>ToTime</StyledTableCell>
                                <StyledTableCell>PayHours</StyledTableCell>
                                <StyledTableCell>BreakHours</StyledTableCell>
                                <StyledTableCell>ShiftAllowance</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {shifts &&
                                shifts.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{printsno++}</StyledTableCell>
                                        <StyledTableCell>{row.name}</StyledTableCell>

                                        <StyledTableCell>{row.fromhour + ":" + row.frommin + "" + row.fromtime}</StyledTableCell>
                                        <StyledTableCell>{row.tohour + ":" + row.tomin + "" + row.totime}</StyledTableCell>
                                        <StyledTableCell>{row.payhours}</StyledTableCell>
                                        <StyledTableCell>{row.breakhours}</StyledTableCell>
                                        <StyledTableCell>{row.isallowance}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
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
            >
                <Box sx={{ width: "550px", padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.importheadtext}>View Shift Details</Typography>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small" >
                                    <Typography variant="h6">Name</Typography>
                                    <Typography>{shiftsid.name}</Typography>
                                </FormControl>
                            </Grid>

                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl size="small" fullWidth>
                                    <Typography variant="h6"> FromTime</Typography>
                                    <Typography>{shiftsid.fromhour + ":" + shiftsid.frommin + "" + shiftsid.fromtime}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sx={12}>
                                <FormControl size="small" fullWidth>
                                    <Typography variant="h6">To Time</Typography>
                                    <Typography>{shiftsid.tohour + ":" + shiftsid.tomin + "" + shiftsid.totime}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sx={12}>
                                <FormControl size="small" fullWidth>
                                    <Typography variant="h6">Shift Allowance</Typography>
                                    <Typography>{shiftsid.isallowance}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sx={12}>
                                <FormControl fullWidth size="small" >
                                    <Typography variant="h6">PayHours</Typography>
                                    <Typography>{shiftsid.payhours}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sx={12}>
                                <FormControl fullWidth size="small" >
                                    <Typography variant="h6">Breakhours</Typography>
                                    <Typography>{shiftsid.breakhours}</Typography>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br /> <br /> <br /> <br />
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

            {/* ALERT DIALOG */}
            <Box>
                <Dialog
                    open={isErrorOpen}
                    onClose={handleCloseerr}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent
                        sx={{ width: "350px", textAlign: "center", alignItems: "center" }}
                    >
                        {/* <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} /> */}
                        <Typography variant="h6">{showAlert}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="error" onClick={handleCloseerr}>
                            ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}

export default ShiftDetails;