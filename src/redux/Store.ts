import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import {persistReducer} from 'redux-persist';

import { ContactsReducer } from './reducers/ContactsReducer';
import { GroupsReducer } from './reducers/GroupsReducer';

const persistConfig = {
    key: 'root',
    storage: ExpoFileSystemStorage,
    whitelist: ['ContactsReducer', 'GroupsReducer'],
};

const rootReducer = combineReducers({
    ContactsReducer: ContactsReducer,
    GroupsReducer: GroupsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const configureStore = () => createStore(persistedReducer, applyMiddleware(...middleware));

export default configureStore;
