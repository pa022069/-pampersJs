import { useSelector, useDispatch } from 'react-redux';

import {
    selectData,
    getType,
    getData
} from './counterSlice';

const ResultItem = () => {
    const type = useSelector(getType);
    const data = useSelector(getData);
    return (
        <div className="list">
            <div className={`list__title ${type === "P&G正貨貼紙優惠" ? 'split--2' : 'split'}`}>
                <div>
                    <p>店鋪</p>
                </div>
                <div>
                    <p>地址</p>
                </div>
                {type !== "P&G正貨貼紙優惠" ? <div>
                    <p style={{
                                textAlign: 'center'
                            }}>優惠期間</p>
                </div> : ''}
            </div>
            {data.length == 0 ? 
            <div className="list__content">
                <p className="alert">此區暫時沒有優惠</p>
            </div> 
            : 
            <div className="list__content">
                {   
                    data.map((item, idx) =>
                        <div key={idx} className={`column ${type === "P&G正貨貼紙優惠" ? 'split--2' : 'split'}`}>
                            <div>
                                <p>{item.gsx$name.$t}</p>
                            </div>
                            <div>
                                <p>{item.gsx$address.$t}</p>
                            </div>
                            {type !== "P&G正貨貼紙優惠" ? <div>
                                <p style={{
                                    textAlign: 'center'
                                }}>{item.gsx$date.$t}</p>
                            </div> : ''}
                        </div>
                    )
                }
            </div>}
        </div>
    );
}

export default ResultItem;