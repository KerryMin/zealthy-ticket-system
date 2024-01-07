import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import TicketCard from './TicketCard';
import { useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import { useDisclosure } from '@/hooks/useDisclosure';
import TicketModal from './TicketModal';
import { TicketType } from '@/core/types';
import RouteButton from './RouteButton';
import { routes } from '@/core/routes';

export default function HelpDeskTickets() {
    const tickets = useQuery(api.tickets.list);
    const ticketModal = useDisclosure()
    const [selectedTicket, setSelectedTicket] = useState<TicketType | undefined>()

    if (tickets === undefined) {
        return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner size="large" /></Layout>
    }
    if (!tickets.length) {
        return (
            <Layout style={{ marginTop: -300, alignItems: 'center', justifyContent: 'center' }}>
                <Text category='h6'>No support tickets</Text>
                <Layout style={{ marginBottom: 40 }}>
                    <RouteButton route={routes.supportTicketForm}>Create support ticket</RouteButton>
                </Layout>
            </Layout>
        );
    }
    return (
        <Layout style={{ marginTop: 100, alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 12 }}>
            <Text category='h4' style={{ marginBottom: 20 }}>Support tickets</Text>
            <Layout style={{ marginBottom: 40 }}>
                <RouteButton route={routes.supportTicketForm}>Create support ticket</RouteButton>
            </Layout>
            <ScrollView>
                <Layout style={{ paddingBottom: 16 }}>
                    {tickets.map((ticket, i) => {
                        function handlePress() {
                            setSelectedTicket(ticket)
                            ticketModal.openModal()
                        }
                        return <Layout key={ticket.name + i} style={{ paddingBottom: 16 }}><TicketCard  {...ticket} onPress={handlePress} /></Layout>
                    })}
                </Layout>
                {!!selectedTicket &&
                    <TicketModal ticketDetails={selectedTicket} isOpen={ticketModal.isOpen} onClose={ticketModal.closeModal} />
                }
            </ScrollView>
        </Layout>
    );
};
