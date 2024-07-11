import Table from "@/components/Table";
import { PERIODIC_SALES } from "@/db/Data";
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

    const [data, setData] = React.useState(PERIODIC_SALES);
    const [salesData, setSalesData] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(false);

    function fetchSalesData() {

        setLoading(true);
        window.api.query('SELECT DATE, ENTERPRISE, SUM(QUANTITY) AS QUANTITY, SUM(PRICE) AS PRICE, SUM(DISCOUNT) AS DISCOUNT, SUM(TOTAL) AS TOTAL, SUM(PAID) AS PAID, SUM(BALANCE) AS BALANCE FROM sales GROUP BY ENTERPRISE');
        window.api.onQueryReply((data) => {
            console.log("Purchases2:", data);
            setSalesData(data);
        });
        setLoading(false);
    }

    React.useEffect(() => {
        fetchSalesData();
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
                header: 'Quantity',
                accessorKey: 'QUANTITY',
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
                cell: (info: { getValue: () => any }) => info.getValue()
            },
            {
                header: 'Balance (discounted)',
                accessorKey: 'BALANCE',
                enableSorting: false,
                cell: (info: { getValue: () => any }) => info.getValue()
            }
        ], []
    )

    React.useEffect(() => {
        if(dateFilter){
            const filteredData = PERIODIC_SALES.filter((item) => {
                return item.DATE >= dateFilter && item.DATE <= dateFilter
            })

            return setData(filteredData)
        }
        else{
            setData(PERIODIC_SALES)
        }
    }, [dateFilter]);

    return (
        <Table
            columns={columns}
            data={salesData}
            columnFilters={columnFilters}
            isClickable={false}
            link={"PERIODIC_SALES"}
            index={index}
            setRenderComponent={setRenderComponent}
        />
    )
}