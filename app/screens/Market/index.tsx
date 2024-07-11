import Table from "@/components/Table";
import { MARKET_DATA } from "@/db/Data";
import React from "react";
import { useData } from "@/context";

interface marketProps {
    columnFilters: any;
    setIpcOpener: any;
    setShowAddButton: (value: boolean) => void;
    accType: string;
    setFilterSearchParam: (value: string) => void;
}

export default function ({
    columnFilters,
    setIpcOpener,
    setShowAddButton,
    accType,
    setFilterSearchParam
}:marketProps) {

    React.useEffect(() => {
        setIpcOpener("open-market");
        setShowAddButton(true);
        setFilterSearchParam("ENTERPRISE");
    }, []);

    const [marketData, setMarketData] = React.useState([]);

    function fetchMarketData() {
        window.api.query('SELECT * FROM enterprises');
        window.api.onQueryReply((data) => {
            console.log("Enterprises:", data);
            setMarketData(data);
        });
    }

    React.useEffect(() => {
        fetchMarketData();
    }, []);

    const handleDeleteRow = (id: number) => {
        console.log("Delete Row:", id);
        window.api.query(`DELETE FROM enterprises WHERE ID = ${id}`);
        fetchMarketData();
    }

    const columns = React.useMemo(
        () => [
            {
                header: 'Enterprise',
                accessorKey: 'ENTERPRISE',
                cell: (info: { getValue: () => any }) => info.getValue(),
                
            },
            {
                header: 'Address',
                accessorKey: 'ADDRESS',
                cell: (info: { getValue: () => any }) => info.getValue(),
                enableSorting: false,
            },
            {
                header: 'Location',
                accessorKey: 'LOCATION',
                cell: (info: { getValue: () => any }) => info.getValue(),
                enableSorting: false,
            },
            {
                header: 'Card Number',
                accessorKey: 'CARD_NUMBER',
                cell: (info: { getValue: () => any }) => info.getValue(),
                enableSorting: false,
            },
            {
                header: 'Contact',
                accessorKey: 'CONTACT',
                cell: (info: { getValue: () => any }) => info.getValue(),
                enableSorting: false,
            },
            {
                header: 'Email',
                accessorKey: 'EMAIL',
                cell: (info: { getValue: () => any }) => info.getValue(),
                enableSorting: false,
            },
            {
                header: 'Website',
                accessorKey: 'WEBSITE',
                cell: (info: { getValue: () => any }) => info.getValue(),
                enableSorting: false,
            },
            {
                header: 'K.G.S.T',
                accessorKey: 'KGST',
                cell: (info: { getValue: () => any }) => info.getValue(),
                enableSorting: false,
            },
            {
                header: 'TIN',
                accessorKey: 'TIN',
                cell: (info: { getValue: () => any }) => info.getValue(),
                enableSorting: false,
            },
            {
                header: 'CST',
                accessorKey: 'CST',
                cell: (info: { getValue: () => any }) => info.getValue(),
                enableSorting: false,
            },
            {
                header: 'Edit',
                accessorKey: 'EDIT',
                cell: (info: { getValue: () => any }) => info.getValue(),
                enableSorting: false,
            },
            {
                header: 'Delete',
                accessorKey: 'DELETE',
                cell: (info: { getValue: () => any }) => info.getValue(),
                enableSorting: false,
            },
        ],
        []
    );

    
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
        fetchMarketData();
    }, [refresh]);

    return (
        <Table
            data={marketData}
            columns={columns}
            columnFilters={columnFilters}
            isClickable={false}
            link={""}
            index={0}
            setRenderComponent={null}
            handleDeleteRow={handleDeleteRow}
        />
    )
}