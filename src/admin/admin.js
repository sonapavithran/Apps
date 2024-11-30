import React, { useState } from 'react';
import './admin.css';
import production from '../image/product.png';
import packing from '../image/packing.jpg';
import ongoing from '../image/dispatch.jpg';
import delivered from '../image/delivered.jpg';
import logo from '../logos/mecwinlogo.png';
import download from '../image/download.jpg';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

function Admin() {
    // Sample data for the table
    const initialTableData = [
        { id: 1, productName: 'Product A', address: '123 Main St', packedDate: '2024-11-01', dispatchedDate: '2024-11-05' },
        { id: 2, productName: 'Product B', address: '456 Elm St', packedDate: '2024-11-02', dispatchedDate: '2024-11-06' },
        { id: 3, productName: 'Product C', address: '789 Maple Ave', packedDate: '2024-11-03', dispatchedDate: '2024-11-07' },
        { id: 4, productName: 'Product D', address: '567 Maple Ping', packedDate: '2024-11-03', dispatchedDate: '2024-11-07' },
        { id: 5, productName: 'Product E', address: '908 E FR', packedDate: '2024-11-03', dispatchedDate: '2024-11-07' },
        { id: 6, productName: 'Product F', address: '785 Maple', packedDate: '2024-11-03', dispatchedDate: '2024-11-07' },
        { id: 7, productName: 'Product G', address: '889 P With', packedDate: '2024-11-03', dispatchedDate: '2024-11-07' },
        { id: 8, productName: 'Product H', address: '889 P Warh', packedDate: '2024-11-03', dispatchedDate: '2024-11-07' },
    ];

    // Set default state to "Production" with "black" color
    const [statusFilter, setStatusFilter] = useState('Production');
    const [statusColor, setStatusColor] = useState('black');
    const [selectedRows, setSelectedRows] = useState([]);
    const [showDownloadOptions, setShowDownloadOptions] = useState(false);

    // Function to update the status filter and display it in the table
    const updateStatus = (status, color) => {
        setStatusFilter(status);
        setStatusColor(color);
    };

    const toggleDownloadOptions = () => {
        setShowDownloadOptions(!showDownloadOptions);
    };

    // Function to handle individual row selection
    const handleCheckboxChange = (id) => {
        setSelectedRows(prevSelectedRows =>
            prevSelectedRows.includes(id)
                ? prevSelectedRows.filter(rowId => rowId !== id) // Deselect if already selected
                : [...prevSelectedRows, id] // Select if not already selected
        );
    };

    // Function to handle "Select All" checkbox
    const handleSelectAll = (event) => {
        if (event.target.checked) {
            // Select all rows
            const allRowIds = initialTableData.map(item => item.id);
            setSelectedRows(allRowIds);
        } else {
            // Deselect all rows
            setSelectedRows([]);
        }
    };

    const downloadAsPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(14);
        doc.text('Selected Orders', 10, 10);

        const selectedData = initialTableData.filter((item) => selectedRows.includes(item.id));
        let y = 20;
        selectedData.forEach((item, index) => {
            doc.text(`Order ${index + 1}`, 10, y);
            doc.text(`Product: ${item.productName}`, 10, y + 10);
            doc.text(`Address: ${item.address}`, 10, y + 20);
            doc.text(`Packed Date: ${item.packedDate}`, 10, y + 30);
            doc.text(`Dispatched Date: ${item.dispatchedDate}`, 10, y + 40);
            y += 50; // Move down for the next order
        });

        // Save the generated PDF
        doc.save('Selected_Orders.pdf');
    };

    // Function to handle download as Excel
    const downloadAsExcel = () => {
        const selectedData = initialTableData.filter((item) => selectedRows.includes(item.id));
        const worksheet = XLSX.utils.json_to_sheet(selectedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Orders');

        // Save the generated Excel file
        XLSX.writeFile(workbook, 'Selected_Orders.xlsx');
    };

    const handleDownload = (type) => {
        if (selectedRows.length === 0) {
            alert("Please select at least one row to download.");
            return;
        } else {
            if (type === 'PDF') {
                downloadAsPDF();
            } else if (type === 'Excel') {
                downloadAsExcel();
            }
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <img src={logo} alt="Logo" className="logos" />
                <h1 className="header-title"></h1>
            </header>
            <h1>Admin Dashboard</h1>

            <div className="dashboard-buttons">
                <div className="status-div-button" onClick={() => updateStatus('Production', 'black')}>
                    <span>Production</span>
                    <img src={production} alt="Production" className="button-icon" />
                </div>
                <div className="status-div-button" onClick={() => updateStatus('Packing', 'blue')}>
                    <span>Packing</span>
                    <img src={packing} alt="Packing" className="button-icon" />
                </div>
                <div className="status-div-button" onClick={() => updateStatus('Dispatched', 'green')}>
                    <span>Dispatched</span>
                    <img src={ongoing} alt="Dispatched" className="button-icon" />
                </div>
                <div className="status-div-button" onClick={() => updateStatus('Delivered', 'red')}>
                    <span>Delivered</span>
                    <img src={delivered} alt="Delivered" className="button-icon" />
                </div>
            </div>

            <div className="order-details-container">
                <div className="order-details-left">
                    <h2>Order Details</h2>
                </div>

                {/* Download Options on the Right Side */}
                <div className="order-details-right">
                    <button className="download-button" onClick={toggleDownloadOptions}>
                        <img src={download} alt="Download Icon" className="button-icon" />
                    </button>

                    {showDownloadOptions && (
                        <div className="download-options">
                            <button onClick={() => handleDownload("PDF")}>Download as PDF</button>
                            <button onClick={() => handleDownload("Excel")}>Download as Excel</button>
                        </div>
                    )}
                </div>
            

            <div className="order-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedRows.length === initialTableData.length}
                                />
                            </th>
                            <th>Product Name</th>
                            <th>Address</th>
                            <th>Packed Date</th>
                            <th>Dispatched Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialTableData.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}
                                    />
                                </td>
                                <td>{item.productName}</td>
                                <td>{item.address}</td>
                                <td>{item.packedDate}</td>
                                <td>{item.dispatchedDate}</td>
                                <td>
                                    <button
                                        className="status-button"
                                        style={{ backgroundColor: statusColor }}
                                    >
                                        {statusFilter}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}

export default Admin;
