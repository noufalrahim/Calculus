import React from "react";
import Purchases from "./Purchases";
import Sales from "./Sales";

interface EnterpriseProps {
    subFolderId: string;
    columnFilters: any;
    renderComponent: {
        page: string;
        index: number;
    };
    setRenderComponent: any;
    dateFilter: any;
    setIpcOpener: any;
    setShowAddButton: (value: boolean) => void;
    accType: string;
    setFilterSearchParam: (value: string) => void;
}

export default function Enterprise({
    subFolderId,
    columnFilters,
    renderComponent,
    setRenderComponent,
    dateFilter,
    setIpcOpener,
    setShowAddButton,
    accType,
    setFilterSearchParam
}: EnterpriseProps) {
    
    React.useEffect(() => {
        setShowAddButton(true);
        setFilterSearchParam("ENTERPRISE");
    }, []);

    const RENDER_COMPONENT = () => {
        switch (subFolderId) {
            case "PURCHASES":
                if (renderComponent.page === 'ENTERPRISES_PURCHASES') {
                    switch (renderComponent.index) {
                        case 0:
                            return (
                                <Purchases
                                    index={0}
                                    columnFilters={columnFilters}
                                    setRenderComponent={setRenderComponent}
                                    dateFilter={dateFilter}
                                    setIpcOpener={setIpcOpener}
                                    setShowAddButton={setShowAddButton}
                                    setFilterSearchParam={setFilterSearchParam}
                                    accType={accType}
                                />
                            )
                    }
                }
            case "SALES":
                if (renderComponent.page === 'ENTERPRISES_SALES') {
                    switch (renderComponent.index) {
                        case 0:
                            return (
                                <Sales
                                    index={0}
                                    columnFilters={columnFilters}
                                    setRenderComponent={setRenderComponent}
                                    dateFilter={dateFilter}
                                    setIpcOpener={setIpcOpener}
                                    setShowAddButton={setShowAddButton}
                                    setFilterSearchParam={setFilterSearchParam}
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
                        setIpcOpener={setIpcOpener}
                        setShowAddButton={setShowAddButton}
                        setFilterSearchParam={setFilterSearchParam}
                        accType={accType}
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
