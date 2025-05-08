// import { StyleSheet, Text, View } from 'react-native'
// import { Canvas, Circle, Paint, vec } from "@shopify/react-native-skia";


// const StatusDonut = () => {
//   const width = 256;
//   const height = 256;
//   const strokeWidth = 15;
//   const c = vec(width / 2, height / 2);
//   const r = (width - strokeWidth) / 2;

//   return (
//     <Canvas style={{ width, height }}>
//       <Circle c={c} r={r} color="red">
//         <Paint color="#111827" />
//         <Paint color="#1e2e72" style="stroke" strokeWidth={strokeWidth} />
//         <Paint color="#1e2e72" style="stroke" strokeWidth={strokeWidth / 2} />
//       </Circle>
//     </Canvas>
//   )
// }

// export default StatusDonut

// const styles = StyleSheet.create({})



import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StatusDonut = () => {
  return (
    <View style={styles.mainDiv}>
      <Text style={styles.percentageSize}>88
        <Text style={{ color: "#f9c647" }}>%</Text>
      </Text>
    </View>
  )
}

export default StatusDonut

const styles = StyleSheet.create({
  mainDiv: {
    width: 256,
    height: 256,
    borderWidth: 13,
    borderColor: "#1e2e72",
    borderRadius: 128,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#2962ff",
    position: 'relative',
    marginTop: 30
  },
  percentageSize: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#04c301"
  }
})