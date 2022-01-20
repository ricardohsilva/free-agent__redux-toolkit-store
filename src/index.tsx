import ReactDOM from "react-dom";
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from './app/shared/redux/store';
import { Provider } from 'react-redux';
import HomePage from "./app/pages/home";
import ProductDetailsPage from "./app/pages/product-details";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product/:id" element={<ProductDetailsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
