import Table from "@/components/Table";
import { useData } from "@/context";
import React from "react";

interface salesProps {
    columnFilters: any;
    index: number;
    setRenderComponent: any;
    dateFilter: any;
    setIpcOpener: any;
    setShowAddButton: (value: boolean) => void;
    setFilterSearchParam: (value: string) => void;
}

export default function ({
    columnFilters,
    index,
    setRenderComponent,
    dateFilter,
    setIpcOpener,
    setShowAddButton,
    setFilterSearchParam
}:salesProps) {

    React.useEffect(() => {
        if (typeof setIpcOpener === 'function') {
            setIpcOpener("open-sales");
        } else {
            console.error("setIpcOpener is not a function");
        }
    }, [setIpcOpener]);

    const [salesData, setSalesData] = React.useState<any>([]);

    function fetchSalesData() {
        window.api.query('SELECT * FROM sales');
        window.api.onQueryReply((data) => {
            console.log("Sales:", data);
            setSalesData(data);
        });
    }

    React.useEffect(() => {
        setShowAddButton(false);
        fetchSalesData();
        setFilterSearchParam("ENTERPRISE");
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
                header: 'Price',
                accessorKey: 'PRICE',
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
                header: 'Edit',
                accessorKey: 'EDIT',
                enableSorting: false,
            },
            {
                header: 'Delete',
                accessorKey: 'DELETE',
                enableSorting: false,
            },
        ], []
    )

    React.useEffect(() => {
        if(dateFilter){
            const filteredData = salesData.filter((item: any) => {
                const date = new Date(item.DATE);
                return date >= dateFilter && date <= dateFilter;
            });
            setSalesData(filteredData);
        }
        else{
            fetchSalesData();
        }
    }, [dateFilter]);

    const handleDeleteRow = (id: number) => {
        window.api.query(`DELETE FROM sales WHERE ID=${id}`);
        fetchSalesData();
    }

    const { refresh, triggerRefresh } = useData();


    React.useEffect(() => {
        window.reloader.getMainReload((data: any) => {
            triggerRefresh();
        });
    }, [triggerRefresh]);

    React.useEffect(() => {
        fetchSalesData();
      }, [refresh]);

    return (
        <Table
            columns={columns}
            data={salesData}
            columnFilters={columnFilters}
            isClickable={false}
            link={"ITEMS"}
            index={index}
            setRenderComponent={setRenderComponent}
            handleDeleteRow={handleDeleteRow}
        />
    )
}