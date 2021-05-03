// import Excel from "@grapecity/spread-excelio";
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react';
// import { saveAs } from 'file-saver';

// const objectToArray = (dataObject) => {
//     return Object.keys(dataObject).map(idx => dataObject[idx]);
// }

// const extractColumns = (columnsObject) => {
//     const columns = objectToArray(columnsObject);
//     const columnNames = columns.map(obj => columnMappings[obj.value]);
//     return columnNames;
// }

// export const extractSheetData = (excelData) => {
//     const rawData = JSON.parse(JSON.stringify(excelData));
//     const sheet = rawData.sheets[Object.keys(rawData.sheets)[rawData.activeSheetIndex]];
//     const data = objectToArray(sheet.data.dataTable);
//     // since we're expecting column names as a frozen first row, let's extract them
//     // and map them back to our data property names so we'll be able to reflect the new
//     // data back to the Vuex store.
//     //console.dir(columnObject);
//     const columnNames = extractColumns(data.shift());
//     const newSheetData = [];

//     for (const row of data) {
//         const rowData = {};
//         const rowArray = objectToArray(row);
//         rowArray.forEach((val, idx) => {
//             rowData[columnNames[idx]] = val.value;
//         });
//         newSheetData.push(rowData);
//     }

//     return newSheetData;
// }

import './App.css';

function handleFileImported(newSales) {
    // setSales(newSales.slice(0));
    console.log(newSales.rows)
}

const defaultLabel = 'Drop the files here...';
const defaultLabel2 = `Drag 'n' drop some files here, or click to select files`;
export function ExcelPage({ labelDragging = defaultLabel, label = defaultLabel2 }) {
    function fileChange(e) {
        let fileObj = e?.target?.files[0] || e[0];

        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                handleFileImported({
                    cols: resp.cols,
                    rows: resp.rows
                });
            }
        });
        // if (_spread) {
        //     const fileDom = e.target || e.srcElement;
        //     const excelIO = new Excel.IO();
        //     const spread = _spread;
        //     const deserializationOptions = {
        //         frozenRowsAsColumnHeaders: true
        //     };
        //     excelIO.open(fileDom.files[0], (data) => {
        //         const newSalesData = extractSheetData(data);
        //         handleFileImported(newSalesData);
        //     });
        // }
    }

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length) {
            fileChange(acceptedFiles)
        }
    }, []);
    const { fileRejections, isDragActive, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.ods,.xls,.xlsx'
    });

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    return (
        <div className="container" {...getRootProps()}>
            <div className="dropzone">
                <input className="uploader" {...getInputProps()} />
                {
                    isDragActive ?
                        <p>{labelDragging}</p> :
                        <p>{label}</p>
                }
            </div>

            <ul>{ fileRejectionItems }</ul>
        </div>
        // <input type="file" className="fileSelect" 
        //       onChange={(e) => fileChange(e)} />
    );
}