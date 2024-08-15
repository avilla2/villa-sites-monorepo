import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '../pageFeatures/button'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Slide from '@mui/material/Slide'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

const classes = {
  root: (theme) => ({
    margin: theme.spacing(3, 3)
  }),
  flexBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}

const SingleCard = ({
  Image,
  Title,
  Text,
  ButtonText,
  ButtonColor,
  CardColor,
  CardStyle,
  Color,
  active,
  setActiveCard,
  Link
}) => {
  const containerRef = React.useRef()

  if (CardStyle === 'overlay') {
    return (
      <Card
        ref={containerRef}
        sx={{
          height: '100%',
          color: Color,
          minHeight: 275,
          backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}${Image.data.attributes.url}')`,
          position: 'relative',
          ...classes.flexBox
        }}
        onClick={setActiveCard}
      >
        { !active && (
          <CardContent sx={{ position: 'absolute' }}>
            <Typography gutterBottom variant="h6" component="div">
              {Title}
            </Typography>
          </CardContent>
        )}
        <Slide direction='right' in={active} container={containerRef.current}>
          <Card
            sx={{
              color: Color,
              backgroundColor: CardColor,
              position: 'relative',
              height: '100%',
              width: '100%',
              padding: 2,
              ...classes.flexBox
            }}
          >
            <CardContent>
              <BlocksRenderer content={Text} />
            </CardContent>
            <CardActions>
              {Link && 
                <Button
                  color={ButtonColor}
                  buttonStyle='outlined'
                  mobile
                  link={Link}
                >
                {ButtonText}
              </Button>
              }
            </CardActions>
          </Card>
        </Slide>
      </Card>
    )
  }
  return (
    <Card sx={{ color: Color, backgroundColor: CardColor, height: '100%' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`${process.env.REACT_APP_BACKEND_URL}${Image.data.attributes.url}`}
        title={Image.data.attributes.alternativeText}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {Title}
        </Typography>
          <BlocksRenderer content={Text} />
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        {Link && 
          <Button
            color={ButtonColor}
            buttonStyle='outlined'  
            mobile
            link={Link}
          >
            {ButtonText}
          </Button>
        }
      </CardActions>
    </Card>
  )
}

export default function CardGroup ({ content }) {
  const [activeCard, setActiveCard] = React.useState(-1)
  return (
    <Box sx={classes.root}>
      <Grid container columnSpacing={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 10 }} rowSpacing={4} justifyContent='center' alignItems='stretch'>
        {content.Cards.map((card, index) => (
            <Grid
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={3}
              item
              sx={{ textAlign: content.Style.textAlign }}>
              <SingleCard
                {...card}
                Color={content.Style.TextColor}
                setActiveCard={() => setActiveCard(index)}
                active={index === activeCard}
              />
            </Grid>
        ))}
      </Grid>
    </Box>
  )
}
