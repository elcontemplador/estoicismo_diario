import { Info, Moon, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Intro() {
    const { colorScheme, toggleColorScheme } = useColorScheme();

    const openLink = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-zinc-950">
            <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Text
                    className="text-3xl text-zinc-900 dark:text-zinc-50 mb-6"
                    style={{ fontFamily: 'Merriweather_700Bold' }}
                >
                    Sobre esta app
                </Text>

                {/* Intro del creador */}
                <Text
                    className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 mb-8"
                    style={{ fontFamily: 'Inter_400Regular' }}
                >
                    Esta aplicación ha sido desarrollada por <Text className="font-bold">Fernando Nieto Lobato</Text>, creador de{' '}
                    <Text
                        className="text-blue-600 dark:text-blue-400 underline"
                        onPress={() => openLink('https://www.instagram.com/estoicismo_diario/')}
                    >
                        estoicismo_diario
                    </Text>
                    {' '}(Instagram y Facebook), del proyecto original{' '}
                    <Text
                        className="text-blue-600 dark:text-blue-400 underline"
                        onPress={() => openLink('https://x.com/EstoicismoT')}
                    >
                        Estoicismo en Tweets (@EstoicismoT)
                    </Text>
                    {' '}en X/Twitter y del blog recopilatorio{' '}
                    <Text
                        className="text-blue-600 dark:text-blue-400 underline"
                        onPress={() => openLink('https://estoicismo-diario.blogspot.com')}
                    >
                        Estoicismo diario
                    </Text>
                    . Su objetivo es acercar, de forma sencilla y rigurosa, algunas de las ideas más valiosas del estoicismo a la vida cotidiana: no como frases decorativas, sino como recordatorios prácticos para pensar con más claridad, actuar con más serenidad y vivir con mayor coherencia.
                </Text>

                {/* Qué es el estoicismo */}
                <Text
                    className="text-xl text-zinc-900 dark:text-zinc-50 mb-3"
                    style={{ fontFamily: 'Merriweather_700Bold' }}
                >
                    Qué es el estoicismo
                </Text>
                <Text
                    className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 mb-8"
                    style={{ fontFamily: 'Inter_400Regular' }}
                >
                    El estoicismo es una filosofía práctica nacida en la Grecia helenística y desarrollada después con especial fuerza en Roma. Su propósito no es "pensar bonito", sino aprender a vivir mejor: con lucidez, fortaleza interior y sentido del deber. Para el estoicismo, la vida buena consiste en orientar nuestras decisiones hacia la virtud —sabiduría, justicia, valentía y templanza—, más que hacia el placer, la fama o el éxito externo.
                </Text>

                {/* De qué depende */}
                <Text
                    className="text-xl text-zinc-900 dark:text-zinc-50 mb-3"
                    style={{ fontFamily: 'Merriweather_700Bold' }}
                >
                    De qué depende y de qué no
                </Text>
                <Text
                    className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 mb-8"
                    style={{ fontFamily: 'Inter_400Regular' }}
                >
                    Una de sus ideas más útiles es distinguir entre lo que depende de nosotras y nosotros (juicios, elecciones, conductas) y lo que no depende (salud, fortuna, reputación, el comportamiento ajeno). Esto no lleva a la pasividad, sino a una libertad exigente: actuar con responsabilidad donde sí hay margen y aceptar con serenidad —sin resignación— lo que escapa a nuestro control.
                </Text>

                {/* Ética */}
                <Text
                    className="text-xl text-zinc-900 dark:text-zinc-50 mb-3"
                    style={{ fontFamily: 'Merriweather_700Bold' }}
                >
                    Una ética para la vida pública y privada
                </Text>
                <Text
                    className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 mb-8"
                    style={{ fontFamily: 'Inter_400Regular' }}
                >
                    En el estoicismo romano, esta filosofía se convierte en un "arte de gobernarse" que también sostiene la vida en común. Marco Aurelio se recuerda a sí mismo la obligación de actuar con justicia; Epicteto insiste en que la dignidad nace de la coherencia moral; Séneca explora con humanidad la ira, el tiempo, el miedo y la amistad.
                </Text>

                {/* Lecturas */}
                <Text
                    className="text-xl text-zinc-900 dark:text-zinc-50 mb-3"
                    style={{ fontFamily: 'Merriweather_700Bold' }}
                >
                    Leer más allá de las citas
                </Text>
                <Text
                    className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 mb-4"
                    style={{ fontFamily: 'Inter_400Regular' }}
                >
                    Las citas pueden inspirar, pero los libros enseñan el método y los matices. Si te interesa ir un paso más allá, estas son las lecturas más recomendables para empezar:
                </Text>

                <View className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 mb-4">
                    <Text className="text-zinc-700 dark:text-zinc-300 mb-2" style={{ fontFamily: 'Inter_400Regular' }}>
                        <Text className="font-bold text-zinc-900 dark:text-zinc-100">Marco Aurelio:</Text> Meditaciones.
                    </Text>
                    <Text className="text-zinc-700 dark:text-zinc-300 mb-2" style={{ fontFamily: 'Inter_400Regular' }}>
                        <Text className="font-bold text-zinc-900 dark:text-zinc-100">Epicteto:</Text> Enquiridión (Manual) y, después, Disertaciones.
                    </Text>
                    <Text className="text-zinc-700 dark:text-zinc-300" style={{ fontFamily: 'Inter_400Regular' }}>
                        <Text className="font-bold text-zinc-900 dark:text-zinc-100">Séneca:</Text> Cartas a Lucilio; y, si quieres textos breves, Sobre la brevedad de la vida y Sobre la serenidad.
                    </Text>
                </View>

                <Text
                    className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8 italic"
                    style={{ fontFamily: 'Merriweather_400Regular' }}
                >
                    La idea es sencilla: una cita te abre una puerta; la lectura continuada te da el mapa y el entrenamiento para convertir esa inspiración en práctica cotidiana.
                </Text>

                {/* Enlaces */}
                <Text
                    className="text-xl text-zinc-900 dark:text-zinc-50 mb-4"
                    style={{ fontFamily: 'Merriweather_700Bold' }}
                >
                    Enlaces
                </Text>

                <View className="space-y-3 mb-8">
                    <TouchableOpacity
                        onPress={() => openLink('https://www.instagram.com/estoicismo_diario/')}
                        className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-100 dark:border-zinc-800"
                    >
                        <Text className="text-zinc-800 dark:text-zinc-100 font-medium" style={{ fontFamily: 'Inter_400Regular' }}>
                            📷 Instagram: @estoicismo_diario
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => openLink('https://www.facebook.com/estoicismodiario')}
                        className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-100 dark:border-zinc-800"
                    >
                        <Text className="text-zinc-800 dark:text-zinc-100 font-medium" style={{ fontFamily: 'Inter_400Regular' }}>
                            📘 Facebook: Estoicismo Diario
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => openLink('https://x.com/EstoicismoT')}
                        className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-100 dark:border-zinc-800"
                    >
                        <Text className="text-zinc-800 dark:text-zinc-100 font-medium" style={{ fontFamily: 'Inter_400Regular' }}>
                            𝕏 Twitter/X: @EstoicismoT
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => openLink('https://estoicismo-diario.blogspot.com')}
                        className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-100 dark:border-zinc-800"
                    >
                        <Text className="text-zinc-800 dark:text-zinc-100 font-medium" style={{ fontFamily: 'Inter_400Regular' }}>
                            📝 Blog: Estoicismo Diario
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Ajustes */}
                <View className="pt-6 border-t border-slate-200 dark:border-zinc-800">
                    <Text
                        className="text-sm uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4"
                        style={{ fontFamily: 'Inter_400Regular' }}
                    >
                        Ajustes
                    </Text>

                    <TouchableOpacity
                        onPress={toggleColorScheme}
                        activeOpacity={0.7}
                        className="flex-row items-center justify-between bg-white dark:bg-zinc-900 p-5 rounded-xl border border-slate-100 dark:border-zinc-800"
                    >
                        <View className="flex-row items-center">
                            {colorScheme === 'dark' ? (
                                <Moon size={20} color="#f4f4f5" />
                            ) : (
                                <Sun size={20} color="#18181b" />
                            )}
                            <Text
                                className="ml-3 text-zinc-800 dark:text-zinc-100 text-base"
                                style={{ fontFamily: 'Inter_400Regular' }}
                            >
                                Modo {colorScheme === 'dark' ? 'Oscuro' : 'Claro'}
                            </Text>
                        </View>
                        <View
                            className={`w-12 h-6 rounded-full px-1 justify-center ${colorScheme === 'dark' ? 'bg-zinc-700 items-end' : 'bg-slate-200 items-start'}`}
                        >
                            <View className="w-4 h-4 bg-white rounded-full shadow-sm" />
                        </View>
                    </TouchableOpacity>

                    <View className="mt-8 flex-row items-center justify-center opacity-30">
                        <Info size={14} color="#71717a" />
                        <Text className="ml-2 text-[10px] text-zinc-500 uppercase tracking-tighter">
                            Versión 1.0.0 • Estoicismo Diario
                        </Text>
                    </View>
                </View>

                <View className="h-24" />
            </ScrollView>
        </SafeAreaView>
    );
}
