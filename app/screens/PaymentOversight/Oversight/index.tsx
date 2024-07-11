import Footer from "@/components/Footer";
import Table from "@/components/Table";
import React from "react";
import { useData } from "@/context";

interface OversightProps {
    columnFilters: any;
    accType: string;
    setComponentId: (value: string) => void;
    payOpsId: any;
    setPayOpsId: (id: any) => void;
    dateFilter: any;
}

export default function Oversight({
    columnFilters,
    accType,
    setComponentId,
    payOpsId,
    setPayOpsId,
    dateFilter
}: OversightProps) {

    const [data, setData] = React.useState<any[]>([]);

    const fetchTableData = () => {
        window.api.query(`SELECT * FROM payment_oversight`);
        window.api.onQueryReply((data: any) => {
            console.log(data);
            setData(data);
        });
    }

    React.useEffect(() => {
        let isMounted = true;
        fetchTableData();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleDeleteRow = (id: any) => {
        window.api.query(`DELETE FROM payment_oversight WHERE ID = ${id}`);
        fetchTableData();
    }

    React.useEffect(() => {
        console.log(dateFilter);
        if(dateFilter){
            const filteredData = data.filter((purchase: any) => {
                const date = new Date(purchase?.DATE);
                return date >= dateFilter && date <= dateFilter;
            })

            setData(filteredData);
        }
        else{
            fetchTableData();
        }
    },[dateFilter]);

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
        fetchTableData();
    }, [refresh]);

    const columns = React.useMemo(() => [
        {
            header: 'Date',
            accessorKey: 'DATE',
            cell: (info: any) => {
                const date = new Date(info.getValue());
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            },
        },
        {
            header: 'Vendor',
            accessorKey: 'VENDOR',
            enableSorting: true,
            cell: (info: { getValue: () => any }) => info.getValue(),
        },
        {
            header: 'Description',
            accessorKey: 'DESCRIPTION',
            enableSorting: false,
            cell: (info: { getValue: () => any }) => info.getValue(),
        },
        {
            header: 'Type',
            accessorKey: 'TYPE',
            enableSorting: false,
            cell: (info: { getValue: () => any }) => info.getValue(),
        },
        {
            header: 'Amount',
            accessorKey: 'AMOUNT',
            enableSorting: true,
            cell: (info: { getValue: () => any }) => info.getValue(),
        },
        {
            header: 'Balance',
            accessorKey: 'BALANCE',
            enableSorting: true,
            cell: (info: { getValue: () => any }) => info.getValue(),
        },
        {
            header: 'Delete',
            accessorKey: 'DELETE',
            enableSorting: false,
        }
    ],[]);

    return (
        <>
        <Table
            data={data}
            columns={columns}
            columnFilters={columnFilters}
            isClickable={true}
            link={"Tracker"}
            index={0}
            setRenderComponent={null}
            handleDeleteRow={handleDeleteRow}
            setComponentId={(id: any) => {setComponentId(id)}}
            setPayOpsId={setPayOpsId}
        />
        </>
    )
}