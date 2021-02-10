import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    select: {
      type: [
        { id: 0, name: 'P&G正貨貼紙優惠' },
        { id: 1, name: 'P&G推廣攤位優惠' }
      ],
      area: [
        { id: 0, name: '香港' },
        { id: 1, name: '九龍' },
        { id: 2, name: '新界' },
        { id: 3, name: '離島' }],
      location: [
        { id: 0, location: ['跑馬地', '半山區', '西環', '鰂魚涌', '銅鑼灣', '香港仔', '柴灣/小西灣', '筲箕灣', '北角', '灣仔', '中上環', '山頂', '赤柱'] },
        { id: 1, location: ['土瓜灣', '深水埗', '旺角北', '長沙灣', '大角嘴', '紅磡', '荔枝角', '油麻地', '藍田', '慈雲山', '觀塘', '九龍灣', '九龍城', '牛池灣', '新蒲崗', '秀茂坪', '油塘', '黃大仙'] },
        { id: 2, location: ['沙田', '天水圍', '葵涌', '大窩口', '屯門南', '葵芳', '石蔭路', '荃灣', '元朗', '屯門北', '青衣', '石蘺', '梨木樹', '洪水橋', '大埔', '上水', '將軍澳', '大圍', '西貢', '馬鞍山', '粉嶺'] },
        { id: 3, location: ['坪洲', '長洲', '東涌', '大澳'] }
      ]
    },
    index: 0,
    type: 'P&G正貨貼紙優惠',
    area: '香港',
    location: '跑馬地',
    status: false,
    data: []
  },
  reducers: {
    sendData: (state, action) => {
      if (action.payload == "area") {
        state.index = getArea(getValue(document.getElementsByName('area')));
      }
    },
    setResult: (state, action) => {
      state.type = getValue(document.getElementsByName('type'))
      state.area = getValue(document.getElementsByName('area'))
      state.location = getValue(document.getElementsByName('location'))
      state.status = true;
      state.data = action.payload;
    },
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  },
});

const getValue = (_radios) => {
  // NodeList 類陣列轉陣列
  let radiosArray = Array.apply(null, _radios)
  radiosArray.map(item => {
    if (item.checked) {
      // console.log(item.value);
    }
  })

  for (var i = 0, length = _radios.length; i < length; i++) {
    if (_radios[i].checked) {
      return (_radios[i].value);
    }
  }
}

const getArea = (_item) => {
  switch (_item) {
    case '香港':
      return 0;
    case '九龍':
      return 1;
    case '新界':
      return 2;
    case '離島':
      return 3;
    default:
      break;
  }
}

export const { setResult, sendData, increment, decrement, incrementByAmount, consoleData } = counterSlice.actions;

export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const getResult = () => dispatch => {
  let type = getValue(document.getElementsByName('type'))
  let area = getValue(document.getElementsByName('area'))
  let location = getValue(document.getElementsByName('location'))

  if (!type || !area || !location) {
    alert('請選擇所要查詢的\n藥房優惠 / 區域 / 地區');
    return;
  };

  fetch(`https://spreadsheets.google.com/feeds/list/1K3r9GVo1RiYzMcWFz_cmgJwZ62ok1-Xtf0cGQeu8Zl0/${getValue(document.getElementsByName('type')) === 'P&G正貨貼紙優惠' ? '1' : '2'}/public/values?alt=json`)
    .then(res => {
      return res.json();
    }).then(result => {
      let array = result.feed.entry
      let data = array.filter((item) => {
        return item.gsx$area.$t === getValue(document.getElementsByName('area')) && item.gsx$location.$t === getValue(document.getElementsByName('location'));
      });
      dispatch(setResult(data));
    });
};
export const selectCount = (state) => {
  return state.counter.value;
};
// export const selectCount = state => state.counter.value;
export const selectData = state => state.counter.select;
export const getStatus = state => state.counter.status;
export const getType = state => state.counter.type;
export const getData = state => state.counter.data;
export const getIndex = state => state.counter.index;

export default counterSlice.reducer;