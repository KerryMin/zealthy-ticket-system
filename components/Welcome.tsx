import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { router } from "expo-router";
import { routes } from '@/core/routes';

export default function Welcome() {

    const handleGoToRoute = (route = '') => () => {
        router.push(route);
    };

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Layout style={{ padding: 16, width: '90%', maxWidth: 390 }}>
                <Text category='h1' style={{ textAlign: 'center', marginBottom: 20 }}>
                    Welcome to Zealthy's Help Desk!
                </Text>
                <Button status='primary' style={{ marginVertical: 8 }} onPress={handleGoToRoute(routes.supportTicketForm)}>
                    Submit support ticket
                </Button>

                <Button status='danger' style={{ marginVertical: 8 }} onPress={handleGoToRoute(routes.supportTicketList)}>
                    See list of support tickets
                </Button>
            </Layout>
        </Layout>
    );
};
