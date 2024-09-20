import React from "react";
const { View, ImageBackground } = require("react-native");

const Background = ({children}) => {
  return (
    <View>
      <ImageBackground
        source={require("./assets/leaves.jpg")} // Corrected the path and added closing parenthesis
        style={{ height: '100%', width: '100%' }} // Set width as well to cover the entire view
      />
      <View style={{position :"absolute"}}>
        {children}
      </View>
    
    </View>
    
  );
};
export default Background
