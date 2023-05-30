//MUI
import { Grid, Typography, Card, CardContent, Box } from '@mui/material';

//hooks
import { useGlobalState } from '../context/GlobalState';

//components
import TransactionList from "./transaction/TransactionList";

// chart
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Balance = () => {
  const data = useGlobalState()
  let totalIncome = 0

  data.state.transactions.forEach(transaction => {
    if (transaction.type === "Income") {
      totalIncome = totalIncome + parseFloat(transaction.amount)
    }
  })

  let totalExpense = 0
  data.state.transactions.forEach(transaction => {
    if (transaction.type === "Expense") {
      totalExpense = totalExpense + parseFloat(transaction.amount)
    }
  })

  const totalBalance = totalIncome + totalExpense

  const totalExpensePercent = Math.round((totalExpense * 100) / totalBalance)
  const totalIncomePercent = Math.round((totalIncome * 100) / totalBalance)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const dataChart = {
    labels: ['Income', 'Expense',],
    datasets: [
      {
        label: '% of Balance',
        data: [totalIncomePercent, totalExpensePercent],
        backgroundColor: [
          'rgba(46, 125, 50, 0.4)',
          'rgba(211, 47, 47, 0.4)',
        ],
        borderColor: [
          'rgba(46, 125, 50, 1)',
          'rgba(211, 47, 47, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Grid container spacing={2} marginBottom={2}>
      <Grid item xs={12} md={6}>
        <Card
          sx={(theme) => ({
            borderLeft: `3px solid ${theme.palette.success.main}`,
          })}
        >
          <CardContent>
            <Typography
              variant='h6'
              sx={(theme) => ({
                color: theme.palette.success.light
              })}
            >
              Income
            </Typography>
            <Typography variant='h4'>
              ${totalIncome}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          sx={(theme) => ({
            borderLeft: `3px solid ${theme.palette.error.main}`,
          })}
        >
          <CardContent>
            <Typography
              variant='h6'
              sx={(theme) => ({
                color: theme.palette.error.light
              })}
            >
              Expense
            </Typography>
            <Typography variant='h4'>
              ${totalExpense}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card  sx={{height: "100%"}}>
          <CardContent>
            <Typography variant='h6' color="text.secondary">
              Balance graph
            </Typography>
            <Box sx={{ maxHeight: '300px', display: 'flex', justifyContent: 'center' }}>
              <Pie options={options} data={dataChart}  />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <TransactionList />
      </Grid>
    </Grid>
  );
}

export default Balance;