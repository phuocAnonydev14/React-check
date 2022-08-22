import { useState } from "react";
import BrownCate from "./BrownCate";
import Header from "./Header";

function FullHeader() {
  const [isAppearBrownCate, setIsAppearBrownCate] = useState(false);
  return (
    <div
    // style={{
    //   position: "fixed",
    //   width: "100%",
    //   // height: "100%",
    //   top: "0",
    //   left: "0",
    //   zIndex: "900",
    //   backgroundColor: "white",
    // }}
    >
      <Header
        isAppearBrownCate={isAppearBrownCate}
        setIsAppearBrownCate={setIsAppearBrownCate}
      />
      <BrownCate
        isAppearBrownCate={isAppearBrownCate}
        setIsAppearBrownCate={setIsAppearBrownCate}
      />
    </div>
  );
}

export default FullHeader;
