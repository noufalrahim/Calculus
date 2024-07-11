import { useState } from "react";
import { Folders } from "./Items";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface MainSideBarProps {
    folderId: string;
    setFolderId: (folder: string) => void;
    setRenderComponent: any,
    active: string;
    setActive: (value: string) => void;
    accType: string;
}

export default function MainSideBar({
    setFolderId,
    setRenderComponent,
    active,
    setActive,
    accType
}: MainSideBarProps) {

    const folderDetails = [
        {
            name: 'HOME',
            extension: ''
        },
        {
            name: 'ENTERPRISES',
            extension: 'PURCHASES'
        },
        {
            name: 'PERIODIC',
            extension: 'PURCHASES'
        },
        {
            name: 'ITEMS',
            extension: 'ALL_STOCK'
        },
        {
            name: 'SETTINGS',
            extension: 'ACCOUNT'
        }
    ]

    const [toggleSideBar, setToggleSideBar] = useState(false);

    console.log('active', active);
    console.log(accType);

    return (
        <div className={`pane-mini sidebar`}
            style={{
                width: toggleSideBar ? '200px' : '75px',
                justifyContent: 'space-between',
                flexDirection: 'column',
                display: 'flex'
            }}
        >
            <nav className={`nav-group`}>
                <h5 className={`nav-group-title`}>Menu</h5>
                {
                    Folders.map(folder => {
                        if (accType === "CHILD" && folder.showOnChild) {
                            return (
                                <div key={folder.id}>
                                    <span className={`nav-group-item h-8 justify-between items-center flex ${active === folder.id ? 'active' : ''}`}
                                        onClick={() => {
                                            setFolderId(folder.id)
                                            setActive(folder.id)
                                            const Extension = folderDetails.find(item => item.name === folder.id)
                                            console.log('findExtension', Extension)
                                            setRenderComponent({
                                                page: `${Extension?.name}_${Extension?.extension}`,
                                                index: 0
                                            })
                                        }}>
                                        <span className={`icon icon-${folder.icon}`}></span>
                                        {
                                            toggleSideBar && <p>
                                                {folder.title}
                                            </p>
                                        }
                                    </span>
                                </div>
                            );
                        } else if(accType === "PARENT") {
                            return (
                                <div key={folder.id}>
                                    <span className={`nav-group-item h-8 justify-between items-center flex ${active === folder.id ? 'active' : ''}`}
                                        onClick={() => {
                                            setFolderId(folder.id)
                                            setActive(folder.id)
                                            const Extension = folderDetails.find(item => item.name === folder.id)
                                            console.log('findExtension', Extension)
                                            setRenderComponent({
                                                page: `${Extension?.name}_${Extension?.extension}`,
                                                index: 0
                                            })
                                        }}>
                                        <span className={`icon icon-${folder.icon}`}></span>
                                        {
                                            toggleSideBar && <p>
                                                {folder.title}
                                            </p>
                                        }
                                    </span>
                                </div>
                            );
                        }
                    })
                }
            </nav>
            <div className={`bg-gray-500 rounded-full w-7 h-7 fixed bottom-10 flex justify-center items-center left-5 cursor-pointer`}>
                {
                    toggleSideBar ? (
                        <FaArrowLeft color={'white'} className="cursor-pointer w-full h-full p-2"
                            onClick={() => {
                                setToggleSideBar(!toggleSideBar)
                            }}
                        />
                    ) : (
                        <FaArrowRight color={'white'} className="cursor-pointer w-full h-full p-2"
                            onClick={() => {
                                setToggleSideBar(!toggleSideBar)
                            }}
                        />
                    )
                }
            </div>
        </div>
    )
}