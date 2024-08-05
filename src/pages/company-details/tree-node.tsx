import { useTreeContext } from "../../context/tree-context";
import { TreeActionEnum } from "../../reducer/tree-reducer";
import type { NodeProps } from "../../types";

import ChevronIcon from "../../assets/icons/chevron.svg?react";
import CodepenIcon from "../../assets/icons/codepen.svg?react";
import CubeIcon from "../../assets/icons/cube.svg?react";
import MapPinIcon from "../../assets/icons/map-pin.svg?react";
import EnergyIcon from "../../assets/icons/bolt.svg?react";
import DotIcon from "../../assets/icons/dot.svg?react";

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
  const search = node.isBeingSearched === false && node.isExpanded === false;

  return (
    <div className={`${(search || filter) && "hidden"}`}>
      <div className={`flex items-center gap-2 p-1`}>
        <button onClick={toggleNode} className="flex items-center gap-2">
          {node.children.length > 0 && (
            <ChevronIcon
              className={`${node.isExpanded ? "rotate-0" : "-rotate-90"}`}
            />
          )}

          {isLocation && <MapPinIcon className="text-blue-500" />}
          {isAsset && <CubeIcon className="text-blue-500" />}
          {isComponent && <CodepenIcon className="size-5 text-blue-500" />}

          {node.name}

          {node.sensorType === "energy" && (
            <EnergyIcon
              className={`${
                node.status === "alert" ? "text-red-500" : "text-green-500"
              } `}
            />
          )}

          {isComponent && node.sensorType !== "energy" && (
            <DotIcon
              className={`${
                node.status === "alert" ? "text-red-500" : "text-green-500"
              } `}
            />
          )}
        </button>
      </div>

      {node.isExpanded && node.children.length > 0 && (
        <div className="ml-2 pl-2 border-l border-gray-400/50">
          {node.children.map((nodeChild) => (
            <TreeNode key={nodeChild.id} node={nodeChild} />
          ))}
        </div>
      )}
    </div>
  );
}
