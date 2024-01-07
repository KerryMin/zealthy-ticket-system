import React, { ReactNode } from "react";
import { ApplicationProvider, } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { BASE_URL } from "./constants";

const convex = new ConvexReactClient(BASE_URL, {
    unsavedChangesWarning: false,
});

export default function Provider({ children }: { children: ReactNode }) {
    return (
        <ApplicationProvider  {...eva} theme={eva.dark}>
            <ConvexProvider client={convex}>
                {children}
            </ConvexProvider>
        </ApplicationProvider>
    );
}