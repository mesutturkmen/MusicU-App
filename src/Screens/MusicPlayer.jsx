import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors, width } from '../../assets/Theme/colors';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import songs from '../../assets/Datas/songs';
import MovieImageComponent from '../Components/MovieImageComponent/MovieImageComponent';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const MusicPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      setSongIndex(index);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const skipToNextSong = () => {
    sliderRef.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const goToPreviousSong = () => {
    sliderRef.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.musicPlayerContainer}>
        <View style={{ width: width, marginTop: 100 }}>
          <Animated.FlatList
            ref={sliderRef}
            data={songs}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return <MovieImageComponent item={item} />;
            }}
          />
        </View>
        {/* Song Details */}
        <View style={styles.detailContainer}>
          <Text style={styles.songName}>{songs[songIndex].Name}</Text>
          <Text style={styles.artistName}>{songs[songIndex].artistName}</Text>
        </View>

        {/* Slider */}

        <View>
          <Slider
            style={styles.progressBar}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor={colors.lightBlue}
            minimumTrackTintColor={colors.lightBlue}
            maximumTrackTintColor={colors.white}
            onSlidingComplete={() => {}}
          />

          {/* Song timing  */}

          <View style={styles.timing}>
            <Text style={styles.timeText}>00:00</Text>
            <Text style={styles.timeText}>00:00</Text>
          </View>
        </View>
        {/* Song Controls */}

        <View style={styles.controlContainer}>
          <TouchableOpacity onPress={goToPreviousSong}>
            <MaterialIcons
              name="skip-previous"
              size={44}
              color={colors.lightBlue}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="ios-play-circle"
              size={84}
              color={colors.lightBlue}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNextSong}>
            <MaterialIcons
              name="skip-next"
              size={44}
              color={colors.lightBlue}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity>
          <AntDesign name="hearto" size={28} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="repeat" size={28} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="share" size={28} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-horizontal" size={28} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  musicPlayerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 50,
    borderTopColor: colors.grey,
    borderTopWidth: 1,
    paddingTop: 20,
  },
  songName: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    fontWeight: '600',
  },
  artistName: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.6,
    fontWeight: '200',
    textAlign: 'center',
  },
  progressBar: {
    width: 350,
    height: 40,
    marginTop: 5,
  },
  timing: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    color: colors.white,
    opacity: 0.5,
  },
  controlContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 30,
  },
});
