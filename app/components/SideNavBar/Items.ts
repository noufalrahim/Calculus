export const Folders = [
    {
        id: 'HOME',
        title: 'Home',
        icon: 'home',
        subfolders: [],
        rightSideBar: false,
        rightSideBarFolders: [],
        showOnChild: true
    },
    {
        id: 'ENTERPRISES',
        title: 'Enterprises',
        icon: 'briefcase',
        showOnChild: true,
        subfolders: [
            {
                id: 'PURCHASES',
                title: 'Purchases',
                icon: 'tag',
                subfolders: []
            },
            {
                id: 'SALES',
                title: 'Sales',
                icon: 'basket',
                subfolders: []
            }
        ],
        rightSideBar: false,
        rightSideBarFolders: []
    },
    // {
    //     id: 'PERIODIC',
    //     title: 'Periodic Reports',
    //     icon: 'calendar',
    //     subfolders: [
    //         {
    //             id: 'PURCHASES',
    //             title: 'Purchases (to be modified)',
    //             icon: 'tag',
    //             subfolders: []
    //         },
    //         {
    //             id: 'SALES',
    //             title: 'Sales (to be modified)',
    //             icon: 'basket',
    //             subfolders: []
    //         }
    //     ],
    //     rightSideBar: false,
    //     rightSideBarFolders: []
    // },
    // {
    //     id: 'ITEMS',
    //     title: 'Items',
    //     icon: 'box',
    //     subfolders: [
    //         // {
    //         //     id: 'STOCK_DETAILS',
    //         //     title: 'Stock Details (To be removed)',
    //         //     icon: 'info',
    //         //     subfolders: []
    //         // },
    //         {
    //             id: 'ALL_STOCK',
    //             title: 'All Stock',
    //             icon: 'archive',
    //             subfolders: []
    //         },
    //         // {
    //         //     id: 'IN_STOCK',
    //         //     title: 'In Stock (To be removed)',
    //         //     icon: 'archive',
    //         //     subfolders: []
    //         // },
    //         // {
    //         //     id: 'RETURN',
    //         //     title: 'Return (To be removed)',
    //         //     icon: 'reply',
    //         //     subfolders: []
    //         // },
    //     ],
    //     rightSideBar: false,
    //     rightSideBarFolders: []
    // },
    {
        id: 'BILLING',
        title: 'Billing',
        icon: 'doc-text-inv',
        subfolders: [],
        rightSideBar: true,
        showOnChild: true,
        rightSideBarFolders: [
            {
                id: 'PRINT',
                title: 'Print',
                icon: 'print',
                subfolders: []
            },
            {
                id: 'RESET',
                title: 'Reset',
                icon: 'refresh',
                subfolders: []
            }
        ]
    },
    {
        id: 'MARKET',
        title: 'Market',
        icon: 'basket',
        subfolders: [],
        rightSideBar: false,
        showOnChild: true,
        rightSideBarFolders: []
    },
    // {
    //     id: 'RETURN',
    //     title: 'Return',
    //     icon: 'reply',
    //     subfolders: [],
    //     rightSideBar: false,
    //     rightSideBarFolders: []
    // },
    {
        id: 'PAYOPS',
        title: 'Payment Oversight',
        icon: 'credit-card',
        showOnChild: false,
        subfolders: [],
    },
    {
        id: 'SETTINGS',
        title: 'Settings',
        icon: 'cog',
        showOnChild: true,
        subfolders: [
            {
                id: 'ACCOUNT',
                title: 'Account',
                icon: 'user',
                subfolders: []
            },
            {
                id: 'PREFERENCES',
                title: 'Preferences',
                icon: 'tools',
                subfolders: []
            }
        ],
        rightSideBar: false,
        rightSideBarFolders: []
    },
    {
        id: 'HELP',
        title: 'Help',
        icon: 'help-circled',
        showOnChild: true,
        subfolders: [],
        rightSideBar: false,
        rightSideBarFolders: []
    },
]
