import { Classes, FocusStyleManager } from "@blueprintjs/core";
import { Header } from "navbar/Header";
import { Grid } from "grid/Grid";
import { DrawerHolder } from "drawers";

FocusStyleManager.onlyShowFocusOnTabs();

function App() {
  return (
    <div className={Classes.DARK}>
      <Header />
      <div className={"grid-body"}>
        <Grid />
      </div>
      <DrawerHolder />
    </div>
  );
}

export default App;
