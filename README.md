# Student Management System

A simple single-page application to manage a list of students. The project is built with plain HTML, Bootstrap for styling, and modern JavaScript (ES6+) for the application logic. It uses a local JSON server to simulate a backend API.

## Features

- **View Students**: Displays a list of all students from the database.
- **Add Students**: A form to add a new student to the list.
- **Delete Students**: Remove students from the list.
- **Dynamic Sorting**: Click on any column header (ID, Name, Age, Major, Note) to sort the table in ascending or descending order.
- **Calculated Fields**: Automatically calculates a student's age from their birth date.
- **Admission Status**: Automatically determines if a student is "Admitted" (note >= 10) or "Not Admitted".

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js and npm](https://nodejs.org/en/download/)
- `json-server` (for the mock API)
- A local web server (this guide will use `live-server`)

## Getting Started

Follow these steps to get your development environment set up and running.

### 1. Installation

First, clone the repository to your local machine:
```bash
git clone https://github.com/Abdou004/ES6-Students-Management.git
cd ES6-Students-Management
```

Install the required npm packages (which includes Bootstrap):
```bash
npm install
```

Next, if you don't have `json-server` and `live-server` installed globally, run the following command:
```bash
npm install -g json-server live-server
```

### 2. Running the Application

You need to run two separate processes in two different terminals for the application to work correctly.

**Terminal 1: Start the Backend API**

This command starts the JSON server, which will watch the `db.json` file and provide the REST API for your application.
```bash
json-server --watch db.json
```
The API will be available at `http://localhost:3000`.

**Terminal 2: Start the Frontend**

This command starts a local development server to serve your `index.html`, CSS, and JavaScript files.
```bash
live-server
```
`live-server` will automatically open a new tab in your web browser. If it doesn't, you can manually navigate to the URL provided in the terminal (usually `http://127.0.0.1:8080`).

## How to Use

- The main page will load and display the list of students.
- Use the **"Add New Student"** form to create a new student record and click "Create Student". The table will update automatically.
- Click on the headers in the table (e.g., "name", "age") to **sort the data**.
- Click the **"Delete"** button on any student's row to remove them from the database.
- Click the **"Reload"** button to refresh the student list manually.
