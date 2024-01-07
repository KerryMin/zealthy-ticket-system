import React from 'react';
import { Stack } from 'expo-router';
import HelpDeskTickets from '@/components/HelpDeskTickets';
import BackButton from '@/components/BackButton';

export default function Screen() {
    return <>
        <BackButton />
        <Stack.Screen options={{}} />
        <HelpDeskTickets />
    </>
}