import { Container, Box } from '@mui/material';
import TransactionForm from "./components/transaction/TransactionForm";
import Balance from "./components/Balance";

import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      {/* <Head /> */}
      <Container>
        <Box paddingX={2} paddingY={4}>
          <Balance />
          <TransactionForm />
        </Box>
      </Container>
    </GlobalProvider>
  );
}

export default App;
