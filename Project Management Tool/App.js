import React from 'react';
import ProjectList from './ProjectList';
import TaskList from './TaskList';

function App() {
  return (
    <div>
      <h1>Project Management Tool</h1>
      <ProjectList />
      {/* Example projectId can be dynamically passed */}
      <TaskList projectId="60d5ec49f8d2e916e8f36b1a" />
    </div>
  );
}

export default App;
