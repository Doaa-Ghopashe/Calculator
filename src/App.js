import './App.css';
import Calculator from './components/Calculator';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calculator/>
      </header>
    </div>
  );
}

export default App;
