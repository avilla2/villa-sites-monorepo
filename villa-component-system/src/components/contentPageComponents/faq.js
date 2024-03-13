import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import AnimationProvider from '../utils/animationProvider'

const classes = {
  root: (theme) => ({
    margin: theme.spacing(3, 3)
  }),
  accordion: (theme) => ({
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(0, 20)

    }
  })
}

export default function Faq ({ content }) {
  return (
    <Box sx={classes.root}>
        <AnimationProvider animation={content?.Style?.Animation} direction="up">
            <Box sx={classes.accordion}>
                {content.Entry.map((entry, index) => {
                  return (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id={`accordian-${content.id}-${index}`}
                        >
                            <Typography>{entry.Title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {entry.Body}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                  )
                })}
            </Box>
        </AnimationProvider>
    </Box>
  )
}
