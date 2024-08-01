
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Provider } from 'react-redux';
// @ts-ignore
import {store } from "./redux/store";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>


    <App />
    <ToastContainer />

    </LocalizationProvider>
    </Provider>
    

  </>
);
