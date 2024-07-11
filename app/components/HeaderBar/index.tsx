import { useState } from "react";
import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Cabin } from '@next/font/google'

const cabin = Cabin({
    weight: '400',
    subsets: ['latin-ext']
})

interface headerBarProps {
    columnFilters: any;
    setColumnFilters: any;
    filterSearchParam: any;
    pdfId: string;
    dateFilter: any;
    setDateFilter: any;
    ipcOpener: string;
    showAddButton: boolean;
    accType: string;
    setPayOpsId: (id: any) => void;
    payOpsId: any;
}

const CustomInput = ({ value, onClick, setDateFilter }: any) => (
    <button className="btn btn-default btn-large pull-right mx-1" onClick={onClick}>
        {
            value ?
                <span className="icon icon-cancel mr-2" onClick={() => setDateFilter(null)}></span> :
                <span className="icon icon-calendar mr-2"></span>
        }
        {value || 'Select a date'}
    </button>
);


export default function HeaderBar({
    columnFilters,
    setColumnFilters,
    filterSearchParam,
    pdfId,
    dateFilter,
    setDateFilter,
    ipcOpener,
    showAddButton,
    accType,
    setPayOpsId,
    payOpsId
}: headerBarProps) {
    const [active, setActive] = useState('home');

    const generatePdf = (id: string) => {
        const input = document.getElementById(id);
        if (input) {
            html2canvas(input, { scale: 2 })
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF({
                        orientation: 'landscape',
                        unit: 'pt',
                        format: 'a7'
                    });

                    // Calculate dimensions for the image to fit into the PDF
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 0, 50, pdfWidth, pdfHeight);
                    const pdfOutput = pdf.output('blob');
                    const pdfUrl = URL.createObjectURL(pdfOutput);
                    window.open(pdfUrl);

                });
        }
    }

    const name = columnFilters.find((filter: any) => filter.id === filterSearchParam)?.value || '';

    const onFilterChange = (id: string, value: string) => setColumnFilters(
        (prev: any) => prev.filter((f: any) => f.id !== id).concat({ id, value })
    )


    return (
        <header className="toolbar toolbar-header pt-12 pb-2">
            <div className="toolbar-actions">
                <div className="ml-2 flex items-center">
                    {
                        accType === 'CHILD' ? (
                            <p className={`pull-left text-[2rem] ${cabin.className}`}>Calculus Plus</p>
                        ) : (
                            <p className={`pull-left text-[2rem] ${cabin.className}`}>Calculus Minus</p>
                        )
                    }                
                </div>
                {/* <button className="btn btn-default btn-large pull-right">
                    <span className="icon icon-hourglass icon-text"></span>
                    Filters
                </button> */}
                <div className="pull-right h-8 mx-1 mr-5 px-2 rounded-[5px] w-64 focus:outline-none focus:ring-none focus:border-none flex items-center justify-between bg-white gap-2">
                    <span className="icon icon-search"></span>
                    <input
                        type="text"
                        className="focus:outline-none focus:ring-none focus:border-none w-full"
                        placeholder="Search"
                        value={name}
                        onChange={(e) => onFilterChange(filterSearchParam, e.target.value)}
                    />
                </div>
                <div className="pull-right">
                    <DatePicker
                        selected={dateFilter}
                        onChange={(date: any) => setDateFilter(date)}
                        customInput={<CustomInput setDateFilter={setDateFilter} />}
                        dateFormat={"dd/MM/yyyy"}
                    />
                </div>
                {
                    showAddButton && (
                        <button className="btn btn-default btn-add pull-right btn-large" onClick={() => {
                            console.log(ipcOpener);
                            switch (ipcOpener) {
                                case 'open-market':
                                    window.electron.openMarketWindow();
                                    break;
                                case 'open-billing':
                                    window.electron.openBillingWindow(accType);
                                    break;
                                case 'open-purchases':
                                    window.electron.openPurchasesWindow(accType);
                                    break;
                                case 'open-sales':
                                    window.electron.openSalesWindow();
                                    break;
                                case 'open-stock':
                                    window.electron.openStockWindow();
                                    break;
                                case 'open-payops':
                                    window.electron.openAddPaymentOversightWindow();
                                case 'open-paytracker':
                                    window.electron.openAddPaymentTrackerWindow(payOpsId);
                                default:
                                    break;
                            }
                        }}>
                            <span className="icon icon-plus icon-text"></span>
                            Add New
                        </button>
                    )
                }
            </div>
        </header>
    )
}