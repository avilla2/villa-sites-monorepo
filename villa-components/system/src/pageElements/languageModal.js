import React from 'react'
import Grid from '@mui/material/Grid'
import Modal from '../components/pageFeatures/modal'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import { styled } from '@mui/material/styles'
import ButtonBase from '@mui/material/ButtonBase'

const LanguageButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'fontColor'
})(({ theme, fontColor }) => ({
  fontSize: '1.25rem',
  backgroundColor: theme.palette.info.main,
  color: fontColor,
  width: '100%',
  padding: '16px 24px',
  justifyContent: 'flex-start',
  borderRadius: 8
}))

/**
 * LanguageModal component - Renders a modal for language selection
 * @param {Object} props LanguageModal props
 * @param {boolean} props.open - Whether the modal is open
 * @param {function} props.handleClose - Function to close the modal
 * @param {Locales[]} props.options - Array of locale options
 * @param {string} props.fontColor - Font color for language buttons
 * @returns {JSX.Element} The LanguageModal component
 */
export default function LanguageModal ({ open, options, handleClose, fontColor }) {
  return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid>
                    <Typography variant='h5'>Language</Typography>
                </Grid>
                <Grid>
                    <IconButton
                        size='large'
                        onClick={handleClose}
                        sx={{ p: 0 }}
                    >
                        <CancelIcon fontSize='large'/>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container direction="column" sx={{ pt: 4, pr: 2, gap: 2 }}>
                {options.map(({ code, name }, index) => (
                    <Grid key={index}>
                        <LanguageButton
                            fontColor={fontColor}
                            href={`/${code === 'en' ? '' : code}`}
                        >
                            {name}
                        </LanguageButton>
                    </Grid>
                ))}
            </Grid>
        </Modal>
  )
}
