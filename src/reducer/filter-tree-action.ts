import type { ActiveFiltersProps, NodeProps } from "../types";

export const filterTree = (
  tree: NodeProps[],
  activeFilters: ActiveFiltersProps
) => {
  return tree.map((node) => {
    const isSensorFilterActive =
      node.sensorType === "energy" && activeFilters.energySensor;
    const isStatusFilterActive =
      node.status === "alert" && activeFilters.criticStatus;

    const isBeingFiltered = isSensorFilterActive || isStatusFilterActive;

    node.isBeingFiltered = isBeingFiltered;
    node.isExpanded = isBeingFiltered;

    if (node.children) {
      filterTree(node.children, activeFilters);

      const isChildBeingFiltered = node.children.some(
        (childNode) => childNode.isExpanded
      );

      if (isChildBeingFiltered) {
        node.isExpanded = true;
      }
    }

    return node;
  });
};
