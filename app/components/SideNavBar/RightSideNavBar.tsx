import { useState } from "react";
import { Folders } from "./Items";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface RightSideNavBarProps {
    handlePrint: () => void;
    handleErase: () => void;   
}

export default function RightSideNavBar({
    handlePrint,
    handleErase
}: RightSideNavBarProps) {

    

    const RightSideFolders = [
        {
            id: 'PRINT',
            title: 'Print',
            icon: 'print',
            subfolders: [],
            onClick: handlePrint
        },
        {
            id: 'ERASE',
            title: 'Erase',
            icon: 'trash',
            subfolders: [],
            onClick: handleErase
        }
    ]

    return (
        <div className={`pane-mini sidebar`}
            style={{
                width: '75px',
                justifyContent: 'space-between',
                flexDirection: 'column',
                display: 'flex'
            }}
        >
            <nav className={`nav-group`}>
                <h5 className={`nav-group-title`}>Billing</h5>
                {
                    RightSideFolders.map(folder => (
                        <div key={folder.id}>
                            <span className={`nav-group-item h-8 justify-between items-center flex }`}
                                onClick={() => {
                                    console.log('folder', folder)
                                    folder.onClick()
                                }}>
                                <span className={`icon icon-${folder.icon}`}></span>
                            </span>
                        </div>
                    ))
                }
            </nav>
        </div>
    )
}