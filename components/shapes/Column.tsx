import React from "react"
import { Card, CardHeader, CardContent, CardDescription } from "../ui/card"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input"

export default function Column() {


    return (
        <>
            <Card className="w-74 h-72 resize overflow-auto border flex flex-col p-2" style={{
                border: "0px solid black",
                overflow: "auto",
                resize: "both",
                marginTop: "19px",
            }}>
                <CardHeader className="flex justify-center gap-3" >
                    <Input placeholder="name of this collum"></Input>
                    <Button>{"+"}</Button>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-center gap-3">
                            <Checkbox className="w-9 h-8 "></Checkbox>
                            <Input>
                            </Input>
                            <Button>...</Button>
                        </div>
                        <div className="flex justify-center gap-3">
                            <Checkbox className="w-9 h-8 "></Checkbox>
                            <Input>
                            </Input>
                            <Button>...</Button>
                        </div>
                        <div className="flex justify-center gap-3">
                            <Checkbox className="w-9 h-8 "></Checkbox>
                            <Input>
                            </Input>
                            <Button>...</Button>
                        </div>
                    </div>
                </CardContent>
                <Button className="mt-auto border p-3" variant={"outline"}>Create A New Ticket</Button>
                <CardDescription>Card Info: ID : blah Date Created: Blah</CardDescription>
            </Card>
        </>
    )
}