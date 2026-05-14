'use client'
import React, { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_MEDIA_SRC_TYPES } from "react";
import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { CardHeader, Card, CardContent, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Column from "./Column";

// Ticket Type, this is a ticket object
//Column type, a column object that can have multiple tickets
type Ticket = {
  id: number
  text: string
  description?: string
}
type Column = {
  id: number
  headerName: string
  tickets: Ticket[]
}



function KamakoBoard() {
  const [columns, setColumns] = useState<Column[]>([])
  const [ticketText, setTicketText] = useState('')


  // use effect runs on component mountj
  React.useEffect(() => {
    // 1. Create an ansync function that will be called upon component mount
    // 2. The request should query for the current board's data from the backend
    // 3. Finally we should set the state of the component


    const fetchKamakoData = async () => {
      try {
        const res = await fetch("/api/kamako", {
          method: "GET",
          credentials: "include"
        })

        if (!res.ok) {
          console.log("Failed to fetch:")
        }
        const result = await res.json();
        const board = result.data;

        console.log(result);
        console.log(board)
        console.log(board?.columns)

        const formattedColumns = board.columns.map((col: any) => ({
          id: col.column_id,
          headerName: col.column_header ?? "Null",
          tickets: (col.tickets ?? []).map((ticket: any) => ({
            id: ticket.ticket_id,
            text: ticket.ticket_header,
          }))
        }))

        setColumns(formattedColumns)

      } catch (error) {
        console.error("Error when fetching kamako data:", error);
        // clear the current kamako state
      }
    }

    fetchKamakoData();
  }, [])

  const addTicketSubmit = (columnsID: number) => {
    setColumns((prev) =>
      prev.map((columns) => {
        if (columns.id !== columnsID) return columns

        const newTicket: Ticket = {
          id: Date.now(),
          text: "Empty Ticket..",
        }

        return {
          ...columns,
          tickets: [...columns.tickets, newTicket]
        }
      })
    )
  }

  const addNewcolumn = async () => {
    try {

    }
    catch (error) {
      console.log(error)
      return
    }

    const newColumn = {
      id: Date.now(),
      headerName: "Empty Column..",
      tickets: [{ id: Date.now(), text: "Empty Ticket.." }]
    }
    setColumns((prev) => {

      return [...prev, newColumn]
    })
    console.log(columns)
  }



  const updateTicket = async (columnID: number, ticketID: number, ticketText: string) => {
    try {

      const res = await fetch("/api/kamako/tickets", {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          column_id: columnID,
          ticket_id: ticketID,
          text: ticketText
        })
      })
    }
    catch (error) {
      console.error("Error updating ticket information", error)
    }
  }

  let handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>, ticketID: number, columnID: number) => {
    setTicketText(e.target.value)
    updateTicket(columnID, ticketID, ticketText)

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
                  <Input placeholder={column.headerName}></Input>
                  <Separator className="mt-5" />
                  <CardContent>
                    <div className="flex flex-col p-2">
                      {column.tickets.map((ticket) =>
                        <div key={ticket.id}>
                          <div className=" flex justify-center gap-2 p-2 w-80 h-15">
                            <Checkbox className="w-8 h-8 "></Checkbox>
                            <Input
                              placeholder={ticket.text}
                              value={ticketText}
                              onChange={(e) => setTicketText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  updateTicket(column.id, ticket.id, ticketText)
                                }
                              }}

                            ></Input>
                            <Button>...</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <div className="flex justify-center">
                    <Button variant={"outline"} onClick={() => addTicketSubmit(column.id)}

                    >Create New Ticket</Button>
                  </div>
                </div>
              ))}
              <Button onClick={addNewcolumn}>+</Button>
            </div>
          </CardHeader>
        </Card>
      </div>
      {/* <Column /> */}
    </div>



  )
}

export default KamakoBoard;
