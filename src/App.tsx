import { Classes, FocusStyleManager } from "@blueprintjs/core";
import { Header } from "navbar/Header";
import { Board } from "board/Board";
import { DrawerHolder } from "drawers";
import { Footer } from "navbar/Footer";
import { PortalHandler } from "portals/PortalHandler";
import { ErrorReset } from "util/ErrorReset";

FocusStyleManager.onlyShowFocusOnTabs();

function App() {
  return (
    <div className={`${Classes.DARK} flex-split-body`}>
      <ErrorReset>
        <PortalHandler />
        <Header />
        <div className={"grid-body overflow-scroll-hidden content"}>
          <Board />
        </div>
        <Footer />
        <DrawerHolder />
      </ErrorReset>
    </div>
  );
}

export default App;
