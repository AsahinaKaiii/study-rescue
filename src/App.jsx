import Dashboard from "./pages/Dashboard";

function App() {
  function handleAddAssignment() {
    alert("Add Assignment page coming next!");
  }

  return (
    <Dashboard
      onAddAssignment={handleAddAssignment}
    />
  );
}

export default App;