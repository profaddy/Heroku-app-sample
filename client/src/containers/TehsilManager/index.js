import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TehsilManager from "./tehsil-manager";
import Actions from "./tehsil-manager-actions";


const mapStateToProps = (state) => {
    return {
        tehsils:state.TehsilManager.tehsils
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        _fetchTehsils: bindActionCreators(Actions._fetchInventories, dispatch),
        _addTehsil:bindActionCreators(Actions._addInventory, dispatch)
    };};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TehsilManager);
