import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
// "exports": {
//   ".": {
//     "import": {
//       "types": "./dist/index.d.mts",
//       "default": "./dist/index.mjs"
//     },
//     "require": {
//       "types": "./dist/index.d.ts",
//       "default": "./dist/index.js"
//     }
//   }
// }
