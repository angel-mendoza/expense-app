import { useState } from 'react';

// mui
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  ListSubheader,
  IconButton,
  Button,
  Typography
} from '@mui/material';

//components
import Modal from '../utils/Modal';

// icons
import MoneyOffCsredIcon from '@mui/icons-material/MoneyOffCsred';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

//colors
import { red, green } from '@mui/material/colors';

//hooks
import { useGlobalState } from '../../context/GlobalState';
import { formatRelativeTimeToday } from '../../hooks/useFormatDate';

export default function TransactionList() {
  /*-------- state --------*/
  const [lengthTransaction, setLengthTransaction] = useState(5);
  const [transactionSelected, setTransactionSelected] = useState(null);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const {state, deleteTransaction} = useGlobalState()

  const colorIncome = green[100]
  const colorExpense = red[100]

  /*-------- functions --------*/
  const handleClickActionsButton = (type) => {
    if (type === 'more') {
      setLengthTransaction(prevState => {
        return prevState + 5
      })
    } else {
      setLengthTransaction(prevState => {
        return prevState - 5
      })
    }
  }

  const handleSelectTransaction = (idTransaction) => {
    const dataFilter = state.transactions.find(e => e.id === idTransaction)
    if (dataFilter) {
      setTransactionSelected(dataFilter)
      setOpenModalDetail(true)
    }
  }

  const handleCloseModal = () => {
    setTransactionSelected(null)
    setOpenModalDetail(false)
  }

  return (
    <Paper sx={{ width: '100%', height: '100%' }}>
      <List
        subheader={
          <ListSubheader sx={{ zIndex: 0, paddingTop: 2}}>
            <Typography variant='h6'>
              List of your last transactions
            </Typography>
            <Typography variant='body1' color="text.secondary">
              Total transactions: {state.transactions.length}
            </Typography>
          </ListSubheader>
        }
      >
        {state.transactions && state.transactions.length > 0 ? (
          <Box padding={2}>
            {state.transactions.slice(0, lengthTransaction).map(transaction => (
              <ListItem
               key={transaction.id}
               disablePadding
               sx={{
                backgroundColor: transaction.type === "Income" ? colorIncome : colorExpense
               }}
               secondaryAction={
                <>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleSelectTransaction(transaction.id)}>
                    <RemoveRedEyeIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(transaction.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
               >
                <ListItemButton>
                  <ListItemIcon>
                    {transaction.type === "Income" ? <AttachMoneyIcon /> : <MoneyOffCsredIcon />}
                  </ListItemIcon>
                  <ListItemText primary={transaction.description} />
                </ListItemButton>
              </ListItem>
            ))}
            {state.transactions.length >= 5 &&(
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 1
              }}>
                {lengthTransaction < state.transactions.length && (
                  <Button onClick={() => handleClickActionsButton('more')}>
                    Show more
                  </Button>
                )}
                {lengthTransaction > 5 && (
                  <Button color='secondary' onClick={() => handleClickActionsButton('less')}>
                    View less
                  </Button>
                )}
              </Box>
            )}
          </Box>
        ) : (
          <Box padding={2}>
            <Box
              sx={theme => ({
                height: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: `2px dashed ${theme.palette.grey[500]}`,
                color: theme.palette.grey[500],
                backgroundColor: theme.palette.grey[100]
              })}
            >
              No Data
            </Box>
          </Box>
        )}
      </List>
      <Modal
        show={openModalDetail}
        onClose={handleCloseModal}
      >
        {transactionSelected && (
          <Box>
            <Typography variant='body1' color="text.secondary">
              {formatRelativeTimeToday(transactionSelected.date)}
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={(theme) => ({
                color: transactionSelected.type === 'Income' ?  theme.palette.success.main : theme.palette.error.main,
                fontWeight: 'bolder',
                marginBottom: 1
              })}
            >
              ${transactionSelected.amount}
            </Typography>
            <Typography variant='h6' >
              {transactionSelected.description}
            </Typography>
          </Box>
        )}
      </Modal>
    </Paper>
  );
}