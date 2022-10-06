
import { Grid, TextField } from '@material-ui/core'
import { ReactElement } from 'react'

import React from 'react'

export const ContactFormFields = (
): ReactElement => {
  return (
    <>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="fullName"
          label="Họ và tên" />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>

        <TextField
          name="email"
          label="Email" />
      </Grid>

      <Grid item md={6} sm={12} xs={12}>

        <TextField
          name="phone"
          label="Điện thoại" />
      </Grid>

      <Grid item md={6} sm={12} xs={12}>

        <TextField
          name="address"
          label="Địa chỉ" />
      </Grid>
    </>
  )
}
