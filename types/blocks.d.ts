
export interface ChecklistType {
  
}

export interface TicketType {
  board_id: number;
  ticket_id: number;
  subject: string;
  description: string;
  priority?: string;
  checklist?: ChecklistType;
}

export interface ShapeType {
  type: "text" | "file" | "note" | "geometry" | "scribble";
  x: number,
  y: number,
}

export interface KamakoBoardType {
  board_id: string;
  name: string;
  tickets: Ticket[];
  x: number, // used by tldraw 
  y: number,
}
