import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ghGraphqlApi } from "./gh-graphql-api/gh-graphql-api";

const extendMiddleware = [ghGraphqlApi.middleware]


export const reduxStore = configureStore({
    reducer: {
        [ghGraphqlApi.reducerPath]: ghGraphqlApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(extendMiddleware);
    }
})

setupListeners(reduxStore.dispatch)

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch
