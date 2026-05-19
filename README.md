# Iterationscli

By **Ariana King and Harly Ponari**

Iterationscli aka iterations command line interface is a web app for programmers by programmers.
This website is made with next.js and the frontend uses shadcn.

The purpose of this website is supposed to be usable by the keyboard only to represent the terminal inside of a OS.
The function of the website is so that you can track your tasks, make lists of things that need to be done.

------------------------------------------------------------------------------------------------------------------
## Current Features of Iterationscli

- Frontend feature: The time will be displayed on the home page and a Hero text that is typing new headers.

- Sign UP: You can sign up| [There is a button to sign up with google: currently doesnt work]. 

- Automatically on signup we create a user a board which will have a small demo already for them which is the column and a ticket inserted.

- Sign In: You can sign in to your account, which will read your user info from the database to authenticate you.

- Logout: You will be pushed back to the front page, and you will be signed out

- Auth Features: We used two packages: JOSE and bcyrpt. bcrypt was used to hash and compare password hashes securely using the Blowfish cipher. JOSE was used to sign, verify, and decode JSON web tokens which contained claim sets such as userid to authorize users to both sign in and edit user-owned data. Finally, created a library file called crypt.ts, which encapsulates and abstracts the JOSE and bcrpyt libraries into simple function calls.

- Kanban: There is a semi-functioning Kanban board called a Kamako board 

- Terminal: A popup to resemble a terminal to move around the website.

------------------------------------------------------------------------------------------------------------------

### Kanban/Kamko Board Features:

- A user will only be allowed one board, which can be filled with columns, which can be filled with tickets.

- Columns Feature: A column will generate when you click the + button, and the column will delete when you click the red >.

- Tickets Feature: A ticket will have two option which only one works which is the ability to add a description. Checkbox does not work[YET].

- Description Feature: Inside the popover which is the [...] button next to the ticket header. You can save the description and you can delete the ticket, which gets rid of the  description and the ticket header.

------------------------------------------------------------------------------------------------------------------

### Terminal Features :

A terminal context was created which can help you quicky get around the website. The options it provides you with is signin, login, logout, and settings ONLY IF you are logged in.
Inside the context, there are props being used which help the selectable buttons inside of the terminal take in args which can direct you to another page or enable a popover for whatever you are looking for.


------------------------------------------------------------------------------------------------------------------
## Reflection:
I can improve my abilities heavily. Implementations on auth from my teammate, some features I am trying to understand. Most I understand but some I dont. I understand that i just started and I can improve my knowledge much more. 

I feel like I am getting the hang of apis and connecting to the backend to fetch for the frontend. I understand that I should use try catch statements to make sure I am not breaking my website because errors that are caught will help me improve my code and see the details of my errors.
I need to make more websites and keep hacking to become the programmer I need to be.

------------------------------------------------------------------------------------------------------------------
I have made you a demo account that will explain the controls of the website:

Username: teachertesting

password: test1234

This demo will also show you that Read is working and information is being fetched from the database.

After you delete something, reload the page as that will show you that it has been deleted

After you update something, do the same.

------------------------------------------------------------------------------------------------------------------
 ### Controls

- Control + Y: Opens the terminal that allows you to select a page to go to.

- Enter or button click: Allows you to interact with a button or an input area.

- Tab: Allows you to move throughout a website.

- d: changes from dark mode to light mode, light mode to dark mode.

------------------------------------------------------------------------------------------------------------------

### Kanban/Kamako explanation

[>] Deletes the column and the tickets

[+] Creates a new ticket

[...] Allows you to enter a ticket dashboard and allows you to edit it description. Dashboard gives u the option to save or delete a ticket

# ALSO REMEMBER TO CLICK ENTER ON TICKET OR COLUMN INPUT HEADERS TO SAVE YOUR CHANGES.!!!!!!!!!












