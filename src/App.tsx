import { Classes, FocusStyleManager } from "@blueprintjs/core";
import { Header } from "navbar/Header";
import { Grid } from "grid/Grid";
import { DrawerHolder } from "drawers";
import { Footer } from "navbar/Footer";

FocusStyleManager.onlyShowFocusOnTabs();

function App() {
  return (
    <div className={`${Classes.DARK} flex-split-body`}>
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
