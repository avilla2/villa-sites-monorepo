import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Slide from '@mui/material/Slide'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import CustomButton from '../../shared/Button'

const classes = {
  root: (theme) => ({
    margin: 'auto 5vw'
  }),
  flexBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}

/**
 * SingleCard component - Renders a single card with optional overlay style
 * @typedef {Object} CardGroupCardProps
 * @property {string} params.Color - Text color of the card
 * @property {boolean} params.active - Whether the card is active (for overlay style)
 * @property {function} params.setActiveCard - Function to set the active card
 */

/**
 * SingleCard component - Renders a single card with optional overlay style
 * @param {CardGroupCard & CardGroupCardProps} props
 * @returns {JSX.Element} The SingleCard component
 */
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
          backgroundSize: 'cover',
          position: 'relative',
          ...(Image && { backgroundImage: `url('${Image.url}')` }),
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
                <CustomButton
                  color={ButtonColor}
                  buttonStyle='outlined'
                  mobile
                  link={Link}
                >
                {ButtonText}
              </CustomButton>
              }
            </CardActions>
          </Card>
        </Slide>
      </Card>
    )
  }
  return (
    <Card sx={{
      color: Color,
      backgroundColor: CardColor,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {Image.url &&
        <CardMedia
          sx={{ height: 140 }}
          image={Image.url}
          title={Image.alternativeText}
        />
      }
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {Title}
        </Typography>
        {Text && (
          <BlocksRenderer content={Text} />
        )}
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        {Link &&
          <CustomButton
            color={ButtonColor}
            buttonStyle='outlined'
            mobile
            link={Link}
          >
            {ButtonText}
          </CustomButton>
        }
      </CardActions>
    </Card>
  )
}

/**
 * Cards component - Renders a set of cards based on provided content
 * @param {Object} props - Cards props
 * @param {CardGroupComponent} props.content - Cards content object
 * @returns {JSX.Element} The Cards component
 */
export default function CardGroup ({ content }) {
  const [activeCard, setActiveCard] = React.useState(-1)
  return (
    <Box sx={classes.root} style={content?.Title && { marginTop: '18px' }}>
      <Grid container columnSpacing={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 10 }} rowSpacing={4} sx={{ justifyContent: 'center', alignItems: 'stretch' }}>
        {content.Cards.map((card, index) => (
            <Grid
              key={index}
              size={content.fullWidth
                ? {
                    xl: content.Cards.length < 3 ? 12 / content.Cards.length : 4,
                    md: 6,
                    xs: 12
                  }
                : {
                    xs: 12,
                    sm: 6,
                    md: 4,
                    lg: 4,
                    xl: 3
                  }}
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
