//@ts-nocheck
import React from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {useDataRepo} from '../components/DataRepoContext';

const MarkdownRenderer = () => {
  const {markdownData}: any = useDataRepo();

  // if (loading)
  //   return (
  //     <Text style={styles.loading}>Proccessing information, Hold on...</Text>
  //   );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Markdown style={styles.markdown}>{markdownData?.advice}</Markdown>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  markdown: {
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: '#333',
    },
    heading1: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#00796b',
      marginBottom: 10,
    },
    heading2: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#00796b',
      marginBottom: 8,
    },
    heading3: {
      fontSize: 20,
      fontWeight: '600',
      color: '#00796b',
      marginBottom: 6,
    },
    strong: {
      fontWeight: 'bold',
    },
    list_item: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 5,
    },
    blockquote: {
      backgroundColor: '#e0f7fa',
      borderLeftWidth: 4,
      borderLeftColor: '#00796b',
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: 10,
    },
  },
  loading: {
    marginTop: Dimensions.get('window').height / 2,
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default MarkdownRenderer;
