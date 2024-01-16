import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SingleContactPage from "./components/SingleContactPage";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "./components/NotFound";
import AddGroup from "./components/AddGroup";


function App() {


  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts/:contactId" element={<SingleContactPage />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/edit-contact/:contactId" element={<EditContact />} />
        <Route path="/add-group" element={<AddGroup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HelmetProvider>

  );
}

export default App;
