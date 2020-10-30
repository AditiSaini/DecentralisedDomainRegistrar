// top view, import and compile file

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Search.css';
import Search from'./Search';
import {detailsdata} from './NameDetails';
import { render } from '@testing-library/react';


ReactDOM.render(
  <Search/>,
  document.getElementById('root')
);



