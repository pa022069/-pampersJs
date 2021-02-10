import { useSelector, useDispatch } from 'react-redux';

import {
    selectData,
    getResult,
    getIndex
} from './counterSlice';

import SelectItem from './SelectItem'

const Select = () => {
    const data = useSelector(selectData);
    const index = useSelector(getIndex);
    const dispatch = useDispatch();
    return (
        <div className="search__select">
            <div className="select__title">
                <img src="images/select-title.png" alt="正貨藥房優惠地址查詢" />
            </div>
            <div className="select__content">
                <div className="content">
                    <div className="content__group">
                        <p>藥房優惠</p>
                        <div className="content__radio">
                            {data.type.map((item, idx) => <SelectItem key={item.name} type='type' name={item.name} idx={idx} />)}
                        </div>
                    </div>
                    <div className="content__group">
                        <p>區域</p>
                        <div className="content__radio">
                            {data.area.map((item, idx) => <SelectItem key={item.name} type='area' name={item.name} idx={idx} />)}
                        </div>
                    </div>
                    <div className="content__group">
                        <p>地區</p>
                        <div className="content__radio">
                            {data.location[index].location.map((item, idx) => <SelectItem key={item} type='location' name={item} idx={idx} />)}
                        </div>
                    </div>
                    <div className="search__btn">
                        <div onClick={() => dispatch(getResult())}>查詢</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Select;