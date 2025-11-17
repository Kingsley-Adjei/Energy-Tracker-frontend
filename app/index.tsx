import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: Add your auth check here later
  // const { user, loading } = useAuth();
  // if (loading) return <LoadingScreen />;
  // if (user) return <Redirect href="/(tabs)" />;
  
 return <Redirect href="/(auth)/landing" />;
}