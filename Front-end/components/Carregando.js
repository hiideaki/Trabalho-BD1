import React from 'react'
import { View, ActivityIndicator } from 'react-native'

export default Carregando = () => (
    <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="white" />
    </View>
)