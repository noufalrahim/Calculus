import Table from "@/components/Table";
import { PERIODIC_PURCHASE } from "@/db/Data";
import React from "react";

interface detailsProps {
    columnFilters: any;
    index: number;
    setRenderComponent: any;
    dateFilter: any;
}

export default function ({
    columnFilters,
    index,
    setRenderComponent,
    dateFilter
}:detailsProps) {

    const [purchasesData, setPurchasesData] = React.useState<any>([]);

    function fetchPurchasesData() {
        
        window.api.query(`SELECT * FROM purchases`);
        window.api.onQueryReply((data) => {
            console.log("Purchases2:", data);
            setPurchasesData(data);
        });
    }

    React.useEffect(() => {
        fetchPurchasesData();
    }, []);

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
                cell: (info: { getValue: () => any }) => info.getValue()
            },
            {
                header: 'All Stock',
                accessorKey: 'ALL_STOCK',
                cell: (info: { getValue: () => any }) => info.getValue()
            },
            {
                header: 'In Stock',
                accessorKey: 'IN_STOCK',
                cell: (info: { getValue: () => any }) => info.getValue()
            },
            {
                header: 'Return',
                accessorKey: 'RETURN',
                cell: (info: { getValue: () => any }) => info.getValue()
            },
            {
                header: 'Sales Ratio',
                accessorKey: 'SALES_RATIO',
                cell: (info: { getValue: () => any }) => info.getValue()
            }
        ], []
    );

    React.useEffect(() => {
        if(dateFilter){
            const filteredData = purchasesData.filter((item: any) => {
                return item.DATE >= dateFilter && item.DATE <= dateFilter
            });
            return setPurchasesData(filteredData);
        } else {
            fetchPurchasesData();
        }
    }, [dateFilter])

    return (
        <Table
            columns={columns}
            data={purchasesData}
            columnFilters={columnFilters}
            isClickable={false}
            link={"PERIODIC_PURCHASES"}
            index={index}
            setRenderComponent={setRenderComponent}
        />
    )
}