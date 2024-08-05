import { createHashRouter, RouterProvider } from "react-router-dom";
import { api } from "./lib/axios.ts";
import { Companies } from "./pages/companies/index.tsx";
import { CompanyDetails } from "./pages/company-details/index.tsx";
import { Layout } from "./pages/layout.tsx";
import type { NodeProps } from "./types.ts";
import { buildTreeFromJson } from "./utils/build-tree-from-json.ts";

const router = createHashRouter([
  {
    element: <Layout />,
    loader: async () => {
      return await api.get("");
    },
    children: [
      {
        path: "/",
        element: <Companies />,
      },
      {
        path: "/:companyId",
        element: <CompanyDetails />,
        loader: async ({ params }) => {
          const id = params.companyId;

          return await Promise.all([
            api.get<NodeProps[]>(`/${id}/assets`),
            api.get<NodeProps[]>(`/${id}/locations`),
          ])
            .then((responses) => responses.map((response) => response.data))
            .then((data) => data.flat())
            .then(async (tree) => buildTreeFromJson(tree));
        },
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
