import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import "./TableDataGrid.css"



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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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

const headCells = [
  {
    id: 'sl_no',
    label: 'Sl No',
  },
  {
    id: 'business_code',
    label: 'Business Code',
  },
  {
    id: 'cust_number',
    label: 'Customer Number',
  },
  {
    id: 'clear_date',
    label: 'Clear Date',
  },
  {
    id: 'buisness_year',
    label: 'Business Year',
  },
  {
    id: 'doc_id',
    label: 'Document Id',
  },
  {
    id: 'posting_date',
    label: 'Posting Date',
  },
  {
    id: 'document_create_date',
    label: 'Document Create Date',
  },
  {
    id: 'due_in_date',
    label: 'Due Date',
  },
  {
    id: 'invoice_currency',
    label: 'Invoice Currency',
  },
  {
    id: 'document_type',
    label: 'Document Type',
  },
  {
    id: 'posting_id',
    label: 'Posting id',
  },
  {
    id: 'total_open_amount',
    label: 'Total Open Amount',
  },
  {
    id: 'baseline_create_date',
    label: 'Baseline Create Date',
  },
  {
    id: 'cust_payment_terms',
    label: 'Customer Payment Terms',
  },
  {
    id: 'invoice_id',
    label: 'Invoice id',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            sx={{ color: "white" }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};



export default function TableDataGrid(props) {

  const { rows } = props

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.sl_no);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (sl_no) => selected.indexOf(sl_no) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div className="TableDataGridContainer">
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
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30, 40, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ color: "white", bgcolor: "var(--background2)" }}
          />
        </Paper>

      </Box>
    </div>
  );
}
