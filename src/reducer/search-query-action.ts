import type { NodeProps } from "../types";

export const searchQuery = (tree: NodeProps[], query: string) => {
  const lowerQuery = query.toLowerCase();

  return tree.map((node) => {
    const name = node.name.toLowerCase();
    const isSearchIncludedInName =
      query.length > 0 && name.includes(lowerQuery);

    node.isBeingSearched = isSearchIncludedInName;
    node.isExpanded = isSearchIncludedInName;

    if (query.length == 0) {
      delete node.isBeingSearched;
    }

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
