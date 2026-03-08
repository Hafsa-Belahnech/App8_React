import { useState, useEffect } from 'react';

//Ce composant télécharge des articles, affiche une liste de titres et un message « Chargement... » pendant la requête 

//useState : "posts" contiendra les articles, et "loading" indique si la requête est en cours
function FetchData() {
  const [posts, setPosts] = useState([]);      
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     
  const [refresh, setRefresh] = useState(0); // État pour forcer la recharge


  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      // .slice(0, 10) pour afficher 10 articles
      .then(data => setPosts(data.slice(0, 10)))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [refresh]); //Se relance quand 'refresh' change

  if (loading) return <div className="loader">Chargement des articles...</div>;

  return (
    <div className="card">
      <div className="card-header">
        <h2>Articles (Fetch)</h2>
        {/* Bouton de recharge */}
        <button className="btn-refresh" onClick={() => setRefresh(prev => prev + 1)}>🔄</button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
//useEffect se lance automatiquement quand le composant apparaît.
//fetch() fait la requête HTTP.
//then() traite la réponse.
//catch() capture les erreurs.
//finally() indique que c’est terminé.

export default FetchData;