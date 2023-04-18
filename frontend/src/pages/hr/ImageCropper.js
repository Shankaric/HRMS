import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@mui/material";
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import {  useNavigate } from 'react-router-dom';


const ExcelSheet = () => {
  const [data, setData] = useState([]);
  const hotElementRef = useRef(null);
  const hotInstanceRef = useRef(null);

  const backPage = useNavigate();


  useEffect(() => {
    const hotElement = hotElementRef.current;
    const hotInstance = new Handsontable(hotElement, {
      data:[[]],
      minRows: 20,
      minCols: 20,
      colHeaders: [],
      rowHeaders: true,
      columnSorting: true,
      filters: true,
      formulas: true,
      dropdownMenu: true,
      contextMenu: true,
      copyPaste: true,
      sorting: true,
      multiColumnSorting: true,
    });
    hotInstanceRef.current = hotInstance;

    return () => {
      hotInstance.destroy();
    }
  }, []);

  const handleSubmit = async () => {
    const updatedData = hotInstanceRef.current.getData();
    const filteredRows = updatedData.filter(row => row.some(cell => cell !== null && cell !== ''));
    const filteredCols = [];
  
    for (let col = 0; col < updatedData[0].length; col++) {
      const columnData = filteredRows.map(row => row[col]);
      if (columnData.some(cell => cell !== null && cell !== '')) {
        filteredCols.push(columnData);
      }
    }
  
    const filteredData = filteredCols.length > 0 ? filteredCols[0].map((_, i) => filteredCols.map(row => row[i])) : [];
  
    // console.log(filteredData);
    const newArray = filteredData.map((item, index) => {
      return Object.entries(item).reduce((acc, [key, value]) => {
        if (key === "1") {
          acc.customer = value;
        } else if (key === "2") {
          acc.process = value;
        } 
        else if (key === "3") {
          acc.count = value;
        } else if (key === "4") {
          acc.tat = value;
        }else if (key === "5") {
          acc.created = value;
        } 
         else {
          acc.id = parseInt(value);
        }
        return acc;
      }, {});
    });
    
    try {
      let branches = await axios.put(`http://192.168.85.8:7001/api/excel/642d43f172234a6588daa41c`, {
        exceldata: (newArray),
      })
    
      backPage('/todo');
    } catch (error) {
    }
  };

  // const handleAddRow = () => {
  //   setData(data => [...data, ['', '', '']]);
  // }

  return (
    <div>
            <Button variant="contained" color="success" type="button" onClick={handleSubmit}>Submit</Button>
            <br />
      <div ref={hotElementRef} />
      {/* <button onClick={handleAddRow}>Add Row</button> */}
    </div>
  );
};

export default ExcelSheet;