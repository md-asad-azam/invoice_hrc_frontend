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
                    fontSize: "1.5vmax !important",
                    marginRight: "0.4vmax !important",
                    marginLeft: "0.4vmax !important",
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: "white !important",
                }
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
        MuiTableSortLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-active": {
                        color: "var(--light-blue) !important",
                    },
                    "&:hover": {
                        color: "var(--light-blue) !important",
                    }
                },
                icon: {
                    color: "var(--light-blue) !important",
                }
            },
        },
        MuiAlert: {
            styleOverrides: {
                action: {
                    padding: "0 !important",
                    marginRight: "-0.5vmax",
                    marginTop: "-0.2vmax"
                }
            },
        },
    },
});
export default Theme
