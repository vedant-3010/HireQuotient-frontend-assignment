# Admin Dashboard

This is a React Redux admin dashboard application that provides administrators with a user-friendly interface to view, edit, and delete user records. The application fetches user data from a provided API endpoint and supports various features such as pagination, search, and bulk actions.

## Demo

You can explore the live demo of the application [here](https://hire-quotient-frontend-assignment.vercel.app/).

## Technologies Used

This application is built using the following technologies:

- **React:** A JavaScript library for building user interfaces.
- **Redux Toolkit:** A state management library for React applications.
- **Bootstrap:** A front-end component library for styling.
- **FontAwesome:** An icon library for adding scalable vector icons.

## Features

- **User Management:**
  - View a paginated list of users with their name, email, and role.
  - Search functionality to filter users based on any property.

- **In-Memory Editing:**
  - Edit user details in-place. Changes are not persistent and only affect the current session.

- **In-Memory Deletion:**
  - Delete individual users or multiple selected users. Deletions are in-memory and non-persistent.

- **Pagination:**
  - Navigate through user records with pagination controls.
  - Jump to the first, previous, next, or last page.

- **Bulk Actions:**
  - Select one or more rows, highlighted with a grayish background.
  - Delete multiple selected rows at once using the 'Delete Selected' button.

- **Checkbox Shortcut:**
  - Use the checkbox on the top left to select or deselect all displayed rows.

