import { NodeProps } from "../types";

export const buildTreeFromJson = (data: NodeProps[]): NodeProps[] => {
  const map = new Map<string, NodeProps>();
  const tree: NodeProps[] = [];

  data.forEach((item) => {
    map.set(item.id, { ...item, children: [] });
  });

  map.forEach((node) => {
    if (node.parentId || node.locationId) {
      const parentNode = map.get(node.parentId || node.locationId || "");
      if (parentNode) {
        parentNode.children!.push(node);
      }
    } else {
      tree.push(node);
    }
  });

  return tree;
};
