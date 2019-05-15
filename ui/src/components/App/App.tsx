import React from "react";
import { ThemeProvider } from "../shared/Themes";

// To disable no-submodule-imports, but tslint:disable:no-submodule-imports not working
// See https://stackoverflow.com/questions/54071852/tslint-always-enforcing-no-submodule-imports-rule-even-if-disabled
/* tslint:disable */
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
/* tslint:enable */

import { JobsProvider } from "../shared/Jobs";
import { ProjectsProvider } from "../shared/Projects";
import "./App.css";
import AppLayout from "./AppLayout";

import { hijackEffects } from "stop-runaway-react-effects";

const App = () => {
    if (process.env.NODE_ENV !== "production") {
        hijackEffects();
    }
    return (
        <ThemeProvider>
            <ProjectsProvider>
                <JobsProvider>
                    <AppLayout />
                </JobsProvider>
            </ProjectsProvider>
        </ThemeProvider>
    );
};

export default App;
