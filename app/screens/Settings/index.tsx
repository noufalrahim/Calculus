import React from 'react'
import Preferences from './Preferences'
import Account from './Account'

interface SettingsProps {
    subFolderId: string;
    setShowAddButton: (value: boolean) => void;
    setIpcOpener: any;
    accType: string;
}

export default function Settings({
    subFolderId,
    setShowAddButton,
    setIpcOpener,
    accType
}: SettingsProps) {

    React.useEffect(() => {
        setShowAddButton(true);
    }, []);

    const RENDER_COMPONENT = () => {
        switch (subFolderId) {
            case "ACCOUNT":
                return (
                    <Account />
                )
            case "PREFERENCES":
                return (
                    <Preferences />
                )

        }
    }

    return (
        <>
            {RENDER_COMPONENT()}
        </>
    )
}