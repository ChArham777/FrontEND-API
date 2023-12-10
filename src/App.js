import './App.css';
import ApiDataFetch from './Components/DataFetch';
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  return (
    <>
    Arham
   <BrowserRouter>
    
         <Routes>
          <Route exact path = "/" element={<ApiDataFetch />} />
          
         </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
