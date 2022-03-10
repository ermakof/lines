import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment-timezone';

import Root from '@src/Root';

moment.locale('ru');

ReactDOM.render(<Root />, document.getElementById('root'));
