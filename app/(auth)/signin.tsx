import { StyleSheet, Text, View } from 'react-native';

export default function SignInScreen() {
  return (
    <View style={signInStyles.container}>
      <Text style={signInStyles.text}>Sign In Screen</Text>
      <Text style={signInStyles.subtext}>TODO: Implement OAuth and Email/Password signin</Text>
    </View>
  );
}

const signInStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
  },
});