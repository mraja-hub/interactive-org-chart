# Employee Organization Chart

This project is a modern React application for visualizing and managing an interactive employee organization chart. It features drag-and-drop manager assignment, filtering, and smooth zoom/pan navigation for scalable org structures.

## Features

- **Interactive Org Chart**: Visualizes employee hierarchy in a clear, tree-like structure.
- **Drag-and-Drop**: Change an employee's manager by dragging nodes in the chart.
- **Filtering & Search**: Quickly find employees by name, designation, or team.
- **Pinch/Zoom/Pan**: Navigate large org charts with intuitive gestures.
- **Responsive UI**: Sidebar controls are always visible; employee list is scrollable.
- **Accessible & Modern Design**: Clean layout, color contrasts, and keyboard navigation support.

## Why Bun?

This project uses [Bun](https://bun.sh/) as the JavaScript runtime and package manager, alongside Vite for fast development and builds. Bun offers:

- Much faster installs and script execution than npm or yarn
- Native TypeScript and JSX support
- Improved developer experience with modern features
- Seamless compatibility with Vite and React

**Note:** You must use Bun for all commands (not npm or yarn).

## Architecture & File Structure

```
org-chart
├── src
│   ├── components
│   │   ├── OrgChart.tsx         # Main org chart rendering & pinch/zoom logic
│   │   ├── EmployeeNode.tsx     # Recursive tree node with drag-and-drop
│   │   ├── Sidebar.tsx          # Employee list, search, and filter controls
│   ├── mockEmployees.ts         # Mock data for demo/testing
│   ├── App.tsx                  # App layout and state management
│   ├── App.css                  # Custom global styles
│   └── main.tsx                 # Entry point
├── public
│   └── index.html
├── package.json
├── bun.lock
├── tsconfig.json
└── README.md
```

## Packages & Technical Details

- **React**: UI library
- **TypeScript**: Type safety
- **Vite**: Fast dev/build tool
- **Bun**: Runtime and package manager
- **@dnd-kit/core**: Drag-and-drop engine
- **react-zoom-pan-pinch**: Zoom/pan gestures for chart navigation

## Getting Started

1. **Install Bun:**
   [Follow Bun installation instructions](https://bun.sh/docs/installation)

2. **Clone the repository:**
   ```
   git clone <repository-url>
   cd org-chart
   ```
3. **Install dependencies:**
   ```
   bun install
   ```
4. **Start the development server:**
   ```
   bun run dev
   ```
5. **Open the app:**
   Visit `http://localhost:5173` in your browser.

## Deployment

You can deploy this app to Netlify, Vercel, or any static hosting platform that supports Vite/React projects.

## Design & Implementation Notes

- Built with React functional components and hooks for maintainability.
- Drag-and-drop is powered by dnd-kit for flexibility and accessibility.
- Org chart layout uses custom tree rendering with connector lines for clarity.
- Sidebar controls are sticky; only the employee list scrolls for usability.
- Easily extendable for real API integration or additional features.