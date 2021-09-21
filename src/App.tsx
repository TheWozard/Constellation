import { Classes, FocusStyleManager } from "@blueprintjs/core";
import { Header } from "navbar/Header";
import { Grid } from "grid/Grid";

FocusStyleManager.onlyShowFocusOnTabs();

function App() {
  return (
    <div className={Classes.DARK}>
      <Header />
      <div className={"grid-body"}>
        <Grid />
      </div>
    </div>
  );
}

export default App;
