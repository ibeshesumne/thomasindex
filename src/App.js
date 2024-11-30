import logo from './logo.svg';
import './App.css';

/**
 * The App component serves as the main entry point of the application.
 * It renders a simple UI with a logo, a paragraph, and a link to the React website.
 * The link opens in a new tab without affecting the current page.
 */

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="flex items-center justify-center h-screen bg-blue-500">
        <h1 className="text-white text-4xl font-bold">Hello, Tailwind CSS!</h1>
      </div>
    </div>
  );
}

export default App;
