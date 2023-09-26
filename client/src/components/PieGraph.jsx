import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const PieGraph = ({ user }) => {
  
  const [pieData, setPieData] = useState({
    labels: ['Consumed', 'Remaining'],
    datasets: [
      {
        data: [user.table.total, user.goal - user.table.total],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  });

  // Use useEffect to update the pieData when user or user.table changes
  useEffect(() => {
    if (user && user.table) {
      const newData = {
        labels: ['Consumed', 'Remaining'],
        datasets: [
          {
            data: [user.table.total, user.goal - user.table.total],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB'],
          },
        ],
      };

      setPieData(newData);
    }
  }, [user.goal, user.table]);

  return (
    <div>
      <h2>Calorie Progress</h2>
      <Pie data={pieData} />
    </div>
  );
};

export default PieGraph;