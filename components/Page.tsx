import React, { ReactNode } from "react";
import Provider from "@/core/Provider";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Layout } from '@ui-kitten/components';
import { ToastProvider } from 'react-native-toast-notifications';

interface IPage {
    children: ReactNode
}

export default function Page({ children }: IPage) {
    return (
        <Provider>
            <SafeAreaView style={styles.safeArea}>
                <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ToastProvider>
                        {children}
                    </ToastProvider>
                </Layout>
            </SafeAreaView>
        </Provider>
    )
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});