
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import { InsetSpacing } from 'components/Spacing'
import React, { ReactElement } from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from 'services/redux/rootReducer';

const CartItem = () => {


    return <Box
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
        }}>
        <img
            alt={''}
            src={'https://salt.tikicdn.com/cache/750x750/ts/product/3e/50/02/d0b935f7e87aa7c53c3eff4aa6c641d1.jpg.webp'}
            height="96px"
            style={{ objectFit: 'contain' }}
            width="96px"
        />
        <Box style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
        }}>
            <Box textAlign={'end'}>
                <Typography
                    color="textPrimary"
                    display="block"
                    style={{ fontWeight: 'bold' }}
                >
                    1 x Áo Thun Unisex EARTH
                </Typography>
                <Typography
                    color="textPrimary"
                    display="block"
                >
                    Size: XL
                </Typography>
                <Typography
                    color="textPrimary"
                    display="block"
                >
                    Màu: Vàng
                </Typography>
            </Box>
            <Box textAlign={'end'}>
                <Typography color="textSecondary" display='inline' >
                    Thành tiền:&nbsp;
                </Typography>
                <Typography color="textPrimary"
                    display='inline'>
                    100,000 VND
                </Typography>
            </Box>
        </Box>
    </Box>
}
export const ShoppingCart = (
): ReactElement => {
    const { selectedProducts } = useSelector((state: RootState) => state.ProductSelection, shallowEqual);

    return <InsetSpacing scale={3}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h6'>
                    Giỏ hàng của bạn
                </Typography>
            </Grid>
            {selectedProducts.map(selectedProduct => {
                return <Grid key={selectedProduct.id} item xs={12}>
                    <Grid container direction="row" spacing={2}>
                        <Grid
                            alignContent="flex-end"
                            alignItems="flex-end"
                            item
                            xs={12}
                        >
                            <CartItem />
                        </Grid>

                        <Grid item xs={12} >
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography color="textSecondary" display='inline' variant="h6">
                                Tổng cộng:&nbsp;
                            </Typography>
                            <Typography color="textPrimary"
                                style={{ fontWeight: 'bold' }} display='inline' variant="h6">
                                100,000 VND
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            })}

        </Grid>
    </InsetSpacing>
}