import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import IconButton from '@mui/material/IconButton'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Document, Page, pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const classes = {
  root: {
    margin: '20px 10% 0 10%',
    position: 'relative',
    overflow: 'hidden'
  },
  navbar: {
    display: 'flex',
    position: 'absolute',
    bottom: '20px',
    right: 0,
    left: 0,
    justifyContent: 'center',
    zIndex: 2
  },
  nav: {
    display: 'flex',
    maxWidth: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default function PDF ({ src }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [hover, setHover] = useState(false)

  function onDocumentLoadSuccess ({ numPages }) {
    setNumPages(numPages)
  }

  function changePage (offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset)
  }

  function previousPage () {
    changePage(-1)
  }

  function nextPage () {
    changePage(1)
  }
  return (
        <Card elevation={6} sx={classes.root} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
            <CardContent>
                <Document
                    file={`${process.env.REACT_APP_BACKEND_URL}${src}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="pdf-doc"
                >
                    <Page className='pdf-page' pageNumber={pageNumber || 1} />
                </Document>
                {hover
                  ? <Box sx={classes.navbar}>
                        <Fade in={hover} timeout={700}>
                            <Card elevation={8} sx={classes.nav}>
                                <IconButton
                                    disabled={pageNumber <= 1}
                                    onClick={previousPage}
                                >
                                    <ArrowBackIosIcon />
                                </IconButton>
                                    <Typography component="body1" sx={classes.navtext}>Page {pageNumber} of {numPages}</Typography>
                                <IconButton
                                    disabled={pageNumber >= numPages}
                                    onClick={nextPage}
                                >
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </Card>
                        </Fade>
                    </Box>
                  : null
                }
        </CardContent>
        </Card>
  )
}
