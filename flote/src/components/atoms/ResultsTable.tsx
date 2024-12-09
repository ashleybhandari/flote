import { useEffect, useState } from "react";

import AccordionCard from "@atoms/cards/AccordionCard";
import { SearchTableColumn } from "@models/SearchTableColumn";
import { SearchTableRow } from "@models/SearchTableRow";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  SortDescriptor,
} from "@nextui-org/table";

type Props = {
  title: string;
  columns: SearchTableColumn[];
  rows: SearchTableRow[];
  onRowAction: (arg0: any) => void;
  isLoading: boolean;
};

export default function ResultsTable({
  title,
  columns,
  rows,
  onRowAction,
  isLoading,
}: Props) {
  const [tableRows, setTableRows] = useState(rows);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const subtitle = `${tableRows.length} result${
    tableRows.length === 1 ? "" : "s"
  }`;

  const handleSortChange = (descriptor: SortDescriptor) => {
    setTableRows((r) => {
      setSortDescriptor(descriptor);

      return r.sort((a, b) => {
        const column = descriptor.column as keyof SearchTableRow;
        const first = a[column]?.toString() ?? "";
        const second = b[column]?.toString() ?? "";
        let cmp;

        if (descriptor.column === "date") {
          cmp = new Date(first) < new Date(second) ? -1 : 1;
        } else {
          cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
        }

        if (descriptor.direction === "descending") {
          cmp *= -1;
        }

        return cmp;
      });
    });
  };

  useEffect(() => {
    setTableRows(rows);
    handleSortChange({ column: "date", direction: "descending" });
  }, [rows]);

  return (
    <AccordionCard
      title={title}
      subtitle={subtitle}
      isExpanded={tableRows.length > 0}
    >
      <Table
        aria-label={title}
        removeWrapper
        selectionMode="single"
        onRowAction={onRowAction}
        onSortChange={handleSortChange}
        sortDescriptor={sortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className="uppercase"
              allowsSorting={column.label !== ""}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={tableRows}
          isLoading={isLoading}
          loadingContent={<Spinner />}
          emptyContent="No results found"
        >
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </AccordionCard>
  );
}
