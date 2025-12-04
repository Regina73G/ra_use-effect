import { useEffect, useState } from 'react';
import type { User } from '../App';

interface ListProps {
  selected?: User | null;
  onSelect: (user: User) => void;
}

export default function List({selected, onSelect}: ListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async() => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json');

        if (!response.ok) {
          throw new Error("Ошибка загрузки списка");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error: unknown) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <div className="user-list loading">Загрузка списка…</div>;
  if (error) return <div className="user-list error">{error}</div>;
  
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li 
          key={user.id} 
          className={selected?.id === user.id ? "user-list_item active" : "user-list_item"}
          onClick={()=> selected?.id === user.id ? null : onSelect(user)}
        >
          {user.name}
        </li>
      ))}
    </ul>
  )
}