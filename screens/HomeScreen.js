import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; 


export default class HomeScreen extends React.Component {
    constructor(){
        super();
        this.state={text:"",
            isSearchPressed:false,
            word:"",
            lexicalCategory:'',
            examples:[],
            definition:""}
    }

    getWord=(word)=>{
        var searchKeyword=word.toLowerCase()
        var url= "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
        return fetch(url)
        .then((data)=>{
            if(data.status===200)
            {
                return data.json()
            }
            else
            {
                return null
            }
        })
        .then((response)=>{
            var responseObject = response
            if(responseObject)
            {
                var wordData = responseObject.definitions[0]
                var definition=wordData.description
                var lexicalCategory=wordData.wordtype

                this.setState({
                    "word" : this.state.text,
                    "definition" :definition,
                    "lexicalCategory":lexicalCategory
                })
            }
            else
            {
                this.setState({
                    "word":this.state.text,
                    "definition":"Not Found",
                })
            }
        })
    }

  render(){
  return (
    <View style={styles.container}>
      <TextInput style={styles.inputBox} onChangeText={text => {this.setState({
          text: text,
          isSearchPressed:false,
          word:"Loading...",
          lexicalCategory:'',
          examples:[],
          definition:""
      });
    }}
    value={this.state.text}
    />
     
     <TouchableOpacity style={styles.searchButton} onPress={()=> {this.setState({isSearchPressed:true});
     this.getWord(this.state.text)}} >
      <Text>Search</Text>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>
              Word:{" "}
          </Text>
          <Text style={{fontSize:18 }}>
              {this.state.word}
          </Text>
      </View>
      <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>
          Type:{" "}
      </Text>
      <Text style={{fontSize:18 }}>
          {this.state.lexicalCategory}
      </Text>
  </View>
  <View style={{flexDirection:'row',flexWrap:'wrap'}}>
  <Text style={styles.detailsTitle}>
      Definition:{" "}
  </Text>
  <Text style={{fontSize:18 }}>
      {this.state.definition}
  </Text>
  </View>
    </View>
    
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});