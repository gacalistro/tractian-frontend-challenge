export interface NodeProps {
  id: string;
  name: string;
  children: NodeProps[];
  locationId?: string;
  parentId?: string;
  isExpanded?: boolean;
  isBeingFiltered?: boolean;
  isBeingSearched?: boolean;
  sensorType?: string;
  status?: string;
}

export interface ActiveFiltersProps {
  energySensor: boolean;
  criticStatus: boolean;
}
