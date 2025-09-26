import React, { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  // Base de connaissances automobiles simple
  const getCarAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('bruit') || lowerQuestion.includes('son')) {
      return "🔊 Les bruits de voiture peuvent indiquer : 1) Problème de courroie (sifflement), 2) Plaquettes de frein usées (grincement), 3) Roulements défaillants (bourdonnement). Je recommande une inspection rapide chez un mécanicien.";
    }
    
    if (lowerQuestion.includes('voyant') || lowerQuestion.includes('témoin')) {
      return "⚠️ Les voyants d'alerte nécessitent attention immédiate. Voyant moteur = problème électronique, Voyant huile = niveau/pression huile, Voyant batterie = problème de charge. Consultez votre manuel ou un professionnel.";
    }
    
    if (lowerQuestion.includes('vidange') || lowerQuestion.includes('huile')) {
      return "🛢️ La vidange doit être faite tous les 10 000-15 000 km selon le type d'huile. Huile synthétique dure plus longtemps. Vérifiez le niveau régulièrement avec la jauge. Une huile noire ou épaisse doit être changée.";
    }
    
    if (lowerQuestion.includes('batterie') || lowerQuestion.includes('démarrage')) {
      return "🔋 Problèmes de batterie courants : démarrage difficile, voyants faibles, corrosion sur les bornes. Durée de vie : 3-5 ans. Testez la tension (12.6V moteur éteint). Nettoyez les bornes régulièrement.";
    }
    
    if (lowerQuestion.includes('pneu') || lowerQuestion.includes('roue')) {
      return "🛞 Entretenez vos pneus : Vérifiez la pression mensuelle, contrôlez l'usure (témoins d'usure), rotation tous les 10 000 km. Pression incorrecte = usure prématurée et consommation accrue.";
    }
    
    if (lowerQuestion.includes('frein') || lowerQuestion.includes('freinage')) {
      return "🛑 Signes d'usure des freins : grincement, vibration au freinage, pédale molle. Plaquettes à changer tous les 30 000-50 000 km. Ne jamais ignorer les bruits de freinage !";
    }
    
    // Réponse générale
    return `🤖 Concernant "${question}", je vous recommande de consulter votre manuel du propriétaire ou un mécanicien qualifié pour un diagnostic précis. La sécurité routière est prioritaire !`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    
    // Simulation d'un délai de traitement AI
    setTimeout(() => {
      const aiResponse = getCarAIResponse(question);
      setResponse(aiResponse);
      
      // Ajouter à l'historique
      setChatHistory(prev => [...prev, 
        { type: 'question', text: question, timestamp: new Date() },
        { type: 'response', text: aiResponse, timestamp: new Date() }
      ]);
      
      setQuestion(''); // Vider le champ
      setIsLoading(false);
    }, 1200);
  };

  const clearHistory = () => {
    setChatHistory([]);
    setResponse('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚗 CarAI Assistant</h1>
        <p>Votre expert automobile intelligent</p>
        <div className="stats">
          <span>💬 {Math.floor(chatHistory.length / 2)} questions résolues</span>
        </div>
      </header>

      <main className="App-main">
        <div className="question-container">
          <form onSubmit={handleSubmit}>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Décrivez votre problème automobile... (ex: Ma voiture fait un bruit étrange au démarrage)"
              rows="3"
              className="question-input"
            />
            <div className="button-group">
              <button 
                type="submit" 
                disabled={isLoading || !question.trim()}
                className="submit-btn"
              >
                {isLoading ? '🔄 Analyse en cours...' : '🤖 Demander à CarAI'}
              </button>
              {chatHistory.length > 0 && (
                <button 
                  type="button" 
                  onClick={clearHistory}
                  className="clear-btn"
                >
                  🗑️ Effacer l'historique
                </button>
              )}
            </div>
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

        {chatHistory.length > 0 && (
          <div className="history-container">
            <h3>📋 Historique des consultations :</h3>
            <div className="history-list">
              {chatHistory.filter(item => item.type === 'question').map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-question">
                    <strong>Q{index + 1}:</strong> {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>🔧 Domaines d'expertise CarAI :</h3>
          <div className="expertise-grid">
            <div className="expertise-item">🔊 Diagnostics sonores</div>
            <div className="expertise-item">⚠️ Voyants d'alerte</div>
            <div className="expertise-item">🛢️ Entretien moteur</div>
            <div className="expertise-item">🔋 Système électrique</div>
            <div className="expertise-item">🛞 Pneumatiques</div>
            <div className="expertise-item">🛑 Système de freinage</div>
          </div>
          
          <div className="disclaimer">
            <p><strong>⚠️ Avertissement :</strong> CarAI fournit des conseils généraux. Pour tout problème de sécurité ou diagnostic précis, consultez toujours un professionnel qualifié.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
