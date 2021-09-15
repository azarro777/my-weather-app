import { Line } from 'react-chartjs-2';

export const DiagramView = ({ tempData }) => {
  const aboveZero = 'rgb(255, 99, 132, 0.5)';
  const lassZero = 'rgb(91, 140, 255, 0.5)';
  const isCold = tempData.main.temp > 0 ? aboveZero : lassZero;

  const data = {
    labels: ['12', '13', '14', '15', '16', '17'],
    datasets: [
      {
        label: 'above zero',
        data: [12, 19, 3, 5, 2, 3],
        fill: true,
        height: '50px',
        backgroundColor: isCold,
        borderColor: 'rgba(255, 99, 132, 0.2)'
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return (
    <>
      <div className='header'>
        {/* <h1 className='title'>Line Chart</h1> */}
        <div className='links'>
          <a
            className='btn btn-gh'
            href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
          >
            {/* Github Source */}
          </a>
        </div>
      </div>
      <Line data={data} options={options} height={90} width={300} />
    </>
  );
};
