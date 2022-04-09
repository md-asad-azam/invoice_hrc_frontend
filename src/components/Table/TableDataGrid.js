import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import "../../css/TableDataGrid.css"
import EnhancedTableHead from './EnhancedTableHead';


const TableDataGrid = (props) => {

  const {
    totalCount,
    displayData,
    page, setPage,
    selected, setSelected,
    rowsPerPage, setRowsPerPage,
  } = props
console.log(displayData);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = displayData.map((n) => n.sl_no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, sl_no) => {
    const selectedIndex = selected.indexOf(sl_no);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sl_no);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (sl_no) => selected.indexOf(sl_no) !== -1;

  return (
    <>
      {displayData && <div className="TableDataGridContainer">
        <Box sx={{ width: '100%' }} >
          <Paper sx={{ width: '100%', mb: 2 }}>

            <TableContainer sx={{ bgcolor: "var(--background2)" }}>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={'small'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={displayData.length}
                />
                <TableBody>
                  {stableSort(displayData, getComparator(order, orderBy))
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.sl_no);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.sl_no)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.sl_no}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox" align='center'>
                            <Checkbox
                              sx={{ color: "white" }}
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell id={labelId} align="center">{row.sl_no}</TableCell>
                          <TableCell align="center">{row.business_code}</TableCell>
                          <TableCell align="center">{row.cust_number}</TableCell>
                          <TableCell align="center">{row.clear_date}</TableCell>
                          <TableCell align="center">{row.buisness_year}</TableCell>
                          <TableCell align="center">{row.doc_id}</TableCell>
                          <TableCell align="center">{row.posting_date}</TableCell>
                          <TableCell align="center">{row.document_create_date}</TableCell>
                          <TableCell align="center">{row.due_in_date}</TableCell>
                          <TableCell align="center">{row.invoice_currency}</TableCell>
                          <TableCell align="center">{row.document_type}</TableCell>
                          <TableCell align="center">{row.posting_id}</TableCell>
                          <TableCell align="center">{row.total_open_amount}</TableCell>
                          <TableCell align="center">{row.baseline_create_date}</TableCell>
                          <TableCell align="center">{row.cust_payment_terms}</TableCell>
                          <TableCell align="center">{row.invoice_id}</TableCell>
                        </TableRow>
                      );
                    })}
                    
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30, 40, 50]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ color: "white", bgcolor: "var(--background2)" }}
            />
          </Paper>

        </Box>
      </div>}
    </>
  );
}
export default TableDataGrid


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}