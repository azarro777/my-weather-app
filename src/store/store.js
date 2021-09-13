import { configureStore } from "@reduxjs/toolkit";
import localReducer from "../localStorage/localSlice";

export default configureStore({
	reducer: {
		local: localReducer,
	},
});
