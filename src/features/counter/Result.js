import ResultItem from './ResultItem'

import { useSelector, useDispatch } from 'react-redux';

import {
    getType,
} from './counterSlice';

const Result = () => {
    const type = useSelector(getType);
    return (
        <div className="search__result">
            <div className="result__title">
                <img src="images/result-title.png" alt="正貨藥房優惠地址查詢" />
            </div>
            <div className="result__content">
                <div className="info">
                    <img src="images/info-title.png" alt="" />
                    {type !== "P&G正貨貼紙優惠" ? <img src="images/time-1.png" alt="" /> : <img src="images/time-2.png" alt="" />}
                </div>
            </div>
            <div className="result__content">
                <ResultItem/>
            </div>
        </div>
    );
}

export default Result;