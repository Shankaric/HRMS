import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, Select,MenuItem,Dialog, TableBody, DialogContent, DialogActions, FormControl, Grid, Paper, Table, TableHead, TableContainer, Button } from "@mui/material";
import { userStyle } from "../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { SERVICE } from '../../services/Baseservice';
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ExportXL, ExportCSV } from "../../components/Export";
import {StyledTableRow, StyledTableCell} from "../../components/Table";
import { useReactToPrint } from "react-to-print";
import moment from 'moment-timezone';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import $ from "jquery";


const Exceltable = () => {
  const [excels, setExcels] = useState([]);
  const [excelData, setExcelData] = useState([]);


// get all branches
const fetchExcel = async () => {
  try {
    let res_branch = await axios.get('http://192.168.85.8:7001/api/excels', {
  
    });
    setExcels(res_branch.data.excel[0].exceldata);
  } catch (err) {
    const messages = err.response.data.message;
    console.log(messages)
  }
}

console.log(excels,"ex")

let sno = 1;

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
                     [1,5,10, 25, 50, 100, 200, 500, -1],
                     [1,5,10, 25, 50, 100, 200, 500, 'All'],
                 ],
             });
         }, 1000);
     });
 })

  //  PDF
  const columns = [
    // { title: "SNO", field: "sno" },
    { title: "Customer", field: "customer" },
    { title: "Process", field: "process" },
    { title: "Count", field: 'count', },
    { title: "Tat Expiration", field: 'tat' },
    { title: "Created", field: 'created' },
    // { title: "Unit", field: 'unit' },
    // { title: "Team", field: 'team' },
  ]

 
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: excels,
    });
    doc.save("exceldata.pdf");
  };

  // Excel
  const fileName = "excels";

  let excelno=1;
 
  // get particular columns for export excel
  const getexcelDatas = async () => {

    var data = excels.map(t => ({
      SNo:excelno++,customer: t.customer, process: t.process,
      count: t.count, tat_expiration: t.tat, created: t.created
      // unit: t.unit,team: t. team
    }));
    setExcelData(data);
  }

    //print...
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Excel',
    pageStyle: 'print'
  });

useEffect(() => {
  fetchExcel();
},[])

useEffect(() => {
  getexcelDatas();
})
return(
  <>

<Box sx={userStyle.container}>
          <Typography sx={userStyle.SubHeaderText}>  Excel Data List </Typography>
          <br /><br />
          { /* ****** Header Buttons ****** */}
          <Grid container sx={{ justifyContent: "center" }} >
            <Grid >
              
              <ExportCSV csvData={excelData} fileName={fileName} />
              
              <ExportXL csvData={excelData} fileName={fileName} />
             
              <Button sx={userStyle.buttongrp} onClick={handleprint}>&ensp;<FaPrint />&ensp;Print&ensp;</Button>
             
              <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
            
            </Grid>
          </Grid><br />
 {/* ****** Table start ****** */}
 <TableContainer component={Paper} >
            <Table
              aria-label="simple table"
              id="excel"
          ref={tableRef}
            >
              <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                  <StyledTableCell>S NO</StyledTableCell>
                  <StyledTableCell>Customer </StyledTableCell>
                  <StyledTableCell>Process </StyledTableCell>
                  <StyledTableCell>Count</StyledTableCell>
                  <StyledTableCell>Tat Expiration</StyledTableCell>
                  <StyledTableCell>Created</StyledTableCell>
                  <StyledTableCell>Unit</StyledTableCell>
                  <StyledTableCell>Team</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
              {excels &&
                (excels.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{sno++}</StyledTableCell>
                    <StyledTableCell>{row.customer} </StyledTableCell>
                    <StyledTableCell>{row.process}</StyledTableCell>
                    <StyledTableCell>{row.count}</StyledTableCell>
                    <StyledTableCell>{row.tat} </StyledTableCell>
                    <StyledTableCell>{row.created}</StyledTableCell>
                    <StyledTableCell>{""} </StyledTableCell>
                    <StyledTableCell>{""}</StyledTableCell>
                  </StyledTableRow>
              
                )))}
                  </TableBody>
            </Table>
          </TableContainer>
          {/* ****** Table End ****** */}
          </Box>

{/* print layout */}
{/* ****** Table start ****** */}
<TableContainer component={Paper} sx={userStyle.printcls} >
            <Table
              aria-label="simple table"
              id="excel"
              ref={componentRef}
            >
              <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                  <StyledTableCell>S NO</StyledTableCell>
                  <StyledTableCell>Customer </StyledTableCell>
                  <StyledTableCell>Process </StyledTableCell>
                  <StyledTableCell>Count</StyledTableCell>
                  <StyledTableCell>Tat Expiration</StyledTableCell>
                  <StyledTableCell>Created</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
              {excels &&
                (excels.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{sno++}</StyledTableCell>
                    <StyledTableCell>{row.customer} </StyledTableCell>
                    <StyledTableCell>{row.process}</StyledTableCell>
                    <StyledTableCell>{row.count}</StyledTableCell>
                    <StyledTableCell>{row.tat} </StyledTableCell>
                    <StyledTableCell>{row.created}</StyledTableCell>
                  </StyledTableRow>
                )))}
                  </TableBody>
            </Table>
          </TableContainer>
          {/* Table End */}

          </>
);
}
export default Exceltable;

