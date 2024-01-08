import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { STATUS, TicketType } from '@/core/types';

interface ITicketCard extends TicketType {
    onPress: (ticket: TicketType) => void;
};

export default function TicketCard({ date, description, name, status, email, image, response, onPress }: ITicketCard) {

    const handlePress = () => onPress({ date, description, name, status, image, response, email });
    const indicatorColor = {
        [STATUS.NEW]: '#F56565',
        [STATUS.IN_PROGRESS]: '#4299E1',
        [STATUS.RESOLVED]: '#48BB78',
    };

    return (
        <TouchableOpacity onPress={handlePress} style={{ width: '100%' }}>
            <Layout
                style={{
                    borderWidth: 1,
                    borderColor: '#CBD5E0',
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: 80,
                    paddingTop: 4,
                    paddingHorizontal: 8,
                    position: 'relative',
                    minWidth: 300,
                }}
            >
                <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Layout style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={{ uri: image }}
                            style={{
                                width: 60,
                                height: 60,
                                resizeMode: 'cover',
                            }}
                        />
                    </Layout>

                    <Layout style={{ height: 70, justifyContent: 'center', paddingHorizontal: 8 }}>
                        <Text category='s1' style={{ fontWeight: 'bold' }}>
                            {name.trim()}
                        </Text>
                        <Text category='c1' style={{ maxWidth: 200, color: '#718096' }}>
                            {description.trim()}
                        </Text>
                        <Text category='c1' style={{ color: '#4A5568' }}>
                            {date}
                        </Text>
                    </Layout>
                </Layout>
                <Text
                    style={{
                        position: 'absolute',
                        right: 20,
                        top: 2,
                        fontSize: 12,
                    }}
                >
                    {status}
                </Text>

                <Layout
                    style={{
                        position: 'absolute',
                        right: 2,
                        top: 5,
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        backgroundColor: indicatorColor[status],
                    }}
                >
                </Layout>

            </Layout>
        </TouchableOpacity>
    );
};
