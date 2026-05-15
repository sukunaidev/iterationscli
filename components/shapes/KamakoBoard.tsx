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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "../ui/textarea";

// Ticket Type, this is a ticket object
//Column type, a column object that can have multiple tickets
type Ticket = {
  id: number
  text: string
  description?: string
}
type Column = {
  id: number
  boardId: number
  headerName: string
  tickets: Ticket[]
}



function KamakoBoard() {
  const [columns, setColumns] = useState<Column[]>([])
  const [boardId, setBoardId] = useState<number | undefined>()


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
          boardId: col.board_id,
          headerName: col.column_header ?? "Null",
          tickets: (col.tickets ?? []).map((ticket: any) => ({
            id: ticket.ticket_id,
            text: ticket.ticket_header,
            description: ticket.ticket_description ?? "",
          }))
        }))
        setBoardId(board.board_id)
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
          description: ""
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
    if (!boardId) return

    const newColumn: Column = {
      id: Date.now(),
      boardId: boardId,
      headerName: "Empty Column..",
      tickets: [{ id: Date.now(), text: "Empty Ticket.." }]
    }
    setColumns((prev) => {

      return [...prev, newColumn]
    })
    console.log(columns)
  }



  const updateTicket = async (columnID: number, ticketID: number, ticketText: string, descriptionText: string) => {
    try {

      const res = await fetch("/api/kamako/tickets", {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          column_id: columnID,
          ticket_id: ticketID,
          text: ticketText,
          descText: descriptionText
        })
      })
    }
    catch (error) {
      console.error("Error updating ticket information", error)
    }
  }

  const updateColumn = async (board_id: number, column_id: number, column_header: string) => {
    try {
      const res = await fetch("/api/kamako/columns", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          board_id: board_id,
          column_id: column_id,
          column_header: column_header
        })
      }
      )
    }
    catch (error) {
      console.error("Error with updating columns", error)
    }

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
                  <Input
                    placeholder={column.headerName}
                    value={column.headerName}
                    onChange={(e) => {
                      setColumns(prev => prev.map(col => //SetColumns updates the columns state with the prev/current state, then it will map/loopp through all the columns              
                        col.id === column.id ? //it will check if the current col object id is = the column.id we are editing
                          { ...col, headerName: e.target.value } : col //this is the iftrue:iffalse. if the condition above is true thenthe column value will be e.targe.value else it will stay the same
                      ))
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateColumn(column.boardId, column.id, (e.target as HTMLInputElement).value)
                      }
                    }}

                  ></Input>
                  <Separator className="mt-5" />
                  <CardContent>
                    <div className="flex flex-col p-2">
                      {column.tickets.map((ticket) =>
                        <div key={ticket.id}>
                          <div className=" flex justify-center gap-2 p-2 w-80 h-15">
                            <Checkbox className="w-8 h-8 "></Checkbox>
                            <Input
                              placeholder={ticket.text}
                              value={ticket.text}
                              onChange={(e) =>
                                setColumns(prev => prev.map(col =>
                                  col.id !== column.id ?
                                    col : {
                                      ...col,
                                      tickets: col.tickets.map(t =>
                                        t.id === ticket.id ?
                                          { ...t, text: e.target.value } : t)
                                    }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  updateTicket(column.id, ticket.id, (e.target as HTMLInputElement).value, ticket.description ?? "")
                                  console.log(column.id, ticket.id)
                                }
                              }}

                            ></Input>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button>...</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>{ticket.text}</AlertDialogTitle>
                                  <AlertDialogDescription>Ticket Description:</AlertDialogDescription>
                                  <Textarea
                                    value={ticket.description}
                                    onChange={(e) =>
                                      setColumns(prev => prev.map(col =>
                                        col.id !== column.id ? col : {
                                          ...col,
                                          tickets: col.tickets.map(t =>
                                            t.id === ticket.id ? {
                                              ...t, description: e.target.value
                                            } : t)
                                        }))} />
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogAction
                                    onClick={() =>
                                      updateTicket(column.id, ticket.id, ticket.text, ticket.description ?? "")
                                    }
                                  >Save Ticket</AlertDialogAction>
                                  <AlertDialogAction variant={"destructive"}>Delete Ticket</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>



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
        </Card >
      </div >
      {/* <Column /> */}
    </div >



  )
}

export default KamakoBoard;
