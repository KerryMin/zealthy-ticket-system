import React from 'react'
import { Layout } from "@ui-kitten/components";
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function BackButton() {
    const router = useRouter();
    return (
        <Layout
            style={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 1
            }}
        >
            <Button title='Back' onPress={router.back} />

        </Layout>
    );
}
