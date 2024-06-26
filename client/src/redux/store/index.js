import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../slices/userSlice";

// combining all reducers
const rootReducer = combineReducers({
    user: userReducer,
});

//to avoid using local storage store data
// config the persist
const persistConfig = {
    key: "root",
    storage,
};

// created persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

//create the persistor
const persistor = persistStore(store);

export { store, persistor };
