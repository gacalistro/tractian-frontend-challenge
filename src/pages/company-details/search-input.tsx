import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import { useTreeContext } from "../../context/tree-context";
import { TreeActionEnum } from "../../reducer/tree-reducer";
import { useParams } from "react-router-dom";

import SearchIcon from "../../assets/icons/search.svg?react";
import { debounce } from "../../utils/debounce";

export function SearchInput() {
  const [searchQuery, setSearchQuery] = useState("");

  const { dispatch } = useTreeContext();

  const { companyId } = useParams();

  const debouncedDispatch = useCallback(debounce(dispatch), []);

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearchQuery(query);

    debouncedDispatch({ type: TreeActionEnum.search, query });
  };

  useEffect(() => {
    setSearchQuery("");
  }, [companyId]);

  return (
    <div className="flex items-center gap-3 px-3 py-2 border-b">
      <input
        type="text"
        placeholder="Buscar Ativo ou Local"
        className="flex-1 h-8 outline-none"
        onChange={handleQuery}
        value={searchQuery}
      />
      <SearchIcon />
    </div>
  );
}
