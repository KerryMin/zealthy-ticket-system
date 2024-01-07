import { router } from 'expo-router';
import { Button } from '@ui-kitten/components'
import React from 'react'

interface IRouteButton {
    route: string;
    children: string
}

export default function RouteButton({ children, route }: IRouteButton) {

    const handleGoToRoute = () => {
        router.push(route);
    };

    return <Button onPress={handleGoToRoute}>{children}</Button>
}