
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'

export const ShoppingCart = (
): ReactElement => {
    return <>
        <Card>
            <CardContent>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Box marginBottom={3}>
                            <b>Cart</b>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={0}>
                            <Grid
                                alignContent="flex-end"
                                alignItems="flex-end"
                                item
                                xs={12}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row',
                                    }}>
                                    <img
                                        alt={''}
                                        src={'https://salt.tikicdn.com/cache/750x750/ts/product/3e/50/02/d0b935f7e87aa7c53c3eff4aa6c641d1.jpg.webp'}
                                        height="48px"
                                        style={{ objectFit: 'contain' }}
                                        width="48px"
                                    />
                                    <Typography
                                        color="textPrimary"
                                        display="block"
                                    >
                                        <b>ty</b>
                                    </Typography>
                                </div>
                                <span style={{ textAlign: 'end' }}>
                                    <Typography
                                        variant="h6"
                                    >
                                        <b>
                                            123
                                        </b>
                                    </Typography>
                                    <Typography color="textSecondary" display="block">
                                        1231å
                                    </Typography>
                                </span>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography color="textSecondary" display="inline">
                                    123
                                </Typography>
                                <Typography
                                    color="textPrimary"
                                    display="inline"
                                >
                                    <b>100$</b>
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography>
                                    123
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card></>
}