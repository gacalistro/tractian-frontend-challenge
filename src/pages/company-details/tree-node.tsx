import { useTreeContext } from "../../context/tree-context";
import { TreeActionEnum } from "../../reducer/tree-reducer";
import type { NodeProps } from "../../types";

import ChevronIcon from "../../assets/icons/chevron.svg?react";
import Codepen from "../../assets/icons/codepen.svg?react";
import Cube from "../../assets/icons/cube.svg?react";
import MapPinIcon from "../../assets/icons/map-pin.svg?react";

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

  const isLocation = "locationId" in node === false;
  const isAsset =
    "locationId" in node &&
    ("sensorType" in node === false || node.sensorType === null);
  const isComponent = !isLocation && !isAsset;

  const filter = node.isBeingFiltered === false && node.isExpanded === false;

  return (
    <div className={`${filter && "hidden"}`}>
      <div className={`flex items-center gap-2 p-1`}>
        <button onClick={toggleNode} className="flex items-center gap-2">
          {node.children.length > 0 && (
            <ChevronIcon
              className={`${node.isExpanded ? "rotate-0" : "-rotate-90"}`}
            />
          )}

          {isLocation && <MapPinIcon className="text-blue-500" />}
          {isAsset && <Cube className="text-blue-500" />}
          {isComponent && <Codepen className="size-5 text-blue-500" />}

          {node.name}
        </button>
      </div>

      {node.isExpanded && node.children && (
        <div className="ml-2 pl-2 border-l border-gray-400/50">
          {node.children.map((nodeChild) => (
            <TreeNode key={nodeChild.id} node={nodeChild} />
          ))}
        </div>
      )}
    </div>
  );
}
