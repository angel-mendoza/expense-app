import { useState } from 'react';
// MUI
import { Fab, Stack, Box, Grow, Button, ButtonGroup, TextField } from '@mui/material';

//Icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

//components
import Modal from '../utils/Modal';

//hook
import {useGlobalState } from '../../context/GlobalState';

const INITIAL_TRANSACTION = {
  description: '',
  amount: 0,
  type: null,
  id: null,
  date: null
}

const TransactionForm = () => {
  /*-------- state --------*/
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [transaction, setTransaction] = useState(INITIAL_TRANSACTION)

  /*-------- hooks --------*/
  const {addTransaction} = useGlobalState()

  /*-------- functions --------*/
  const handleToggleAction = () => setOpen(!open);

  const handleOpenModal = (value) => {
    setTransaction(prevState => {
      return {
        ...prevState,
        type: value,
        id: window.crypto.randomUUID(),
        date: new Date()
      }
    })
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setOpen(false)
    setTransaction(INITIAL_TRANSACTION)
  }

  const handleChangeInput = (element, value) => {
    switch (element) {
      case 'description':
        setTransaction(prevState => {
          return {
            ...prevState,
            description: value
          }
        })
        break;

      case 'amount':
        setTransaction(prevState => {
          return {
            ...prevState,
            amount: value
          }
        })
        break;

      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addTransaction(transaction)
    handleCloseModal()
  }
  return (
    <>
      <Modal
        show={openModal}
        title={`Add your ${transaction.type}`}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      >
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1,  },
          }}
          autoComplete="off"
        >
          <div>
            <TextField
              defaultValue=""
              fullWidth
              placeholder='Add description'
              multiline
              rows={4}
              onChange={(e) => handleChangeInput('description', e.target.value)}
              />
            <TextField
              fullWidth
              type='number'
              defaultValue={0.0}
              onChange={(e) => handleChangeInput('amount', e.target.value)}
            />
          </div>
        </Box>
      </Modal>
      <Grow in={open}>
        <Box sx={{
          position: 'fixed',
          right: 85,
          bottom: 30
        }}>
          <ButtonGroup>
          <Button variant='contained'  color='error' onClick={() => handleOpenModal('Expense')}>Add Expense</Button>
          <Button variant='contained' color='success' onClick={() => handleOpenModal('Income')}>Add Income</Button>
          </ButtonGroup>
        </Box>
      </Grow>
      <Stack
        sx={{
          position: 'fixed',
          right: 20,
          bottom: 20
        }}
      >
        <Fab color="primary" aria-label="add" onClick={handleToggleAction}>
          {open ? (<KeyboardArrowRightIcon />) : (<KeyboardArrowLeftIcon />)}
        </Fab>
      </Stack>
    </>
  )
}

export default TransactionForm;