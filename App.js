import { useEffect, useState, createRef } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';

export default function App() {

    const handleNavigation = (navigator) => {
        const url = navigator.url;
        console.log(url);

        const alloweds = [ // Sitios permitidos desde la app
            'http://telemetriatest.dmdcompresores.com:3000',
            'https://solucionesdmd.com/',
            'https://www.solucionesdmd.com/',
        ];

        const allowedExceptions = [ // Sitios los cuales puede derivar al navegador u otra app
            'https://www.facebook.com/',
            'https://www.instagram.com/',
            'https://www.linkedin.com/'
        ];

        if (alloweds.some((allowed) => url.startsWith(allowed))) {
            console.log('Esta permitida dentro de la app');
            return true; // permitir que se cargue en el WebView
        } else if (allowedExceptions.some((exception) => url.startsWith(exception))) {
            console.log('Es una excepción');
            Linking.openURL(url); // abrir excepciones en el navegador
            return false; // evitar que se cargue en el WebView
        } else {
            console.log('Es una url bloqueada');
            return false; // bloquear URLs externas
        }
    };

    /// RETROCEDER con el btn nativo del dispositivo
    const [canGoBack, setCanGoBack] = useState(false);
    const webviewRef = createRef();

    const handleNavigationStateChange = (navState) => {
        setCanGoBack(navState.canGoBack);
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (canGoBack) {
                webviewRef.current.goBack();
                return true;
            }
        });
        return () => backHandler.remove();
    }, [canGoBack]);

    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            <WebView
                ref={webviewRef}
                style={styles.container}
                source={{ uri: 'http://telemetriatest.dmdcompresores.com:3000/login' }}
                onNavigationStateChange={handleNavigationStateChange}
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
