import React from "react";
import Table from "@/components/Table";
import { BILLING_DATA } from "@/db/Data";
import useScanDetection from "use-scan-detection";
import { useData } from "@/context";
import RightSideNavBar from "@/components/SideNavBar/RightSideNavBar";

interface BillingProps {
    setIpcOpener?: any;
    setShowAddButton?: (value: boolean) => void;
    accType: string;
    dateFilter: any;
    columnFilters: any;
    setFilterSearchParam: (value: string) => void;
}

interface printTableDataProps {
    tableHeader: string[];
    tableBody: any[];
    tableFooter: string[];
    
}

const Billing = ({
    setIpcOpener,
    setShowAddButton,
    accType,
    dateFilter,
    columnFilters,
    setFilterSearchParam
}: BillingProps) => {

    let tableHeaders = [];
    let tableBody = [];
    let tableFooter = [];

    React.useEffect(() => {
        if (typeof setIpcOpener === 'function') {
            setIpcOpener("open-billing");
        } else {
            console.error("setIpcOpener is not a function");
        }
    }, [setIpcOpener]);


    React.useEffect(() => {
        if (typeof setShowAddButton === 'function') {
            setShowAddButton(true);
        } else {
            console.error("setShowAddButton is not a function");
        }
        setFilterSearchParam("ENTERPRISE");
    }, []);

    const [billingData, setBillingData] = React.useState([]);

    function fetchBillingData() {
        if (accType === "CHILD") {
            window.api.query('SELECT * FROM billing WHERE SHOW_IN_REPORT = 1');
            window.api.onQueryReply((data) => {
                console.log("Billing:", data);
                setBillingData(data);
            });
        }
        else {
            window.api.query('SELECT * FROM billing');
            window.api.onQueryReply((data) => {
                console.log("Billing:", data);
                setBillingData(data);
            });
        }
    }

    const dataFormatter = (data: any) => {
        console.log("Data:", data);
        tableHeaders = ['Item', 'Price'];
        tableBody = data.map((item: any) => {
            return [item.ITEM, item.PRICE];
        });
        const totalPrice = data.reduce((acc: number, item: any) => {
            return acc + item.PRICE;
        }, 0);
        tableFooter = ['Total', totalPrice];
        const printData = {
            tableHeader: tableHeaders,
            tableBody: tableBody,
            tableFooter: tableFooter
        }

        generatePrintTable(printData);
    }

    const generatePrintTable = (data: printTableDataProps) => {
        console.log(data);
        const printData = [
            {
                type: 'text',
                value: 'Lemen Gras',
                style: { fontWeight: "700", textAlign: 'center', fontSize: "24px" }
            },
            {
                type: 'text',
                value: 'Government Hospital Junction, Mundakayam',
                style: { textAlign: 'center', fontSize: "12px" }
            },
            {
                type: 'text',
                value: 'Phone: +919947863773',
                style: { textAlign: 'center', fontSize: "12px" }
            },
            {
                type: 'text',
                value: 'GSTIN: 32AABCL1234C1Z5',
                style: { textAlign: 'center', fontSize: "12px" }
            },
            {
                type: 'table',
                style: { border: '1px solid black' },
                tableHeader: data.tableHeader,
                tableBody: data.tableBody,
                tableFooter: data.tableFooter,
                tableHeaderStyle: { backgroundColor: 'white', color: 'black' },
                tableBodyStyle: { 'border': '1px solid black', backgroundColor: 'white', color: 'black' },
                tableFooterStyle: { backgroundColor: 'white', color: 'black' },
            },
            {
                type: 'text',
                value: 'Thank You',
                style: { textAlign: 'center', fontSize: "16px" }
            },
            {
                type: 'text',
                value: 'Please Visit Again',
                style: { textAlign: 'center', fontSize: "16px" }
            }
        ]
        window.app.print(JSON.stringify(printData));

    }



    React.useEffect(() => {
        fetchBillingData();
    }, []);

    const handleDeleteRow = (id: number) => {
        console.log("Delete Row:", id);
        window.api.query(`DELETE FROM sales WHERE ID = ${id}`);
        fetchBillingData();
    }

    const handleClear = () => {
        console.log('delete')
        window.api.query('DELETE FROM billing');
    }

    const {
        refresh,
        triggerRefresh,
    } = useData();

    React.useEffect(() => {
        window.reloader.getMainReload((data: any) => {
            triggerRefresh();
        });
    }, [triggerRefresh]);

    React.useEffect(() => {
        fetchBillingData();
    }, [refresh]);

    const columns = React.useMemo(() => [
        {
            header: 'Date',
            accessorKey: 'DATE',
            size: 200,
            cell: (info: any) => {
                const date = new Date(info.getValue());
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            },
        },
        {
            header: 'Enterprise',
            accessorKey: 'ENTERPRISE',
            cell: (info: any) => info.getValue(),
        },
        {
            header: 'Item',
            accessorKey: 'ITEM',
            cell: (info: any) => info.getValue(),
        },
        {
            header: 'Price',
            accessorKey: 'PRICE',
            cell: (info: any) => info.getValue(),
        },
        {
            header: 'Total',
            accessorKey: 'TOTAL',
            cell: (info: any) => info.getValue(),
        },
        {
            header: 'Paid',
            accessorKey: 'PAID',
            cell: (info: any) => info.getValue(),
        },
        {
            header: 'Delete',
            accessorKey: 'DELETE',
            enableSorting: false,
        }
    ], []);

    React.useEffect(() => {
        console.log(dateFilter);
        if(dateFilter){
            const filteredData = billingData.filter((purchase: any) => {
                const date = new Date(purchase?.DATE);
                return date >= dateFilter && date <= dateFilter;
            })

            setBillingData(filteredData);
        }
        else{
            fetchBillingData();
        }
    },[dateFilter]);

    return (
        <>
            <div className="flex flex-row">
                <Table
                    data={billingData}
                    columns={columns}
                    columnFilters={columnFilters}
                    isClickable={false}
                    link={""}
                    index={0}
                    setRenderComponent={null}
                    handleDeleteRow={handleDeleteRow}
                />
                {/* <button className="btn btn-default" onClick={() => {
                    dataFormatter(billingData);
                }}>Print</button>
                <button className="btn btn-default" onClick={handleClear}>
                    Clear
                </button> */}
                <RightSideNavBar 
                    handlePrint={() => {
                        dataFormatter(billingData);
                    }}
                    handleErase={handleClear}
                />
            </div>
        </>
    );
};

export default Billing;
