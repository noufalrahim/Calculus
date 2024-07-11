import Table from "@/components/Table";
import { PURCHASES } from "@/db/Data";
import React from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useData } from "@/context";

interface purchasesProps {
    columnFilters: any;
    index: number;
    setRenderComponent: any;
    dateFilter: any;
    setIpcOpener: any;
    setShowAddButton: (value: boolean) => void;
    setFilterSearchParam: (value: string) => void;
    accType: string;
}

export default function Purchases({
    columnFilters,
    index,
    setRenderComponent,
    dateFilter,
    setIpcOpener,
    setShowAddButton,
    setFilterSearchParam,
    accType
}: purchasesProps) {

    const [purchasesData, setPurchasesData] = React.useState<any>([]);
    const { refresh, triggerRefresh } = useData();

    React.useEffect(() => {
        if (typeof setIpcOpener === 'function') {
            setIpcOpener("open-purchases");
        } else {
            console.error("setIpcOpener is not a function");
        }
    }, [setIpcOpener]);

    function fetchPurchasesData() {
        if(accType === "CHILD"){
            window.api.query('SELECT * FROM purchases WHERE SHOW_IN_REPORT = 1');
            window.api.onQueryReply((data) => {
                console.log("Purchases:", data);
                setPurchasesData(data);
            });
        }
        else{
            window.api.query('SELECT * FROM purchases');
            window.api.onQueryReply((data) => {
                console.log("Purchases:", data);
                setPurchasesData(data);
            });
        }
    }

    React.useEffect(() => {
        fetchPurchasesData();
        setShowAddButton(true);
        setFilterSearchParam("ENTERPRISE");
    }, []);

    React.useEffect(() => {
        window.reloader.getMainReload((data: any) => {
            triggerRefresh();
        });
    }, [triggerRefresh]);

    React.useEffect(() => {
        fetchPurchasesData();
      }, [refresh]);

    const handleDeleteRow = (id: number) => {
        console.log("Delete Row:", id);
        window.api.query(`DELETE FROM purchases WHERE ID = ${id}`);
        fetchPurchasesData();
    }

    const columns = React.useMemo(
        () => [
            {
                header: 'Date',
                accessorKey: 'DATE',
                size: 200,
                cell: (info: { getValue: () => any }) => {
                    const date = new Date(info.getValue());
                    const d = new Date(date);
                    const day = String(d.getDate()).padStart(2, '0');
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const year = d.getFullYear();
                    return `${day}/${month}/${year}`;
                }
            },
            {
                header: 'Enterprise',
                accessorKey: 'ENTERPRISE',
                cell: (info: { getValue: () => any }) => info.getValue()
            },
            {
                header: 'Item',
                accessorKey: 'ITEM',
                enableSorting: false,
                cell: (info: { getValue: () => any }) => info.getValue()
            },
            {
                header: 'Quantity',
                accessorKey: 'QUANTITY',
                enableSorting: false,
                cell: (info: { getValue: () => any }) => info.getValue()
            },
            {
                header: 'Price',
                accessorKey: 'PRICE',
                enableSorting: false,
                cell: (info: { getValue: () => any }) => info.getValue()
            },
            {
                header: 'Discount',
                accessorKey: 'DISCOUNT',
                enableSorting: false,
                cell: (info: { getValue: () => any }) => info.getValue()
            },
            {
                header: 'Total',
                accessorKey: 'TOTAL',
                cell: (info: { getValue: () => any }) => info.getValue()
            },
            {
                header: 'Paid',
                accessorKey: 'PAID',
                enableSorting: false,
                cell: (info: { getValue: () => any }) => info.getValue()
            },
            {
                header: 'Balance',
                accessorKey: 'BALANCE',
                enableSorting: false,
                cell: (info: { getValue: () => any }) => info.getValue()
            },
            {
                header: 'Edit',
                accessorKey: 'EDIT',
                enableSorting: false,
            },
            {
                header: 'Delete',
                accessorKey: 'DELETE',
                enableSorting: false,
            },
            {
                header: 'View Barcode',
                accessorKey: 'VIEW',
                enableSorting: false,
            }
        ], []
    )

    const [data, setData] = React.useState(PURCHASES);

    React.useEffect(() => {
        console.log(dateFilter);
        if(dateFilter){
            const filteredData = purchasesData.filter((purchase: any) => {
                const date = new Date(purchase?.DATE);
                return date >= dateFilter && date <= dateFilter;
            })

            setPurchasesData(filteredData);
        }
        else{
            fetchPurchasesData();
        }
    },[dateFilter]);

    const handleViewBarcode = (data: any) => {
        const caliberateVal = 6291155885580;
        const barcodeData = {
            id: data.ID + caliberateVal,
            quantity: data.QUANTITY,
        }
        window.electron.openBarcodeWindow(barcodeData);
    }

    return (
        <Table
            columns={columns}
            data={purchasesData}
            columnFilters={columnFilters}
            isClickable={false}
            link={"ITEMS"}
            index={index}
            setRenderComponent={setRenderComponent}
            handleDeleteRow={handleDeleteRow}
            handleViewBarcode={handleViewBarcode}
        />
    )
}