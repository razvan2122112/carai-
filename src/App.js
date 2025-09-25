import React, { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'une réponse AI (à remplacer par votre API)
    setTimeout(() => {
      setResponse(`Voici une réponse concernant votre question sur l'automobile: "${question}"`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚗 CarAI Assistant</h1>
        <p>Votre assistant intelligent pour toutes vos questions automobiles</p>
      </header>

      <main className="App-main">
        <form onSubmit={handleSubmit} className="question-form">
          <div className="input-group">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Posez votre question sur l'automobile..."
              rows="4"
              required
            />
          </div>
          <button type="submit" disabled={isLoading || !question.trim()}>
            {isLoading ? '🔄 Analyse en cours...' : '🤖 Demander à CarAI'}
          </button>
        </form>

        {response && (
          <div className="response-section">
            <h3>Réponse de CarAI :</h3>
            <div className="response-box">
              {response}
            </div>
          </div>
        )}

        <div className="features">
          <h3>Fonctionnalités à venir :</h3>
          <ul>
            <li>🔧 Diagnostic de pannes</li>
            <li>🛠️ Conseils de maintenance</li>
            <li>💰 Estimation de réparations</li>
            <li>📋 Historique des questions</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
