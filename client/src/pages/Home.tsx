import AddWilderForm from "../components/AddWilderForm/AddWilderForm";
import WildersList from "../components/WildersList/WildersList";

const Home = () => {
  return (
    <main className="container">
      <WildersList />
      <AddWilderForm />
    </main>
  );
};

export default Home;
