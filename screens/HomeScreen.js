import { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { ListItem } from "../components/ListItem";
import axios from "axios";
import Constants from "expo-constants";

const URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${Constants.expoConfig.extra.newsApiKey}`;

export const HomeScreen = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      console.log("gagagaga" + URL);
      const response = await axios.get(URL);
      console.log(response.data.articles);
      setArticles(response.data.articles);
    } catch (error) {
      console.log(URL);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            imageURL={item.urlToImage}
            title={item.title}
            author={item.author}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
});
