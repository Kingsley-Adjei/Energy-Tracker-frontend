import { StyleSheet, Text, View } from 'react-native';

export default function SignUpScreen() {
  return (
    <View style={signUpStyles.container}>
      <Text style={signUpStyles.text}>Sign Up Screen</Text>
      <Text style={signUpStyles.subtext}>TODO: Implement OAuth and Email/Password signup</Text>
    </View>
  );
}

const signUpStyles = StyleSheet.create({
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