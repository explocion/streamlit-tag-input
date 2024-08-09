import { ReactNode } from "react";

import {
  Autocomplete,
  Chip,
  createTheme,
  InputLabel,
  PaletteMode,
  TextField,
  Theme,
  ThemeProvider,
} from "@mui/material";

import {
  ComponentProps,
  Streamlit,
  Theme as StreamlitTheme,
  withStreamlitConnection,
} from "streamlit-component-lib";

const getTheme = (theme: StreamlitTheme): Theme => {
  const { palette, typography } = createTheme();
  return createTheme({
    palette: {
      mode: theme.base as PaletteMode,
      primary: {
        main: theme.primaryColor ?? palette.primary.main,
      },
      secondary: {
        main: theme.primaryColor ?? palette.primary.main,
      },
      background: {
        default: theme.backgroundColor ?? palette.background.default,
        paper:
          (theme.base === "dark" && theme.secondaryBackgroundColor) ||
          palette.background.paper,
      },
      text: {
        primary: theme.textColor ?? palette.text.primary,
      },
    },
    typography: {
      fontFamily: theme.font ?? typography.fontFamily,
    },
  });
};

interface Props {
  label: string;
  default: string[];
  limitTags: number;
  placeholder: string;
}

const TagInput = (props: ComponentProps): ReactNode => {
  const theme =
    props.theme === undefined ? (theme: Theme) => theme : getTheme(props.theme);

  Streamlit.setComponentReady();
  Streamlit.setFrameHeight();

  const args = props.args as Props;

  return (
    <>
      <ThemeProvider theme={theme}>
        <InputLabel sx={{ color: props.theme?.textColor }}>
          <small>{args.label}</small>
        </InputLabel>
        <Autocomplete
          multiple
          limitTags={args.limitTags}
          options={[]}
          defaultValue={args.default}
          freeSolo
          onChange={(_event, value) => Streamlit.setComponentValue(value)}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((tag: string, index: number) => {
              const { key, ...tagProps } = getTagProps({ index });
              return <Chip label={tag} key={key} {...tagProps} />;
            })
          }
          renderInput={(params) => (
            <TextField {...params} placeholder={args.placeholder} />
          )}
          disabled={props.disabled}
        />
      </ThemeProvider>
    </>
  );
};

export default withStreamlitConnection(TagInput);
