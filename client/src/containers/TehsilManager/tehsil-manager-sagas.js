import Actions from "./tehsil-manager-action-constants";
import { all, put, takeEvery, call } from "redux-saga/effects";
import { fetchTehsils, addTehsil } from "./tehsil-manager-api.js";
import { createNotification } from "../../utils/notificationHelper";


export function* fetchTehsilsSaga(action) {
    try {
        const { data } = yield call(fetchTehsils);
        const tehsils  = data.products;
        const tehsilsList = tehsils.reduce((acc, item) => {
            const tehsil = { name: item.name, value: item._id };
            acc.push(tehsil);
            return acc;
        }, []);
        yield put({ type: Actions.FETCH_TEHSILS_SUCCESS, data: tehsilsList });
    } catch (error) {
        console.error(error);
        yield put({ type: Actions.FETCH_TEHSILS_FAILURE });
    }
}

export function* addTehsilSaga(action) {
    try {
        console.log(action,"action")
        yield call(addTehsil, action.tehsil);
        yield put(createNotification("Tehsil added successfully", "success"));
        yield put({ type: Actions.ADD_TEHSIL_SUCCESS });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        yield put({ type: Actions.CLOSE_ADD_TEHSIL_MODAL });
    } catch (error) {
        console.log(error);
        yield put(createNotification(`error while adding tehsil: ${error && error.response.data.message}`, "error"));
        yield put({ type: Actions.ADD_TEHSIL_FAILURE });
    }
}

export default function* tehsilManagerSagas() {
    yield all([
        takeEvery(Actions.ADD_TEHSIL_REQUEST, addTehsilSaga),
        takeEvery(Actions.FETCH_TEHSILS_REQUEST, fetchTehsilsSaga)
    ]);
}

