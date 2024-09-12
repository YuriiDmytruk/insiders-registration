import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import User from '../components/User';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type Props = NativeStackScreenProps<RootStackParamList, 'UsersList'>;

const UsersList: React.FC<Props> = () => {
  const [users, setUsers] = useState<any[]>([]);
  const { email } = useSelector((state: RootState) => state.userInfo);

  const fetchUsers = useCallback(async () => {
    const { data: _users, error } = await supabase.from('users').select().neq('email', email);
    if (error) {
      console.error(error);
    } else {
      setUsers(_users || []);
    }
  }, [email]);

  useEffect(() => {
    fetchUsers();

    const channel = supabase.channel('supabase_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users' },
        () => {
          fetchUsers();
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [fetchUsers]);

  const renderItem = ({ item }: { item: any }) => (
    <User user={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users List</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default UsersList;
