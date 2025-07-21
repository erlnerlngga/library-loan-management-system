import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Save, X, Edit } from "lucide-react";

interface TableData {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

export default function TableComponent() {
  const [data, setData] = useState<TableData[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
      department: "Engineering",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Designer",
      department: "Design",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Manager",
      department: "Product",
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Partial<TableData>>({});

  const addNewRow = (insertIndex?: number) => {
    const newId = (
      Math.max(...data.map((item) => Number.parseInt(item.id))) + 1
    ).toString();
    const newRow: TableData = {
      id: newId,
      name: "",
      email: "",
      role: "",
      department: "",
    };

    if (insertIndex !== undefined) {
      // Insert at specific position
      const newData = [...data];
      newData.splice(insertIndex, 0, newRow);
      setData(newData);
    } else {
      // Add at the end
      setData([...data, newRow]);
    }

    setEditingId(newId);
    setEditingData(newRow);
  };

  const deleteRow = (id: string) => {
    setData(data.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingData({});
    }
  };

  const startEditing = (row: TableData) => {
    setEditingId(row.id);
    setEditingData({ ...row });
  };

  const saveEdit = () => {
    if (editingId && editingData) {
      setData(
        data.map((item) =>
          item.id === editingId
            ? ({ ...item, ...editingData } as TableData)
            : item
        )
      );
      setEditingId(null);
      setEditingData({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingData({});
  };

  const updateEditingData = (field: keyof TableData, value: string) => {
    setEditingData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-8xl mx-auto">
      <div className="flex flex-row items-center justify-end mb-4">
        <Button onClick={() => addNewRow()} className="gap-2" size={"sm"}>
          <Plus className="w-4 h-4" />
          Add Row
        </Button>
      </div>
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[200px] p-4">Name</TableHead>
                  <TableHead className="w-[250px]">Email</TableHead>
                  <TableHead className="w-[150px]">Role</TableHead>
                  <TableHead className="w-[150px]">Department</TableHead>
                  <TableHead className="w-[120px] text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <>
                    {/* Insert row button above current row */}
                    <TableRow
                      key={`insert-${index}`}
                      className="group hover:bg-blue-50/30 border-0"
                    >
                      <TableCell colSpan={5} className="p-0 h-2 relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addNewRow(index)}
                            className="h-6 px-2 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-300"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Insert Row
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Actual data row */}
                    <TableRow key={row.id} className="hover:bg-muted/30 mx-4">
                      <TableCell>
                        {editingId === row.id ? (
                          <Input
                            value={editingData.name || ""}
                            onChange={(e) =>
                              updateEditingData("name", e.target.value)
                            }
                            className="h-8"
                            placeholder="Enter name"
                          />
                        ) : (
                          <span
                            className="cursor-pointer"
                            onClick={() => startEditing(row)}
                          >
                            {row.name || "Click to edit"}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === row.id ? (
                          <Input
                            value={editingData.email || ""}
                            onChange={(e) =>
                              updateEditingData("email", e.target.value)
                            }
                            className="h-8"
                            placeholder="Enter email"
                            type="email"
                          />
                        ) : (
                          <span
                            className="cursor-pointer"
                            onClick={() => startEditing(row)}
                          >
                            {row.email || "Click to edit"}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === row.id ? (
                          <Input
                            value={editingData.role || ""}
                            onChange={(e) =>
                              updateEditingData("role", e.target.value)
                            }
                            className="h-8"
                            placeholder="Enter role"
                          />
                        ) : (
                          <span
                            className="cursor-pointer"
                            onClick={() => startEditing(row)}
                          >
                            {row.role || "Click to edit"}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === row.id ? (
                          <Input
                            value={editingData.department || ""}
                            onChange={(e) =>
                              updateEditingData("department", e.target.value)
                            }
                            className="h-8"
                            placeholder="Enter department"
                          />
                        ) : (
                          <span
                            className="cursor-pointer"
                            onClick={() => startEditing(row)}
                          >
                            {row.department || "Click to edit"}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          {editingId === row.id ? (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={saveEdit}
                                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <Save className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={cancelEdit}
                                className="h-8 w-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => startEditing(row)}
                                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteRow(row.id)}
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                ))}

                {/* Insert row button at the end */}
                {data.length > 0 && (
                  <TableRow className="group hover:bg-blue-50/30 border-0">
                    <TableCell colSpan={5} className="p-0 h-2 relative">
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addNewRow()}
                          className="h-6 px-2 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-300"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Insert Row
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {data.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No data available. Click "Add Row" to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
