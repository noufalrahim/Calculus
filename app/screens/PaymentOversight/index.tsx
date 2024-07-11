import React from 'react'
import Oversight from './Oversight'
import Tracker from './Tracker'
import Footer from '@/components/Footer';

interface PaymentOversightProps {
    columnFilters: any;
    setIpcOpener: any;
    setShowAddButton: (value: boolean) => void;
    accType: string;
    payOpsId: any;
    setPayOpsId: (id: any) => void;
    dateFilter: any;
    setFilterSearchParam: (value: string) => void;
}

export default function PaymentOversight({
    columnFilters,
    setIpcOpener,
    setShowAddButton,
    accType,
    payOpsId,
    setPayOpsId,
    dateFilter,
    setFilterSearchParam
}: PaymentOversightProps) {

    const [componentId, setComponentId] = React.useState('Oversight');

    React.useEffect(() => {
        setIpcOpener("open-payops");
        setShowAddButton(true);
        setFilterSearchParam("VENDOR");
    }, []);

    const renderComponent = () => {
        switch (componentId) {
            case 'Oversight':
                return <Oversight
                    columnFilters={columnFilters}
                    accType={""}
                    setComponentId={(value: string) => {
                        setComponentId(value);
                    }}
                    setPayOpsId={setPayOpsId}
                    payOpsId={payOpsId}
                    dateFilter={dateFilter}

                />
            case 'Tracker':
                return <Tracker
                    columnFilters={columnFilters}
                    accType={""}
                    payOpsId={payOpsId}
                    setIpcOpener={setIpcOpener}
                    dateFilter={dateFilter}
                />
            default:
                return <Oversight
                    columnFilters={[]}
                    accType={""}
                    setComponentId={(value: string) => {
                        setComponentId(value)
                    }}
                    setPayOpsId={setPayOpsId}
                    payOpsId={payOpsId}
                    dateFilter={dateFilter}
                />
        }
    }

    return (
        <div>
            {renderComponent()}
        </div>
    )
}