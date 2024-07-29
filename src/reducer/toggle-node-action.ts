import type { NodeProps } from "../types";

export const toggleNode = (
  nodes: NodeProps[],
  id: string,
  isExpanded: boolean
): NodeProps[] => {
  return nodes.map((node) => {
    if (node.id === id) {
      return { ...node, isExpanded };
    }

    if (node.children) {
      return { ...node, children: toggleNode(node.children, id, isExpanded) };
    }

    return node;
  });
};
