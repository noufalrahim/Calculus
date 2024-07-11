import Table from "@/components/Table";
import React from "react";
import { useData } from "@/context";

interface TrackerProps {
    columnFilters: any;
    accType: string;
    payOpsId: any;
    setIpcOpener: any;
    dateFilter: any;
}

export default function Tracker({
    columnFilters,
    accType,
    payOpsId,
    setIpcOpener,
    dateFilter
}: TrackerProps) {

    React.useEffect(() => {
        setIpcOpener("open-paytracker");
    }, [setIpcOpener]);

    const [data, setData] = React.useState<any[]>([]);
    console.log("payOpsId", payOpsId);

    const fetchTableData = () => {
        window.api.query(`SELECT * FROM payment_tracker WHERE PAY_OPS_ID = ${payOpsId.ID}`);
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
            header: 'Total Amount',
            accessorKey: 'TOTAL_AMOUNT',
            cell: (info: { getValue: () => any }) => info.getValue(),
        },
        {
            header: 'Amount Paid',
            accessorKey: 'AMOUNT_PAID',
            cell: (info: { getValue: () => any }) => info.getValue(),
        },
        {
            header: 'Total Amount Paid',
            accessorKey: 'TOTAL_AMOUNT_PAID',
            cell: (info: { getValue: () => any }) => info.getValue(),
        },
        {
            header: 'Amount Due',
            accessorKey: 'TOTAL_AMOUNT_DUE',
            cell: (info: { getValue: () => any }) => info.getValue(),
        },
    ], []);

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

    return (
        <Table
            data={data}
            columns={columns}
            columnFilters={columnFilters}
            isClickable={true}
            link={""}
            index={0}
            setRenderComponent={null}
            handleDeleteRow={() => {}}
        />
    );
}
