import { Stack } from 'expo-router';

export default function HomeEventsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Event Details',
                    headerShown: true,
                    headerBackTitle: 'Back',
                }}
            />
        </Stack>
    );
}
