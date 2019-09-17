import React from 'react';
import './App.css';
import { saveAs } from "file-saver";


function App() {
  const sampleData = [
    { address: '10 bridge street,2000', weight: '2kg', quantity: 2, size: 'XL', color: 'red' },
    { address: '10 bridge street,2000', weight: '2kg', quantity: 2, size: 'XL', color: 'red' },
    { address: '10 bridge street,2000', weight: '2kg', quantity: 2, size: 'XL', color: 'red' },
    { address: '10 bridge street,2000', weight: '2kg', quantity: 2, size: 'XL', color: 'red' },
    { address: '10 bridge street,2000', weight: '2kg', quantity: 2, size: 'XL', color: 'red' },
    { address: '10 bridge street,2000', weight: '2kg', quantity: 2, size: 'XL', color: 'red' },
    { address: '10 bridge street,2000', weight: '2kg', quantity: 2, size: 'XL', color: 'red' },
  ];
  const sampleFields = {
    address: "Address",
    weight: "Weight",
    quantity: "Qty",
    size: "SIZE(s~xl)",
    color: "Color",
  };


  const saveExcel = (template) => {

    let xlsData = `<table><thead><tr>`;




    Object.keys(template).forEach((key) => {
      xlsData = `${xlsData}<td>${template[key]}</td>`;
    })

    xlsData = `${xlsData}</tr></thead>`;

    const exportData = sampleData.map(ele => {
      let exportDataItem = {};

      Object.keys(template).forEach((key) => {
        exportDataItem[key] = ele[key];
      });

      return exportDataItem;
    });

    exportData.forEach(row => {
      xlsData = `${xlsData}<tr>`;

      Object.keys(row).forEach(key => {
        xlsData = `${xlsData}<td>${row[key]}</td>`
      })

      xlsData = `${xlsData}</tr>`;
    });


    xlsData = `${xlsData}</table>`;


    const blob = new Blob(
      [xlsData],
      {
        type: "application/vnd.ms-excel"
      }
    );

    saveAs(blob, ['download' + "." + 'xls']);
  }


  return (
    <div className="ui container" style={{ marginTop: '3rem' }}>
      <table className="ui celled table">
        <thead>
          <tr>
            {Object.keys(sampleFields).map((key) => {
              return <th key={`th-${key}`}>
                {sampleFields[key]}
              </th>
            })}
          </tr>
        </thead>
        <tbody>
          {sampleData.map((x, xId) => {
            const { address, weight, quantity, size, color } = x;
            return <tr key={`tbody-row-${xId}`}>
              <td>{address}</td>
              <td>{weight}</td>
              <td>{quantity}</td>
              <td>{size}</td>
              <td>{color}</td>
            </tr>
          })}
        </tbody>
      </table>
      <div className={`ui container`}>
        <button
          className={`ui primary basic button`}
          onClick={(e) => { e.preventDefault(); saveExcel(templateOne) }}

        >down load using templateOne</button>
        <button
          className={`ui secondary basic button`}
          onClick={(e) => { e.preventDefault(); saveExcel(templateTwo) }}
        >down load using templateTwo</button>
        <button
          className={`ui positive basic button`}
          onClick={(e) => { e.preventDefault(); saveExcel(templateThree) }}
        >down load using templateThree</button>
      </div>

    </div>
  );
}

export default App;


const templateOne = { address: 'address', weight: 'weight', quantity: 'quantity' };
const templateTwo = { address: '地址', weight: '重量', quantity: '数量', size: '型号' };
const templateThree = { address: 'addr', weight: 'KG', quantity: 'QTY', color: 'COLOR' };