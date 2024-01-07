import React from "react";
import { Slot } from "expo-router";
import Page from "@/components/Page";

export default function Layout() {
    return (
        <Page>
            <Slot />

        </Page>
    );
}
