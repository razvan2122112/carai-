import React, { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    
    // Simulation d'une réponse AI
    setTimeout(() => {
      const responses = [
        `Pour votre question "${question}", je recommande de vérifier les éléments suivants...`,
        `Concernant "${question}", voici ce que vous devriez savoir...`,
        `D'après mon analyse de "${question}", la solution pourrait être...`
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setResponse(randomResponse);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚗 CarAI Assistant</h1>
        <p>Votre expert automobile intelligent</p>
      </header>

      <main className="App-main">
        <div className="question-container">
          <form onSubmit={handleSubmit}>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Posez votre question automobile (ex: Pourquoi ma voiture fait du bruit au démarrage ?)"
              rows="4"
              className="question-input"
            />
            <button 
              type="submit" 
              disabled={isLoading || !question.trim()}
              className="submit-btn"
            >
              {isLoading ? '🔄 Analyse...' : '🤖 Demander à CarAI'}
            </button>
          </form>
        </div>

        {response && (
          <div className="response-container">
            <h3>💡 Réponse CarAI :</h3>
            <div className="response-text">
              {response}
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>🔧 Que peut faire CarAI ?</h3>
          <ul>
            <li>Diagnostic de pannes courantes</li>
            <li>Conseils d'entretien</li>
            <li>Explications mécaniques simples</li>
            <li>Recommandations de maintenance</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
