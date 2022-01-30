// Styles
import styles from "./App.module.css";
// Components
import Header from "./components/Header/Header.js";

function App() {
  return (
    <div id={styles.weatherApp}>
      <Header />
    </div>
  );
}

export default App;
