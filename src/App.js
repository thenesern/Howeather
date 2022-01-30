// Styles
import styles from "./App.module.css";
// Components
import Header from "./components/Header/Header.js";
import Main from "./components/Main/Main.js";

function App() {
  return (
    <div id={styles.weatherApp}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
