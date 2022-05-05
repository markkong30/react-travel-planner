import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip, Rating } from '@mui/material';
import { LocationOn, Phone, } from '@mui/icons-material';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (!place.photo || !place.name) {
    return;
  }

  if (selected && refProp !== undefined && refProp.current !== null) {
    refProp.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <Card elevation={1} sx={{
      display: 'flex', justifyContent: 'center', alignItems
        : 'center', flexDirection: { xs: "column", md: "row" }, height: '100%'
    }}>
      <CardMedia
        sx={{ width: { xs: '100%', md: '40%' }, height: '100%', }}
        image={place.photo.images.large.url}
      />
      <Box sx={{ width: { xs: '100%', md: '60%' }, gap: 2, pt: 1, pl: 1 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant='h6' color='primary'>{place.name}</Typography>
          <Box display='flex' mb={1}>
            <Rating value={Number(place.rating)} precision={0.5} readOnly />
            <Typography fontSize={14} color='secondary' ml={1} gutterBottom>{`(${place.num_reviews})`}</Typography>
          </Box>
          <Box display='flex' justifyContent='space-between'>
            <Typography fontSize={14}>Price</Typography>
            <Typography fontSize={14} gutterBottom>{place.price_level}</Typography>
          </Box>
          <Box display='flex' justifyContent='space-between'>
            <Typography fontSize={14} >Ranking</Typography>
            <Typography fontSize={14} gutterBottom>{`#${place.ranking_position} of ${place.ranking_denominator}`}</Typography>
          </Box>
          {place.awards?.slice(0, 1).map((award, i) => (
            <Box display='flex' justifyContent={'space-between'} alignItems={'center'} key={i}>
              <img src={award.images.small} alt={award.display_name} height={20} />
              <Typography variant='caption' color='textSecondary'>{award.display_name}</Typography>
            </Box>
          ))}
          <Box display='flex' alignItems={'center'} color='primary.light' flexWrap={'wrap'} columnGap={2} rowGap={1} mt={1} >
            {place.cuisine?.map(({ name }) => (
              <Chip key={name} size='small' label={name} width={'100%'} />
            ))}
          </Box>

          {place.address &&
            <Box display='flex' gap={1} alignItems={'center'} color='primary.light' mt={3}>
              <LocationOn sx={{ ml: '-3.5px' }} />
              <Typography variant='body2' noWrap >
                {/* {place.address.split(',').slice(0, place.address.split(',').length - 1).join(',')} */}
                {`${place.address_obj.street1}, ${place.address_obj.city}`}
              </Typography>
            </Box>
          }

          <CardActions sx={{ padding: 0, pt: 1 }}>
            <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
              Trip Advisor
            </Button>
            <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
              Website
            </Button>
          </CardActions>
        </CardContent>
      </Box >

    </Card >
  );
};

export default PlaceDetails;