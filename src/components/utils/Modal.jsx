import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export default function Modal({ show, onClose, children, title, onSubmit }) {
  return (
    <>
      <Dialog
        maxWidth={'md'}
        open={show}
        onClose={onClose}
      >
        {title && (
          <DialogTitle>{title}</DialogTitle>
        )}
        <DialogContent sx={{ minWidth: 250}}>
          <Box>
            {children}
          </Box>
        </DialogContent>
        <DialogActions>
          {onClose && (
            <Button variant='outlined' color='secondary' onClick={onClose}>Close</Button>
          )}
          {onSubmit && (
            <Button variant='contained' color='primary' onClick={onSubmit}>Submit</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}