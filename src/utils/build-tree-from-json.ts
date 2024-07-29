import { NodeProps } from "../types";

const buildTreeFromJson = (
  data: NodeProps[],
  parentId: null | string = null
): NodeProps[] => {
  let tree: NodeProps[] = [];

  data.forEach((item) => {
    if ((item.locationId || item.parentId) === parentId) {
      let children = buildTreeFromJson(data, item.id);

      if (children?.length) {
        item.children = children;
      }

      tree.push(item);
    }
  });

  return tree;
};
