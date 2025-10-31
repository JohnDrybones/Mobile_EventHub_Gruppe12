import { Stack, useLocalSearchParams } from 'expo-router';

export default function HomeEventsLayout() {
    const params = useLocalSearchParams<{ title?: string }>();
    const title = params.title || "Event Details"; 

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: title,
                    headerShown: true,
                    headerBackTitle: 'Back',
                }}
            />
        </Stack>
    );
}
