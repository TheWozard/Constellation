import { Classes, FocusStyleManager, Navbar } from "@blueprintjs/core";
import { Grid } from "./grid/Grid";

FocusStyleManager.onlyShowFocusOnTabs();

function App() {
  return (
    <div className={Classes.DARK}>
      <Navbar>

      </Navbar>
      <div className={"grid-body"}>
        <Grid />
      </div>
    </div>
  );
}

export default App;
