import { createStyles, darken, Icon, makeStyles, TextField, TextFieldProps } from "@material-ui/core"
import React from "react"

export type StepperInputProps = Omit<
  TextFieldProps,
  'label' | 'size' | 'hiddenLabel'
> & {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  value?: number
  textAdornment?: string
  onStartIconClick?: () => void
  onEndIconClick?: () => void
  size?: 'small' | 'medium' | 'large'
}

export const StepperInput = React.forwardRef<
  HTMLInputElement,
  StepperInputProps
>((props, ref) => {
  const {
    startIcon,
    endIcon,
    value = 0,
    textAdornment = '',
    onStartIconClick,
    onEndIconClick,
    size = 'large',
    ...rest
  } = props


  const sharedButtonStyle = {
    height: ({ size }: StepperInputProps) =>
      size === 'small' ? '24px' : size === 'medium' ? '32px' : '40px',
    width: ({ size }: StepperInputProps) =>
      size === 'small' ? '24px' : size === 'medium' ? '32px' : '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }
  const useStyles = makeStyles((theme) =>
    createStyles({
      textfieldRoot: {
        background: 'transparent !important',
        border: '0 !important',
        padding: 0,
        display: 'flex',
        '& .MuiIcon-root': {
          color: theme?.palette?.secondary.main,
          cursor: 'pointer',
          fontSize: ({ size }: StepperInputProps) =>
            size === 'small' ? '14px' : size === 'medium' ? '16px' : '20px',
          height: ({ size }: StepperInputProps) =>
            size === 'small' ? '24px' : size === 'medium' ? '32px' : '40px',
          width: ({ size }: StepperInputProps) =>
            size === 'small' ? '24px' : size === 'medium' ? '32px' : '40px',
          padding: ({ size }: StepperInputProps) =>
            size === 'small' ? '5px' : size === 'medium' ? '8px' : '10px'
        },
        '& .MuiIcon-root:active': {
          background: theme?.palette?.action.hover,
          border: `1px solid ${theme?.palette?.primary} !important`
        },
        '&.Mui-disabled .MuiIcon-root': {
          color: theme?.palette?.action.disabled
        },
        '&.Mui-focused input': {
          borderBottom: `1px solid ${theme?.palette?.primary.main}`,
          borderTop: `1px solid ${theme?.palette?.primary.main}`
        },
        '&.Mui-focused .MuiIcon-root': {
          border: `1px solid ${theme?.palette?.primary.main}`
        },
        '& .text-adornment': {
          color: theme.palette?.text.secondary,
          borderBottom: `1px solid ${theme.palette?.grey}`,
          borderTop: `1px solid ${theme.palette?.grey}`,
          height: ({ size }: StepperInputProps) =>
            size === 'small' ? '24px' : size === 'medium' ? '32px' : '40px',
          padding: ({ size }: StepperInputProps) =>
            `0 ${size === 'small' ? '8px' : '12px'}`,
          display: 'flex',
          alignItems: 'center'
        },
        '&.Mui-focused .text-adornment': {
          borderBottom: `1px solid ${theme?.palette?.primary.main}`,
          borderTop: `1px solid ${theme?.palette?.primary.main}`
        }
      },
      textfieldInput: {
        color: theme.palette?.text.secondary,
        borderBottom: `1px solid ${theme.palette?.grey}`,
        borderTop: `1px solid ${theme.palette?.grey}`,
        boxSizing: 'border-box',
        height: ({ size }: StepperInputProps) =>
          `${size === 'small' ? '24px' : size === 'medium' ? '32px' : '40px'
          } !important`,
        padding: ({ size }: StepperInputProps) =>
          `0 ${size === 'small' ? '8px' : '12px'} !important`,
        fontSize: ({ size }: StepperInputProps) =>
          size === 'small'
            ? theme?.typography?.caption.fontSize
            : theme?.typography?.body2.fontSize,
        textAlign: 'center'
      },
      iconButtonStart: {
        border: `1px solid ${theme.palette?.grey}`,
        borderRight: `1px solid ${theme.palette?.grey} !important`,
        borderTopLeftRadius: theme?.shape?.borderRadius,
        borderBottomLeftRadius: theme?.shape?.borderRadius,
        '&:hover': {
          color: darken('' + theme?.palette?.secondary.main, 0.25)
        },
        ...sharedButtonStyle
      },
      iconButtonEnd: {
        border: `1px solid ${theme.palette?.grey}`,
        '&:hover': {
          color: darken('' + theme?.palette?.secondary.main, 0.25)
        },
        borderLeft: `1px solid ${theme.palette?.grey} !important`,
        borderTopRightRadius: theme?.shape?.borderRadius,
        borderBottomRightRadius: theme?.shape?.borderRadius,
        ...sharedButtonStyle
      }
    })
  )
  const classes = useStyles({ size })

  return (
    <TextField
      {...rest}
      InputProps={{
        endAdornment: (
          <>
            {textAdornment && (
              <span className="text-adornment">{textAdornment}</span>
            )}
            {endIcon || (
              <Icon
                className={classes.iconButtonEnd}
                onClick={onEndIconClick}
              >add</Icon>
            )}
          </>
        ),
        startAdornment: (
          <>
            {startIcon || (
              <Icon
                className={classes.iconButtonStart}
                onClick={onStartIconClick}
              >remove
              </Icon>
            )}
          </>
        ),
        classes: {
          root: classes.textfieldRoot,
          input: classes.textfieldInput
        }
      }}
      hiddenLabel
      label=""
      ref={ref}
      type="tel"
      value={value}
    />
  )
})
