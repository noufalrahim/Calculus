import React from "react";

interface HomeProps {
    setShowAddButton: (value: boolean) => void;
    setFolderId: any;
    setActive: (value: string) => void;
    accType: string;
}

export default function Home({ 
    setShowAddButton, 
    setFolderId,
    setActive,
    accType
}: HomeProps) {

    React.useEffect(() => {
        setShowAddButton(false);
    }, []);


    const Folders = [
        {
            id: 'ENTERPRISES',
            title: 'Enterprises',
            icon: 'briefcase',
            navigate: 'ENTERPRISES',
            showOnChild: true,
        },
        {
            id: 'BILLING',
            title: 'Billing',
            icon: 'doc-text-inv',
            navigate: 'BILLING',
            showOnChild: true,
        },
        {
            id: 'MARKET',
            title: 'Market',
            icon: 'basket',
            navigate: 'MARKET',
            showOnChild: true,
        },
        {
            id: 'PAYOPS',
            title: 'Payment Oversight',
            icon: 'credit-card',
            navigate: 'PAYOPS',
            showOnChild: false,
        },
        {
            id: 'SETTINGS',
            title: 'Settings',
            icon: 'cog',
            navigate: 'SETTINGS',
            showOnChild: true,
        },    
        {
            id: 'HELP',
            title: 'Help',
            icon: 'help-circled',
            navigate: 'HELP',
            showOnChild: true,
        },
    ]

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh',
            }}
            className="w-full items-center justify-center flex flex-col text-center">
            <div className="grid grid-row-4 gap-4 flex flex-col">
                <div className="flex flex-row justify-center items-center">
                    {
                        Folders.slice(0, 3).map((folder, index) => (
                            <div
                                style={{
                                    backgroundColor: 'lightGray',
                                    width: '200px',
                                    margin: '25px',
                                    paddingBottom: '20px',
                                    borderRadius: '10px',
                                }}
                                className="cursor-pointer"
                                onClick={() => {
                                    setActive(folder.id)
                                    setFolderId(folder.navigate)
                                }}
                            >
                                <span style={{
                                    fontSize: '5rem',
                                    color: 'black'
                                }} className={`icon icon-${folder.icon} cursor-pointer`}></span>
                                <p className="text-center cursor-pointer">
                                    {folder.title}
                                </p>
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-row justify-center items-center"> 
                    {
                        Folders.slice(3, 6).map((folder, index) => {
                            if(accType === "CHILD" && folder.showOnChild) {
                                return (
                                    <div
                                        style={{
                                            backgroundColor: 'lightGray',
                                            width: '200px',
                                            margin: '25px',
                                            paddingBottom: '20px',
                                            borderRadius: '10px',
                                        }}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setActive(folder.id)
                                            setFolderId(folder.navigate)
                                        }}
                                    >
                                        <span style={{
                                            fontSize: '5rem',
                                            color: 'black'
                                        }} className={`icon icon-${folder.icon} cursor-pointer`}></span>
                                        <p className="text-center cursor-pointer">
                                            {folder.title}
                                        </p>
                                    </div>
                                );
                            }
                            else if(accType === "PARENT") {
                                return (
                                    <div
                                        style={{
                                            backgroundColor: 'lightGray',
                                            width: '200px',
                                            margin: '25px',
                                            paddingBottom: '20px',
                                            borderRadius: '10px',
                                        }}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setActive(folder.id)
                                            setFolderId(folder.navigate)
                                        }}
                                    >
                                        <span style={{
                                            fontSize: '5rem',
                                            color: 'black'
                                        }} className={`icon icon-${folder.icon} cursor-pointer`}></span>
                                        <p className="text-center cursor-pointer">
                                            {folder.title}
                                        </p>
                                    </div>
                                );
                            }
                        })
                    }
                </div>
            </div>
        </div>
    );
}
