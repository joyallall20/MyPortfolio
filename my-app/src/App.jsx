import React from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import WhatICanBuild from "./WhatICanBuild";
import TechStack from "./TechStack";
import Projects from "./Projects";
import Connect from "./Connect";

// You didn't send me your existing App.jsx, so this is a suggested
// assembly based on the section ids the components now use
// (home / services / techstack / projects / contact) which the
// Navbar's scroll-spy depends on. Merge this into your real App.jsx —
// keep whatever routing/providers you already have around it.
function App() {
  return (
    <div className="bg-black">
      <Navbar />
      <Main />
      <WhatICanBuild />
      <TechStack />
      <Projects />
      <Connect />
    </div>
  );
}

export default App;