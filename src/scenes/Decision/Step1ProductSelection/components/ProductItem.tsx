import { Box, Button, Card, Collapse, Divider, Typography, useTheme } from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons";
import React, { useState } from "react"
import { StepperInput } from "./StepperInput";

const ProductItem: React.FC = () => {
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
        <Box
            bgcolor={theme.palette.secondary.main}
            color="primary.contrastText"
            position="absolute"
            style={{
                width: '100%',
                padding: 20,
                bottom: 0,
                right: 0,
                zIndex: 10
            }}
            textAlign="center"
        >
            <Typography
                align="left"
                style={{ whiteSpace: 'pre-wrap' }}
                variant="caption"
            >
                Áo đẹp
            </Typography>
        </Box>
    </span>
    const expand = {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        height: 33
    }

    const expandOpen = {
        transform: 'rotate(180deg)',
        marginLeft: 'auto',
        height: 33
    }

    return (<Card elevation={2} style={{ minHeight: '100%' }}>
        <Typography align="center" color="textPrimary">
            <b>Áo</b>
        </Typography>
        {imageComponent}

        <Box textAlign="center" width="100%">
            <Typography>Ty</Typography>
        </Box>
        <Box alignItems="center" >
            <Box minHeight={'4rem'} textAlign="center">
                <Typography
                    color="textPrimary"
                    style={{ fontSize: 36, lineHeight: '120%' }}
                >
                    <b>
                        100 VND
                    </b>
                </Typography>
                <Typography style={{ lineHeight: '150%' }}>
                    <b>123</b>
                </Typography>
            </Box>
        </Box>


        {renderQuantityStepper(10, (newQuantity: number) => newQuantity)}
        {/* {actionComponent} */}

        <Divider style={{ width: '100%' }} />

        <Box textAlign="center">
            <Typography
                align="center"
                color="textSecondary"
                style={{ whiteSpace: 'pre-wrap' }}
                variant="caption"
            >
                Ty
            </Typography>
        </Box>

        <Button
            aria-expanded={expanded}
            aria-label="show more"
            color="primary"
            fullWidth
            onClick={() => setExpanded(!expanded)}
            size="large"
            style={{ marginBottom: theme.spacing(4) }}
        >
            <Box alignItems="center" color="text.primary" fontSize="14px">
                <Box alignItems="center" >
                    <u>Detail</u>
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
                Hello
            </Box>
        </Collapse>
    </Card >
    )
}


function renderQuantityStepper(
    quantity: number,
    quantityChangeCallback: (newQuantity: number) => void
) {
    return (
        <StepperInput
            inputProps={{ size: '3', maxLength: '3' }}
            onChange={(e) => quantityChangeCallback(Number(e.target.value))}
            onEndIconClick={() => quantityChangeCallback(quantity + 1)}
            onStartIconClick={() => quantityChangeCallback(quantity - 1)}
            value={quantity}
        />
    )
}


export default ProductItem