//mui
import { SwipeableDrawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText  } from '@mui/material';

//icon
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const Sidebar = ({
  show,
  handleOpenBar,
  handleCloseBar,
}) => {
  return (
    <SwipeableDrawer
    anchor="left"
    open={show}
    onClose={handleCloseBar}
    onOpen={handleOpenBar}
  >
    <Box
      role="presentation"
      sx={{
        width: 300,
        padding:2
      }}
    >
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CurrencyExchangeIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  </SwipeableDrawer>
  );
}

export default Sidebar;