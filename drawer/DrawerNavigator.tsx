import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CategoryScreen from '../screens/CategoryScreen';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const COLORS = {
  primary: '#1a3a6b',
  secondary: '#1e4d8c',
  accent: '#4fc3f7',
  text: '#ffffff',
};

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: COLORS.primary }}
    >
      <View style={drawerStyles.header}>
        <View style={drawerStyles.logoBox}>
          <Text style={drawerStyles.logoBoxText}>HERO</Text>
        </View>
        <Text style={drawerStyles.logoText}>News</Text>
      </View>
      <View style={drawerStyles.divider} />
      <DrawerItemList
        {...props}
        activeTintColor={COLORS.accent}
        inactiveTintColor='rgba(255,255,255,0.7)'
        activeBackgroundColor='rgba(79,195,247,0.15)'
        itemStyle={drawerStyles.item}
        labelStyle={drawerStyles.label}
      />
    </DrawerContentScrollView>
  );
}

const drawerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 10,
  },
  logoBox: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
  },
  logoBoxText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 2,
  },
  divider: {
    height: 0.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  item: {
    borderRadius: 6,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});

export function DrawerNavigator() {
  const categories = [
    'general', 'business', 'technology',
    'sports', 'entertainment', 'science', 'health',
  ];

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '500', letterSpacing: 1 },
        drawerStyle: { backgroundColor: COLORS.primary, width: 260 },
      }}
    >
      {categories.map((item) => (
        <Drawer.Screen
          key={item}
          name={item.charAt(0).toUpperCase() + item.slice(1)}
          component={CategoryScreen}
          initialParams={{ category: item }}
          options={{
            title: item.charAt(0).toUpperCase() + item.slice(1),
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{
                  backgroundColor: '#ffffff', paddingHorizontal: 6,
                  paddingVertical: 2, borderRadius: 2,
                }}>
                  <Text style={{ color: COLORS.primary, fontWeight: '700', fontSize: 14, letterSpacing: 1 }}>
                    HERO
                  </Text>
                </View>
                <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '400', letterSpacing: 2 }}>
                  News
                </Text>
              </View>
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}