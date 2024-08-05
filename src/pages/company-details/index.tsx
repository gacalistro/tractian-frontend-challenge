import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useTreeContext } from "../../context/tree-context";
import { TreeActionEnum } from "../../reducer/tree-reducer";
import { type NodeProps } from "../../types";
import { SearchInput } from "./search-input";
import { TreeNode } from "./tree-node";

export function CompanyDetails() {
  const data = useLoaderData() as NodeProps[];

  const { state, dispatch } = useTreeContext();

  useEffect(() => {
    dispatch({
      type: TreeActionEnum.init_data,
      payload: data,
    });
  }, [data]);

  return (
    <div className="flex gap-2 h-[93%]">
      <div className="border basis-1/3 rounded-sm flex flex-col">
        <SearchInput />

        <div className="px-1 overflow-scroll">
          {state.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </div>
      </div>
      <div className="border basis-2/3 rounded-sm"></div>
    </div>
  );
}
