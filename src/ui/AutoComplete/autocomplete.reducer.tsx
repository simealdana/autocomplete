import { useReducer } from "react";

type AutoCompleteState = {
  value: string;
  search: string;
  options: string[];
  focusedIndex: number | null;
  showOptions: boolean;
  loading: boolean;
  hasError: boolean;
};

// Define the action types
type AutoCompleteAction =
  | { type: "SET_VALUE"; payload: string }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_OPTIONS"; payload: string[] }
  | { type: "SET_FOCUSED_INDEX"; payload: number | null }
  | { type: "TOGGLE_SHOW_OPTIONS" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "CLEAR_VALUE" }
  | { type: "SET_SHOW_OPTIONS"; payload: boolean };

// Initial state
const initialState: AutoCompleteState = {
  value: "",
  search: "",
  options: [],
  focusedIndex: null,
  showOptions: true,
  loading: false,
  hasError: false,
};

const autoCompleteReducer = (
  state: AutoCompleteState,
  action: AutoCompleteAction
): AutoCompleteState => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, value: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_OPTIONS":
      return { ...state, options: action.payload };
    case "SET_FOCUSED_INDEX":
      return { ...state, focusedIndex: action.payload };
    case "TOGGLE_SHOW_OPTIONS":
      return { ...state, showOptions: !state.showOptions };
    case "SET_SHOW_OPTIONS":
      return { ...state, showOptions: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, hasError: action.payload };
    case "CLEAR_VALUE":
      return {
        ...state,
        value: "",
        search: "",
        showOptions: false,
      };
    default:
      return state;
  }
};

const useAutoCompleteReducer = (defaultOptions?: string[]) => {
  const [state, dispatch] = useReducer(autoCompleteReducer, {
    ...initialState,
    options: defaultOptions || [],
  });
  const {
    value,
    search,
    options,
    focusedIndex,
    showOptions,
    loading,
    hasError,
  } = state;

  const setValue = (value: string) => {
    dispatch({ type: "SET_VALUE", payload: value });
  };
  const setSearch = (search: string) => {
    dispatch({ type: "SET_SEARCH", payload: search });
  };
  const setOptions = (options: string[]) => {
    dispatch({ type: "SET_OPTIONS", payload: options });
  };

  const setFocusedIndex = (index: number | null) => {
    dispatch({ type: "SET_FOCUSED_INDEX", payload: index });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setHasError = (hasError: boolean) => {
    dispatch({ type: "SET_ERROR", payload: hasError });
  };

  const setShowOptions = (showOptions: boolean) => {
    dispatch({ type: "SET_SHOW_OPTIONS", payload: showOptions });
  };

  return {
    value,
    search,
    options,
    focusedIndex,
    showOptions,
    loading,
    hasError,
    setValue,
    setSearch,
    setOptions,
    setFocusedIndex,
    setLoading,
    setHasError,
    setShowOptions,
  };
};
export { autoCompleteReducer, initialState, useAutoCompleteReducer };
