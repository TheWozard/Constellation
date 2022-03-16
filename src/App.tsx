import { Classes, FocusStyleManager } from "@blueprintjs/core";
import { Header } from "navbar/Header";
import { Grid } from "grid/Grid";
import { DrawerHolder } from "drawers";
import { Footer } from "navbar/Footer";
import { PortalHandler } from "portals/PortalHandler";

FocusStyleManager.onlyShowFocusOnTabs();

function App() {
  return (
    <div className={`${Classes.DARK} flex-split-body`}>
      <PortalHandler />
      <Header />
      <div className={"grid-body overflow-scroll-hidden content"}>
        <Grid />
      </div>
      <Footer />
      <DrawerHolder />
    </div>
  );
}

export default App;
