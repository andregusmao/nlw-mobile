import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function Favorites() {
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<Array<Teacher>>([]);

    useEffect(() => {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                setFavorites(JSON.parse(response).map((teacher: Teacher) => teacher.id));
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}>
                {
                    favorites.map((teacher: Teacher) => {
                        if (teacher) {
                            return (
                                <TeacherItem
                                    key={teacher.id}
                                    teacher={teacher}
                                    favorited={favorites.includes(teacher)} />
                            )
                        }
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Favorites;