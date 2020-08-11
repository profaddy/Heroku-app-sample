import React, { Component } from 'react';
import moment from "moment";
import MUIDataTable from 'mui-datatables';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import DialogWrapper from '../../components/DialogWrapper/DialogWrapper';
import AdminAuthentication from '../../components/AdminAuthentication/AdminAuthentication';
import EntryForm from '../../components/EntryForm/EntryForm';
import AddUserForm from '../../components/AddUserForm/AddUserForm';
import AddInventoryForm from '../../components/AddInventoryForm/AddInventoryForm';
import DeleteDialogWrapper from '../../components/DeleteDialogWrapper/DeleteDialogWrapper';
import FilterForm from '../../components/FilterForm/FilterForm';
import styles from './styles';
import { fetchProducts } from './entries-manager-api.js';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class EntriesManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addEntryModalShowing: false,
      showCompact: false,
      savedEntries: [],
      entryMode: 'add',
      showDeleteDialog: false,
      showEditOptions: false,
      columns: this.columns.filter((column, index) => index < 7),
      isEditConfirmDialogOpen: false,
      compactColumns: this.compactColumns,
      filters: { created_at: null, user_id: null },
      responsive: 'scroll',
    };
  }

  compactColumns = [
    {
      name: 'Item',
    },
    {
      name: (
        <div style={{ display: 'flex' }}>
          <ArrowUpwardIcon style={{ color: 'red' }} /> Debit
        </div>
      ),
    },
    {
      name: (
        <div style={{ display: 'flex' }}>
          <ArrowDownwardIcon style={{ color: 'green' }} /> Credit
        </div>
      ),
    },
    {
      name: (
        <div style={{ display: 'flex' }}>
          <LocalMallOutlinedIcon color="primary" /> Balance
        </div>
      ),
    },
  ];

  columns = [
    {
      options:{
        display:false,
        filter:false
      },
      name:"Date"
      // name: (
      //   <div style={{ display: 'flex' }}>
      //     <EventOutlinedIcon color="primary" /> Created_at
      //   </div>
      // ),
    },
    {
      options:{
        display:true,
      },
    name:"Name"
      // name: (
      //   <div style={{ display: 'flex' }}>
      //     {/* <PermIdentityOutlinedIcon color="primary" /> */}
          
      //      Name
      //   </div>
      // ),
    },
    {
      options:{
        // display:false,
      },
      name: 'Tehsil',
    },
    {
      options:{
        display:false,
        filter:false
      },
      name:"Debit"
      // name: (
      //   <div style={{ display: 'flex' }}>
      //     <ArrowUpwardIcon style={{ color: 'red' }} /> Debit
      //   </div>
      // ),
    },
    {
      options:{
        display:false,
        filter:false
      },
      name:"Credit"
      // name: (
      //   <div style={{ display: 'flex' }}>
      //     <ArrowDownwardIcon style={{ color: 'green' }} /> Credit
      //   </div>
      // ),
    },
    {
      options:{
        display:false
      },
      name:"Balance"
      // name: (
      //   <div style={{ display: 'flex' }}>
      //     {/* <LocalMallOutlinedIcon color="primary" />  */}
      //     Balance
      //   </div>
      // ),
    },{
      name: "_id",
      options: {
        display: false,
        filter:false
      }
    }, 
    {
      name: 'Edit',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              onClick={() => {
                this.props._fetchEntryInfo(value, 'edit');
                this.setState({ entryMode: 'edit' });
              }}
            >
              {' '}
              <EditIcon color="primary" />
            </Button>
          );
        },
      },
    },
    {
      name: 'Delete',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              onClick={() => {
                this.props._fetchEntryInfo(value, 'delete');
                this.setState({
                  entryMode: 'delete',
                  deleteItemId: value,
                  showDeleteDialog: true,
                });
              }}
            >
              {' '}
              <DeleteIcon color="primary" />
            </Button>
          );
        },
      },
    } 
  ];

  getProducts = async () => {
    const response = await fetchProducts();
    console.log(response, 'product response');
  };
  componentDidMount() {
    // this.getProducts();
    this.props._fetchEntries();
    this.props._fetchUsers();
    this.props._fetchInventories();
    const authenticated = localStorage.getItem('authenticated', true);
    if (authenticated === 'true') {
      this.setState({ columns: this.columns, showEditOptions: true });
    }
  }
  openAddEntryModal = () => {
    this.props._openAddEntryModal();
  };
  openAddUserModal = () => {
    this.props._openAddUserModal();
  };
  openAddInventoryModal = () => {
    this.props._openAddInventoryModal();
  };
  openAddTehsilModal = () => {
    this.props._openAddTehsilModal();
  };
  closeAddEntryModal = () => {
    this.props._closeAddEntryModal();
    this.setState({ entryMode: 'add' });
  };
  closeAddUserModal = () => {
    this.props._closeAddUserModal();
  };
  closeAddInventoryrModal = () => {
    this.props._closeAddInventoryModal();
  };
  closeAddTehsilModal = () => { 
      this.props._closeAddTehsilModal(); 
    };
  onDeleteEntry = () => {
    const { selectedEntry } = this.props;
    this.props._deleteEntry({ ...selectedEntry, entry_mode: 'edit' });
  };
  hideDeleteDialog = () => {
    this.setState({ entryMode: 'add', showDeleteDialog: false });
  };

  openEditConfirmDialog = () => {
    this.setState({ isEditConfirmDialogOpen: true });
  };
  closeEditConfirmDialog = () => {
    this.setState({ isEditConfirmDialogOpen: false, isAuthenticated: false });
  };
  onEditConfirmDialogSubmit = (e) => {
    e.preventDefault();
  };

  toggleEditOptions = (value) => {
    let columns = this.columns;
    if (value === 'showEdit') {
      this.setState({ showEditOptions: true, columns: columns });
    } else if (value === 'hideEdit') {
      const filteredColumns = columns.filter((column, index) => index < 6);
      localStorage.setItem('authenticated', false);
      this.setState({ columns: filteredColumns, showEditOptions: false });
    }
  };
  checkAdminPassword = (values) => {
    if (values.adminPassword === this.props.adminPassword) {
      localStorage.setItem('authenticated', true);
      this.props._doAuthenticateEdit(true);
      this.toggleEditOptions('showEdit');
      this.closeEditConfirmDialog();
    } else {
      this.props.createNotification('Incorrect credentials', 'error');
    }
  };

  render() {
    const {
      entries,
      tableEntries,
      addEntryModalShowing,
      addUserModalShowing,
      addInventoryModalShowing,
      addTehsilModalShowing,
      classes,
      compactEntries,
    } = this.props;
    const { showCompact, responsive } = this.state;
    const options = {
      filterType: 'multiselect',
      responsive: responsive,
      rowsPerPage: 1000,
      selectableRowsHeader: false,
      selectableRows: false,
      rowsPerPageOptions: [1000, 500, 100, 50, 10],
      fixedHeader: true,
      expandableRows:true,
      renderExpandableRow: (rowData, rowMeta) => {
        console.log(rowData,rowMeta, this.props.entries);
        const expandedRowData = entries.filter((item) => item._id === rowData[6])[0];
        return <TableRow>
        <TableCell colSpan={rowData.length + 1}>
        <div>Name - {expandedRowData.user_name}</div>
        <div>Item - {expandedRowData.product_name}</div>
        <div>Amount - Rs {expandedRowData.remaining}</div>
        <div>Date - {moment.utc(expandedRowData.created_at, "YYYY-MM-DDThh:mm:ss.sssZ").local().format("DD-MM-YYYY")}</div>
        </TableCell>
      </TableRow>
      }
    };
    return (
      <div>
        {this.state.showCompact && (
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.setState({ showCompact: false })}
          >
            Show Detailed
          </Button>
        )}
        {!this.state.showCompact && (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.setState({ showCompact: true })}
          >
            Show Compact
          </Button>
        )}
        <div className={classes.AddEntryButton}>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={this.openAddEntryModal}
          >
            <AddCircleOutlineOutlinedIcon />
            <span style={{ marginRight: 5 }}></span>
            <span>Add Entry</span>
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={this.openAddUserModal}
          >
            <PersonAddOutlinedIcon /> <span style={{ marginRight: 5 }}></span>
            <span>Add User</span>
          </Button>
          {/* <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={this.openAddInventoryModal}
          >
            Add Inventory
          </Button> */}
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={this.openAddTehsilModal}
          >
            Add Tehsil
          </Button>
          {!this.state.showEditOptions && showCompact === false && (
            <Button
              color="primary"
              onClick={() => this.openEditConfirmDialog()}
            >
              Show Edit
            </Button>
          )}
          {this.state.showEditOptions && showCompact === false && (
            <Button
              variant="outlined"
              className={classes.button}
              color="secondary"
              onClick={() => this.toggleEditOptions('hideEdit')}
            >
              Hide Edit
            </Button>
          )}
        </div>
        {showCompact === true ? (
          <>
            <FilterForm
              users={this.props.users}
              filters={this.state.filters}
              setFilters={(values) => this.setState({ filters: values })}
              filterEntry={this.props._filterEntry}
            />
            <div>
              <MUIDataTable
                title={'Malwa Hardware'}
                data={compactEntries}
                columns={this.compactColumns}
                options={options}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <MUIDataTable
                title={'Malwa Hardware'}
                data={tableEntries}
                columns={this.state.columns || this.columns}
                options={options}
              />
            </div>
          </>
        )}

        <DialogWrapper
          title={'Authenticate'}
          content={
            <AdminAuthentication verifyPassword={this.checkAdminPassword} />
          }
          isOpen={this.state.isEditConfirmDialogOpen}
          onSubmit={this.onEditConfirmDialogSubmit}
          onClose={this.closeEditConfirmDialog}
          formName={'admin-password'}
        ></DialogWrapper>
        <ModalWrapper
          title={'Add Entry'}
          isOpen={addEntryModalShowing}
          minWidth={200}
          showBottomToolbar={false}
          showCloseIcon={true}
          onClose={this.closeAddEntryModal}
          showResizeOptions={false}
        >
          <EntryForm
            onCancel={this.closeAddEntryModal}
            addEntry={this.props._addEntry}
            users={this.props.users}
            inventories={this.props.inventories}
            selectedEntry={this.props.selectedEntry}
            entryMode={this.state.entryMode}
            updateEntry={this.props._updateEntry}
          />
        </ModalWrapper>
        <ModalWrapper
          title={'Add User'}
          isOpen={addUserModalShowing}
          minWidth={260}
          showBottomToolbar={false}
          showCloseIcon={true}
          onClose={this.closeAddUserModal}
          showResizeOptions={false}
        >
          <AddUserForm
            onCancel={this.closeAddUserModal}
            addUser={this.props._addUser}
          />
        </ModalWrapper>
        <ModalWrapper
          title={'Add Inventory'}
          isOpen={addInventoryModalShowing}
          minWidth={260}
          showBottomToolbar={false}
          showCloseIcon={true}
          onClose={this.closeAddInventoryrModal}
          showResizeOptions={false}
        >
          <AddInventoryForm
            onCancel={this.closeAddInventoryrModal}
            submitAction={this.props._addInventory}
            fieldLabel={"Inventory Name"}
            fieldName={"name"}
            buttonText={"Add Inventory"}
          />
        </ModalWrapper>
        <ModalWrapper
          title={'Add Tehsil'}
          isOpen={addTehsilModalShowing}
          minWidth={260}
          showBottomToolbar={false}
          showCloseIcon={true}
          onClose={this.closeAddTehsilModal}
          showResizeOptions={false}
        >
          <AddInventoryForm
            onCancel={this.closeAddTehsilModal}
            submitAction={this.props._addTehsil}
            fieldName={"name"}
            fieldLabel={"Tehsil Name"}
            buttonText={"Add Tehsil"}
          />
        </ModalWrapper>
        <DeleteDialogWrapper
          itemTobeDeleted={'entry'}
          // itemName={selectedRowIp}
          onClose={this.hideDeleteDialog}
          onSubmit={this.onDeleteEntry}
          isOpen={this.state.showDeleteDialog}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EntriesManager);
