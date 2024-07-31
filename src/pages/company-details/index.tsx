import { useLoaderData } from "react-router-dom";
import { NodeProps } from "../../types";

export function CompanyDetails() {
  const data = useLoaderData() as NodeProps[];

  console.log(data);

  return (
    <div>
      company details
      {data.map((item) => (
        <span key={item.id}>{item.name}</span>
      ))}
    </div>
  );
}
