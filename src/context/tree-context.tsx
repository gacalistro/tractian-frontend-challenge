import {
  useReducer,
  useContext,
  createContext,
  useEffect,
  type Dispatch,
  type ReactNode,
} from "react";
import data from "../data.json";
import type { NodeProps } from "../types";
import {
  TreeActionEnum,
  treeReducer,
  type TreeAction,
} from "../reducer/tree-reducer";

interface TreeContextProps {
  state: NodeProps[];
  dispatch: Dispatch<TreeAction>;
}

const TreeContext = createContext({} as TreeContextProps);

export const TreeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(treeReducer, []);

  useEffect(() => {
    const nodes = data as unknown as NodeProps[];

    dispatch({
      type: TreeActionEnum.init_data,
      payload: nodes,
    });
  }, []);

  return (
    <TreeContext.Provider value={{ state, dispatch }}>
      {children}
    </TreeContext.Provider>
  );
};

export const useTreeContext = () => useContext(TreeContext);
