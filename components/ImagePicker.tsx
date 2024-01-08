import React, { useState } from 'react';
import { ActivityIndicator, Button, Image, Platform } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import { Layout } from '@ui-kitten/components';

interface IImagePicker {
    image: string | null,
    onChange: (image: string) => void
}
export default function ImagePicker({ image, onChange }: IImagePicker) {
    const [isLoading, setIsLoading] = useState(false)
    const pickImage = async () => {
        setIsLoading(Platform.OS !== 'web')
        try {
            let result = await ExpoImagePicker.launchImageLibraryAsync({
                mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                onChange(result.assets[0].uri)
            }
        }
        catch (e) {
            console.log('log: e', e)
        }
        setIsLoading(false)
    };

    if (isLoading) {
        return <ActivityIndicator />
    }
    return (
        <>
            <Button title={!image ? "Pick an image from camera roll" : "Replace image"} onPress={pickImage} />
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {!!image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
            </Layout>
        </>
    );
}
