import React, { useState } from 'react';
import { Layout, Text, Input, Button, Card, useTheme } from '@ui-kitten/components';
import { useForm, ErrorHandler, FormErrors } from '@/hooks/useForm';
import ImagePicker from './ImagePicker';
import { validateEmail } from '@/helpers/validators';
import { useToaster } from '@/hooks/useToaster';
import { createImageFile } from '@/helpers/fileHelpers';
import { useMutation } from "convex/react";
import { api } from '@/convex/_generated/api';
import { formatDate } from '@/helpers/dateHelpers';
import { omit } from '@/helpers/objectHelpers';
import { STATUS } from '@/core/types';
import RouteButton from './RouteButton';
import { routes } from '@/core/routes';

interface FormValues {
    name: string;
    email: string;
    description: string;
    picture: string;
}

const initialValues: FormValues = { name: '', email: '', description: '', picture: '' };

const errorHandler: ErrorHandler<FormValues> = (values: FormValues) => {
    const errors: FormErrors = {};
    Object.entries(values).forEach(([key, value]) => {
        if (!value) {
            errors[key] = `${key} is required`;
        }
    });
    if (!validateEmail(values.email) && values.email) {
        errors.email = "Please write email in the following format: email@provider.domain"
    }
    return errors;
};

export default function HelpDeskForm() {
    const { values, handleChange, errors, handleSubmit, isInvalid } = useForm({ initialValues, errorHandler, onSubmit })
    const { successToast, errorToast } = useToaster()
    const generateUploadUrl = useMutation(api.tickets.generateUploadUrl);
    const submitTicket = useMutation(api.tickets.submitTicket);
    const [isLoading, setIsLoading] = useState(false)
    const theme = useTheme();

    async function onSubmit(values: FormValues) {
        setIsLoading(true)
        try {
            const imageFile = await createImageFile(values.picture)
            const postUrl = await generateUploadUrl();
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": imageFile!.type },
                body: imageFile,
            });
            const { storageId } = await result.json();
            await submitTicket({
                pictureId: storageId,
                ...omit(values, 'picture'),
                date: formatDate(new Date()),
                status: STATUS.NEW
            });

            successToast("Help desk item submitted successfully")

        } catch (e) {
            console.error('Submit ticket error', e)
            errorToast("Something went wrong, try again later")
        }
        setIsLoading(false)
    };

    return (
        <Layout style={{ opacity: isLoading ? 0.6 : 1, padding: 16, width: '90%', maxWidth: 400 }}>
            <Text category='h1' style={{ color: '#2E3A59', marginBottom: 20 }}>
                Help Desk
            </Text>
            <Card disabled={true}>
                {Object.entries(values).map(([untypedKey, value]) => {
                    const key = untypedKey as keyof typeof isInvalid
                    if (key === 'picture') {
                        return (
                            <Layout key={key}>
                                <ImagePicker onChange={(image) => handleChange('picture', image)} image={values.picture} />
                                {!!value && (
                                    <Button onPress={() => handleChange('picture', '')}>
                                        Remove image
                                    </Button>
                                )}
                                {isInvalid.picture &&
                                    <Text style={{ color: theme['color-danger-default'] }}>
                                        {errors.picture}
                                    </Text>
                                }
                            </Layout>
                        )
                    }
                    return (
                        <React.Fragment key={key}>
                            <Text category='s1'>{untypedKey.charAt(0).toUpperCase() + untypedKey.slice(1)}</Text>
                            <Input
                                value={value}
                                onChangeText={(text) => handleChange(key, text)}
                                style={{ marginBottom: 15 }}
                                status={isInvalid[key] ? 'danger' : 'basic'}
                                caption={isInvalid[key] ? errors[key] : ''}
                            />

                        </React.Fragment>
                    )
                })}
                <Button disabled={isLoading} onPress={handleSubmit}>
                    Submit
                </Button>
                <RouteButton route={routes.supportTicketList}>See support tickets</RouteButton>
            </Card>
        </Layout>
    );
};
