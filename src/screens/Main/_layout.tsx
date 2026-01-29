import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen
            name="HomeScreen"
            options={{
                title:'Feed',
                headerShown:false
            }}
        />
    </Tabs>
  )
}

export default _layout