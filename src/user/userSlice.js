import { getUserFromLocal, removeUserFromLocal, setUserToLocal } from "@/features/local/local";
import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
    name:'userSlice',
    initialState:{
        user: getUserFromLocal(),
    },
    reducers:{
        setUser:(state,action) => {
            state.user = action.payload;
            setUserToLocal(action.payload);

        },
        removeUser:(state)=>{
            state.user = null;
            removeUserFromLocal();
        }
    }
});
export const {setUser,removeUser} = userSlice.actions;