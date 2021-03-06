import React from 'react';
import { forwardRef } from 'react';
import globalVariables from '../../../global-variables';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const MaterialTableDemo = props => {
    
    return (
        <MaterialTable
            title={props.title}
            icons={tableIcons}
            columns={props.columns}
            data={props.data}
            parentChildData={props.tree ? (row, rows) => rows.find(a => a.id === row.parentId) : undefined}
            style={{ width: '100%', marginBottom: '20px' }}
            options={{filtering: props.filtering}}
            localization={{
                pagination: {
                    labelDisplayedRows: `{from}-{to} ${globalVariables.LABEL_OF[globalVariables.LANG]} {count}`,
                    firstTooltip: globalVariables.LABEL_FIRST_PAGE[globalVariables.LANG],
                    previousTooltip: globalVariables.LABEL_PREVIOUS[globalVariables.LANG],
                    nextTooltip: globalVariables.LABEL_NEXT[globalVariables.LANG],
                    lastTooltip: globalVariables.LABEL_LAST_PAGE[globalVariables.LANG],
                    labelRowsSelect: globalVariables.LABEL_ROWS[globalVariables.LANG]
                },
                toolbar: {
                    searchTooltip: globalVariables.APPBAR_SEARCH[globalVariables.LANG],
                    searchPlaceholder: globalVariables.APPBAR_SEARCH[globalVariables.LANG]
                },
               
                body: {
                    emptyDataSourceMessage: globalVariables.TABLE_NO_RECORDS[globalVariables.LANG],
                }
            }}
        />
    );
}

export default MaterialTableDemo;