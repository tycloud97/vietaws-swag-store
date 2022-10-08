import { Box, Button, Card, Collapse, Typography, useTheme } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { InsetSpacing } from "components/Spacing";
import React, { useState } from "react";
import { Product } from "services/product-service";

export type ProductItemProps = {
    product: Product
    actionComponent?: React.ReactNode
}

function formatCurrency(num: number) {
    return num?.toLocaleString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

const ProductItem = (props: ProductItemProps) => {
    const {
        product,
        actionComponent
    } = props
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false)

    const imageComponent = <span style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <img
            alt={''}
            src={'https://salt.tikicdn.com/cache/750x750/ts/product/3e/50/02/d0b935f7e87aa7c53c3eff4aa6c641d1.jpg.webp'}
            style={{
                height: 'auto',
                width: '100%',
                objectFit: 'cover',
                aspectRatio: '3/2'
            }}
        />
    </span>

    const expand = {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
    }

    const expandOpen = {
        transform: 'rotate(180deg)',
        marginLeft: 'auto',
    }

    return (<Card elevation={2} style={{ minHeight: '100%' }}>
        <InsetSpacing scale={3}>
            <Typography align="center" color="textPrimary" variant="h5">
                {product.name}
            </Typography>
        </InsetSpacing>
        {imageComponent}
        <InsetSpacing scale={3}>
            <Box mb={3} display={'flex'} alignItems={'flex-start'} justifyContent={'center'}>
                <Typography
                    variant="h5"
                    color="textPrimary"
                    style={{ fontSize: 36, lineHeight: '120%' }}
                >
                    {formatCurrency(product.price)}
                </Typography>
                <Typography style={{ lineHeight: '150%' }} variant="h6">
                    VND
                </Typography >
            </Box>

            {actionComponent}
            <Box mb={3}>
                <Button
                    aria-expanded={expanded}
                    aria-label="show more"
                    color="primary"
                    fullWidth
                    onClick={() => setExpanded(!expanded)}
                    size="large"
                >
                    <Box alignItems="center" color="text.primary" fontSize="14px">
                        <Box alignItems="center" display={'flex'}>
                            <Typography component="span"
                            >Chi tiết</Typography>
                            <ExpandMore
                                color="primary"
                                name="chevron-down"
                                style={expanded ? expandOpen : expand}
                            />
                        </Box>
                    </Box>
                </Button>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Box alignItems="stretch" >
                        {product.description}
                    </Box>
                </Collapse>
            </Box>
        </InsetSpacing>

    </Card >
    )
}


export default ProductItem