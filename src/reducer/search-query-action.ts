import type { NodeProps } from "../types";

export const searchQuery = (tree: NodeProps[], query: string) => {
  return tree.map((node) => {
    const name = node.name.toLowerCase();
    const isSearchIncludedInName =
      query.length > 0 && name.includes(query.toLowerCase());

    node.isBeingSearched = isSearchIncludedInName;
    node.isExpanded = isSearchIncludedInName;

    if (node.children) {
      searchQuery(node.children, query);

      const isChildBeingSearched = node.children.some(
        (childNode) => childNode.isExpanded
      );

      if (isChildBeingSearched) {
        node.isExpanded = true;
      }
    }

    return node;
  });
};
