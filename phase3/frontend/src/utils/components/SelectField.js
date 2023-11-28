
import React, { useEffect, useContext, useState } from "react";
import "../../BaseStyles.scss";
import "./SelectField.scss"

export const SelectField = (props) => {
    let {label, options, defaultValue, stateCallback} = props;

    return (
        <div className="SelectField">
            <label htmlFor={label.toLowerCase()}>{label}:</label>
            <select name={label.toLowerCase()} id={label.toLowerCase()} className="Dropdown__PurpleOutline" defaultValue={defaultValue ? defaultValue : "select"} onChange={(arg) => {stateCallback(arg.target.value)}}>
                <option value="select" disabled hidden>Select {label.toLowerCase()}</option>
                {options.map((option) => <option value={option.value} key={option.value}>{option.display}</option>)}
            </select>
        </div>
    )
}

export default SelectField;