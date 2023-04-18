import React, { useState } from "react";
import { PDFDocument, StandardFonts, pageNumber } from "pdf-lib";
// import FileSaver from "file-saver";
// import { saveAs } from 'file-saver';
import * as XLSX from "xlsx"; // Importing XLSX library
// import * as Docxtemplater from 'docxtemplater';
// import * as JSZip from 'jszip';
// // import { Document, TextRun } from "docx";
// import * as docx from 'docx';
// import pdfjsLib from 'pdfjs-dist';
// import * as fs from 'fs';
// import * as path from 'path';
// import {  Document as DocxDocument,  Paragraph, TextRun } from 'docx';
// // import { PDFDocument } from 'pdf-lib';
// import { Document, Packer } from 'docx';

function DocumentUploader() {
  const [files, setFiles] = useState([]);

  const handleFileChange = async (event) => {
    const newFiles = [...files];
    const fileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const dataUrl = await readFileAsDataUrl(file);
      newFiles.push({ name: file.name, dataUrl: dataUrl, type: file.type });
    }
    setFiles(newFiles);
  };


  const handleDownloadAll = async () => {
    const pdfDoc = await PDFDocument.create();
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    for (let i = 0; i < files.length; i++) {
      const page = pdfDoc.addPage();
      const file = files[i];
      if (isImage(file.name)) {
        if (file.type === "image/jpg" || file.type === "image/jpeg") {
          const image = await pdfDoc.embedJpg(file.dataUrl);
          const imageSize = image.scale(0.5);
          page.drawImage(image, {
            x: 50,
            y: 400,
            width: imageSize.width,
            height: imageSize.height,
          });
        } else {
          console.log(`${file.name} is not a PNG, JPG, or JPEG file.`);
        }
      }
      else if (isImages(file.name)) {
        if (file.type === "image/png") {
          const image = await pdfDoc.embedPng(file.dataUrl);
          const imageSize = image.scale(0.5);
          page.drawImage(image, {
            x: 50,
            y: 400,
            width: imageSize.width,
            height: imageSize.height,
          });
        } else {
          console.log(`${file.name} is not a PNG, JPG, or JPEG file.`);
        }
      }
      else if (isPdf(file.name)) {
        const pdfBytes = await fetch(file.dataUrl).then((res) => res.arrayBuffer());
        const pdfDocToMerge = await PDFDocument.load(pdfBytes);
        const copiedPages = await pdfDoc.copyPages(pdfDocToMerge, pdfDocToMerge.getPageIndices());
        copiedPages.forEach((copiedPage) => pdfDoc.addPage(copiedPage));
      }
   
      else if (isTxt(file.name)) {
        const text = await fetch(file.dataUrl).then((res) => res.text());
        const lines = text.split('\n');
        lines.forEach((line, index) => {
          page.drawText(line, { x: 50, y: 750 - index * 20, font: helveticaFont, size: 12 });
        });
      }

      else if (isExcel(file.name)) {
        const excelBytes = await fetch(file.dataUrl).then((res) => res.arrayBuffer());
        const workbook = XLSX.read(excelBytes, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        sheetData.forEach((row, rowIndex) => {
          row.forEach((cellValue, colIndex) => {
            const text = `${cellValue}`;
            page.drawText(text, { x: colIndex * 80, y: 750 - rowIndex * 20, font: helveticaFont, size: 6 });
          });
        });
      }
      else {
        console.log(`${file.name} is not a supported file type.`);
      }
    }


    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const readFileAsDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const isImages = (fileName) => {
    return /\.png$/i.test(fileName);
  };

  const isImage = (fileName) => {
    return /\.jpeg$|\.jpg$/i.test(fileName);
  };

  const isPdf = (fileName) => {
    return /\.pdf$/i.test(fileName);
  };

  const isExcel = (fileName) => {
    return /\.xlsx?$/i.test(fileName);
  };

  // const isDocx = (fileName) => {
  //   return /\.(doc|docx)$/i.test(fileName);
  // };
// function isDoc(fileName) {
//   return /\.doc$/i.test(fileName);
// }

// function isDocx(fileName) {
//   return /\.docx$/i.test(fileName);
// }

  function isTxt(fileName) {
    return /\.txt$/.test(fileName);
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple accept=".pdf,.xls,.xlsx,.png,.jpg,.jpeg,.doc,.docx" />
      <button onClick={handleDownloadAll}>download All</button>
    </div>
  );
}
export default DocumentUploader;

