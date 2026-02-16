import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Slide from '@mui/material/Slide'

const style = (theme) => ({
  position: 'absolute',
  bgcolor: 'background.paper',
  p: 3,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box'
  },
  [theme.breakpoints.up('sm')]: {
    border: '2px solid #000',
    boxShadow: 24,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: 400,
    height: 'fit-content'
  }
})

/**
 * CustomModal component - Renders a modal with slide transition
 * @param {Object} props - CustomModal props
 * @param {boolean} props.open - Whether the modal is open
 * @param {Function} props.handleClose - Function to handle closing the modal
 * @param {React.ReactNode} props.children - Content to be displayed inside the modal
 * @returns {JSX.Element} The CustomModal component
 */
export default function CustomModal ({ open, handleClose, children }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Slide direction='up' in={open}>
        <Box sx={style}>
          {children}
        </Box>
      </Slide>
    </Modal>
  )
}
