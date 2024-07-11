import React from 'react';
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = ({ value, onClick }: any) => (
    <button className="btn btn-default btn-large pull-right mx-1" onClick={onClick}>
        <span className="icon icon-calendar mr-2"></span>
        {value || 'Select a date'}
    </button>
);

export default CustomInput;