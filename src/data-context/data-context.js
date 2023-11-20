import { Dispatch, SetStateAction, createContext } from "react";


// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { useReducer } from "react";
import { useMemo } from "react";
import { useContext } from "react";

// Material Dashboard 2 React main context
const DataContext = createContext();

DataContext.displayName = "DataContext";

function reducer(state, action) {
    switch(action.type) {
        case "AUTH_TOKEN": {
            return { ...state, authToken: action.value }
        }
        case "TYPE_TOKEN": {
            return { ...state, typeToken: action.value } 
        }
        case "REFRESH": {
            return { ...state, refresh: action.value }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function DataContextControllerProvider({ children }) {
    const initialState = {
        authToken: "",
        typeToken: "",
        refresh: true
    }
    const [controller, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};


function useDataContextController(){
    const context = useContext(DataContext);
    if(!context) {
        throw new Error(
            "useDataContextController should be used inside the DataContextProvider"
        )
    }
    return context;
}

DataContextControllerProvider.propTypes = {
    children: PropTypes.node.isRequired
}

const setAuthToken = (dispatch, value) => dispatch({ type: "AUTH_TOKEN", value });

const setTypeToken = (dispatch, value) => dispatch({ type: "TYPE_TOKEN", value });

const setRefresh = (dispatch, value) => dispatch({ type: "REFRESH", value })

export {
    DataContextControllerProvider,
    useDataContextController,
    setAuthToken,
    setTypeToken,
    setRefresh
}