import type { ActiveFiltersProps, NodeProps } from "../types";
import { filterTree } from "./filter-tree-action";
import { searchQuery } from "./search-query-action";
import { toggleNode } from "./toggle-node-action";

export enum TreeActionEnum {
  init_data = "INIT_DATA",
  toggle_node = "TOGGLE_NODE",
  filter_tree = "FILTER_TREE",
  search = "SEARCH_QUERY",
}

export interface TreeAction {
  id?: string;
  type: TreeActionEnum;
  isExpanded?: boolean;
  payload?: NodeProps[];
  activeFilters?: ActiveFiltersProps;
  query?: string;
}

export const treeReducer = (
  state: NodeProps[],
  action: TreeAction
): NodeProps[] => {
  switch (action.type) {
    case TreeActionEnum.init_data:
      return action.payload as NodeProps[];
    case TreeActionEnum.toggle_node:
      return toggleNode(
        state,
        action.id as string,
        action.isExpanded as boolean
      );
    case TreeActionEnum.filter_tree:
      return filterTree(state, action.activeFilters as ActiveFiltersProps);
    case TreeActionEnum.search:
      return searchQuery(state, action.query as string);
    default:
      return state;
  }
};
