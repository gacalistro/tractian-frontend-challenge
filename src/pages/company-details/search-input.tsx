import { type ChangeEvent, useState } from "react";
import { useTreeContext } from "../../context/tree-context";
import { TreeActionEnum } from "../../reducer/tree-reducer";

import SearchIcon from "../../assets/icons/search.svg?react";

export function SearchInput() {
  const [searchQuery, setSearchQuery] = useState("");

  const { dispatch } = useTreeContext();

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearchQuery(query);
    dispatch({ type: TreeActionEnum.search, query });
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2 border-b">
      <input
        type="text"
        placeholder="Buscar Ativo ou Local"
        className="flex-1 h-8 outline-none"
        onChange={handleQuery}
      />
      <SearchIcon />
    </div>
  );
}
