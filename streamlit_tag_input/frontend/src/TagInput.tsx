import { ReactNode } from 'react';
import {
    ComponentProps,
    Streamlit,
    Theme,
    withStreamlitConnection,
} from 'streamlit-component-lib';

import { Autocomplete, Chip, InputLabel, TextField, ThemeProvider } from '@mui/material';
import { Theme as MuiTheme, createTheme } from '@mui/material';

interface Props {
    label: string
    default: string[]
    limitTags: number
    placeholder: string
}

const convertTheme = (theme: Theme): MuiTheme => {
    return createTheme({
        palette: {
            primary: { main: theme.primaryColor },
            text: { primary: theme.textColor }
        },
        typography: {
            fontFamily: theme.font,
        }
    })
}

const TagInput = (props: ComponentProps): ReactNode => {
    const themeProvider = props.theme === undefined ? (theme: MuiTheme) => theme : convertTheme(props.theme);
    const args = props.args as Props;
    Streamlit.setFrameHeight();
    const rendered = (
        <>
            <ThemeProvider theme={themeProvider}>
                <InputLabel sx={{ base: props.theme?.base, color: props.theme?.textColor, bgcolor: props.theme?.backgroundColor }}>
                    <small>{args.label}</small>
                </InputLabel>
                <Autocomplete
                    multiple
                    limitTags={args.limitTags}
                    options={[]}
                    defaultValue={args.default}
                    freeSolo
                    onChange={
                        (_event, value) => Streamlit.setComponentValue(value)
                    }
                    renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => {
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                                <Chip variant="outlined" label={option} key={key} {...tagProps} sx={{ base: props.theme?.base, bgcolor: props.theme?.secondaryBackgroundColor }} />
                            );
                        })
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={args.placeholder}
                            sx={{ base: props.theme?.base, bgcolor: props.theme?.secondaryBackgroundColor, borderRadius: "8px" }}
                        />
                    )}
                    disabled={props.disabled || props.args["disabled"]}
                    sx={{ width: props.width, base: props.theme?.base, bgcolor: props.theme?.secondaryBackgroundColor, borderRadius: '8px' }}
                />
            </ThemeProvider>
        </>
    );
    Streamlit.setComponentReady();
    return rendered;
}

export default withStreamlitConnection(TagInput)
