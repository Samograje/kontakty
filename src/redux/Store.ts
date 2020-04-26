import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import FilesystemStorage from 'redux-persist-filesystem-storage';
import {persistReducer} from 'redux-persist';

import { ContactsReducer } from './reducers/ContactsReducer';
import { GroupsReducer } from './reducers/GroupsReducer';

const persistConfig = {
    key: 'root',
    storage: FilesystemStorage,
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
