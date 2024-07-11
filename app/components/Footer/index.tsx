import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface FooterProps {
    onClickRight: () => void;
    onClickLeft: () => void;
    leftDisabled: boolean;
    rightDisabled: boolean;
}

export default function Footer({
    onClickRight,
    onClickLeft,
    leftDisabled,
    rightDisabled
}: FooterProps) {
    return (
        <footer className="toolbar toolbar-footer justify-center items-center flex fixed bottom-0 w-full">
            <div className="toolbar-actions justify-center items-center flex gap-4">
                <button 
                disabled={leftDisabled}
                className="bg-[#808080] rounded-full p-1" onClick={onClickLeft}>
                    <FaChevronLeft size={15} color="white" />
                </button>
                <button 
                disabled={rightDisabled}
                className="bg-[#808080] rounded-full p-1" onClick={onClickRight}>
                    <FaChevronRight size={15} color="white" />
                </button>
            </div>
        </footer>
    );
}
