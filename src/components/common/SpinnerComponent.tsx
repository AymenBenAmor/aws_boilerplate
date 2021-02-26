import React from 'react';
import { StyleSheet ,ActivityIndicator,View,} from 'react-native';
import { Spinner,Layout ,} from '@ui-kitten/components';
 import { EvaSize, EvaStatus } from '@ui-kitten/components/devsupport';

type Props = {
   color?: EvaStatus;
  styleContainer?: any
  style?:any;
  size: EvaSize  ;
    
};

const SpinnerComponent: React.FC<Props> = ({ color="basic", styleContainer=null,style,   size   }: Props) => {
  return (
    <View   
    style={[
          styleContainer === null ? styles.container : styleContainer,
          style 
        ]}
      >
        <Spinner
          status={color}
          size={size}
          />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
       }
});

export default SpinnerComponent;
