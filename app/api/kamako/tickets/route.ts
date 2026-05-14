import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";
import { s } from "motion/react-m";

export async function PUT(req: NextRequest) {
    try {

        const { column_id, ticket_id, text, descText } = await req.json();
        const supabase = createClient();



        if (!column_id || !ticket_id || !text) {
            console.log(column_id, ticket_id, text)
            return NextResponse.json(
                { message: "Missing Fields" },
                { status: 400 }
            )
        }
        if (!descText) {
            console.log(column_id, ticket_id, text)
            descText === ""
        }
        //check if the ticket num exist inside of the db
        const { data: ticketData, error: ticketError } = await supabase
            .from("tickets")
            .select("*")
            .eq("ticket_id", ticket_id)
            .maybeSingle()

        if (ticketError) {
            console.log("Error:", ticketError)
        }
        if (ticketData) {
            console.log("Ticket Exist")
        }
        else {
            console.log("Ticket doesnt exist, creating new one")
            const { data: createdTicket, error } = await supabase
                .from("tickets")
                .insert({ column_id: column_id, ticket_id: ticket_id, ticket_header: text })
                .select()
                .single()
            if (error) {
                console.error("Error creating ticket:", error)
            }

            console.log("Created ticket", createdTicket)
        }

        const { error } = await supabase
            .from("tickets")
            .update({ ticket_header: text, ticket_description: descText })
            .eq("ticket_id", ticket_id)
            .eq("column_id", column_id)


        if (error) {
            console.error("Error wtih creating a ticket:", error)
            return NextResponse.json(
                { message: "Error with creating ticket" },
                { status: 500 }
            )
        }

        return NextResponse.json({
            message: "updated",

        })
    }
    catch (error: any) {
        console.error("Error wtih creating a ticket:", error)
        console.error("FULL ERROR:", error);
        console.error("MESSAGE:", error?.message);
        console.error("DETAIL:", error?.details);
        return NextResponse.json(
            { message: "Error with creating ticket" },
            { status: 500 }
        )
    }

}