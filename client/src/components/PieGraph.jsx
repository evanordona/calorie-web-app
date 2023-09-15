import React from 'react';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const PieGraph = ({ user }) => {
  const data = {
    labels: ['Consumed', 'Remaining'],
    datasets: [
      {
        data: [user.table.total, user.goal - user.table.total],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div>
      <h2>Calorie Progress</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieGraph;