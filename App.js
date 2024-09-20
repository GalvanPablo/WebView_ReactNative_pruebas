import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';

export default function App() {

    const handleNavigation = (navigator) => {
        const url = navigator.url;
        console.log('\n\n' + url);
        const allowedExceptions = [
            'https://maps.google.com/', // permitir abrir maps en el navegador
            'https://drive.google.com', // permitir abrir drive en el navegador
        ];

        // console.log('Excepción:', allowedExceptions[0]);

        if (url.startsWith('https://www.google.com')) {
            console.log('Pertenece al dominio google.com');
            return true; // permitir cargar URLs dentro del dominio google.com
        } else if (allowedExceptions.some((exception) => url.startsWith(exception))) {
            console.log('Es una excepción');
            Linking.openURL(url); // abrir excepciones en el navegador
            return false; // evitar que se cargue en el WebView
        } else {
            console.log('Es una url bloqueada');
            return false; // bloquear URLs externas
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            <WebView
                style={styles.container}
                // originWhitelist={['https://www.google.com']}
                // originWhitelist={['*']}
                source={{ uri: 'https://www.google.com' }}
                onShouldStartLoadWithRequest={handleNavigation}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
