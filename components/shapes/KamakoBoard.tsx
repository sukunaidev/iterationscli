'use client'
import React from "react";
import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { CardHeader, Card, CardContent, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface Kamako {
  ticketID: number;
  ticketName: string;
}
function KamakoBoard() {
  const [rowNextID, setRowNextID] = useState(2)
  const [headerNextID, setheaderNextID] = useState(0)
  const [headers, setHeaders] = useState([
    { id: headerNextID }
  ]);
  const [rows, setRows] = useState<React.ReactNode[]>([]);


  const addColumn = () => {
    setHeaders((prev) => {
      const newColumn = {
        id: prev.length + 1
      }
      return [...prev, newColumn]
    })
    setheaderNextID((prev) => prev + 1)

  }

  const addRow = () => {
    const newRow = "newRow"
    setRows((prev) => [...prev, newRow])
  }


  return (
    /*Top Part of this div is an attempt to making a functing Kanban board using the table function */
    <div >
      <div>
        <Card className="w-200 h-200 resize overflow-auto border flex flex-col p-2">
          <table className="w-full table-fixed">
            <thead>
              <tr>

                <th>
                  <CardHeader className="flex justify-center gap-2" >
                    <Input placeholder="name of this column"></Input>
                    <CardDescription>{0}</CardDescription>
                  </CardHeader>
                  <Separator className="mt-5  flex flex-col gap-5" />

                </th>
                {headers.map((head) => (
                  <th>
                    <CardHeader className="flex justify-center ">
                      <Input placeholder="name of this column"></Input>
                    </CardHeader>
                    <Separator className="mt-5 flex flex-col gap-5" />
                    <CardDescription>{head.id}</CardDescription>
                  </th>

                ))}
                <th>
                  <Button onClick={addColumn}>+</Button>
                </th>


              </tr>
            </thead>
            <tbody>
              <CardContent >
                <td>
                  <div className="flex flex-col gap-5">
                    <div className="flex justify-center gap-2">
                      <Checkbox className="w-8 h-8 "></Checkbox>
                      <Input></Input>
                      <Button >...</Button>
                    </div>
                    {rows.map((row) => (
                      <td>
                        <div className="flex justify-center gap-2">
                          <Checkbox className="w-8 h-8 "></Checkbox>
                          <Input></Input>
                          <Button onClick={addRow}>...</Button>
                        </div>
                      </td>
                    ))}

                    <Button onClick={addRow} className="mt-auto border p-2" variant={"outline"}>Create A New Ticket</Button>
                  </div>
                </td>
              </CardContent>
            </tbody>
          </table>

        </Card>
      </div>



      <Card className="w-72 h-72 resize overflow-auto border flex flex-col p-2" style={{
        border: "1px solid black",
        overflow: "auto",
        resize: "both",
        marginTop: "20px",
      }}>
        <CardHeader className="flex justify-center gap-2" >
          <Input placeholder="name of this collum"></Input>
          <Button>{"+"}</Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            <div className="flex justify-center gap-2">
              <Checkbox className="w-8 h-8 "></Checkbox>
              <Input>
              </Input>
              <Button>...</Button>
            </div>
            <div className="flex justify-center gap-2">
              <Checkbox className="w-8 h-8 "></Checkbox>
              <Input>
              </Input>
              <Button>...</Button>
            </div>
            <div className="flex justify-center gap-2">
              <Checkbox className="w-8 h-8 "></Checkbox>
              <Input>
              </Input>
              <Button>...</Button>
            </div>
          </div>
        </CardContent>
        <Button className="mt-auto border p-2" variant={"outline"}>Create A New Ticket</Button>
        <CardDescription>Card Info: ID : blah Date Created: Blah</CardDescription>
      </Card>
    </div>



  )
}

export default KamakoBoard;
