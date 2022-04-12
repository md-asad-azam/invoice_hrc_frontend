import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                p: {
                    color: "white"
                },
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "1vmax",
                    marginBottom: "1.3vmax !important",
                    boxShadow: "none"
                },
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    minWidth: "100vw !important"
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: "0.1vmax solid white",
                    fontSize: "1vmax",
                },
                paddingCheckbox: {
                    // width: "1vmax !important",
                },
            },
        },
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    fontSize: "1.2vmax !important"
                },
                displayedRows: {
                    fontSize: "1vmax"
                },
                toolbar: {
                    minHeight: "4vmax !important",
                    paddingRight: "0.2vmax !important",
                    paddingLeft: "0.2vmax !important",
                },
                selectLabel: {
                    fontSize: "1vmax !important",
                },
                select: {
                    padding: "0.5vmax 0vmax !important",
                    paddingRight: "1.5vmax !important",
                    minWidth: "2vmax !important",
                },
                actions: {
                    marginLeft: "2vmax",
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: "1vmax",
                    marginRight: "2vmax !important",
                    marginLeft: "0vmax !important",
                },
                input: {
                    paddingRight: "1vmax",
                    minWidth: "1vmax",
                },
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: "white !important",
                    fontSize: "1.5vmax !important",
                    marginRight: "0.4vmax !important",
                    marginLeft: "0.4vmax !important"
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    padding: "0.8vmax",
                    fontSize: "1.2vmax"
                },
            },
        },
    },
});
export default Theme
