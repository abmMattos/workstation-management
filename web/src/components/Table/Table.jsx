import * as React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const dataTable = [
  {
    id: "1",
    status: "Disponível",
    description: "2 Monitores",
    local: "2º andar - Sala 1",
  },
  {
    id: "2",
    status: "Disponível",
    description: "2 Monitores",
    local: "2º andar - Sala 1",
  },
  {
    id: "3",
    status: "Disponível",
    description: "2 Monitores",
    local: "2º andar - Sala 1",
  },
  {
    id: "4",
    status: "Disponível",
    description: "2 Monitores",
    local: "2º andar - Sala 1",
  },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => <strong>id</strong>,
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <strong>Status</strong>,
  }),
  columnHelper.accessor("description", {
    header: () => <strong>Descrição</strong>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("local", {
    header: () => <strong>Localização</strong>,
  }),
];

export function Table() {
  const [data, _setData] = React.useState(() => [...dataTable]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  );
}
