import React from 'react';
import { Stack } from 'expo-router';
import HelpDeskForm from '@/components/HelpDeskForm';
import BackButton from '@/components/BackButton';

export default function Screen() {
    return <>
        <BackButton />
        <Stack.Screen options={{}} />
        <HelpDeskForm />
    </>
}