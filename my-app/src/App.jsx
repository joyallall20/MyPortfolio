import React from "react";
import Navbar from "./Componants/Navbar";
import Main from "./Pages/Main";

import Projects from "./Pages/Projects";
import Services from "./Pages/Services";
import Connect from "./Pages/Connect";
import Stack from "./Pages/Stack";

// You didn't send me your existing App.jsx, so this is a suggested
// assembly based on the section ids the components now use
// (home / services / techstack / projects / contact) which the
// Navbar's scroll-spy depends on. Merge this into your real App.jsx —
// keep whatever routing/providers you already have around it.
//
// Services sits between Projects and Connect: it picks up right where
// Projects' black background leaves off, then transitions to white by
// the time Connect's black section starts again.
function App() {
  return (
    <div className="bg-black">
      <Navbar />
      <Main />

      <Projects />
      <Services />
      <Stack/>
      <Connect />
    </div>
  );
}

export default App;