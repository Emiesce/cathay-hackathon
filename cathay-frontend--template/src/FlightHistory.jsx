import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useHistory } from 'react-router-dom';

const FlightHistory = ({ flights }) => {
  const history = useHistory();

  return (
    <>
      {flights.map((flight, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              Flight on {flight.date} - Click to view details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Link
              component="button"
              variant="body2"
              onClick={() => history.push(`/flight/${index}`)} // Navigate to flight snapshot
            >
              View Snapshot
            </Link>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default FlightHistory;