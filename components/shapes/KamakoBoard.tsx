'use client'
import React, { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_MEDIA_SRC_TYPES } from "react";
import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { CardHeader, Card, CardContent, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";


// Ticket Type, this is a ticket object
//Column type, a column object that can have multiple tickets
type Ticket = {
  id: number
  text: string
}
type Column = {
  id: number
  headerName: string
  tickets: Ticket[]
}



function KamakoBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 1,
      headerName: "Nooduru",
      tickets: [{ id: 1, text: "weee" }]
    },
    {
      id: 2,
      headerName: "NotNodur",
      tickets: [{ id: 1, text: "weedfdfdfde" }, { id: 2, text: "weee" }]

    }
  ])

  const addTicketSubmit = (columnsID: number) => {
    setColumns((prev) =>
      prev.map((columns) => {
        if (columns.id !== columnsID) return columns

        const newTicket = {
          id: Date.now(),
          text: "Empty Ticket.."
        }

        return {
          ...columns,
          tickets: [...columns.tickets, newTicket]
        }
      })
    )
  }



  return (
    /*Top Part of this div is an attempt to making a functing Kanban board using the table function */
    <div >
      <div>
        <Card className="w-200 h-200 resize overflow-auto border ">
          <CardHeader>
            <div className="flex gap-10" >
              {columns.map((column) => (
                <div key={column.id}>
                  <Input value={column.headerName}></Input>
                  <Separator className="mt-5" />

                  <div className="flex flex-col p-2">
                    {column.tickets.map((ticket) =>
                      <div key={ticket.id}>
                        <div className=" flex justify-center gap-2 p-2">
                          <Checkbox className="w-8 h-8 "></Checkbox>
                          <Input placeholder={ticket.text}></Input>
                          <Button>...</Button>
                        </div>

                      </div>

                    )}
                  </div>
                  <div className="flex justify-center">
                    <Button variant={"outline"} onClick={() => addTicketSubmit(column.id)}>Create New Ticket</Button>
                  </div>
                </div>
              ))}


            </div>


          </CardHeader>
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
