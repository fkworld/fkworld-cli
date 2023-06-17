import { createRoot } from "react-dom/client"

createRoot(document.getElementById("root") as HTMLElement).render(<App />)

function App() {
  return (
    <div
      css={{
        fontSize: 42,
        ":hover": { backgroundColor: "red" },
      }}
    >
      hello react
    </div>
  )
}
