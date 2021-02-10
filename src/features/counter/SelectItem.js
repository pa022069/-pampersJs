
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    sendData
  } from './counterSlice';

const SelectItem = (props) => {
    const dispatch = useDispatch();
    return (
        <div className="group">
            <div>
                <input type="radio" name={`${props.type}`} id={`${props.type}${props.idx}`} value={props.name} onClick={() => dispatch(sendData(props.type))}/>
                <label htmlFor={`${props.type}${props.idx}`}></label>
            </div>
            <p>{props.name}</p>
        </div>
    );
}

export default SelectItem;