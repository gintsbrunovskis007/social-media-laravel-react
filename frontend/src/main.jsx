import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppProvider from "./Context/AppContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <App />
  </AppProvider>,
);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
