import {
  useReducer,
  useContext,
  createContext,
  type Dispatch,
  type ReactNode,
} from "react";
import type { NodeProps } from "../types";
import { treeReducer, type TreeAction } from "../reducer/tree-reducer";

interface TreeContextProps {
  state: NodeProps[];
  dispatch: Dispatch<TreeAction>;
}

const TreeContext = createContext({} as TreeContextProps);

export const TreeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(treeReducer, []);

  return (
    <TreeContext.Provider value={{ state, dispatch }}>
      {children}
    </TreeContext.Provider>
  );
};

export const useTreeContext = () => useContext(TreeContext);
