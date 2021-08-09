import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([])

  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
  const COLORS = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'];
  
  const getData = () => {
    const data = genres.map(genre => {
      const value = events.filter(({ summary }) => summary.replace(/,/g, '').split(' ').includes(genre)).length
      return {
        name: genre,
        value: value
      }
    });
    return data;
  }

  useEffect(() => {
    setData(() => getData());
  }, [events]);

  return (
    <ResponsiveContainer width="100%" height={ 400 }>
      <PieChart>
        <Pie
          data={ data }
          cx={ 200 }
          cy={ 200 }
          labelLine={ false }
          outerRadius={ 80 }
          fill="#8884d8"
          dataKey="value"
          label={ ({ name, percent }) => (`${name} ${(percent *100).toFixed(0)}%`) }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default EventGenre;