import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import { WildersProvider } from "./utils/context/wildersContext";

function App() {
  return (
    <div className="App">
      <Header />
      <WildersProvider>
        <Home />
      </WildersProvider>
      <Footer />
    </div>
  );
}

export default App;
