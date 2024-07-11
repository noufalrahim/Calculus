import React from "react";
import Purchases from "./Purchases";
import Sales from "./Sales";

interface PeridicReportsProps {
    subFolderId: string;
    columnFilters: any;
    renderComponent: {
        page: string;
        index: number;
    };
    setRenderComponent: any;
    dateFilter: any;
    setShowAddButton: (value: boolean) => void;
    accType: string;
    setFilterSearchParam: (value: string) => void;
}

export default function PeriodicReports({
    subFolderId,
    columnFilters,
    renderComponent,
    setRenderComponent,
    dateFilter,
    setShowAddButton,
    accType,
    setFilterSearchParam
}: PeridicReportsProps) {

    React.useEffect(() => {
        setShowAddButton(false);
        setFilterSearchParam("ENTERPRISE");
    }, []);

    const RENDER_COMPONENT = () => {
        switch (subFolderId) {
            case "PURCHASES":
                if (renderComponent.page === 'PERIODIC_PURCHASES') {
                    switch (renderComponent.index) {
                        case 0:
                            return (
                                <Purchases
                                    index={0}
                                    columnFilters={columnFilters}
                                    setRenderComponent={setRenderComponent}
                                    dateFilter={dateFilter}
                                />
                            )
                    }
                }
            case "SALES":
                if (renderComponent.page === 'PERIODIC_SALES') {
                    switch (renderComponent.index) {
                        case 0:
                            return (
                                <Sales
                                    index={0}
                                    columnFilters={columnFilters}
                                    setRenderComponent={setRenderComponent}
                                    dateFilter={dateFilter}
                                />
                            )
                    }
                }
            default:
                return (
                    <Purchases
                        index={0}
                        columnFilters={columnFilters}
                        setRenderComponent={setRenderComponent}
                        dateFilter={dateFilter}
                    />
                )
        }

    }

    return (
        <>
            {RENDER_COMPONENT()}
        </>
    );
}
