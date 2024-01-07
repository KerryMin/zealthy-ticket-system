import { router } from 'expo-router';
import { Button } from '@ui-kitten/components'
import React from 'react'

interface IRouteButton {
    route: string;
    children: string;
    status?: 'primary' | 'danger'
}

export default function RouteButton({ children, route, status = 'primary' }: IRouteButton) {

    const handleGoToRoute = () => {
        router.push(route);
    };

    return <Button status={status} onPress={handleGoToRoute}>{children}</Button>
}