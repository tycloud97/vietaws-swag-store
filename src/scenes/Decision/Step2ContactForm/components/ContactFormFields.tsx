
import { Grid, TextField, Typography } from '@material-ui/core'
import { ReactElement } from 'react'

import React from 'react'
import { InsetSpacing } from 'components/Spacing'
import { RootState } from 'services/redux/rootReducer'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import DeliveryAddressSlice from 'services/redux/actionsAndSlicers/DeliveryAddressSlice'
import ContactSlice from 'services/redux/actionsAndSlicers/ContactSlice'

export const ContactFormFields = (
): ReactElement => {
	const {email} = useSelector((state: RootState) => state.Contact, shallowEqual);
	const {address, phoneNumber, fullName} = useSelector((state: RootState) => state.DeliveryAddress, shallowEqual);

  const dispatch = useDispatch();

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
            value={fullName}
            onChange={event => dispatch(DeliveryAddressSlice.actions.setFullName(event.target.value))}
            name="fullName"
            label="Họ và tên" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            required
            value={email}
            type='email'
            onChange={event => dispatch(ContactSlice.actions.setEmail(event.target.value))}
            fullWidth
            name="email"
            label="Email" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            required
            fullWidth
            value={phoneNumber}
            onChange={event => dispatch(DeliveryAddressSlice.actions.setPhoneNumber(event.target.value))}
            name="phoneNumber"
            label="Điện thoại" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant='outlined'
            fullWidth
            value={address}
            onChange={event => dispatch(DeliveryAddressSlice.actions.setAddress(event.target.value))}
            name="address"
            label="Địa chỉ" />
        </Grid>
      </Grid>
    </InsetSpacing>
  )
}
