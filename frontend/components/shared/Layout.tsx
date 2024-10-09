import { PropsWithChildren } from "react"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="app">
      {/*<Header />*/}
      <main className="main">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
