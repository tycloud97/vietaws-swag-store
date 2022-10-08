
import { Grid, TextField, Typography } from '@material-ui/core'
import { ReactElement } from 'react'

import React from 'react'
import { InsetSpacing } from 'components/Spacing'

export const ContactFormFields = (
): ReactElement => {
  return (
    <InsetSpacing scale={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6'>
            Thông tin khách hàng
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            required
            fullWidth
            name="fullName"
            label="Họ và tên" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            required
            type='email'
            fullWidth
            name="email"
            label="Email" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            required
            fullWidth
            name="phone"
            label="Điện thoại" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant='outlined'
            fullWidth
            name="address"
            label="Địa chỉ" />
        </Grid>
      </Grid>
    </InsetSpacing>
  )
}
