import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../../common/components/Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Dollars Spend</Title>
      <Typography component="p" variant="h4">
        $304.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 26 August, 2022
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}