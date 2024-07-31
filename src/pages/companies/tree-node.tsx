import { useTreeContext } from "../../context/tree-context";
import { TreeActionEnum } from "../../reducer/tree-reducer";
import type { NodeProps } from "../../types";

interface TreeNodeProps {
  node: NodeProps;
}

export function TreeNode({ node }: TreeNodeProps) {
  const { dispatch } = useTreeContext();

  const toggleNode = () => {
    dispatch({
      type: TreeActionEnum.toggle_node,
      id: node.id,
      isExpanded: !node.isExpanded,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        {node.children ? (
          <button onClick={toggleNode}>
            {node.isExpanded ? "v" : ">"} {node.name}
          </button>
        ) : (
          node.name
        )}
      </div>

      {node.isExpanded && node.children && (
        <div className="pl-4 border-l border-zinc-50/30">
          {node.children.map((nodeChild) => (
            <TreeNode key={nodeChild.id} node={nodeChild} />
          ))}
        </div>
      )}
    </div>
  );
}
