import React, { useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { Modal, Button, Layout, Text, Input, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { STATUS, TicketType } from '@/core/types';
import { useForm } from '@/hooks/useForm';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useToaster } from '@/hooks/useToaster';

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticketDetails: TicketType;
}

export default function TicketModal({ isOpen, onClose, ticketDetails }: TicketModalProps) {
    const initialValues = { response: ticketDetails.response || '', status: ticketDetails.status }
    const { values, handleChange, handleSubmit, resetForm } = useForm({ initialValues, onSubmit, noReset: true })
    const updateTicket = useMutation(api.tickets.updateTicket);
    const { successToast, errorToast } = useToaster()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

    async function onSubmit() {
        setIsLoading(true)
        try {
            await updateTicket({ id: ticketDetails._id, values: { ...initialValues, ...values } })
            onClose()
            console.log("Would normally send email here with body: ...")
            successToast('Successfully updated ticket!')
        } catch (e) {
            errorToast('Something went wrong with the update')
        }
        setIsLoading(false)
    }

    const handleSelect = (index: IndexPath) => {
        setSelectedIndex(index);
        handleChange('status', Object.values(STATUS)[index.row]);
    };

    const LoadingIndicator = (props: any) => (
        <Layout style={[props.style, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size='small' color='#FFF' />
        </Layout>
    );

    function handleBackDropClick() {
        resetForm()
        onClose()
    }
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Modal visible={isOpen} backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', }} onBackdropPress={handleBackDropClick}>
                <Layout style={{ margin: 2, padding: 16, minWidth: 300, maxWidth: 400 }}>
                    <Text category='h6'>Help Desk Response</Text>
                    <Layout style={{ marginVertical: 8 }}>
                        <Text style={{ marginBottom: 20 }}>Name: {ticketDetails.name}</Text>
                        <Text style={{ marginBottom: 20 }}>Email: {ticketDetails.email}</Text>
                        <Image style={{ width: 100, height: 100, marginBottom: 20 }} source={{ uri: ticketDetails.image }} />
                        <Text style={{ marginBottom: 20 }}>Date: {ticketDetails.date}</Text>
                        <Text style={{ marginBottom: 20 }}>Description: {ticketDetails.description}</Text>

                        <Input
                            value={values.response}
                            onChangeText={(text) => handleChange('response', text)}
                            placeholder="Type your response"
                            style={{ marginBottom: 20 }}
                        />

                        <Select
                            selectedIndex={selectedIndex}
                            onSelect={(indexPath) => handleSelect(indexPath as IndexPath)}
                            value={values.status || initialValues.status}
                            placeholder="Choose Status"
                            style={{ marginBottom: 20 }}
                        >
                            {Object.values(STATUS).map((s, i) => (
                                <SelectItem key={s} title={s} />
                            ))}
                        </Select>

                    </Layout>
                    <Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button style={{ margin: 2 }} onPress={onClose}>
                            Cancel
                        </Button>
                        <Button
                            style={{ margin: 2 }}
                            onPress={handleSubmit}
                            accessoryLeft={isLoading ? LoadingIndicator : undefined}
                            disabled={isLoading}
                        >
                            Submit
                        </Button>
                    </Layout>
                </Layout>
            </Modal>
        </Layout>
    );
}
