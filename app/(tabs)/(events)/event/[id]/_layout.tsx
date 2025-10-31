import { Stack } from 'expo-router';

export default function EventsEventLayout() {
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
