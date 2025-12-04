import { useEffect, useState } from 'react';
import type { User } from '../App';

interface Data {
  id: number;
  name: string;
  avatar: string;
  details: {
    city: string;
    company: string;
    position: string;
  }
}

interface DetailsProps {
  info: User | null;
}

export default function Details({info}: DetailsProps) {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!info) {
      return
    }

    const load = async() => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`);

        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }

        const obj = await response.json();
        setData(obj);
      } catch (error: unknown) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [info?.id]);

  if (!info) return null;
  if (loading) return <div className="user-details loading">Загрузка данных…</div>;
  if (error) return <div className="user-details error">{error}</div>;
  if (!data) return null;

  return (
    <div className="user-details">
      <img className="user-details_avatar" src={data.avatar} alt="" />
      <div className="user-details_info">
        <div className="user-details_info-item name">{data.name}</div>
        <div className="user-details_info-item">City: {data.details.city}</div>
        <div className="user-details_info-item">Company: {data.details.company}</div>
        <div className="user-details_info-item">Position: {data.details.position}</div>
      </div>
    </div>
  )
}