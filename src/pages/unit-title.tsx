import { useMemo } from "react";
import { useParams } from "react-router-dom";

interface UnitTitleProps {
  companies: { id: string; name: string }[];
}

export function UnitTitle({ companies }: UnitTitleProps) {
  const { companyId } = useParams();

  const activeCompany = useMemo(
    () => companies.find((company) => company.id === (companyId || "")),
    [companyId]
  );
  return (
    <header className="flex items-center gap-2">
      <h1 className="text-gray-950 font-semibold text-xl">Ativos</h1>
      <span className="text-gray-600 text-sm">
        /{" "}
        {activeCompany?.name || "Selecione uma unidade para ver seus detalhes"}{" "}
        Unit
      </span>
    </header>
  );
}
