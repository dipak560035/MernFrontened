import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const base = 'https://rtk-query-oc7w.onrender.com/';

export const mainApi = createApi({
    reducerPath:'mainApi',
    baseQuery:fetchBaseQuery({baseUrl: 'https://rtk-query-oc7w.onrender.com/'}),
    tagTypes: ['Products'],

    endpoints:() => ({})
});

