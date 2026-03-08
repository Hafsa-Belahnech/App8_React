
//  C'est similaire à fetch mais plus simple avec Axios
import { useState, useEffect } from 'react';
import axios from 'axios';

function AxiosData() {
  const [users, setUsers] = useState([]);        
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);   
  const [refresh, setRefresh] = useState(0); //Actualisation
   
   useEffect(() => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [refresh]);

  if (loading) return <div className="loader">Chargement des utilisateurs...</div>;

  return (
    <div className="card">
      <div className="card-header">
        <h2>Utilisateurs (Axios)</h2>
        <button className="btn-refresh" onClick={() => setRefresh(prev => prev + 1)}>🔄</button>
      </div>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <strong>{user.name}</strong> 
            {/*Ajout de la ville */}
            <span className="city">📍 {user.address.city}</span>
            <div className="email">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AxiosData;