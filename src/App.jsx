
// Legend:
// We will be using fakestore API to fetch data
// Mantine UI library for styling: Basically to get pre-built components

import { Outlet } from "react-router"

function App() {

  return (
    <main>
      <section>
        <Outlet />
      </section>
    </main>
  )
}
export default App

